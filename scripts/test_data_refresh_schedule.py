#!/usr/bin/env python3
"""Deterministic tests for centralized production refresh cadence."""

from datetime import datetime, timezone

from data_refresh_schedule import due_collectors


def at(hour: int) -> datetime:
    # September uses CEST, so Berlin local time is UTC + 2.
    return datetime(2026, 9, 16, hour - 2, 7, tzinfo=timezone.utc)


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


if __name__ == "__main__":
    test_non_schedule_runs_everything()
    test_hourly_collectors()
    test_three_hour_ranking()
    test_six_hour_market()
    print("data refresh cadence tests passed")
