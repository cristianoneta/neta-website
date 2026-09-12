#!/usr/bin/env python3
import json
from pathlib import Path

root=Path(__file__).resolve().parents[1]
registry=json.loads((root/"data/recovery/wynd-pools.json").read_text())
js=(root/"wynd-recovery.js").read_text()
html=(root/"wynd-recovery.html").read_text()

assert registry["status"]=="VALIDATED_FOR_READ_ONLY_FRONTEND"
assert len(registry["pools"])==8
assert len({p["pair"]["address"] for p in registry["pools"]})==8
assert all(p["status"]=="VALIDATED" for p in registry["pools"])
for required in [
    "window.keplr", 'enable(CHAIN_ID)', 'getOfflineSigner(CHAIN_ID)',
    'keplr_keystorechange', 'startsWith("juno1")',
    'Number(x.code_id)===Number(live[i].code_id)',
    'available:active-locked', 'if(locked>active)',
    'BigInt(r.at_height)<=BigInt(chainHeight)',
    'verifyContracts(p,true)', 'signing_enabled:false',
    'netareborn.com/wynd-recovery:v1',
]:
    assert required in js, required
for required in ["UNSTAKED VIA NETA REBORN", "CLAIMED VIA NETA REBORN", "BLACKOUT: ON"]:
    assert required in html, required
print("WYND recovery frontend safety tests passed")
