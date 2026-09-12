#!/usr/bin/env python3
"""Diagnostic only: isolate the Osmosis NETA discrepancy without publishing data."""
import base64, re, sys
from pathlib import Path

# Same Cosmos byte compatibility as production wrapper.
_orig = base64.b64decode
_HEX = re.compile(r"^[0-9a-fA-F]+$")
def _decode(value, *args, **kwargs):
    if isinstance(value, str):
        if len(value) >= 2 and len(value) % 2 == 0 and _HEX.fullmatch(value):
            return bytes.fromhex(value)
        value += "=" * (-len(value) % 4)
    return _orig(value, *args, **kwargs)
base64.b64decode = _decode

sys.path.insert(0, str(Path(__file__).parent))
import update_neta_data as u

TARGET = 65_430_866
holders, height, rpc = u.scan_osmo()
total = sum(holders.values())
print(f"DIAG height={height} rpc={rpc} holders={len(holders)} total_raw={total} total={total/1e6:.6f}")
exact = [(a,x) for a,x in holders.items() if x == TARGET]
print(f"DIAG exact_65_430866={exact}")
# Show balances around the discrepancy and all 32-byte addresses.
near = sorted(((a,x) for a,x in holders.items() if 50_000_000 <= x <= 80_000_000), key=lambda z:-z[1])
print("DIAG balances_50_to_80_NETA:")
for a,x in near: print(f"  {a} {x} {x/1e6:.6f}")
addr32 = sorted(((a,x) for a,x in holders.items() if len(u.payload(a)) == 32), key=lambda z:-z[1])
print(f"DIAG addr32_count={len(addr32)} addr32_total={sum(x for _,x in addr32)/1e6:.6f}")
for a,x in addr32: print(f"  32B {a} {x} {x/1e6:.6f}")
