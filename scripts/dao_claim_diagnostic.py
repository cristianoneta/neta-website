#!/usr/bin/env python3
"""Classify NETA DAO claims as still locked or already claimable."""
from __future__ import annotations
import base64
import binascii
import csv
import json
import re
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
import requests
import update_neta_data as u

_original_b64decode = base64.b64decode
_HEX_RE = re.compile(r"^[0-9a-fA-F]+$")

def compatible_b64decode(value, *args, **kwargs):
    if isinstance(value, str):
        if len(value) >= 2 and len(value) % 2 == 0 and _HEX_RE.fullmatch(value):
            return bytes.fromhex(value)
        value += "=" * (-len(value) % 4)
    return _original_b64decode(value, *args, **kwargs)

base64.b64decode = compatible_b64decode

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

    out_dir = Path("docs/diagnostics")
    out_dir.mkdir(parents=True, exist_ok=True)
    with (out_dir / "dao_claims_detail.csv").open("w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["wallet", "claim_neta", "freigegeben_seit_utc", "status"])
        for x in releases:
            w.writerow([x["owner"], f'{x["amount_raw"]/1_000_000:.6f}', (x["release"] or {}).get("iso", ""), x["status"]])

    by_wallet = {}
    for x in releases:
        row = by_wallet.setdefault(x["owner"], {"amount_raw": 0, "first": None, "last": None, "claims": 0})
        row["amount_raw"] += x["amount_raw"]
        row["claims"] += 1
        iso = (x["release"] or {}).get("iso")
        if iso:
            row["first"] = iso if row["first"] is None or iso < row["first"] else row["first"]
            row["last"] = iso if row["last"] is None or iso > row["last"] else row["last"]
    with (out_dir / "dao_claims_by_wallet.csv").open("w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["wallet", "claimable_neta", "anzahl_claims", "erster_claim_frei_seit_utc", "letzter_claim_frei_seit_utc"])
        for owner, row in sorted(by_wallet.items(), key=lambda kv: (-kv[1]["amount_raw"], kv[0])):
            w.writerow([owner, f'{row["amount_raw"]/1_000_000:.6f}', row["claims"], row["first"] or "", row["last"] or ""])
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
        "all_releases": releases,
        "raw_samples": raw_samples,
    }
    print(json.dumps(out, indent=2, sort_keys=True))

if __name__ == "__main__":
    main()
