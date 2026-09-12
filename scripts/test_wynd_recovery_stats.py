#!/usr/bin/env python3
import update_wynd_recovery_stats as s

POOL={"pair":{"address":"pair"},"stake":{"address":"stake"}}
ROWS=[(
    {"body":{"memo":s.MEMO,"messages":[{"contract":"stake","sender":"juno1tester"}]}},
    {"code":0,"txhash":"ABC","height":"123","timestamp":"2026-09-12T00:00:00Z","events":[
        {"type":"wasm","attributes":[{"key":"_contract_address","value":"stake"},{"key":"action","value":"unbond"},{"key":"amount","value":"42000"}]},
        {"type":"wasm","attributes":[{"key":"_contract_address","value":"stake"},{"key":"action","value":"claim"},{"key":"tokens","value":"21000 lp-token"}]},
    ]}
)]
events=s.parse_tagged_actions(POOL,ROWS)
assert [(x["action"],x["lp_raw"]) for x in events]==[("unbond",42000),("claim",21000)]
untagged=[({"body":{"memo":"other","messages":[{"contract":"stake","sender":"juno1tester"}]}},ROWS[0][1])]
assert s.parse_tagged_actions(POOL,untagged)==[]
print("WYND recovery stats parser tests passed")
