#!/usr/bin/env python3
"""Read-only diagnostic for WYND JUNO/NETA LP ownership.

This script never touches production holder outputs. It reconstructs LP balances
from both CW20 smart queries and raw contract state, auto-detecting whether raw
state keys are hex- or base64-encoded by the REST endpoint.
"""
from __future__ import annotations

import base64
import json
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import requests

from update_neta_data import JUNO, NETA, TIMEOUT, jint, nskey

LP = "juno1uu3cewmpynvgsdu3lfqv2rh2n5nwtrguahkw64wjk99eg8r6fsss0e757x"
PAIR = "juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
OUT = Path("wynd_lp_diagnostic.json")
HEADERS = {"User-Agent": "NETA-Reborn-LP-Diagnostic/1.0"}
HEX_RE = re.compile(r"^[0-9a-fA-F]+$")


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


def decode_key(value: str) -> tuple[bytes, str]:
    s = value.strip()
    if len(s) % 2 == 0 and HEX_RE.fullmatch(s):
        try:
            return bytes.fromhex(s), "hex"
        except ValueError:
            pass
    return decode_b64_loose(s), "base64"


def fetch_raw_models() -> list[dict]:
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
    return rows


def inspect_raw_state(models: list[dict]) -> dict:
    namespace_counts: dict[str, int] = {}
    key_encodings: dict[str, int] = {}
    raw_balances: dict[str, int] = {}
    samples = []

    for m in models:
        kb, enc = decode_key(m["key"])
        key_encodings[enc] = key_encodings.get(enc, 0) + 1
        vb = decode_b64_loose(m["value"])
        ns, suffix = nskey(kb)
        ns_name = ns if ns is not None else "<binary>"
        namespace_counts[ns_name] = namespace_counts.get(ns_name, 0) + 1

        if ns == "balance" and suffix:
            try:
                address = suffix.decode("utf-8")
                amount = jint(vb)
                if amount > 0:
                    raw_balances[address] = amount
            except Exception:
                pass

        if len(samples) < 80:
            try:
                ktxt = kb.decode("utf-8")
            except UnicodeDecodeError:
                ktxt = None
            try:
                vtxt = vb.decode("utf-8")
            except UnicodeDecodeError:
                vtxt = None
            samples.append({
                "encoding": enc,
                "encoded_key": m["key"],
                "key_hex": kb.hex(),
                "key_text": ktxt,
                "namespace": ns_name,
                "suffix_text": suffix.decode("utf-8", errors="replace") if suffix else "",
                "value_text_prefix": vtxt[:200] if vtxt is not None else None,
            })

    return {
        "row_count": len(models),
        "key_encodings": key_encodings,
        "namespace_counts": namespace_counts,
        "raw_balances": raw_balances,
        "raw_balance_sum": sum(raw_balances.values()),
        "samples": samples,
    }


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
    smart_balances: dict[str, int] = {}
    with ThreadPoolExecutor(max_workers=12) as ex:
        futures = [ex.submit(balance_of, a) for a in accounts]
        for fut in as_completed(futures):
            address, amount = fut.result()
            if amount > 0:
                smart_balances[address] = amount

    lp_supply = int(token_info["total_supply"])
    smart_sum = sum(smart_balances.values())

    models = fetch_raw_models()
    raw = inspect_raw_state(models)
    raw_balances = raw["raw_balances"]
    raw_sum = raw["raw_balance_sum"]

    neta_balance = smart(NETA, {"balance": {"address": PAIR}})
    pool_neta_raw = int(neta_balance["balance"])

    ordered = sorted(raw_balances.items(), key=lambda x: (-x[1], x[0]))
    top_rows = []
    for address, amount in ordered[:100]:
        top_rows.append({
            "address": address,
            "lp_raw": amount,
            "lp_share_percent": amount / lp_supply * 100,
            "neta_claim": pool_neta_raw * amount / lp_supply / 1_000_000,
            "is_contract": is_contract(address),
        })

    result = {
        "lp_token": LP,
        "pair": PAIR,
        "token_info": token_info,
        "minter": minter,
        "lp_supply_raw": lp_supply,
        "pool_neta_raw": pool_neta_raw,
        "pool_neta": pool_neta_raw / 1_000_000,
        "cw20_accounts": len(accounts),
        "smart_positive_holders": len(smart_balances),
        "smart_balance_sum_raw": smart_sum,
        "raw_state_rows": raw["row_count"],
        "raw_key_encodings": raw["key_encodings"],
        "raw_namespace_counts": raw["namespace_counts"],
        "raw_positive_balance_holders": len(raw_balances),
        "raw_balance_sum_raw": raw_sum,
        "raw_supply_check": raw_sum == lp_supply,
        "raw_unexplained_raw": lp_supply - raw_sum,
        "top_raw_holders": top_rows,
        "raw_state_samples": raw["samples"],
    }
    OUT.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print("TOKEN_INFO", json.dumps(token_info, sort_keys=True))
    print("MINTER", json.dumps(minter, sort_keys=True))
    print(f"LP total supply raw: {lp_supply}")
    print(f"CW20 smart accounts: {len(accounts)}; positive: {len(smart_balances)}; sum: {smart_sum}")
    print(f"Raw state rows: {raw['row_count']}; encodings: {raw['key_encodings']}")
    print("Raw namespaces:", json.dumps(raw["namespace_counts"], sort_keys=True))
    print(f"Raw positive balance holders: {len(raw_balances)}; sum: {raw_sum}")
    print(f"Raw supply check: {raw_sum == lp_supply}; unexplained: {lp_supply - raw_sum}")
    print(f"Pool NETA: {pool_neta_raw / 1_000_000:,.6f}")
    print("TOP RAW HOLDERS")
    for row in top_rows[:20]:
        print(json.dumps(row, sort_keys=True))
    print("RAW STATE SAMPLES")
    for row in raw["samples"][:40]:
        print(json.dumps(row, sort_keys=True))


if __name__ == "__main__":
    main()
