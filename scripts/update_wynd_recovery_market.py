#!/usr/bin/env python3
"""Create the daily live-reserve and USD-value snapshot for WYND Recovery."""
from __future__ import annotations

import argparse
import json
import re
import sys
import shared_observations as shared
from decimal import Decimal
from pathlib import Path

from update_wynd_recovery_stats import PRICE_ASSETS, fetch_prices, iso_now, load, smart


def build_pool(pool, prices, live=None):
    if live is None:
        live = smart(pool["pair"]["address"], {"pool": {}})
    configured = {json.dumps(asset["info"], sort_keys=True): asset for asset in pool["assets"]}
    keys = [json.dumps(a['info'], sort_keys=True) for a in live['assets']]
    if len(keys) != 2 or set(keys) != set(configured) or not re.fullmatch(r'[1-9][0-9]{0,38}',live['total_share']):
        raise ValueError('Pool reserves or LP supply mismatch')
    assets = []
    anchors = []
    for item in live["assets"]:
        asset = configured.get(json.dumps(item["info"], sort_keys=True))
        if not asset:
            raise RuntimeError(f"unallowlisted live asset in {pool['name']}")
        if not re.fullmatch(r'[1-9][0-9]{0,38}', item['amount']):
            raise ValueError('Invalid reserve amount')
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


def shared_market(registry):
    snapshot = shared.fetch('treasury/current.json')
    data = snapshot['wynd_market']
    expected = {p['pair']['address'] for p in registry['pools']}
    if (snapshot['chain_id'] != 'juno-1' or data['schema_version'] != 1 or data['chain_id'] != 'juno-1'
            or type(data['height']) is not int or data['height'] < 1 or data['height'] != snapshot['height']
            or not re.fullmatch('[0-9A-F]{64}', data['block_hash']) or set(data['pools']) != expected):
        raise ValueError('Incomplete shared WYND observation')
    shared.recent(data['block_time'], 35)
    shared.recent(data['price_observed_at'], 35)
    prices = {asset[1]: Decimal(data['prices_usd'][key.removeprefix('native:')]) for key,asset in PRICE_ASSETS.items()}
    if any(not price.is_finite() or price <= 0 for price in prices.values()):
        raise ValueError('Invalid shared USD price')
    pools = {}
    for pool in registry['pools']:
        address = pool['pair']['address']
        item = data['pools'][address]
        pair = item['pair']
        if (str(pool['pair']['code_id']) != item['code_id'] or pair['contract_addr'] != address
                or pair['liquidity_token'] != pool['lp_token']['address'] or pair['staking_addr'] != pool['stake']['address']
                or pair['pair_type'] != {'xyk': {}} or str(pair['fee_config']['total_fee_bps']) != '30'
                or len(pair['asset_infos']) != 2 or any(a['info'] not in pair['asset_infos'] for a in pool['assets'])):
            raise ValueError('Shared WYND pair identity mismatch')
        pools[address] = build_pool(pool, prices, item['reserves'])
    return {'updated_at': data['block_time'], 'price_source': data['price_source'], 'price_timestamp': data['price_observed_at'],
            'chain_id': 'juno-1', 'height': data['height'], 'block_hash': data['block_hash'],
            'reserve_source': 'cosmoot', 'pools': pools}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".")
    args = parser.parse_args()
    root = Path(args.root)
    registry = load(root / "data/recovery/wynd-pools.json", {})
    if registry.get("status") != "VALIDATED_FOR_READ_ONLY_FRONTEND" or len(registry.get("pools", [])) != 8:
        raise RuntimeError("validated Top-8 registry required")
    try:
        observation = shared_market(registry)
    except (OSError, KeyError, TypeError, ValueError, ArithmeticError) as error:
        print(f'Shared WYND snapshot unavailable ({error}); querying verified registry pools', file=sys.stderr)
        prices, source, price_time = fetch_prices()
        pools = {pool["pair"]["address"]: build_pool(pool, prices) for pool in registry["pools"]}
        observation = {'updated_at': iso_now(), 'price_source': source, 'price_timestamp': price_time,
                       'reserve_source': 'direct-lcd', 'pools': pools}
    output = {"schema_version": 1, "status": "LIVE_DAILY", **observation,
              "update_policy": "Refresh at least once per UTC day. Historical recovery events keep their recorded values."}
    target = root / "data/recovery/wynd-market.json"
    target.write_text(json.dumps(output, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({"status": output["status"], "pool_count": len(output["pools"]), "updated_at": output["updated_at"]}))


if __name__ == "__main__":
    main()
