#!/usr/bin/env python3
"""Unsigned recovery simulations, including Withdraw and rejection paths."""
from __future__ import annotations

import base64
import json
from pathlib import Path

import requests

import update_neta_data as u
from validate_wynd_recovery import ADDR_RE, amount_from_obj, contract_state, parse_json, smart

REGISTRY = Path("data/recovery/wynd-pools.json")
OUT = Path("docs/diagnostics/wynd_recovery_simulation.json")
LCDS = ["https://juno-api.polkachu.com", "https://juno-api.lavenderfive.com"]
ACCOUNT_CACHE = {}


def varint(value):
    out = bytearray()
    while value > 127:
        out.append((value & 127) | 128)
        value >>= 7
    out.append(value)
    return bytes(out)


def key(field, wire):
    return varint((field << 3) | wire)


def bfield(field, value):
    value = value.encode() if isinstance(value, str) else bytes(value)
    return key(field, 2) + varint(len(value)) + value


def vfield(field, value):
    return key(field, 0) + varint(int(value))


def find_base_account(value):
    if isinstance(value, dict):
        if "address" in value and "sequence" in value:
            return value
        for child in value.values():
            found = find_base_account(child)
            if found:
                return found
    elif isinstance(value, list):
        for child in value:
            found = find_base_account(child)
            if found:
                return found
    return None


def account(address):
    if address in ACCOUNT_CACHE:
        return ACCOUNT_CACHE[address]
    errors = []
    for base in LCDS:
        try:
            r = requests.get(base + f"/cosmos/auth/v1beta1/accounts/{address}", timeout=12)
            r.raise_for_status()
            acc = find_base_account(r.json().get("account"))
            if not acc or not acc.get("pub_key"):
                raise RuntimeError("account has no published public key")
            ACCOUNT_CACHE[address] = (acc, base)
            return ACCOUNT_CACHE[address]
        except Exception as exc:
            errors.append(f"{base}: {exc}")
    raise RuntimeError("; ".join(errors))


def tx_raw(sender, contract, message, memo):
    acc, endpoint = account(sender)
    pub = acc["pub_key"]
    type_url = pub.get("@type", "/cosmos.crypto.secp256k1.PubKey")
    pub_value = bfield(1, base64.b64decode(pub["key"]))
    pub_any = bfield(1, type_url) + bfield(2, pub_value)
    wasm = bfield(1, sender) + bfield(2, contract) + bfield(3, json.dumps(message, separators=(",", ":")).encode())
    wasm_any = bfield(1, "/cosmwasm.wasm.v1.MsgExecuteContract") + bfield(2, wasm)
    body = bfield(1, wasm_any) + bfield(2, memo)
    single = vfield(1, 1)  # SIGN_MODE_DIRECT
    mode_info = bfield(1, single)
    signer = bfield(1, pub_any) + bfield(2, mode_info) + vfield(3, int(acc["sequence"]))
    fee = vfield(2, 500000)
    auth = bfield(1, signer) + bfield(2, fee)
    raw = bfield(1, body) + bfield(2, auth) + bfield(3, bytes(64))
    return raw, endpoint


def simulate_request(sender, contract, message, memo):
    raw, endpoint = tx_raw(sender, contract, message, memo)
    r = requests.post(endpoint + "/cosmos/tx/v1beta1/simulate", json={"tx_bytes": base64.b64encode(raw).decode()}, timeout=60)
    payload = r.json()
    return r.ok, payload


def simulate(sender, contract, message, memo):
    ok, payload = simulate_request(sender, contract, message, memo)
    if not ok:
        raise RuntimeError(json.dumps(payload, sort_keys=True))
    return payload


def simulate_rejection(sender, contract, message, memo):
    ok, payload = simulate_request(sender, contract, message, memo)
    if ok:
        raise RuntimeError(f"unsafe message unexpectedly simulated: {message}")
    return {"code": payload.get("code"), "message": payload.get("message") or payload.get("raw_log") or "rejected"}


def candidate_with_pubkey(addresses):
    for address in addresses:
        try:
            account(address)
            return address
        except Exception:
            continue
    raise RuntimeError("no candidate with published public key")


def candidates(pool):
    lp, stake, pair = pool["lp_token"]["address"], pool["stake"]["address"], pool["pair"]["address"]
    active, claimers, direct = [], [], []
    for k, v in contract_state(stake):
        ns, suffix = u.nskey(k)
        if ns == "stake":
            match = ADDR_RE.search(suffix)
            obj = parse_json(v)
            amount = amount_from_obj(obj) or 0
            if match and amount > 1000:
                active.append((match.group(0).decode(), amount))
        elif ns == "claims" and suffix:
            obj = parse_json(v)
            items = obj if isinstance(obj, list) else (obj.get("claims", []) if isinstance(obj, dict) else [])
            amount = sum((amount_from_obj(x) or 0) for x in items)
            if amount > 1000:
                claimers.append((suffix.decode(), amount))
    for k, v in contract_state(lp):
        ns, suffix = u.nskey(k)
        if ns == "balance" and suffix:
            address, amount = suffix.decode(), u.jint(v)
            if address not in (stake, pair) and amount > 1000 and ADDR_RE.fullmatch(suffix):
                direct.append((address, amount))
    # Larger positions are much more likely to belong to accounts that have
    # previously signed a transaction and therefore expose a public key.
    active.sort(key=lambda row: row[1], reverse=True)
    claimers.sort(key=lambda row: row[1], reverse=True)
    direct.sort(key=lambda row: row[1], reverse=True)
    claimer_addresses = {item[0] for item in claimers}
    unbond_sender = candidate_with_pubkey([row[0] for row in active])
    claim_sender = candidate_with_pubkey([row[0] for row in claimers])
    withdraw_sender = candidate_with_pubkey([row[0] for row in direct])
    no_claim_sender = candidate_with_pubkey([row[0] for row in active if row[0] not in claimer_addresses])
    periods = smart(stake, {"all_staked": {"address": unbond_sender}}).get("stakes", [])
    selected = next(x for x in periods if int(x.get("stake") or 0) > 0)
    direct_amount = next(amount for address, amount in direct if address == withdraw_sender)
    return {
        "unbond": (unbond_sender, int(selected["unbonding_period"]), int(selected["stake"])),
        "claim": claim_sender,
        "withdraw": (withdraw_sender, direct_amount),
        "no_claim": no_claim_sender,
    }


def withdraw_message(pool, amount):
    hook = base64.b64encode(json.dumps({"withdraw_liquidity": {"assets": []}}, separators=(",", ":")).encode()).decode()
    return {"send": {"contract": pool["pair"]["address"], "amount": str(amount), "msg": hook}}


def main():
    registry = json.loads(REGISTRY.read_text(encoding="utf-8"))
    pools = registry.get("pools", [])
    if registry.get("status") != "VALIDATED_FOR_READ_ONLY_FRONTEND" or len(pools) != 8:
        raise RuntimeError("validated Top-8 registry required")
    memo = "netareborn.com/wynd-recovery:simulation"
    results = []
    pool_candidates = {}
    for pool in pools:
        print(f"SIMULATING {pool['rank']}/8 {pool['name']}", flush=True)
        c = candidates(pool)
        pool_candidates[pool["pair"]["address"]] = c
        unbond_sender, period, _ = c["unbond"]
        withdraw_sender, direct_amount = c["withdraw"]
        tests = [
            ("unbond", unbond_sender, pool["stake"]["address"], {"unbond": {"tokens": "1", "unbonding_period": period}}),
            ("claim", c["claim"], pool["stake"]["address"], {"claim": {}}),
            ("withdraw", withdraw_sender, pool["lp_token"]["address"], withdraw_message(pool, min(direct_amount, 1_000_000))),
        ]
        for action, sender, contract, message in tests:
            response = simulate(sender, contract, message, memo)
            results.append({
                "rank": pool["rank"], "pool": pool["name"], "action": action,
                "sender_context": sender, "contract": contract,
                "message": message, "gas_info": response.get("gas_info"),
                "result_present": response.get("result") is not None,
                "unsigned": True, "broadcast": False,
            })
            print(f"  {action.upper()} OK", flush=True)
    representative = pools[0]
    c = pool_candidates[representative["pair"]["address"]]
    unbond_sender, period, active_amount = c["unbond"]
    withdraw_sender, direct_amount = c["withdraw"]
    rejection_tests = [
        ("unbond_invalid_period", unbond_sender, representative["stake"]["address"], {"unbond": {"tokens": "1", "unbonding_period": 1}}),
        ("unbond_exceeds_position", unbond_sender, representative["stake"]["address"], {"unbond": {"tokens": str(active_amount + 1), "unbonding_period": period}}),
        ("claim_without_position", c["no_claim"], representative["stake"]["address"], {"claim": {}}),
        ("withdraw_exceeds_balance", withdraw_sender, representative["lp_token"]["address"], withdraw_message(representative, direct_amount + 1)),
        ("claim_wrong_contract", c["claim"], representative["pair"]["address"], {"claim": {}}),
    ]
    rejections = []
    print("SIMULATING REPRESENTATIVE REJECTION PATHS", flush=True)
    for case, sender, contract, message in rejection_tests:
        error = simulate_rejection(sender, contract, message, memo)
        rejections.append({"case": case, "contract": contract, "message": message, "rejected": True, "error": error, "unsigned": True, "broadcast": False})
        print(f"  {case.upper()} REJECTED AS EXPECTED", flush=True)
    expected = len(pools) * 3
    out = {
        "schema_version": 3, "status": "VALIDATED" if len(results) == expected and len(rejections) == 5 else "WORKING",
        "network": "juno-1", "scope": "Unbond, Claim and Withdraw for every allowlisted Top-8 recovery pool plus representative rejection paths",
        "pool_count": len(pools), "simulation_count": len(results),
        "action_counts": {action: sum(x["action"] == action for x in results) for action in ("unbond", "claim", "withdraw")},
        "rejection_count": len(rejections), "rejections": rejections,
        "unsigned": True, "broadcast": False, "memo": memo, "tests": results,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps(out, indent=2))


if __name__ == "__main__":
    main()
