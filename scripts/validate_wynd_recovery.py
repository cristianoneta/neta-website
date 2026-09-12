#!/usr/bin/env python3
"""Fail-closed ownership and message-shape validation for the top-eight WYND pools."""
from __future__ import annotations

import base64
import json
import re
import traceback
from datetime import datetime, timezone
from pathlib import Path

import requests
import update_neta_data as u

DISCOVERY = Path("docs/diagnostics/wynd_recovery_discovery.json")
OUT = Path("docs/diagnostics/wynd_recovery_validation.json")
ADDR_RE = re.compile(rb"juno1[0-9a-z]{38}")
HEX_RE = re.compile(r"^[0-9a-fA-F]+$")


def decode_blob(value):
    value = value.strip()
    if len(value) % 2 == 0 and HEX_RE.fullmatch(value):
        return bytes.fromhex(value)
    value += "=" * ((4 - len(value) % 4) % 4)
    return base64.b64decode(value, altchars=b"-_")


def contract_state(address):
    rows, key = [], None
    while True:
        params = {"pagination.limit": "5000"}
        if key:
            params["pagination.key"] = key
        data, _ = u.req_json(u.JUNO, f"/cosmwasm/wasm/v1/contract/{address}/state", params)
        rows.extend((decode_blob(x["key"]), decode_blob(x["value"])) for x in data.get("models", []))
        key = (data.get("pagination") or {}).get("next_key")
        if not key:
            return rows


def smart(contract, msg):
    query = base64.b64encode(json.dumps(msg, separators=(",", ":")).encode()).decode()
    data, _ = u.req_json(u.JUNO, f"/cosmwasm/wasm/v1/contract/{contract}/smart/{query}")
    return data.get("data", data)


def parse_json(raw):
    try:
        return json.loads(raw.decode())
    except Exception:
        return None


def amount_from_obj(obj):
    if isinstance(obj, int):
        return obj
    if isinstance(obj, str) and obj.isdigit():
        return int(obj)
    if isinstance(obj, dict):
        for key in ("amount", "balance", "stake", "staked", "value"):
            if key in obj:
                amount = amount_from_obj(obj[key])
                if amount is not None:
                    return amount
    return None


def contract_version(rows):
    for key, value in rows:
        if key == b"contract_info":
            return parse_json(value)
    return None


def release_status(release_at, height, block_nanos):
    if not isinstance(release_at, dict):
        return "unknown"
    if "at_height" in release_at:
        return "claimable" if int(release_at["at_height"]) <= height else "unbonding"
    if "at_time" in release_at:
        return "claimable" if int(release_at["at_time"]) <= block_nanos else "unbonding"
    if "never" in release_at:
        return "unbonding"
    return "unknown"


def validate_pool(pool, height, block_nanos):
    lp, stake, pair = pool["lp_token"], pool["stake"], pool["pair"]
    lp_rows = contract_state(lp)
    stake_rows = contract_state(stake)
    direct, token_info = {}, None
    for key, value in lp_rows:
        namespace, suffix = u.nskey(key)
        if namespace == "balance" and suffix:
            amount = u.jint(value)
            if amount:
                direct[suffix.decode()] = amount
        elif key == b"token_info" or namespace == "token_info":
            token_info = u.jval(value)
    if not token_info:
        raise RuntimeError(f"{lp}: token_info absent")
    supply = int(token_info["total_supply"])
    if sum(direct.values()) != supply:
        raise RuntimeError(f"{lp}: direct LP balances != total supply")
    custody = direct.get(stake, 0)

    active, claims = {}, {}
    claim_records = claimable_records = unbonding_records = unknown_release_records = 0
    for key, value in stake_rows:
        namespace, suffix = u.nskey(key)
        obj = parse_json(value)
        if namespace == "stake":
            match = ADDR_RE.search(suffix)
            if not match:
                raise RuntimeError(f"{stake}: stake owner missing")
            owner = match.group(0).decode()
            amount = amount_from_obj(obj)
            if amount is None:
                amount = u.jint(value)
            if isinstance(obj, dict) and isinstance(obj.get("locked_tokens"), list):
                amount = (amount or 0) + sum(int(item[1]) for item in obj["locked_tokens"] if isinstance(item, list) and len(item) > 1)
            if amount:
                active[owner] = active.get(owner, 0) + amount
        elif namespace == "claims" and suffix:
            owner = suffix.decode()
            items = obj if isinstance(obj, list) else (obj.get("claims", []) if isinstance(obj, dict) else [])
            amount = 0
            for item in items:
                amount += amount_from_obj(item) or 0
                claim_records += 1
                status = release_status(item.get("release_at") if isinstance(item, dict) else None, height, block_nanos)
                if status == "claimable":
                    claimable_records += 1
                elif status == "unbonding":
                    unbonding_records += 1
                else:
                    unknown_release_records += 1
            if amount:
                claims[owner] = claims.get(owner, 0) + amount
    active_raw, claims_raw = sum(active.values()), sum(claims.values())
    if active_raw + claims_raw != custody:
        raise RuntimeError(f"{stake}: active + claims != LP custody")
    if unknown_release_records:
        raise RuntimeError(f"{stake}: unknown claim release encoding")

    bonding = smart(stake, {"bonding_info": {}})
    total_staked = smart(stake, {"total_staked": {}})
    total_unbonding = smart(stake, {"total_unbonding": {}})
    try:
        unbond_all = {"supported": True, "response": smart(stake, {"unbond_all": {}})}
    except Exception as exc:
        # This query was added in a later stake contract version and is not
        # required for user position recovery.
        unbond_all = {"supported": False, "error": str(exc)}
    periods = [int(x["unbonding_period"]) for x in bonding.get("bonding", [])]
    if not periods:
        raise RuntimeError(f"{stake}: no unbonding periods")
    # These live queries prove the read shapes used by the recovery state machine.
    smart(pair, {"pair": {}})
    smart(pair, {"pool": {}})
    smart(pair, {"share": {"amount": "1"}})

    withdraw_hook = {"withdraw_liquidity": {"assets": []}}
    messages = {
        "unbond": {"unbond": {"tokens": "<raw_lp>", "unbonding_period": "<seconds>"}},
        "claim": {"claim": {}},
        "withdraw_liquidity_cw20_send": {
            "send": {
                "contract": pair,
                "amount": "<raw_lp>",
                "msg": base64.b64encode(json.dumps(withdraw_hook, separators=(",", ":")).encode()).decode(),
            }
        },
    }
    return {
        "pair": pair,
        "pair_code_id": pool["pair_code_id"],
        "pair_contract_version": contract_version(contract_state(pair)),
        "lp_token": lp,
        "lp_code_id": pool["lp_code_id"],
        "lp_contract_version": contract_version(lp_rows),
        "stake": stake,
        "stake_code_id": pool["stake_code_id"],
        "stake_contract_version": contract_version(stake_rows),
        "lp_total_supply_raw": str(supply),
        "stake_custody_lp_raw": str(custody),
        "active_stake_lp_raw": str(active_raw),
        "claims_lp_raw": str(claims_raw),
        "active_stake_wallets": len(active),
        "claim_wallets": len(claims),
        "claim_records": claim_records,
        "claimable_records": claimable_records,
        "unbonding_records": unbonding_records,
        "unbonding_periods_seconds": periods,
        "query_responses": {"total_staked": total_staked, "total_unbonding": total_unbonding, "unbond_all": unbond_all},
        "execute_message_templates": messages,
        "validation": {
            "direct_lp_equals_total_supply": True,
            "active_plus_claims_equals_stake_custody": True,
            "claim_release_shapes_known": True,
            "pair_query_shapes_live": True,
            "stake_query_shapes_live": True,
        },
    }


def main():
    discovery = json.loads(DISCOVERY.read_text(encoding="utf-8"))
    ranked = sorted(
        (p for p in discovery.get("pairs", []) if p.get("usd_rank") is not None),
        key=lambda p: int(p["usd_rank"]),
    )
    selected = ranked[:8]
    if discovery.get("status") != "VALIDATED" or len(selected) != 8:
        raise RuntimeError("validated top-eight discovery required")
    latest, _ = u.req_json(u.JUNO, "/cosmos/base/tendermint/v1beta1/blocks/latest")
    header = latest.get("block", {}).get("header", {})
    height = int(header["height"])
    stamp = header["time"].replace("Z", "+00:00")
    block_nanos = int(datetime.fromisoformat(stamp).timestamp() * 1_000_000_000)
    results = [validate_pool(pool, height, block_nanos) for pool in selected]
    for pool, validation in zip(selected, results):
        validation["rank"] = int(pool["usd_rank"])
        validation["assets"] = pool["assets"]
        validation["recoverable_pool_value_usd"] = pool["recoverable_pool_value_usd"]
        validation["valuation_method"] = pool["valuation_method"]
    code_sets = {
        "pair": sorted({str(p["pair_code_id"]) for p in results}),
        "lp": sorted({str(p["lp_code_id"]) for p in results}),
        "stake": sorted({str(p["stake_code_id"]) for p in results}),
    }
    result = {
        "status": "VALIDATED",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "juno_height": str(height),
        "juno_block_time": header["time"],
        "discovery_generated_at": discovery["generated_at"],
        "code_id_sets": code_sets,
        "selected_pool_count": 8,
        "all_top_eight_share_same_pair_and_stake_code": len(code_sets["pair"]) == 1 and len(code_sets["stake"]) == 1,
        "pools": results,
    }
    OUT.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({"status": result["status"], "height": result["juno_height"], "code_id_sets": code_sets, "pools": [{"pair": p["pair"], "active": p["active_stake_lp_raw"], "claims": p["claims_lp_raw"], "custody": p["stake_custody_lp_raw"]} for p in results]}, indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        OUT.parent.mkdir(parents=True, exist_ok=True)
        OUT.write_text(json.dumps({
            "status": "WORKING",
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "error": str(exc),
            "traceback": traceback.format_exc(),
        }, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        raise
