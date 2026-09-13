#!/usr/bin/env python3
import json
from decimal import Decimal
from pathlib import Path

import update_wynd_recovery_leaderboard as board


assert board.validation.ADDR_RE.fullmatch(b"juno100d4eyphlr8tjdstpk8t3dtksf5k474e7jt90z")
raw = 25
supply = 100
pool_usd = Decimal("200")
assert Decimal(raw) * pool_usd / Decimal(supply) == Decimal("50")
snapshot=Path(__file__).resolve().parents[1]/"data/recovery/wynd-leaderboard.json"
if snapshot.exists():
    data=json.loads(snapshot.read_text())
    assert data["status"]=="VALIDATED"
    assert len(data["top_wallets"])==10
    totals=[Decimal(row["total_usd"]) for row in data["top_wallets"]]
    assert totals==sorted(totals,reverse=True)
    for row in data["top_wallets"]:
        assert board.validation.ADDR_RE.fullmatch(row["address"].encode())
        assert row["pool_count"]==len(row["pools"])
        assert abs(Decimal(row["total_usd"])-sum(Decimal(pool["usd_value"]) for pool in row["pools"]))<Decimal("0.02")
print("WYND recovery leaderboard tests passed")
