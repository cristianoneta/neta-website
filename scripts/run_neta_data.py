#!/usr/bin/env python3
"""Compatibility and runtime optimizations for the NETA on-chain indexer.

Juno CosmWasm state can expose keys as hex while other byte fields use
Base64. The wrapper also replaces the sequential 512-prefix Osmosis scan
with a bounded parallel version that preserves the fail-closed accounting.
"""
import base64
import re
from concurrent.futures import ThreadPoolExecutor, as_completed

_original_b64decode = base64.b64decode
_HEX_RE = re.compile(r"^[0-9a-fA-F]+$")


def _compatible_b64decode(value, *args, **kwargs):
    if isinstance(value, str):
        if len(value) >= 2 and len(value) % 2 == 0 and _HEX_RE.fullmatch(value):
            return bytes.fromhex(value)
        value = value + ("=" * (-len(value) % 4))
    elif isinstance(value, (bytes, bytearray)):
        raw = bytes(value)
        try:
            text = raw.decode("ascii")
        except UnicodeDecodeError:
            text = ""
        if text and len(text) % 2 == 0 and _HEX_RE.fullmatch(text):
            return bytes.fromhex(text)
        value = raw + (b"=" * (-len(raw) % 4))
    return _original_b64decode(value, *args, **kwargs)


base64.b64decode = _compatible_b64decode

import update_neta_data


def _parallel_scan_osmo():
    """Scan all 512 bank prefixes with bounded concurrency.

    Each prefix remains independently validated. Any failed prefix aborts the
    complete run exactly as before, so speed does not weaken correctness.
    """
    height, rpc = update_neta_data.latest_height()
    update_neta_data.log(
        f"Osmosis primary-state height {height:,} via {rpc}; 8 parallel workers"
    )

    holders = {}
    failures = []
    tasks = [(n, first) for n in (20, 32) for first in range(256)]
    completed = 0

    def fetch_one(n, first):
        pairs = update_neta_data.subspace(bytes([2, n, first]), height, rpc)
        local = {}
        for k, v in pairs:
            try:
                raw, denom = update_neta_data.bank_key(k)
            except Exception:
                continue
            if denom != update_neta_data.DENOM:
                continue
            amt = update_neta_data.bank_amount(v)
            if amt > 0:
                addr = update_neta_data.b32enc("osmo", raw)
                local[addr] = local.get(addr, 0) + amt
        return local

    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {
            pool.submit(fetch_one, n, first): (n, first)
            for n, first in tasks
        }
        for future in as_completed(futures):
            n, first = futures[future]
            completed += 1
            try:
                local = future.result()
                for addr, amt in local.items():
                    holders[addr] = holders.get(addr, 0) + amt
            except Exception as exc:
                failures.append((n, first, str(exc)))

            if completed % 32 == 0 or completed == 512:
                update_neta_data.log(
                    f"Osmosis scan progress: {completed}/512 ({completed / 512:.0%})"
                )

    if failures:
        sample = "; ".join(
            f"{n}/{first:02x}: {err}" for n, first, err in failures[:5]
        )
        raise RuntimeError(
            f"Osmosis incomplete: {len(failures)} of 512 scans failed. {sample}"
        )
    if not holders:
        raise RuntimeError("Osmosis scan returned zero holders")

    update_neta_data.log(
        f"Osmosis: {len(holders):,} holders / "
        f"{sum(holders.values()) / 1e6:,.6f} NETA"
    )
    return holders, height, rpc


update_neta_data.scan_osmo = _parallel_scan_osmo

raise SystemExit(update_neta_data.main())
