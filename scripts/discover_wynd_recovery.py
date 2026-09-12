#!/usr/bin/env python3
"""Read-only discovery of live WYND DEX pairs for the recovery project."""
from __future__ import annotations

import base64
import json
from datetime import datetime, timezone
from pathlib import Path

import requests

LCDS = ["https://juno-api.polkachu.com", "https://juno-api.lavenderfive.com"]
REFERENCE_PAIR = "juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
OUT = Path("docs/diagnostics/wynd_recovery_discovery.json")


def get(path, params=None):
    errors = []
    for base in LCDS:
        try:
            r = requests.get(base + path, params=params, timeout=45)
            r.raise_for_status()
            return r.json(), base
        except Exception as exc:
            errors.append(f"{base}: {exc}")
    raise RuntimeError("; ".join(errors))


def smart(contract, msg):
    raw = json.dumps(msg, separators=(",", ":")).encode()
    query = base64.b64encode(raw).decode()
    data, base = get(f"/cosmwasm/wasm/v1/contract/{contract}/smart/{query}")
    return data.get("data", data), base


def contract_info(contract):
    data, _ = get(f"/cosmwasm/wasm/v1/contract/{contract}")
    return data.get("contract_info", data)


def token_info(contract):
    try:
        info, _ = smart(contract, {"token_info": {}})
        return {"symbol": info.get("symbol"), "name": info.get("name"), "decimals": info.get("decimals")}
    except Exception as exc:
        return {"error": str(exc)}


def native_meta(denom):
    try:
        data, _ = get(f"/cosmos/bank/v1beta1/denoms_metadata/{denom}")
        meta = data.get("metadata", {})
        units = meta.get("denom_units") or []
        display = meta.get("display") or denom
        exponent = next((u.get("exponent", 0) for u in units if u.get("denom") == display), 0)
        return {"symbol": meta.get("symbol") or display, "name": meta.get("name"), "display": display, "decimals": exponent}
    except Exception as exc:
        return {"symbol": denom, "decimals": None, "error": str(exc)}


def asset_key(info):
    if "token" in info:
        return "cw20:" + info["token"]["contract_addr"]
    return "native:" + info["native"]["denom"]


def asset_meta(info, cache):
    key = asset_key(info)
    if key not in cache:
        cache[key] = token_info(info["token"]["contract_addr"]) if "token" in info else native_meta(info["native"]["denom"])
    return cache[key]


def enumerate_pairs(factory):
    rows = []
    start = None
    seen = set()
    while True:
        query = {"pairs": {"start_after": start, "limit": 30}}
        page, _ = smart(factory, query)
        pairs = page.get("pairs", [])
        if not pairs:
            break
        for pair in pairs:
            addr = str(pair.get("contract_addr"))
            if not addr or addr in seen:
                raise RuntimeError("duplicate or missing pair address during pagination")
            seen.add(addr)
            rows.append(pair)
        if len(pairs) < 30:
            break
        start = pairs[-1]["asset_infos"]
    return rows


def main():
    latest, lcd = get("/cosmos/base/tendermint/v1beta1/blocks/latest")
    header = latest.get("block", {}).get("header", {})
    ref_info = contract_info(REFERENCE_PAIR)
    factory = ref_info.get("creator")
    if not factory:
        raise RuntimeError("reference pair creator/factory missing")

    pairs = enumerate_pairs(factory)
    if not any(str(p.get("contract_addr")) == REFERENCE_PAIR for p in pairs):
        raise RuntimeError("reference pair absent from discovered factory pair set")

    meta_cache = {}
    output = []
    failures = []
    for pair in pairs:
        addr = str(pair["contract_addr"])
        try:
            live_pair, _ = smart(addr, {"pair": {}})
            pool, _ = smart(addr, {"pool": {}})
            lp = str(live_pair["liquidity_token"])
            stake = str(live_pair["staking_addr"])
            lp_info = token_info(lp)
            lp_supply = int(pool["total_share"])
            stake_balance, _ = smart(lp, {"balance": {"address": stake}})
            stake_custody = int(stake_balance["balance"])
            assets = []
            for asset in pool["assets"]:
                info = asset["info"]
                assets.append({
                    "key": asset_key(info),
                    "info": info,
                    "amount_raw": str(asset["amount"]),
                    "metadata": asset_meta(info, meta_cache),
                })
            output.append({
                "pair": addr,
                "pair_code_id": contract_info(addr).get("code_id"),
                "pair_type": live_pair.get("pair_type"),
                "lp_token": lp,
                "lp_code_id": contract_info(lp).get("code_id"),
                "lp_decimals": lp_info.get("decimals"),
                "lp_total_supply_raw": str(lp_supply),
                "stake": stake,
                "stake_code_id": contract_info(stake).get("code_id"),
                "stake_custody_lp_raw": str(stake_custody),
                "direct_lp_raw": str(lp_supply - stake_custody),
                "assets": assets,
            })
        except Exception as exc:
            failures.append({"pair": addr, "error": str(exc)})

    result = {
        "status": "VALIDATED" if not failures else "WORKING",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "juno_height": header.get("height"),
        "juno_block_time": header.get("time"),
        "lcd": lcd,
        "reference_pair": REFERENCE_PAIR,
        "reference_pair_creator": factory,
        "factory": factory,
        "factory_code_id": contract_info(factory).get("code_id"),
        "pair_count": len(pairs),
        "complete_pair_count": len(output),
        "failures": failures,
        "assets": meta_cache,
        "pairs": output,
        "validation": {
            "reference_pair_present": True,
            "factory_derived_from_reference_creator": True,
            "all_pairs_queried": not failures and len(output) == len(pairs),
        },
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({k: result[k] for k in ("status", "juno_height", "factory", "pair_count", "complete_pair_count", "failures")}, indent=2))
    if failures:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
