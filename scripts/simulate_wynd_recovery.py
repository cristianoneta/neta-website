#!/usr/bin/env python3
"""Unsigned, non-broadcast Unbond and Claim simulations for all recovery pools."""
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
    errors = []
    for base in LCDS:
        try:
            r = requests.get(base + f"/cosmos/auth/v1beta1/accounts/{address}", timeout=12)
            r.raise_for_status()
            acc = find_base_account(r.json().get("account"))
            if not acc or not acc.get("pub_key"):
                raise RuntimeError("account has no published public key")
            return acc, base
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


def simulate(sender, contract, message, memo):
    raw, endpoint = tx_raw(sender, contract, message, memo)
    r = requests.post(endpoint + "/cosmos/tx/v1beta1/simulate", json={"tx_bytes": base64.b64encode(raw).decode()}, timeout=60)
    payload = r.json()
    if not r.ok:
        raise RuntimeError(json.dumps(payload, sort_keys=True))
    return payload


def candidate_with_pubkey(addresses):
    for address in addresses:
        try:
            account(address)
            return address
        except Exception:
            continue
    raise RuntimeError("no candidate with published public key")


def candidates(pool):
    stake = pool["stake"]["address"]
    active, claimers = [], []
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
    # Larger positions are much more likely to belong to accounts that have
    # previously signed a transaction and therefore expose a public key.
    active.sort(key=lambda row: row[1], reverse=True)
    claimers.sort(key=lambda row: row[1], reverse=True)
    unbond_sender = candidate_with_pubkey([row[0] for row in active])
    claim_sender = candidate_with_pubkey([row[0] for row in claimers])
    periods = smart(stake, {"all_staked": {"address": unbond_sender}}).get("stakes", [])
    period = next(int(x["unbonding_period"]) for x in periods if int(x.get("stake") or 0) > 0)
    return {"unbond": (unbond_sender, period), "claim": claim_sender}


def main():
    registry = json.loads(REGISTRY.read_text(encoding="utf-8"))
    pools = registry.get("pools", [])
    if registry.get("status") != "VALIDATED_FOR_READ_ONLY_FRONTEND" or len(pools) != 8:
        raise RuntimeError("validated Top-8 registry required")
    memo = "netareborn.com/wynd-recovery:simulation"
    results = []
    for pool in pools:
        print(f"SIMULATING {pool['rank']}/8 {pool['name']}", flush=True)
        c = candidates(pool)
        unbond_sender, period = c["unbond"]
        tests = [
            ("unbond", unbond_sender, {"unbond": {"tokens": "1", "unbonding_period": period}}),
            ("claim", c["claim"], {"claim": {}}),
        ]
        for action, sender, message in tests:
            response = simulate(sender, pool["stake"]["address"], message, memo)
            results.append({
                "rank": pool["rank"], "pool": pool["name"], "action": action,
                "sender_context": sender, "contract": pool["stake"]["address"],
                "message": message, "gas_info": response.get("gas_info"),
                "result_present": response.get("result") is not None,
                "unsigned": True, "broadcast": False,
            })
            print(f"  {action.upper()} OK", flush=True)
    expected = len(pools) * 2
    out = {
        "schema_version": 2, "status": "VALIDATED" if len(results) == expected else "WORKING",
        "network": "juno-1", "scope": "Unbond and Claim for every allowlisted Top-8 recovery pool",
        "pool_count": len(pools), "simulation_count": len(results),
        "action_counts": {"unbond": sum(x["action"] == "unbond" for x in results), "claim": sum(x["action"] == "claim" for x in results)},
        "unsigned": True, "broadcast": False, "memo": memo, "tests": results,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps(out, indent=2))


if __name__ == "__main__":
    main()
