#!/usr/bin/env python3
"""Regression checks for fail-closed cross-chain snapshot retries."""
from unittest.mock import patch

import run_neta_data


calls = []


def transient():
    calls.append(True)
    if len(calls) < 3:
        raise RuntimeError("bridge escrow 1.000000 != Osmosis 0.990000")
    return 0


with patch("run_neta_data.time.sleep") as sleep:
    assert run_neta_data.run_with_snapshot_retries(transient, delay_seconds=7) == 0
    assert len(calls) == 3
    assert sleep.call_count == 2
    sleep.assert_called_with(7)

with patch("run_neta_data.time.sleep") as sleep:
    try:
        run_neta_data.run_with_snapshot_retries(
            lambda: (_ for _ in ()).throw(RuntimeError("Pool 631 mismatch"))
        )
        raise AssertionError("non-snapshot error was retried")
    except RuntimeError as exc:
        assert str(exc) == "Pool 631 mismatch"
    sleep.assert_not_called()

with patch("run_neta_data.time.sleep") as sleep:
    try:
        run_neta_data.run_with_snapshot_retries(
            lambda: (_ for _ in ()).throw(
                RuntimeError("bridge escrow 1.000000 != Osmosis 0.990000")
            ),
            attempts=2,
        )
        raise AssertionError("persistent snapshot skew was accepted")
    except RuntimeError as exc:
        assert str(exc).startswith("bridge escrow ")
    assert sleep.call_count == 1

print("NETA snapshot retry checks passed")
