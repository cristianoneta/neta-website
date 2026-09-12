#!/usr/bin/env python3
"""Read-only diagnostic for WYND JUNO/NETA LP ownership.

This script intentionally does not touch production holder outputs. It compares
CW20-visible balances with total LP supply and inspects raw storage namespaces to
locate the large staked/custodied LP component.
"""
from __future__ import annotations

import base64
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import requests

from update_neta_data import JUNO, NETA, TIMEOUT

LP = "juno1uu3cewmpynvgsdu3lfqv2rh2n5nwtrguahkw64wjk99eg8r6fsss0e757x"
PAIR = "juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
OUT = Path("wynd_lp_diagnostic.json")
HEADERS = {"User-Agent": "NETA-Reborn-LP-Diagnostic/1.0"}


def smart(contract: str, msg: dict) -> dict:
    raw = json.dumps(msg, separators=(",", ":")).encode()
    q = base64.b64encode(raw).decode()
    last = None
    for base in JUNO:
        try:
            r = requests.get(
                base.rstrip("/") + f"/cosmwasm/wasm/v1/contract/{contract}/smart/{q}",
                headers=HEADERS,
                timeout=TIMEOUT,
            )
            r.raise_for_status()
            body = r.json()
            return body.get("data", body)
        except Exception as exc:
            last = exc
    raise RuntimeError(f"smart query failed for {contract}: {last}")


def decode_b64_loose(value: str) -> bytes:
    value = value.strip()
    value += "=" * ((4 - len(value) % 4) % 4)
    return base64.b64decode(value, altchars=b"-_")


def raw_state_samples() -> tuple[int, list[dict]]:
    rows = []
    key = None
    while True:
        params = {"pagination.limit": "5000"}
        if key:
            params["pagination.key"] = key
        last = None
        for base in JUNO:
            try:
                r = requests.get(
                    base.rstrip("/") + f"/cosmwasm/wasm/v1/contract/{LP}/state",
                    headers=HEADERS,
                    params=params,
                    timeout=TIMEOUT,
                )
                r.raise_for_status()
                data = r.json()
                break
            except Exception as exc:
                last = exc
        else:
            raise RuntimeError(f"raw state query failed: {last}")
        rows.extend(data.get("models", []))
        key = (data.get("pagination") or {}).get("next_key")
        if not key:
            break

    samples = []
    for m in rows[:120]:
        kb = decode_b64_loose(m["key"])
        vb = decode_b64_loose(m["value"])
        try:
            ktxt = kb.decode("utf-8")
        except UnicodeDecodeError:
            ktxt = None
        try:
            vtxt = vb.decode("utf-8")
        except UnicodeDecodeError:
            vtxt = None
        samples.append({
            "key_hex": kb.hex(),
            "key_text": ktxt,
            "value_hex_prefix": vb[:80].hex(),
            "value_text_prefix": vtxt[:200] if vtxt is not None else None,
        })
    return len(rows), samples


def all_accounts() -> list[str]:
    accounts: list[str] = []
    start_after = None
    while True:
        query = {"all_accounts": {"limit": 100}}
        if start_after:
            query["all_accounts"]["start_after"] = start_after
        data = smart(LP, query)
        batch = data.get("accounts", [])
        if not batch:
            break
        accounts.extend(batch)
        if len(batch) < 100:
            break
        start_after = batch[-1]
    return accounts


def balance_of(address: str) -> tuple[str, int]:
    data = smart(LP, {"balance": {"address": address}})
    return address, int(data["balance"])


def is_contract(address: str) -> bool:
    for base in JUNO:
        try:
            r = requests.get(
                base.rstrip("/") + f"/cosmwasm/wasm/v1/contract/{address}",
                headers=HEADERS,
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
    token_info = smart(LP, {"token_info": {}})
    try:
        minter = smart(LP, {"minter": {}})
    except Exception:
        minter = None

    accounts = all_accounts()
    balances: dict[str, int] = {}
    with ThreadPoolExecutor(max_workers=12) as ex:
        futures = [ex.submit(balance_of, a) for a in accounts]
        for fut in as_completed(futures):
            address, amount = fut.result()
            if amount > 0:
                balances[address] = amount

    direct_sum = sum(balances.values())
    lp_supply = int(token_info["total_supply"])
    missing = lp_supply - direct_sum

    neta_balance = smart(NETA, {"balance": {"address": PAIR}})
    pool_neta_raw = int(neta_balance["balance"])

    ordered = sorted(balances.items(), key=lambda x: (-x[1], x[0]))
    direct_rows = []
    contract_lp_raw = 0
    for address, amount in ordered[:100]:
        contract = is_contract(address)
        if contract:
            contract_lp_raw += amount
        direct_rows.append({
            "address": address,
            "lp_raw": amount,
            "lp_share_percent_of_total_supply": amount / lp_supply * 100,
            "neta_claim_if_direct": pool_neta_raw * amount / lp_supply / 1_000_000,
            "is_contract": contract,
        })

    raw_count, raw_samples = raw_state_samples()

    result = {
        "lp_token": LP,
        "pair": PAIR,
        "token_info": token_info,
        "minter": minter,
        "cw20_accounts": len(accounts),
        "positive_direct_holders": len(balances),
        "lp_supply_raw": lp_supply,
        "direct_balance_sum_raw": direct_sum,
        "unexplained_or_staked_raw": missing,
        "direct_share_percent": direct_sum / lp_supply * 100,
        "unexplained_or_staked_share_percent": missing / lp_supply * 100,
        "pool_neta_raw": pool_neta_raw,
        "pool_neta": pool_neta_raw / 1_000_000,
        "raw_state_rows": raw_count,
        "raw_state_samples": raw_samples,
        "contract_lp_raw_within_top_100_direct": contract_lp_raw,
        "direct_holders": direct_rows,
    }
    OUT.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print("TOKEN_INFO", json.dumps(token_info, sort_keys=True))
    print("MINTER", json.dumps(minter, sort_keys=True))
    print(f"CW20 accounts: {len(accounts)}; positive direct holders: {len(balances)}")
    print(f"LP total supply raw: {lp_supply}")
    print(f"Direct CW20 balances raw: {direct_sum}")
    print(f"Missing/staked/custodied raw: {missing}")
    print(f"Direct share: {direct_sum / lp_supply * 100:.8f}%")
    print(f"Missing/staked/custodied share: {missing / lp_supply * 100:.8f}%")
    print(f"Pool NETA: {pool_neta_raw / 1_000_000:,.6f}")
    print(f"Raw state rows: {raw_count}")
    print("TOP DIRECT HOLDERS")
    for row in direct_rows[:20]:
        print(json.dumps(row, sort_keys=True))
    print("RAW STATE SAMPLES")
    for row in raw_samples[:80]:
        print(json.dumps(row, sort_keys=True))


if __name__ == "__main__":
    main()
