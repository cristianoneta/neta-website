#!/usr/bin/env python3
"""Compatibility and runtime optimizations for the NETA on-chain indexer.

Juno CosmWasm state can expose keys as hex while other byte fields use
Base64. The wrapper also replaces the sequential 512-prefix Osmosis scan
with a bounded parallel version that preserves the fail-closed accounting.
"""
import base64
import re
import time
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
    """Scan all 512 bank prefixes with conservative concurrency + retries.

    We deliberately use only two workers. A failed prefix is retried with
    exponential backoff and, when available, the secondary Osmosis RPC.
    Every prefix must still succeed or the whole run aborts.
    """
    height, primary_rpc = update_neta_data.latest_height()
    rpc_candidates = [primary_rpc] + [x for x in update_neta_data.OSMO if x != primary_rpc]
    workers = 2
    update_neta_data.log(
        f"Osmosis primary-state height {height:,} via {primary_rpc}; "
        f"{workers} parallel workers with retry/backoff"
    )

    holders = {}
    failures = []
    tasks = [(n, first) for n in (20, 32) for first in range(256)]
    completed = 0

    def fetch_one(n, first):
        prefix = bytes([2, n, first])
        last_exc = None
        # Up to 8 attempts total; rotate endpoints and slow down progressively.
        for attempt in range(8):
            rpc = rpc_candidates[attempt % len(rpc_candidates)]
            try:
                pairs = update_neta_data.subspace(prefix, height, rpc)
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
            except Exception as exc:
                last_exc = exc
                # Backoff is intentionally capped so a temporary 429 does not
                # turn a daily run into a very long job.
                time.sleep(min(0.75 * (2 ** attempt), 8.0))
        raise RuntimeError(f"all retry attempts failed: {last_exc}")

    with ThreadPoolExecutor(max_workers=workers) as pool:
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
    return holders, height, primary_rpc


update_neta_data.scan_osmo = _parallel_scan_osmo

raise SystemExit(update_neta_data.main())
