#!/usr/bin/env python3
import json
from pathlib import Path

root=Path(__file__).resolve().parents[1]
registry=json.loads((root/"data/recovery/wynd-pools.json").read_text())
js=(root/"wynd-recovery.js").read_text()
html=(root/"wynd-recovery.html").read_text()
app=(root/"app.js").read_text()
signing_config=(root/"recovery-signing-config.js").read_text()
wallet_header=(root/"wallet-header.js").read_text()

assert registry["status"]=="VALIDATED_FOR_READ_ONLY_FRONTEND"
assert len(registry["pools"])==8
assert len({p["pair"]["address"] for p in registry["pools"]})==8
assert all(p["status"]=="VALIDATED" for p in registry["pools"])
for required in [
    'Number(target.code_id)===Number(live[index].code_id)',
    'available:active-locked', 'if(locked>active)',
    'BigInt(release.at_height)<=BigInt(chainHeight)',
    'verifyContracts(pool,true)', 'const SIGNING_CONFIG=window.NETA_RECOVERY_SIGNING',
    'signingEnabled()', 'prepareAction(pool,action,request)',
    'signingClient.simulate', 'signingClient.execute', 'loadSigningClient()',
    'RECOVERY ACTION CHANGED DURING APPROVAL', 'KEPLR ACCOUNT CHANGED',
    'netareborn.com/wynd-recovery:v1',
    'loadPosition(pool,address)', 'wallet.address===viewedAddress',
    'positionUsd', 'expectedAssets(pool,totalEconomic)',
    'data/recovery/wynd-market.json', 'data/recovery/wynd-leaderboard.json', 'POOL RESERVES',
    'chainClient.get("/cosmos/base/tendermint/v1beta1/blocks/latest")',
    'fresh.pool.pair.address===pendingLiquidity.pool.pair.address',
    'fresh.junoRaw===pendingLiquidity.junoRaw', 'fresh.netaRaw===pendingLiquidity.netaRaw',
    'fresh.memo===pendingLiquidity.memo',
    'POOL_QUERY_CONCURRENCY=3', 'runWithConcurrency(registry.pools,POOL_QUERY_CONCURRENCY',
    'PARTIAL VALUE', 'RETRY THIS POOL', 'generation!==queryGeneration',
    'flash();', 'setInterval(flash,9000)', 'neta-matrix-active', 'neta:blackout-pause', 'neta:blackout-resume',
]:
    assert required in js, required
for required in [
    "UNSTAKED VIA NETA REBORN", "CLAIMED VIA NETA REBORN",
    'id="address-form"', 'id="wallet-address"', 'id="pool-total-usd"', 'id="position-total-usd"',
    'assets/wynd-offline-mascot.png', 'matrix-blackout.js', 'id="leaderboard-list"',
    'wallet-header.js?v=3', 'id="keplr-connect"',
    'cosmos-client.js?v=2', 'recovery-signing-config.js?v=8',
    'wynd-recovery.js?v=20260914-19',
    'wynd-recovery.css?v=20260914-5', 'id="execute-action"', 'hidden disabled',
    'id="transaction-feedback"', 'id="transaction-explorer"', 'VIEW ON ATOMSCAN',
]:
    assert required in html, required
for required in ['window.keplr', 'keplr_keystorechange', 'enable(CHAIN_ID)', 'getOfflineSigner(CHAIN_ID)', 'ADDRESS_PATTERN.test(address)']:
    assert required in wallet_header, required
for required in [
    'enabled:false', 'chainId:"juno-1"', 'gasPrice:"0.075ujuno"',
    'gasAdjustment:1.4', 'bond:500000', 'unbond:500000', 'claim:500000', 'withdraw:700000',
    'memo:"netareborn.com/wynd-recovery:v1"', 'writable:false', 'configurable:false',
    'liquidityPilot:Object.freeze({enabled:false', 'junoRaw:"1000000",maxNetaRaw:"10200"',
]:
    assert required in signing_config, required
assert 'pilot:Object.freeze({wallet:null,pair:null,action:null,maxAmountRaw:"0"})' in signing_config
for required in ['unbondingTranches:claims.tranches', 'unbondingDisplay(position,decimals)', 'READY AT BLOCK', 'postconditionSatisfied(', 'verifyPostcondition(']:
    assert required in js, required
assert (root/"assets/recovery-signing-client.js").exists()
assert 'src="assets/recovery-signing-client.js' not in html
for page in ["map-of-neta.html", "what-is-neta.html", "neta-dao.html", "wynd-recovery.html"]:
    assert 'href="wynd-recovery.html"' in (root/page).read_text(), page
assert 'recoveryLink.href="wynd-recovery.html"' not in app
assert '`${LCD}/' not in js
assert '<a class="active" aria-current="page" href="wynd-recovery.html">WYND RECOVERY</a>' in html
assert 'totalPoolUsd+=Number(live.pool_value_usd||0)' in js
assert '.position-summary[hidden]{display:none}' in (root/"wynd-recovery.css").read_text()
assert js.count('{cache:"no-store"}') == 4
assert 'JSON.stringify(fresh.instructions)!==JSON.stringify(pendingLiquidity.instructions)' not in js
for required in ['setTransactionFeedback("pending"', 'setTransactionFeedback("success"', 'setTransactionFeedback("error"', 'ATOMSCAN_TX_BASE+normalizedHash', '/^[0-9A-F]{64}$/', 'String(txhash||"").toUpperCase()']:
    assert required in js, required
print("WYND recovery frontend safety tests passed")
