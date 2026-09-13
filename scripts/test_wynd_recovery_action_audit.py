#!/usr/bin/env python3
import copy
import json
from pathlib import Path

import audit_wynd_recovery_actions as audit


pool = json.loads((Path(__file__).resolve().parents[1] / "data/recovery/wynd-pools.json").read_text())["pools"][0]


def metadata(address):
    kind = next(kind for kind in ("pair", "lp_token", "stake") if pool[kind]["address"] == address)
    return {"code_id": pool[kind]["code_id"], "endpoint": "mock-lcd"}


def version(address):
    kind = next(kind for kind in ("pair", "lp_token", "stake") if pool[kind]["address"] == address)
    return pool[kind]["cw2"], "mock-lcd"


def query(address, message):
    if message == {"pair": {}}:
        return {"contract_addr": pool["pair"]["address"], "liquidity_token": pool["lp_token"]["address"], "staking_addr": pool["stake"]["address"], "asset_infos": [asset["info"] for asset in pool["assets"]]}
    return {"bonding": [{"unbonding_period": value, "total_staked": "1"} for value in pool["unbonding_periods_seconds"]]}


result = audit.audit_pool(pool, metadata=metadata, version=version, query=query)
assert result["status"] == "VALIDATED"
assert set(result["action_probes"]) == {"unbond", "claim"}
assert result["broadcast"] is False

bad = copy.deepcopy(pool)
bad["actions"]["claim"]["message"] = {"claim": {"amount": "1"}}
try:
    audit.audit_pool(bad, metadata=metadata, version=version, query=query)
    raise AssertionError("changed Claim schema was accepted")
except RuntimeError as error:
    assert "claim schema" in str(error)

print("WYND recovery action audit tests passed")
