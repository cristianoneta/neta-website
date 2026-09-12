#!/usr/bin/env python3
"""Compatibility wrapper for Juno REST/RPC byte strings.

Some Juno endpoints expose CosmWasm model keys as hex strings while other
byte fields use Base64 (sometimes without '=' padding). This wrapper teaches
the standard decoder to accept both representations without changing the
core indexer logic.
"""
import base64
import re

_original_b64decode = base64.b64decode
_HEX_RE = re.compile(r"^[0-9a-fA-F]+$")


def _compatible_b64decode(value, *args, **kwargs):
    # CosmWasm AllContractState keys returned by the Juno LCD can be hex.
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

# Expose visible progress during the 512 Osmosis bank-state prefix scans.
_original_subspace = update_neta_data.subspace
_progress = {"done": 0}


def _progress_subspace(prefix, height, rpc):
    try:
        return _original_subspace(prefix, height, rpc)
    finally:
        _progress["done"] += 1
        done = _progress["done"]
        if done % 32 == 0 or done == 512:
            update_neta_data.log(
                f"Osmosis scan progress: {done}/512 ({done / 512:.0%})"
            )


update_neta_data.subspace = _progress_subspace

raise SystemExit(update_neta_data.main())
