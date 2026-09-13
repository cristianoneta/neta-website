#!/usr/bin/env python3
"""Read-only discovery of live WYND DEX pairs for the recovery project."""
from __future__ import annotations

import json
from datetime import datetime, timezone
from decimal import Decimal
from pathlib import Path

from neta_core import CosmosClient, fetch_coingecko_prices

LCDS = ["https://juno-api.polkachu.com", "https://juno-api.lavenderfive.com"]
CLIENT = CosmosClient(LCDS, user_agent="NETA-Reborn-WYND-Discovery/1.0")
REFERENCE_PAIR = "juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
OUT = Path("docs/diagnostics/wynd_recovery_discovery.json")

# Explicit registry for the assets that can anchor a USD valuation. Denom hashes
# are persisted in the discovery output; no symbol-only matching is used.
PRICE_ASSETS = {
    "native:ujuno": (6, "juno-network"),
    "native:ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9": (6, "cosmos"),
    "native:ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034": (6, "usd-coin"),
    "native:ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518": (6, "osmosis"),
    "native:ibc/F6B367385300865F654E110976B838502504231705BAC0849B0651C226385885": (6, "stargaze"),
    "native:ibc/281FEE887CDF71EB9C1FEFC554822DCB06BE4E8A8BFF944ED64E3D03437E9384": (6, "mars-protocol"),
    "native:ibc/95A45A81521EAFDBEDAEEB6DA975C02E55B414C95AD3CE50709272366A90CA17": (18, "weth"),
}


def get(path, params=None):
    return CLIENT.get(path, params)


def smart(contract, msg):
    return CLIENT.smart(contract, msg)


def contract_info(contract):
    data, _ = CLIENT.contract_info(contract)
    return data


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


def fetch_prices():
    return fetch_coingecko_prices(coin_id for _, coin_id in PRICE_ASSETS.values())


def asset_key(info):
    if "token" in info:
        value = info["token"]
        return "cw20:" + (value if isinstance(value, str) else value["contract_addr"])
    value = info["native"]
    return "native:" + (value if isinstance(value, str) else value["denom"])


def asset_meta(info, cache):
    key = asset_key(info)
    if key not in cache:
        cache[key] = token_info(key[5:]) if key.startswith("cw20:") else native_meta(key[7:])
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
    prices, price_source, price_time = fetch_prices()
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
                key = asset_key(info)
                metadata = asset_meta(info, meta_cache)
                price_entry = PRICE_ASSETS.get(key)
                decimals = price_entry[0] if price_entry else metadata.get("decimals")
                assets.append({
                    "key": key,
                    "info": info,
                    "amount_raw": str(asset["amount"]),
                    "metadata": metadata,
                    "resolved_decimals": decimals,
                    "coingecko_id": price_entry[1] if price_entry else None,
                    "usd_price": str(prices[price_entry[1]]) if price_entry else None,
                })
            valued = []
            for asset in assets:
                if asset["usd_price"] is None or asset["resolved_decimals"] is None:
                    continue
                qty = Decimal(asset["amount_raw"]) / (Decimal(10) ** int(asset["resolved_decimals"]))
                valued.append((asset["key"], qty * Decimal(asset["usd_price"])))
            if len(valued) == len(assets):
                pool_usd = sum((v for _, v in valued), Decimal(0))
                valuation_method = "sum_of_both_external_price_anchors"
                anchor_keys = [k for k, _ in valued]
            elif len(valued) == 1:
                pool_usd = valued[0][1] * 2
                valuation_method = "two_times_single_external_price_anchor"
                anchor_keys = [valued[0][0]]
            else:
                pool_usd = None
                valuation_method = "unpriced_no_external_anchor"
                anchor_keys = []
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
                "recoverable_pool_value_usd": str(pool_usd.quantize(Decimal("0.000001"))) if pool_usd is not None else None,
                "valuation_method": valuation_method,
                "valuation_anchor_asset_keys": anchor_keys,
            })
        except Exception as exc:
            failures.append({"pair": addr, "error": str(exc)})

    ranked = sorted((p for p in output if p["recoverable_pool_value_usd"] is not None), key=lambda p: Decimal(p["recoverable_pool_value_usd"]), reverse=True)
    for rank, pair in enumerate(ranked, 1):
        pair["usd_rank"] = rank
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
        "price_source": price_source,
        "price_timestamp": price_time,
        "prices_usd": {coin_id: str(price) for coin_id, price in sorted(prices.items())},
        "pair_count": len(pairs),
        "complete_pair_count": len(output),
        "failures": failures,
        "assets": meta_cache,
        "pairs": output,
        "top_five_pair_addresses": [p["pair"] for p in ranked[:5]],
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
