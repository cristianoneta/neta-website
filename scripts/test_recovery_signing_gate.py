#!/usr/bin/env python3
from pathlib import Path

root = Path(__file__).resolve().parents[1]
config = (root / "recovery-signing-config.js").read_text()
frontend = (root / "wynd-recovery.js").read_text()
html = (root / "wynd-recovery.html").read_text()
client = (root / "src/recovery-signing-client.js").read_text()

# The completed bond pilot is closed; only the remaining 47,284 raw LP Withdraw is enabled.
assert config.count("enabled:false") == 1
assert config.count("enabled:true") == 1
assert "writable:false" in config and "configurable:false" in config
assert 'action:"withdraw",maxAmountRaw:"47284"' in config
assert 'liquidityPilot:Object.freeze({enabled:false' in config
assert 'wallet:"juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57"' in config
assert 'junoRaw:"1000000",maxNetaRaw:"10200"' in config
assert '<button id="execute-action"' in html
assert 'hidden disabled' in html
assert 'if(!pendingAction||!pilotAuthorized(' in frontend
assert 'SIGNING_CONFIG?.enabled===true' in frontend
assert "pilotAuthorized(pool,action,request)" in frontend
assert "pilot.wallet!==wallet.address" in frontend
assert "pilot.pair!==pool.pair.address||pilot.action!==action" in frontend
assert "request.raw<=limit" in frontend
assert 'action==="bond"&&Number(pilot.unbondingPeriod)!==request.period' in frontend
assert 'position.direct<pilotAmount?position.direct:pilotAmount' in frontend
assert frontend.count('result.code!==undefined&&Number(result.code)!==0') == 2
for required in [
    "liquidityPilotAuthorized()",
    'pool.name!=="ujuno / NETA"',
    "LIVE NETA RATIO EXCEEDS PILOT CAP",
    "increase_allowance",
    "provide_liquidity",
    "simulateMultiple",
    "executeMultiple",
    'hook={delegate:{unbonding_period:request.period}}',
    'position.direct<request.raw',
]:
    assert required in frontend, required

# Every prospective transaction is reconstructed and checked immediately before use.
for required in [
    "verifyContracts(pool,true)",
    "loadPosition(pool,wallet.address)",
    "UNALLOWLISTED RECOVERY ACTION",
    "accounts[0]?.address!==wallet.address",
    "RECOVERY ACTION CHANGED DURING APPROVAL",
    "gas>cap",
    "signingClient.simulate",
    "signingClient.execute",
    'script.src="assets/recovery-signing-client.js?v=1"',
]:
    assert required in frontend, required

# The adapter owns signing only; it exposes no raw transaction broadcast helper.
assert "SigningCosmWasmClient.connectWithSigner" in client
assert "client.simulate" in client
assert "client.execute" in client
assert "client.executeMultiple" in client
assert "broadcastTx" not in client
# The pilot release ships the pinned local bundle loaded only after the
# wallet, pair, amount and live-state gates have passed.
assert (root / "assets/recovery-signing-client.js").exists()
assert 'src="assets/recovery-signing-client.js' not in html

print("Exact-wallet Withdraw pilot is enabled; completed Bond and all other signing are gated off")
