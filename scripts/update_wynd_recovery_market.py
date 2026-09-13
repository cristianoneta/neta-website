#!/usr/bin/env python3
"""Create the daily live-reserve and USD-value snapshot for WYND Recovery."""
from __future__ import annotations

import argparse
import json
from decimal import Decimal
from pathlib import Path

from update_wynd_recovery_stats import PRICE_ASSETS, fetch_prices, iso_now, load, smart


def build_pool(pool, prices):
    live = smart(pool["pair"]["address"], {"pool": {}})
    configured = {json.dumps(asset["info"], sort_keys=True): asset for asset in pool["assets"]}
    assets = []
    anchors = []
    for item in live["assets"]:
        asset = configured.get(json.dumps(item["info"], sort_keys=True))
        if not asset:
            raise RuntimeError(f"unallowlisted live asset in {pool['name']}")
        decimals = int(asset.get("decimals", 6))
        display = Decimal(str(item["amount"])) / (Decimal(10) ** decimals)
        price_info = PRICE_ASSETS.get(asset["key"])
        usd_price = None
        if price_info:
            usd_price = prices[price_info[1]]
            anchors.append(display * usd_price)
        symbol = asset["symbol"].upper()
        if symbol in {"UJUNO", "UATOM", "UOSMO", "UUSDC"}:
            symbol = symbol[1:]
        assets.append({
            "key": asset["key"], "symbol": symbol,
            "decimals": decimals, "raw": str(item["amount"]), "display": str(display),
            "usd_price": str(usd_price) if usd_price is not None else None,
        })
    if len(anchors) == len(assets):
        value, method = sum(anchors, Decimal(0)), "sum_of_both_external_price_anchors"
    elif len(anchors) == 1:
        value, method = anchors[0] * 2, "two_times_single_external_price_anchor"
    else:
        raise RuntimeError(f"no USD anchor for {pool['name']}")
    return {
        "name": pool["name"], "pair": pool["pair"]["address"],
        "total_share_raw": str(live["total_share"]), "assets": assets,
        "pool_value_usd": str(value.quantize(Decimal("0.000001"))),
        "valuation_method": method,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".")
    args = parser.parse_args()
    root = Path(args.root)
    registry = load(root / "data/recovery/wynd-pools.json", {})
    if registry.get("status") != "VALIDATED_FOR_READ_ONLY_FRONTEND" or len(registry.get("pools", [])) != 8:
        raise RuntimeError("validated Top-8 registry required")
    prices, source, price_time = fetch_prices()
    pools = {pool["pair"]["address"]: build_pool(pool, prices) for pool in registry["pools"]}
    output = {
        "schema_version": 1, "status": "LIVE_DAILY", "updated_at": iso_now(),
        "price_source": source, "price_timestamp": price_time,
        "update_policy": "Refresh at least once per UTC day; never used to revalue historical recovery events.",
        "pools": pools,
    }
    target = root / "data/recovery/wynd-market.json"
    target.write_text(json.dumps(output, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({"status": output["status"], "pool_count": len(pools), "updated_at": output["updated_at"]}))


if __name__ == "__main__":
    main()
