#!/usr/bin/env python3
"""Diagnostic only: isolate the Osmosis NETA discrepancy without publishing data."""
import base64, json, re, sys
from pathlib import Path
from urllib.parse import quote

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

# Save the full holder map so it can be compared byte-for-byte with the last
# known-good snapshot outside the workflow logs.
out_dir = Path("diagnostics")
out_dir.mkdir(exist_ok=True)
out_path = out_dir / "osmo-current.json"
out_path.write_text(json.dumps({"height": height, "rpc": rpc, "holders": holders}, sort_keys=True), encoding="utf-8")
print(f"DIAG snapshot_written={out_path} entries={len(holders)}")

exact = [(a,x) for a,x in holders.items() if x == TARGET]
print(f"DIAG exact_65_430866={exact}")
near = sorted(((a,x) for a,x in holders.items() if 50_000_000 <= x <= 80_000_000), key=lambda z:-z[1])
print("DIAG balances_50_to_80_NETA:")
for a,x in near: print(f"  {a} {x} {x/1e6:.6f}")
addr32 = sorted(((a,x) for a,x in holders.items() if len(u.payload(a)) == 32), key=lambda z:-z[1])
print(f"DIAG addr32_count={len(addr32)} addr32_total={sum(x for _,x in addr32)/1e6:.6f}")
for a,x in addr32: print(f"  32B {a} {x} {x/1e6:.6f}")

# Independent cross-check: ask the bank module for total supply of the denom.
# This is best-effort diagnostics only and never changes pass/fail behavior.
encoded = quote(u.DENOM, safe="")
rest_bases = ["https://lcd.osmosis.zone", "https://osmosis-api.polkachu.com"]
paths = [
    f"/cosmos/bank/v1beta1/supply/by_denom?denom={encoded}",
    f"/cosmos/bank/v1beta1/supply/{encoded}",
]
for base in rest_bases:
    for path in paths:
        try:
            r = u.S.get(base + path, headers={"x-cosmos-block-height": str(height)}, timeout=20)
            r.raise_for_status()
            data = r.json()
            amount = None
            if isinstance(data, dict):
                amount_obj = data.get("amount")
                if isinstance(amount_obj, dict): amount = amount_obj.get("amount")
                elif amount_obj is not None: amount = amount_obj
            print(f"DIAG bank_supply base={base} path={path.split('?')[0]} amount={amount} body={json.dumps(data)[:500]}")
            if amount is not None:
                raise SystemExit(0)
        except SystemExit:
            raise
        except Exception as exc:
            print(f"DIAG bank_supply_failed base={base} path={path.split('?')[0]} error={exc}")
