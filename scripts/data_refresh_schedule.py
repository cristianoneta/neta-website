#!/usr/bin/env python3
"""Select production data collectors due for a workflow invocation."""

from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from check_data_freshness import parse_utc

COLLECTORS = ("neta", "map", "market", "stats")
BERLIN = ZoneInfo("Europe/Berlin")
PERIODIC_SNAPSHOTS = {
    "neta": ("metadata.json", "generated_at", 3),
    "market": ("data/recovery/wynd-market.json", "updated_at", 6),
}


def due_collectors(event: str, now: datetime, root: Path | None = None) -> dict[str, bool]:
    """Keep calendar slots and catch up missed runs from published timestamps."""
    if now.tzinfo is None:
        raise ValueError("current time has no timezone")
    if event != "schedule":
        return {name: True for name in COLLECTORS}
    local = now.astimezone(BERLIN)
    due = {
        "neta": local.hour % 3 == 0,
        "map": True,
        "market": local.hour % 6 == 3,
        "stats": True,
    }
    if root is not None:
        for name, (path, field, interval_hours) in PERIODIC_SNAPSHOTS.items():
            try:
                payload = json.loads((root / path).read_text(encoding="utf-8"))
                age = (now - parse_utc(payload[field])).total_seconds() / 3600
                due[name] |= age >= interval_hours or age < -0.25
            except (OSError, KeyError, TypeError, ValueError, AttributeError):
                # Missing/corrupt data must be recollected, never timestamped fresh.
                due[name] = True
    return due


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--event", required=True)
    parser.add_argument("--now", help="ISO-8601 override for deterministic tests")
    parser.add_argument("--github-output")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()

    now = datetime.fromisoformat(args.now.replace("Z", "+00:00")) if args.now else datetime.now().astimezone()
    due = due_collectors(args.event, now, args.root.resolve())
    lines = [f"{name}={'true' if enabled else 'false'}" for name, enabled in due.items()]
    print("\n".join(lines))
    if args.github_output:
        with open(args.github_output, "a", encoding="utf-8") as handle:
            handle.write("\n".join(lines) + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
