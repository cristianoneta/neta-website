#!/usr/bin/env python3
"""Compatibility wrapper for REST/RPC Base64 strings that omit '=' padding."""
import base64

_original_b64decode = base64.b64decode

def _padded_b64decode(value, *args, **kwargs):
    if isinstance(value, str):
        value = value + ("=" * (-len(value) % 4))
    elif isinstance(value, (bytes, bytearray)):
        value = bytes(value) + (b"=" * (-len(value) % 4))
    return _original_b64decode(value, *args, **kwargs)

base64.b64decode = _padded_b64decode

import update_neta_data

raise SystemExit(update_neta_data.main())
