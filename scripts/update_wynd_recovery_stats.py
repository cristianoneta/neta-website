#!/usr/bin/env python3
"""Forward-only attribution of recovery actions created by the NETA Reborn UI."""
from __future__ import annotations

import argparse
import base64
import datetime as dt
import json
import re
from decimal import Decimal
from pathlib import Path

import requests

LCDS = ["https://juno-api.polkachu.com"]
MEMO = "netareborn.com/wynd-recovery:v1"
FINALITY = 5
TIMEOUT = 45
S = requests.Session()
S.headers.update({"User-Agent": "NETA-Reborn-WYND-Recovery/1.0"})
PRICE_ASSETS = {
    "native:ujuno": (6, "juno-network"),
    "native:ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9": (6, "cosmos"),
    "native:ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034": (6, "usd-coin"),
    "native:ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518": (6, "osmosis"),
}


def iso_now():
    return dt.datetime.now(dt.timezone.utc).isoformat().replace("+00:00", "Z")


def load(path, default):
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else default


def get(path, params=None):
    errors = []
    for base in LCDS:
        try:
            r = S.get(base + path, params=params, timeout=TIMEOUT)
            r.raise_for_status()
            return r.json(), base
        except Exception as exc:
            errors.append(f"{base}: {exc}")
    raise RuntimeError("; ".join(errors))


def smart(contract, msg):
    raw = base64.b64encode(json.dumps(msg, separators=(",", ":")).encode()).decode()
    data, _ = get(f"/cosmwasm/wasm/v1/contract/{contract}/smart/{raw}")
    return data.get("data", data)


def latest_height():
    data, endpoint = get("/cosmos/base/tendermint/v1beta1/blocks/latest")
    return int(data["block"]["header"]["height"]) - FINALITY, endpoint


def attrs(event):
    return {x.get("key"): x.get("value") for x in event.get("attributes") or []}


def query_txs(stake, start, end):
    expression = f"wasm._contract_address='{stake}' AND tx.height>{start} AND tx.height<={end}"
    out, key = [], None
    for _ in range(100):
        params = {"query": expression, "pagination.limit": "100", "order_by": "ORDER_BY_ASC"}
        if key:
            params["pagination.key"] = key
        data, _ = get("/cosmos/tx/v1beta1/txs", params)
        txs, responses = data.get("txs") or [], data.get("tx_responses") or []
        if len(txs) != len(responses):
            raise RuntimeError("transaction/response count mismatch")
        out.extend(zip(txs, responses))
        key = (data.get("pagination") or {}).get("next_key")
        if not key:
            return out
    raise RuntimeError("transaction pagination limit exceeded")


def parse_tagged_actions(pool, rows):
    result = []
    for tx, response in rows:
        body = tx.get("body") or {}
        if body.get("memo") != MEMO or int(response.get("code") or 0) != 0:
            continue
        sender = next((m.get("sender") for m in body.get("messages") or [] if m.get("contract") == pool["stake"]["address"]), None)
        if not sender:
            continue
        for index, event in enumerate(response.get("events") or []):
            if event.get("type") != "wasm":
                continue
            a = attrs(event)
            if a.get("_contract_address") != pool["stake"]["address"]:
                continue
            action = a.get("action")
            if action == "unbond":
                raw = int(a.get("amount") or 0)
            elif action == "claim":
                match = re.match(r"^(\d+)\s+", a.get("tokens") or "")
                raw = int(match.group(1)) if match else 0
            else:
                continue
            if raw <= 0:
                raise RuntimeError(f"tagged {action} event lacks LP amount: {response.get('txhash')}")
            result.append({
                "id": f"juno:{response['txhash']}:{action}:{index}",
                "txhash": response["txhash"],
                "height": int(response["height"]),
                "timestamp": response["timestamp"],
                "pair": pool["pair"]["address"],
                "stake": pool["stake"]["address"],
                "wallet": sender,
                "action": action,
                "lp_raw": raw,
                "memo": MEMO,
            })
    return result


def fetch_prices():
    ids = sorted({x[1] for x in PRICE_ASSETS.values()})
    r = S.get("https://api.coingecko.com/api/v3/simple/price", params={"ids": ",".join(ids), "vs_currencies": "usd"}, timeout=TIMEOUT)
    r.raise_for_status()
    data = r.json()
    return {key: Decimal(str(data[key]["usd"])) for key in ids}, "CoinGecko simple/price", iso_now()


def value_lp(pool, raw_lp, prices):
    live = smart(pool["pair"]["address"], {"pool": {}})
    total = int(live["total_share"])
    if total <= 0 or raw_lp > total:
        raise RuntimeError("invalid LP share valuation inputs")
    assets_by_key = {json.dumps(a["info"], sort_keys=True): a for a in pool["assets"]}
    anchors = []
    for asset in live["assets"]:
        configured = assets_by_key.get(json.dumps(asset["info"], sort_keys=True))
        if not configured:
            raise RuntimeError("live pool asset not present in allowlist")
        price_info = PRICE_ASSETS.get(configured["key"])
        if not price_info:
            continue
        decimals, coin_id = price_info
        reserve = Decimal(str(asset["amount"])) / (Decimal(10) ** decimals)
        anchors.append(reserve * prices[coin_id] * Decimal(raw_lp) / Decimal(total))
    if len(anchors) == len(live["assets"]):
        return sum(anchors, Decimal(0)), "sum_of_both_external_price_anchors"
    if len(anchors) == 1:
        return anchors[0] * 2, "two_times_single_external_price_anchor"
    raise RuntimeError("pool has no external USD price anchor")


def aggregate(registry, events, state, source, price_time):
    rows = {}
    for pool in registry["pools"]:
        pair = pool["pair"]["address"]
        relevant = [e for e in events if e["pair"] == pair]
        rows[pair] = {
            "name": pool["name"],
            "unstaked_usd": round(sum(float(e["usd_value"]) for e in relevant if e["action"] == "unbond"), 2),
            "claimed_usd": round(sum(float(e["usd_value"]) for e in relevant if e["action"] == "claim"), 2),
            "unbond_transactions": len({e["txhash"] for e in relevant if e["action"] == "unbond"}),
            "claim_transactions": len({e["txhash"] for e in relevant if e["action"] == "claim"}),
        }
    return {
        "schema_version": 1,
        "status": "COLLECTING",
        "memo_tag": MEMO,
        "collection_started_at": state["collection_started_at"],
        "updated_at": iso_now(),
        "juno_last_height": state["juno_last_height"],
        "price_source": source,
        "price_timestamp": price_time,
        "valuation_policy": "LP share of live pool reserves valued at the first successful collector run after confirmation; source and timestamp retained per event.",
        "double_count_notice": "Unstaked and Claimed are separate milestones and must not be added as unique recovered value.",
        "pools": rows,
        "validation": {"event_ids_unique": len(events) == len({e["id"] for e in events}), "allowlisted_pairs_only": all(e["pair"] in rows for e in events)},
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    root = Path(args.root)
    registry = load(root / "data/recovery/wynd-pools.json", {})
    if registry.get("status") != "VALIDATED_FOR_READ_ONLY_FRONTEND" or len(registry.get("pools", [])) != 8:
        raise RuntimeError("validated Top-8 registry required")
    if args.dry_run:
        print(json.dumps({"status": "VALID", "pool_count": 8, "memo": MEMO}))
        return
    stats_path = root / "data/recovery/recovery-stats.json"
    events_path = root / "data/recovery/recovery-events.json"
    stats = load(stats_path, {})
    state = {"collection_started_at": stats.get("collection_started_at"), "juno_last_height": stats.get("juno_last_height")}
    latest, endpoint = latest_height()
    existing = load(events_path, {"events": []}).get("events", [])
    new = []
    if state["juno_last_height"] is None:
        state = {"collection_started_at": iso_now(), "juno_last_height": latest}
    else:
        start = int(state["juno_last_height"])
        if latest < start:
            raise RuntimeError("Juno height moved backwards")
        for pool in registry["pools"]:
            new.extend(parse_tagged_actions(pool, query_txs(pool["stake"]["address"], start, latest)))
        state["juno_last_height"] = latest
    merged = {e["id"]: e for e in existing}
    new_unique = [event for event in new if event["id"] not in merged]
    if new_unique:
        prices, source, price_time = fetch_prices()
        by_pair = {p["pair"]["address"]: p for p in registry["pools"]}
        for event in new_unique:
            usd, method = value_lp(by_pair[event["pair"]], event["lp_raw"], prices)
            event.update({"usd_value": str(usd.quantize(Decimal("0.000001"))), "valuation_method": method, "price_source": source, "price_timestamp": price_time, "valuation_locked": True})
            merged[event["id"]] = event
    else:
        source, price_time = stats.get("price_source"), stats.get("price_timestamp")
    events = sorted(merged.values(), key=lambda e: (e["height"], e["id"]))
    if len(events) != len({e["id"] for e in events}):
        raise RuntimeError("duplicate recovery event IDs")
    output = aggregate(registry, events, state, source, price_time)
    output["juno_endpoint"] = endpoint
    events_path.write_text(json.dumps({"schema_version": 1, "events": events}, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    stats_path.write_text(json.dumps(output, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({"status": output["status"], "last_height": latest, "new_tagged_events": len(new_unique), "total_events": len(events)}, indent=2))


if __name__ == "__main__":
    main()
