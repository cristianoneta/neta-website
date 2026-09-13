#!/usr/bin/env python3
"""Validate the market and leaderboard snapshots as one atomic publication unit."""
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from pathlib import Path

MAX_AGE = timedelta(hours=36)
MAX_CLOCK_SKEW = timedelta(minutes=5)
ADDR_RE = re.compile(rb"juno1[0-9a-z]{38}")


def timestamp(value):
    if not isinstance(value, str):
        raise RuntimeError("snapshot timestamp missing")
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        raise RuntimeError("snapshot timestamp must include a timezone")
    return parsed.astimezone(timezone.utc)


def validate(registry, market, leaderboard, now=None):
    now = now or datetime.now(timezone.utc)
    pools = registry.get("pools", [])
    pairs = [pool["pair"]["address"] for pool in pools]
    pair_set = set(pairs)
    if registry.get("status") != "VALIDATED_FOR_READ_ONLY_FRONTEND" or len(pairs) != 8 or len(pair_set) != 8:
        raise RuntimeError("validated unique Top-8 registry required")

    if market.get("status") != "LIVE_DAILY" or set(market.get("pools", {})) != pair_set:
        raise RuntimeError("market snapshot must contain the exact Top-8 pool set")
    updated = timestamp(market.get("updated_at"))
    if updated > now + MAX_CLOCK_SKEW or now - updated > MAX_AGE:
        raise RuntimeError("market snapshot is not fresh")
    for pair, pool in market["pools"].items():
        if pool.get("pair") != pair or int(pool.get("total_share_raw", 0)) <= 0:
            raise RuntimeError(f"{pair}: invalid market identity or LP supply")
        if Decimal(str(pool.get("pool_value_usd", "-1"))) < 0 or len(pool.get("assets", [])) != 2:
            raise RuntimeError(f"{pair}: invalid market valuation")

    rows = leaderboard.get("top_wallets", [])
    if leaderboard.get("status") != "VALIDATED" or len(rows) != 10:
        raise RuntimeError("validated Top-10 leaderboard required")
    if leaderboard.get("market_updated_at") != market.get("updated_at"):
        raise RuntimeError("leaderboard was not built from the published market snapshot")
    timestamp(leaderboard.get("updated_at"))
    if [row.get("rank") for row in rows] != list(range(1, 11)):
        raise RuntimeError("leaderboard ranks must be contiguous")
    totals = [Decimal(str(row["total_usd"])) for row in rows]
    if totals != sorted(totals, reverse=True):
        raise RuntimeError("leaderboard is not sorted by USD value")
    for row in rows:
        if not ADDR_RE.fullmatch(row.get("address", "").encode()):
            raise RuntimeError("leaderboard contains an invalid Juno address")
        positions = row.get("pools", [])
        position_pairs = [position.get("pair") for position in positions]
        if row.get("pool_count") != len(positions) or len(position_pairs) != len(set(position_pairs)):
            raise RuntimeError(f"{row['address']}: invalid pool count")
        if not set(position_pairs) <= pair_set:
            raise RuntimeError(f"{row['address']}: pool outside registry")
        position_total = sum((Decimal(str(position["usd_value"])) for position in positions), Decimal(0))
        if abs(Decimal(str(row["total_usd"])) - position_total) >= Decimal("0.02"):
            raise RuntimeError(f"{row['address']}: total does not match pool positions")

    checks = leaderboard.get("pools", [])
    if {check.get("pair") for check in checks} != pair_set or len(checks) != 8:
        raise RuntimeError("leaderboard validation must cover the exact Top-8 pool set")
    for check in checks:
        pair = check["pair"]
        attributed = int(check["attributed_lp_raw"])
        supply = int(check["total_share_raw"])
        if supply != int(market["pools"][pair]["total_share_raw"]) or not 0 <= attributed <= supply:
            raise RuntimeError(f"{pair}: invalid LP attribution conservation")

    return {"status": "VALIDATED", "pool_count": 8, "wallet_count": len(rows), "market_updated_at": market["updated_at"]}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".")
    args = parser.parse_args()
    root = Path(args.root)
    load = lambda name: json.loads((root / "data/recovery" / name).read_text())
    report = validate(load("wynd-pools.json"), load("wynd-market.json"), load("wynd-leaderboard.json"))
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
