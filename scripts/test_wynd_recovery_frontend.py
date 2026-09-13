#!/usr/bin/env python3
import json
from pathlib import Path

root=Path(__file__).resolve().parents[1]
registry=json.loads((root/"data/recovery/wynd-pools.json").read_text())
js=(root/"wynd-recovery.js").read_text()
html=(root/"wynd-recovery.html").read_text()
app=(root/"app.js").read_text()

assert registry["status"]=="VALIDATED_FOR_READ_ONLY_FRONTEND"
assert len(registry["pools"])==8
assert len({p["pair"]["address"] for p in registry["pools"]})==8
assert all(p["status"]=="VALIDATED" for p in registry["pools"])
for required in [
    "window.keplr", 'enable(CHAIN_ID)', 'getOfflineSigner(CHAIN_ID)',
    'keplr_keystorechange', 'ADDRESS_PATTERN.test(accounts[0].address)',
    'Number(target.code_id)===Number(live[index].code_id)',
    'available:active-locked', 'if(locked>active)',
    'BigInt(release.at_height)<=BigInt(chainHeight)',
    'verifyContracts(pool,true)', 'signing_enabled:false',
    'netareborn.com/wynd-recovery:v1',
    'loadPosition(pool,address)', 'wallet.address===viewedAddress',
    'positionUsd', 'expectedAssets(pool,totalEconomic)',
    'data/recovery/wynd-market.json', 'POOL RESERVES',
    'flash();', 'setInterval(flash,15000)', 'neta-matrix-active', 'neta:blackout-pause', 'neta:blackout-resume',
]:
    assert required in js, required
for required in [
    "UNSTAKED VIA NETA REBORN", "CLAIMED VIA NETA REBORN",
    'id="address-form"', 'id="wallet-address"', 'id="position-total-usd"',
    'assets/wynd-offline-mascot.png', 'matrix-blackout.js',
]:
    assert required in html, required
for page in ["map-of-neta.html", "what-is-neta.html", "neta-dao.html", "wynd-recovery.html"]:
    assert 'href="wynd-recovery.html"' in (root/page).read_text(), page
assert 'recoveryLink.href="wynd-recovery.html"' in app
assert '<a class="active" href="wynd-recovery.html">WYND RECOVERY</a>' in html
print("WYND recovery frontend safety tests passed")
