"""A transient pool inconsistency retries without publishing a partial snapshot."""
from pathlib import Path
from unittest.mock import patch

import update_neta_data as indexer


def test_pool_snapshot_retry():
    with patch.object(indexer, "build", side_effect=[indexer.PoolSnapshotMismatch("height mismatch"), {"validation": {"passed": True}}]) as build, patch.object(indexer.time, "sleep") as sleep:
        assert indexer.build_with_pool_retry(Path("/tmp/unused")) == {"validation": {"passed": True}}
        assert build.call_count == 2
        sleep.assert_called_once_with(15)


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
    test_pool_snapshot_persistent_failure()
