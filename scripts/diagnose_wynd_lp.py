#!/usr/bin/env python3
"""Read-only diagnostic for WYND JUNO/NETA LP ownership.

This does not change the production economic-holder ranking. It reconstructs
current LP token balances, checks LP supply, reads the pool's NETA reserve and
flags large LP holders that are CosmWasm contracts (possible staking custody).
"""
from __future__ import annotations

import base64
import json
from pathlib import Path

import requests

from update_neta_data import JUNO, NETA, S, TIMEOUT, jint, jval, nskey

LP = "juno1uu3cewmpynvgsdu3lfqv2rh2n5nwtrguahkw64wjk99eg8r6fsss0e757x"
PAIR = "juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
OUT = Path("wynd_lp_diagnostic.json")


def b64decode_loose(value: str) -> bytes:
    """Accept normal or URL-safe base64 with omitted padding."""
    value = value.strip()
    value += "=" * ((4 - len(value) % 4) % 4)
    return base64.b64decode(value, altchars=b"-_")


def contract_state_loose(address: str):
    rows = []
    key = None
    endpoint = None
    while True:
        q = {"pagination.limit": "5000"}
        if key:
            q["pagination.key"] = key
        last = None
        for base in JUNO:
            try:
                r = S.get(
                    base.rstrip("/") + f"/cosmwasm/wasm/v1/contract/{address}/state",
                    params=q,
                    timeout=TIMEOUT,
                )
                r.raise_for_status()
                data = r.json()
                endpoint = base
                break
            except Exception as exc:
                last = exc
        else:
            raise RuntimeError(f"state query failed for {address}: {last}")

        for model in data.get("models", []):
            rows.append((b64decode_loose(model["key"]), b64decode_loose(model["value"])))
        key = (data.get("pagination") or {}).get("next_key")
        if not key:
            break
    print(f"WYND LP contract state: {len(rows):,} rows via {endpoint}")
    return rows


def smart(contract: str, msg: dict) -> dict:
    raw = json.dumps(msg, separators=(",", ":")).encode()
    q = base64.b64encode(raw).decode()
    last = None
    for base in JUNO:
        try:
            r = S.get(
                base.rstrip("/") + f"/cosmwasm/wasm/v1/contract/{contract}/smart/{q}",
                timeout=TIMEOUT,
            )
            r.raise_for_status()
            return r.json().get("data", r.json())
        except Exception as exc:
            last = exc
    raise RuntimeError(f"smart query failed for {contract}: {last}")


def is_contract(address: str) -> bool:
    for base in JUNO:
        try:
            r = S.get(
                base.rstrip("/") + f"/cosmwasm/wasm/v1/contract/{address}",
                timeout=12,
            )
            if r.status_code == 200:
                return True
            if r.status_code in (400, 404):
                return False
        except requests.RequestException:
            continue
    return False


def main() -> None:
    balances = {}
    token_info = None
    minter = None

    for key, value in contract_state_loose(LP):
        ns, suffix = nskey(key)
        if ns == "balance" and suffix:
            address = suffix.decode()
            amount = jint(value)
            if amount > 0:
                balances[address] = amount
        elif key == b"token_info" or ns == "token_info":
            try:
                token_info = jval(value)
            except Exception:
                pass
        elif key == b"minter" or ns == "minter":
            try:
                minter = jval(value)
            except Exception:
                pass

    if not balances:
        raise RuntimeError("LP scan returned zero positive balances")

    direct_sum = sum(balances.values())
    declared_supply = None
    if isinstance(token_info, dict) and "total_supply" in token_info:
        declared_supply = int(token_info["total_supply"])
    lp_supply = declared_supply if declared_supply is not None else direct_sum
    if direct_sum != lp_supply:
        raise RuntimeError(f"LP balance sum {direct_sum} != declared supply {lp_supply}")

    neta_balance = smart(NETA, {"balance": {"address": PAIR}})
    pool_neta_raw = int(neta_balance["balance"])

    ordered = sorted(balances.items(), key=lambda x: (-x[1], x[0]))
    top = []
    contract_lp_raw = 0
    for address, amount in ordered[:100]:
        contract = is_contract(address)
        if contract:
            contract_lp_raw += amount
        top.append(
            {
                "address": address,
                "lp_raw": amount,
                "lp_share_percent": amount / lp_supply * 100,
                "neta_claim": pool_neta_raw * amount / lp_supply / 1_000_000,
                "is_contract": contract,
            }
        )

    result = {
        "lp_token": LP,
        "pair": PAIR,
        "token_info": token_info,
        "minter": minter,
        "positive_direct_holders": len(balances),
        "lp_supply_raw": lp_supply,
        "lp_balance_sum_raw": direct_sum,
        "supply_check": direct_sum == lp_supply,
        "pool_neta_raw": pool_neta_raw,
        "pool_neta": pool_neta_raw / 1_000_000,
        "top_100_lp_raw": sum(x for _, x in ordered[:100]),
        "top_100_lp_share_percent": sum(x for _, x in ordered[:100]) / lp_supply * 100,
        "contract_lp_raw_within_top_100": contract_lp_raw,
        "contract_lp_share_percent_within_top_100": contract_lp_raw / lp_supply * 100,
        "top_holders": top,
    }
    OUT.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print(f"WYND LP holders: {len(balances):,}")
    print(f"LP supply check: {direct_sum} == {lp_supply}")
    print(f"Pool NETA: {pool_neta_raw / 1_000_000:,.6f}")
    print(f"Top 100 share: {result['top_100_lp_share_percent']:.4f}%")
    print(f"Contracts in top 100 hold: {result['contract_lp_share_percent_within_top_100']:.4f}%")
    for row in top[:20]:
        tag = "CONTRACT" if row["is_contract"] else "wallet"
        print(
            f"{row['address']}  LP={row['lp_raw']}  "
            f"share={row['lp_share_percent']:.6f}%  "
            f"NETA={row['neta_claim']:.6f}  {tag}"
        )


if __name__ == "__main__":
    main()
