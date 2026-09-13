#!/usr/bin/env python3
import copy
import json
from datetime import datetime, timezone
from pathlib import Path

import validate_wynd_recovery_snapshots as snapshots


root = Path(__file__).resolve().parents[1]
load = lambda name: json.loads((root / "data/recovery" / name).read_text())
registry = load("wynd-pools.json")
market = load("wynd-market.json")
leaderboard = load("wynd-leaderboard.json")
now = datetime.fromisoformat(market["updated_at"].replace("Z", "+00:00"))
assert snapshots.validate(registry, market, leaderboard, now=now)["pool_count"] == 8

bad = copy.deepcopy(leaderboard)
bad["market_updated_at"] = "2000-01-01T00:00:00Z"
try:
    snapshots.validate(registry, market, bad, now=now)
    raise AssertionError("mismatched snapshots were accepted")
except RuntimeError as error:
    assert "not built" in str(error)

bad = copy.deepcopy(leaderboard)
bad["pools"][0]["attributed_lp_raw"] = str(int(bad["pools"][0]["total_share_raw"]) + 1)
try:
    snapshots.validate(registry, market, bad, now=now)
    raise AssertionError("over-attribution was accepted")
except RuntimeError as error:
    assert "conservation" in str(error)

print("WYND recovery atomic snapshot tests passed")
