#!/usr/bin/env python3
"""Select production data collectors due for a workflow invocation."""

from __future__ import annotations

import argparse
from datetime import datetime
from zoneinfo import ZoneInfo

COLLECTORS = ("neta", "map", "market", "stats")
BERLIN = ZoneInfo("Europe/Berlin")


def due_collectors(event: str, now: datetime) -> dict[str, bool]:
    """Return collectors due for this event at the supplied instant."""
    if event != "schedule":
        return {name: True for name in COLLECTORS}
    local = now.astimezone(BERLIN)
    return {
        "neta": local.hour % 3 == 0,
        "map": True,
        "market": local.hour % 6 == 3,
        "stats": True,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--event", required=True)
    parser.add_argument("--now", help="ISO-8601 override for deterministic tests")
    parser.add_argument("--github-output")
    args = parser.parse_args()

    now = datetime.fromisoformat(args.now.replace("Z", "+00:00")) if args.now else datetime.now().astimezone()
    due = due_collectors(args.event, now)
    lines = [f"{name}={'true' if enabled else 'false'}" for name, enabled in due.items()]
    print("\n".join(lines))
    if args.github_output:
        with open(args.github_output, "a", encoding="utf-8") as handle:
            handle.write("\n".join(lines) + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
