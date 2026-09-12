#!/usr/bin/env python3
"""Build the immutable frontend allowlist from validated diagnostic evidence."""
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

DISCOVERY = Path("docs/diagnostics/wynd_recovery_discovery.json")
VALIDATION = Path("docs/diagnostics/wynd_recovery_validation.json")
REGISTRY = Path("data/recovery/wynd-pools.json")
STATE_MACHINE = Path("docs/recovery/WYND_RECOVERY_STATE_MACHINE.md")


def label(assets):
    return " / ".join((a.get("metadata") or {}).get("symbol", a["key"]).removeprefix("U") for a in assets)


def main():
    discovery = json.loads(DISCOVERY.read_text(encoding="utf-8"))
    validation = json.loads(VALIDATION.read_text(encoding="utf-8"))
    if discovery.get("status") != "VALIDATED" or validation.get("status") != "VALIDATED":
        raise RuntimeError("green discovery and validation evidence required")
    pools = sorted(validation["pools"], key=lambda p: int(p["rank"]))
    if len(pools) != 8 or [p["rank"] for p in pools] != list(range(1, 9)):
        raise RuntimeError("complete ranks 1 through 8 required")
    if not validation.get("all_top_eight_share_same_pair_and_stake_code"):
        raise RuntimeError("top-eight deployed code consistency failed")
    for pool in pools:
        checks = pool.get("validation") or {}
        if not checks or not all(checks.values()):
            raise RuntimeError(f"pool {pool['pair']} has incomplete validation")

    registry_pools = []
    for p in pools:
        registry_pools.append({
            "rank": p["rank"],
            "name": label(p["assets"]),
            "status": "VALIDATED",
            "pair": {"address": p["pair"], "code_id": int(p["pair_code_id"]), "cw2": p["pair_contract_version"]},
            "lp_token": {"address": p["lp_token"], "code_id": int(p["lp_code_id"]), "cw2": p["lp_contract_version"]},
            "stake": {"address": p["stake"], "code_id": int(p["stake_code_id"]), "cw2": p["stake_contract_version"]},
            "assets": [{
                "key": a["key"],
                "info": a["info"],
                "symbol": (a.get("metadata") or {}).get("symbol"),
                "decimals": a["resolved_decimals"],
            } for a in p["assets"]],
            "unbonding_periods_seconds": p["unbonding_periods_seconds"],
            "snapshot": {
                "lp_total_supply_raw": p["lp_total_supply_raw"],
                "stake_custody_lp_raw": p["stake_custody_lp_raw"],
                "active_stake_lp_raw": p["active_stake_lp_raw"],
                "claims_lp_raw": p["claims_lp_raw"],
                "claimable_records": p["claimable_records"],
                "unbonding_records": p["unbonding_records"],
                "recoverable_pool_value_usd": p["recoverable_pool_value_usd"],
                "valuation_method": p["valuation_method"],
            },
            "queries": ["cw20.balance", "stake.all_staked", "stake.claims", "stake.bonding_info", "pair.pair", "pair.pool", "pair.share"],
            "actions": {
                "unbond": {"contract": "stake", "message": {"unbond": {"tokens": "<raw_lp>", "unbonding_period": "<seconds>"}}},
                "claim": {"contract": "stake", "message": {"claim": {}}},
                "withdraw_liquidity": {"contract": "lp_token", "message_type": "cw20.send", "recipient": "pair", "hook": {"withdraw_liquidity": {"assets": []}}},
            },
        })

    out = {
        "schema_version": 1,
        "status": "VALIDATED_FOR_READ_ONLY_FRONTEND",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "network": {"chain_id": "juno-1"},
        "source": {
            "discovery_generated_at": discovery["generated_at"],
            "price_source": discovery["price_source"],
            "price_timestamp": discovery["price_timestamp"],
            "validation_generated_at": validation["generated_at"],
            "validation_juno_height": validation["juno_height"],
        },
        "safety": {
            "allowlisted_contracts_only": True,
            "requery_before_preview_and_signing": True,
            "signing_enabled": False,
            "reason_signing_disabled": "Controlled simulation and tiny-position transaction tests are still required.",
            "unsupported_deployed_query": "stake.unbond_all",
        },
        "pools": registry_pools,
    }
    REGISTRY.parent.mkdir(parents=True, exist_ok=True)
    REGISTRY.write_text(json.dumps(out, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    STATE_MACHINE.parent.mkdir(parents=True, exist_ok=True)
    STATE_MACHINE.write_text("""# WYND Recovery State Machine\n\nStatus: **VALIDATED FOR READ-ONLY FRONTEND**. Signing remains disabled.\n\n| Observed wallet state | UI state | Permitted next action |\n|---|---|---|\n| No direct LP, no active stake, no claims | Empty | None |\n| Direct LP balance > 0 | LP ready | Preview proportional assets; Withdraw only after simulation gate |\n| Active unlocked stake > 0 | Staked | Preview Unbond for one validated period |\n| Stake contains time-locked components | Internally locked | Display separately; do not offer an amount exceeding currently releasable stake |\n| Claim release condition is in the future | Unbonding | Display release time/height; no Claim action |\n| Claim release condition is mature | Claimable | Preview Claim |\n| Claim transaction confirmed and LP balance refreshed | LP ready | Preview proportional assets; Withdraw only after simulation gate |\n\n## Mandatory transitions\n\n1. Re-query the selected allowlisted pool and connected wallet before every preview.\n2. Verify wallet network is exactly `juno-1`.\n3. Show one transaction at a time: Unbond, then Claim after maturity, then Withdraw.\n4. Re-query after confirmation; never infer the next state from the submitted message alone.\n5. Disable all actions on code-ID/CW2 mismatch, incomplete RPC data, unknown claim encoding, or failed balance reconciliation.\n6. `stake.unbond_all` is not available on deployed stake v2.0.0 and must not be queried.\n7. The blackout presentation effect must pause during preview, wallet approval, broadcast, and result display.\n\n## Signing gate still open\n\nBefore signing can be enabled, simulate and then test with tiny controlled positions for every distinct action shape. Validate fees, gas, transaction events, proportional withdrawal results, rejection paths, and post-transaction refresh. The read-only frontend may be built before this gate closes.\n""", encoding="utf-8")
    print(json.dumps({"status": out["status"], "pool_count": len(registry_pools), "signing_enabled": False}, indent=2))


if __name__ == "__main__":
    main()
