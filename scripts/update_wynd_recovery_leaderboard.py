#!/usr/bin/env python3
"""Build the daily economic Top-10 across the validated WYND recovery pools."""
from __future__ import annotations

import argparse
import json
from collections import defaultdict
from datetime import datetime, timezone
from decimal import Decimal
from pathlib import Path

import update_neta_data as u
import validate_wynd_recovery as validation


def iso_now():
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def owners_for_pool(pool):
    lp = pool["lp_token"]["address"]
    stake = pool["stake"]["address"]
    direct = defaultdict(int)
    active = defaultdict(int)
    claims = defaultdict(int)

    for key, value in validation.contract_state(lp):
        namespace, suffix = u.nskey(key)
        if namespace == "balance" and suffix:
            owner = suffix.decode()
            amount = u.jint(value)
            if amount and owner != stake and validation.ADDR_RE.fullmatch(owner.encode()):
                direct[owner] += amount

    for key, value in validation.contract_state(stake):
        namespace, suffix = u.nskey(key)
        obj = validation.parse_json(value)
        if namespace == "stake":
            match = validation.ADDR_RE.search(suffix)
            if not match:
                continue
            owner = match.group(0).decode()
            amount = validation.amount_from_obj(obj)
            if amount is None:
                amount = u.jint(value)
            if isinstance(obj, dict) and isinstance(obj.get("locked_tokens"), list):
                amount = (amount or 0) + sum(int(item[1]) for item in obj["locked_tokens"] if isinstance(item, list) and len(item) > 1)
            active[owner] += amount or 0
        elif namespace == "claims" and suffix and validation.ADDR_RE.fullmatch(suffix):
            owner = suffix.decode()
            items = obj if isinstance(obj, list) else (obj.get("claims", []) if isinstance(obj, dict) else [])
            claims[owner] += sum(validation.amount_from_obj(item) or 0 for item in items)

    owners = {owner: direct[owner] + active[owner] + claims[owner] for owner in set(direct) | set(active) | set(claims)}
    return {owner: raw for owner, raw in owners.items() if raw > 0}


def build(root):
    registry = json.loads((root / "data/recovery/wynd-pools.json").read_text())
    market = json.loads((root / "data/recovery/wynd-market.json").read_text())
    wallets = defaultdict(list)
    pool_checks = []
    for pool in registry["pools"]:
        pair = pool["pair"]["address"]
        live = market["pools"][pair]
        supply = int(live["total_share_raw"])
        pool_value = Decimal(str(live["pool_value_usd"]))
        owners = owners_for_pool(pool)
        attributed = sum(owners.values())
        if attributed > supply:
            raise RuntimeError(f"{pair}: attributed LP exceeds total supply")
        for owner, raw in owners.items():
            usd = Decimal(raw) * pool_value / Decimal(supply)
            wallets[owner].append({"pair": pair, "name": pool["name"].replace("ujuno", "JUNO"), "lp_raw": str(raw), "usd_value": str(usd.quantize(Decimal("0.000001")))})
        pool_checks.append({"pair": pair, "economic_wallets": len(owners), "attributed_lp_raw": str(attributed), "total_share_raw": str(supply)})

    rows = []
    for address, pools in wallets.items():
        pools.sort(key=lambda row: Decimal(row["usd_value"]), reverse=True)
        total = sum((Decimal(row["usd_value"]) for row in pools), Decimal(0))
        rows.append({"address": address, "total_usd": str(total.quantize(Decimal("0.01"))), "pool_count": len(pools), "pools": pools})
    rows.sort(key=lambda row: (-Decimal(row["total_usd"]), row["address"]))
    top = rows[:10]
    for rank, row in enumerate(top, 1):
        row["rank"] = rank
    return {"schema_version": 1, "status": "VALIDATED", "updated_at": iso_now(), "market_updated_at": market["updated_at"], "scope": "Economic LP ownership across the validated Top-8 WYND recovery pools; direct LP, active stake and claims included.", "wallet_count": len(rows), "top_wallets": top, "validation": {"juno_addresses_only": True, "stake_custody_excluded": True, "pool_attribution_not_above_supply": True}, "pools": pool_checks}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".")
    args = parser.parse_args()
    root = Path(args.root)
    output = build(root)
    path = root / "data/recovery/wynd-leaderboard.json"
    path.write_text(json.dumps(output, indent=2, sort_keys=True) + "\n")
    print(json.dumps({"status": output["status"], "wallet_count": output["wallet_count"], "top_wallets": len(output["top_wallets"])}, indent=2))


if __name__ == "__main__":
    main()
