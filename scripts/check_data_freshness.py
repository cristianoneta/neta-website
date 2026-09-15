#!/usr/bin/env python3
"""Fail closed when a production data worker has stopped publishing fresh data."""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


@dataclass(frozen=True)
class FreshnessTarget:
    name: str
    path: str
    field: str
    maximum_age_hours: float


TARGETS = (
    FreshnessTarget("economic ranking", "metadata.json", "generated_at", 8),
    FreshnessTarget("Map of NETA", "data/map/state.json", "updated_at", 8),
    FreshnessTarget("recovery statistics", "data/recovery/recovery-stats.json", "updated_at", 3),
    FreshnessTarget("recovery market", "data/recovery/wynd-market.json", "updated_at", 30),
)


def parse_utc(value: str) -> datetime:
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        raise ValueError("timestamp has no timezone")
    return parsed.astimezone(timezone.utc)


def inspect(root: Path, now: datetime) -> list[dict[str, object]]:
    if now.tzinfo is None:
        raise ValueError("current time has no timezone")
    results = []
    for target in TARGETS:
        path = root / target.path
        try:
            payload = json.loads(path.read_text(encoding="utf-8"))
            timestamp = parse_utc(payload[target.field])
            age_hours = (now.astimezone(timezone.utc) - timestamp).total_seconds() / 3600
            if age_hours < -0.25:
                raise ValueError("timestamp is in the future")
            fresh = age_hours <= target.maximum_age_hours
            results.append(
                {
                    "name": target.name,
                    "path": target.path,
                    "timestamp": timestamp.isoformat().replace("+00:00", "Z"),
                    "age_hours": round(age_hours, 2),
                    "maximum_age_hours": target.maximum_age_hours,
                    "fresh": fresh,
                    "error": None,
                }
            )
        except (OSError, KeyError, TypeError, ValueError, json.JSONDecodeError) as exc:
            results.append(
                {
                    "name": target.name,
                    "path": target.path,
                    "fresh": False,
                    "error": str(exc),
                }
            )
    return results


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--now", help="UTC ISO-8601 time override for deterministic checks")
    args = parser.parse_args()
    now = parse_utc(args.now) if args.now else datetime.now(timezone.utc)
    results = inspect(args.root.resolve(), now)
    print(json.dumps({"checked_at": now.isoformat(), "workers": results}, indent=2))
    return 0 if all(item["fresh"] for item in results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
