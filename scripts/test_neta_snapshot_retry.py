"""A transient pool inconsistency retries without publishing a partial snapshot."""
from pathlib import Path
from unittest.mock import patch

import update_neta_data as indexer


def test_pool_snapshot_retry():
    with patch.object(indexer, "build", side_effect=[indexer.PoolSnapshotMismatch("height mismatch"), {"validation": {"passed": True}}]) as build, patch.object(indexer.time, "sleep") as sleep:
        assert indexer.build_with_pool_retry(Path("/tmp/unused")) == {"validation": {"passed": True}}
        assert build.call_count == 2
        sleep.assert_called_once_with(15)


def test_osmosis_supply_mismatch_retries_a_fresh_snapshot():
    with patch.object(indexer, "build", side_effect=[indexer.OsmosisSupplyMismatch("bank mismatch"), {"validation": {"passed": True}}]) as build, patch.object(indexer.time, "sleep"):
        assert indexer.build_with_pool_retry(Path("/tmp/unused"))["validation"]["passed"]
        assert build.call_count == 2


def test_pinned_bank_supply_check():
    with patch.object(indexer, "req_json", return_value=({"amount": {"denom": indexer.DENOM, "amount": "100"}}, "lcd")) as req:
        indexer.verify_osmosis_supply({"osmo1example": 100}, 42)
        try:
            indexer.verify_osmosis_supply({"osmo1example": 101}, 42)
        except indexer.OsmosisSupplyMismatch:
            pass
        else:
            raise AssertionError("bank supply mismatch must fail closed")
        assert req.call_args.kwargs["height"] == 42


def test_pool_snapshot_persistent_failure():
    with patch.object(indexer, "build", side_effect=indexer.PoolSnapshotMismatch("persistent mismatch")) as build, patch.object(indexer.time, "sleep") as sleep:
        try:
            indexer.build_with_pool_retry(Path("/tmp/unused"))
        except indexer.PoolSnapshotMismatch:
            pass
        else:
            raise AssertionError("An inconsistent snapshot must never be published")
        assert build.call_count == 3
        assert sleep.call_count == 2


if __name__ == "__main__":
    test_pool_snapshot_retry()
    test_osmosis_supply_mismatch_retries_a_fresh_snapshot()
    test_pinned_bank_supply_check()
    test_pool_snapshot_persistent_failure()
