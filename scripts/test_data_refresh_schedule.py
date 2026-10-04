#!/usr/bin/env python3
"""Deterministic tests for centralized production refresh cadence."""

from datetime import datetime, timedelta
import json
from pathlib import Path
from tempfile import TemporaryDirectory
from zoneinfo import ZoneInfo

from data_refresh_schedule import due_collectors

BERLIN = ZoneInfo("Europe/Berlin")


def at(hour: int) -> datetime:
    return datetime(2026, 9, 16, hour, 7, tzinfo=BERLIN)


def test_non_schedule_runs_everything() -> None:
    assert all(due_collectors("workflow_dispatch", at(1)).values())
    assert all(due_collectors("push", at(1)).values())
    assert all(due_collectors("pull_request", at(1)).values())


def test_hourly_collectors() -> None:
    for hour in range(24):
        due = due_collectors("schedule", at(hour))
        assert due["map"]
        assert due["stats"]


def test_three_hour_ranking() -> None:
    for hour in range(24):
        assert due_collectors("schedule", at(hour))["neta"] == (hour % 3 == 0)


def test_six_hour_market() -> None:
    for hour in range(24):
        assert due_collectors("schedule", at(hour))["market"] == (hour % 6 == 3)


def test_delayed_runs_catch_up_from_published_data() -> None:
    with TemporaryDirectory() as directory:
        root = Path(directory)
        (root / "data/recovery").mkdir(parents=True)
        def snapshots(ranking, market):
            (root / "metadata.json").write_text(json.dumps({"generated_at": ranking}))
            (root / "data/recovery/wynd-market.json").write_text(json.dumps({"updated_at": market}))

        # Actual incident: delayed 04:33/07:16 Berlin runs skipped both collectors.
        for instant in ["2026-10-04T02:33:21Z", "2026-10-04T05:16:04Z"]:
            snapshots("2026-10-03T13:42:48.998596Z", "2026-10-03T13:42:52.870058Z")
            assert all(due_collectors("schedule", datetime.fromisoformat(instant), root).values())

        now = at(4)
        fresh = (now - timedelta(minutes=30)).isoformat()
        snapshots(fresh, fresh)
        due = due_collectors("schedule", now, root)
        assert not due["neta"] and not due["market"]
        snapshots((now - timedelta(hours=3)).isoformat(), fresh)
        due = due_collectors("schedule", now, root)
        assert due["neta"] and not due["market"]
        snapshots(fresh, (now - timedelta(hours=6)).isoformat())
        due = due_collectors("schedule", now, root)
        assert not due["neta"] and due["market"]

        for invalid in [None, 123, "bad date", "2026-10-04T04:00:00", (now + timedelta(hours=1)).isoformat()]:
            snapshots(invalid, invalid)
            assert all(due_collectors("schedule", now, root).values())
        (root / "metadata.json").unlink()
        (root / "data/recovery/wynd-market.json").write_text("{broken")
        assert all(due_collectors("schedule", now, root).values())

        # A DST change must not turn elapsed UTC hours into wall-clock hours.
        snapshots("2026-10-24T23:30:00Z", "2026-10-24T20:30:00Z")
        assert all(due_collectors("schedule", datetime.fromisoformat("2026-10-25T02:30:00Z"), root).values())


if __name__ == "__main__":
    test_non_schedule_runs_everything()
    test_hourly_collectors()
    test_three_hour_ranking()
    test_six_hour_market()
    test_delayed_runs_catch_up_from_published_data()
    print("data refresh cadence tests passed")
