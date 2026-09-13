#!/usr/bin/env python3
from pathlib import Path

root = Path(__file__).resolve().parents[1]
config = (root / "recovery-signing-config.js").read_text()
frontend = (root / "wynd-recovery.js").read_text()
html = (root / "wynd-recovery.html").read_text()
client = (root / "src/recovery-signing-client.js").read_text()

# This release prepares the signing path but must not make it reachable.
assert config.count("enabled:false") == 1
assert "enabled:true" not in config
assert "writable:false" in config and "configurable:false" in config
assert 'pilot:Object.freeze({wallet:null,pair:null,action:null,maxAmountRaw:"0"})' in config
assert '<button id="execute-action"' in html
assert 'hidden disabled' in html
assert 'if(!pendingAction||!pilotAuthorized(' in frontend
assert 'SIGNING_CONFIG?.enabled===true' in frontend
assert "pilotAuthorized(pool,action,request)" in frontend
assert "pilot.wallet!==wallet.address" in frontend
assert "pilot.pair!==pool.pair.address||pilot.action!==action" in frontend
assert "request.raw<=limit" in frontend

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
assert "broadcastTx" not in client
# The disabled release deliberately does not ship the large signing bundle.
# A later enabling PR must build, review and add it explicitly.
assert not (root / "assets/recovery-signing-client.js").exists()
assert 'src="assets/recovery-signing-client.js' not in html

print("Recovery signing gate remains hard-disabled and guarded")
