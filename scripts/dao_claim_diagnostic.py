#!/usr/bin/env python3
"""Classify NETA DAO claims as still locked or already claimable."""
from __future__ import annotations
import json
from collections import defaultdict
from datetime import datetime, timezone
import requests
import update_neta_data as u

def release_status(release_at, now_ns, height):
    if not isinstance(release_at, dict) or len(release_at) != 1:
        return "unknown", None
    kind, raw = next(iter(release_at.items()))
    try:
        value = int(raw)
    except (TypeError, ValueError):
        return "unknown", {"kind": kind, "raw": raw}
    if kind == "at_time":
        return ("claimable" if value <= now_ns else "locked"), {
            "kind": kind,
            "value": value,
            "iso": datetime.fromtimestamp(value / 1_000_000_000, tz=timezone.utc).isoformat(),
        }
    if kind == "at_height":
        return ("claimable" if value <= height else "locked"), {"kind": kind, "value": value}
    return "unknown", {"kind": kind, "value": value}

def main():
    block, endpoint = u.req_json(u.JUNO, "/cosmos/base/tendermint/v1beta1/blocks/latest")
    header = block["block"]["header"]
    height = int(header["height"])
    now = datetime.fromisoformat(header["time"].replace("Z", "+00:00"))
    now_ns = int(now.timestamp() * 1_000_000_000)

    totals = defaultdict(int)
    records = defaultdict(int)
    wallets = defaultdict(set)
    releases = []
    raw_samples = []
    for key, value in u.contract_state(u.DAO):
        ns, suffix = u.nskey(key)
        if ns != "claims" or not suffix:
            continue
        owner = suffix.decode()
        obj = u.jval(value)
        items = obj if isinstance(obj, list) else obj.get("claims", obj.get("items", []))
        if not isinstance(items, list):
            raise RuntimeError(f"Unexpected claims object for {owner}: {obj!r}")
        for item in items:
            if not isinstance(item, dict):
                continue
            amount = int(item.get("amount", 0))
            status, release = release_status(item.get("release_at"), now_ns, height)
            totals[status] += amount
            records[status] += 1
            wallets[status].add(owner)
            releases.append({"owner": owner, "amount_raw": amount, "status": status, "release": release})
            if len(raw_samples) < 10:
                raw_samples.append({"owner": owner, "item": item})

    releases.sort(key=lambda x: (
        (x["release"] or {}).get("value", 2**127),
        x["owner"],
    ))
    out = {
        "snapshot": {"height": height, "time": now.isoformat(), "endpoint": endpoint},
        "totals_raw": dict(totals),
        "totals_neta": {k: round(v / 1_000_000, 6) for k, v in totals.items()},
        "records": dict(records),
        "wallets": {k: len(v) for k, v in wallets.items()},
        "all_claims_raw": sum(totals.values()),
        "all_claims_neta": round(sum(totals.values()) / 1_000_000, 6),
        "earliest_releases": releases[:20],
        "latest_releases": releases[-20:],
        "raw_samples": raw_samples,
    }
    print(json.dumps(out, indent=2, sort_keys=True))

if __name__ == "__main__":
    main()
