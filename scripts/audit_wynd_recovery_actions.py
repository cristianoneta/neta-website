#!/usr/bin/env python3
"""Read-only live audit of Unbond and Claim schemas for all recovery pools."""
from __future__ import annotations

import argparse
import base64
import json
from datetime import datetime, timezone
from pathlib import Path

import update_neta_data as chain
from validate_wynd_recovery import smart


REGISTRY = Path("data/recovery/wynd-pools.json")
OUT = Path("docs/diagnostics/wynd_recovery_action_audit.json")


def contract_metadata(address):
    data, endpoint = chain.req_json(chain.JUNO, f"/cosmwasm/wasm/v1/contract/{address}")
    info = data.get("contract_info", data)
    return {"code_id": int(info["code_id"]), "endpoint": endpoint}


def cw2_version(address):
    encoded = base64.b64encode(b"contract_info").decode()
    data, endpoint = chain.req_json(chain.JUNO, f"/cosmwasm/wasm/v1/contract/{address}/raw/{encoded}")
    raw = base64.b64decode(data["data"])
    return json.loads(raw), endpoint


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"))


def audit_pool(pool, metadata=contract_metadata, version=cw2_version, query=smart):
    expected_actions = {
        "unbond": {"contract": "stake", "message": {"unbond": {"tokens": "<raw_lp>", "unbonding_period": "<seconds>"}}},
        "claim": {"contract": "stake", "message": {"claim": {}}},
    }
    for action, expected in expected_actions.items():
        if canonical(pool["actions"].get(action)) != canonical(expected):
            raise RuntimeError(f"{pool['name']}: registry {action} schema mismatch")

    live_contracts = {}
    endpoints = set()
    for kind in ("pair", "lp_token", "stake"):
        configured = pool[kind]
        live = metadata(configured["address"])
        cw2, endpoint = version(configured["address"])
        endpoints.update((live.get("endpoint"), endpoint))
        if live["code_id"] != int(configured["code_id"]):
            raise RuntimeError(f"{pool['name']}: {kind} code ID changed")
        if canonical(cw2) != canonical(configured["cw2"]):
            raise RuntimeError(f"{pool['name']}: {kind} CW2 version changed")
        live_contracts[kind] = {"address": configured["address"], "code_id": live["code_id"], "cw2": cw2}

    pair = query(pool["pair"]["address"], {"pair": {}})
    if pair.get("contract_addr") != pool["pair"]["address"]:
        raise RuntimeError(f"{pool['name']}: pair self-address mismatch")
    if pair.get("liquidity_token") != pool["lp_token"]["address"] or pair.get("staking_addr") != pool["stake"]["address"]:
        raise RuntimeError(f"{pool['name']}: live pair routing changed")
    expected_assets = {canonical(asset["info"]) for asset in pool["assets"]}
    if {canonical(asset) for asset in pair.get("asset_infos", [])} != expected_assets:
        raise RuntimeError(f"{pool['name']}: live pair assets changed")

    bonding = query(pool["stake"]["address"], {"bonding_info": {}})
    live_periods = sorted(int(row["unbonding_period"]) for row in bonding.get("bonding", []))
    configured_periods = sorted(int(value) for value in pool["unbonding_periods_seconds"])
    if live_periods != configured_periods:
        raise RuntimeError(f"{pool['name']}: unbonding periods changed")

    probes = {
        "unbond": {"contract": pool["stake"]["address"], "message": {"unbond": {"tokens": "1", "unbonding_period": live_periods[0]}}},
        "claim": {"contract": pool["stake"]["address"], "message": {"claim": {}}},
    }
    return {
        "rank": int(pool["rank"]), "name": pool["name"], "status": "VALIDATED",
        "contracts": live_contracts, "unbonding_periods_seconds": live_periods,
        "action_probes": probes,
        "checks": {
            "registry_action_schemas_exact": True, "code_ids_live": True, "cw2_versions_live": True,
            "pair_routes_to_allowlisted_lp_and_stake": True, "pair_assets_exact": True,
            "unbonding_periods_exact": True,
        },
        "lcd_endpoints": sorted(endpoint for endpoint in endpoints if endpoint),
        "unsigned": True, "broadcast": False,
    }


def build(registry):
    pools = registry.get("pools", [])
    if registry.get("status") != "VALIDATED_FOR_READ_ONLY_FRONTEND" or len(pools) != 8:
        raise RuntimeError("validated Top-8 registry required")
    results = [audit_pool(pool) for pool in pools]
    if [row["rank"] for row in results] != list(range(1, 9)):
        raise RuntimeError("recovery pool ranks must be contiguous")
    return {
        "schema_version": 1, "status": "VALIDATED", "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "network": "juno-1", "scope": "Read-only live schema and routing audit for Unbond and Claim across all eight allowlisted pools.",
        "pool_count": len(results), "unsigned": True, "broadcast": False, "pools": results,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--registry", default=str(REGISTRY))
    parser.add_argument("--output", default=str(OUT))
    args = parser.parse_args()
    result = build(json.loads(Path(args.registry).read_text(encoding="utf-8")))
    target = Path(args.output)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({"status": result["status"], "pool_count": result["pool_count"], "broadcast": result["broadcast"]}, indent=2))


if __name__ == "__main__":
    main()
