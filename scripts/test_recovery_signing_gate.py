#!/usr/bin/env python3
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
config = (root / "recovery-signing-config.js").read_text()
frontend = (root / "wynd-recovery.js").read_text()
html = (root / "wynd-recovery.html").read_text()
client = (root / "src/recovery-signing-client.js").read_text()
registry = json.loads((root / "data/recovery/wynd-pools.json").read_text())

# Public signing is restricted to recovery-only actions and the exact frozen
# Top-8 Pair, LP and Stake address sets.
assert config.count("enabled:true") == 2
assert 'actions:Object.freeze({unbond:true,claim:true,withdraw:true})' in config
assert "gasCaps:Object.freeze({bond" not in config
assert "liquidity" not in config.lower()
for pool in registry["pools"]:
    assert config.count(pool["pair"]["address"]) == 1
    assert config.count(pool["lp_token"]["address"]) == 1
    assert config.count(pool["stake"]["address"]) == 1

assert "writable:false" in config and "configurable:false" in config
assert '<button id="execute-action"' in html and "hidden disabled" in html
assert "liquidity-pilot" not in html
assert 'if(!pendingAction||!recoveryAuthorized(' in frontend
assert 'SIGNING_CONFIG?.enabled===true' in frontend
assert 'policy?.enabled!==true' in frontend
assert '["unbond","claim","withdraw"].includes(action)' in frontend
assert "policy.actions?.[action]!==true" in frontend
assert "policy.contracts?.[pool.pair.address]" in frontend
assert "contracts?.lpToken!==pool.lp_token.address" in frontend
assert "contracts?.stake!==pool.stake.address" in frontend
assert 'wallet.address!==viewedAddress' in frontend
assert 'typeof request?.raw==="bigint"&&request.raw>0n' in frontend
assert "position.claimable!==request.raw" in frontend
assert "row.available<request.raw" in frontend
assert "position.direct<request.raw" in frontend
assert "pool.unbonding_periods_seconds.includes(request.period)" in frontend
assert "verifyPostcondition(completed.pool,completed.action,completed.request,fresh.before)" in frontend

for forbidden in [
    "provide_liquidity", "increase_allowance", "executeLiquidityPilot",
    "showLiquidityPreview", "liquidityPilotAuthorized", 'action==="bond"',
    "delegate:{", "simulateMultiple", "executeMultiple",
]:
    assert forbidden not in frontend, forbidden

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

# The adapter exposes no generic raw broadcast or retired multi-message helper.
assert "SigningCosmWasmClient.connectWithSigner" in client
assert "client.simulate" in client
assert "client.execute" in client
assert "client.executeMultiple" not in client
assert "broadcastTx" not in client
assert config.count("https://juno-rpc.") >= 2
assert "https://rpc.lavenderfive.com:443/juno" in config
assert "timeoutMs=8000" in client
assert "CONNECTION TIMED OUT" in client
assert (root / "assets/recovery-signing-client.js").exists()
assert 'src="assets/recovery-signing-client.js' not in html

print("Public signing is restricted to Unbond, Claim and Withdraw on the exact Top-8 contracts")
