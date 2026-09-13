#!/usr/bin/env python3
"""Unsigned two-message simulation for the wallet-scoped JUNO/NETA LP pilot."""
import base64
import json

import requests

import simulate_wynd_recovery as recovery_sim
from simulate_wynd_recovery import bfield, vfield

recovery_sim.LCDS = [
    "https://juno-api.kleomedes.network",
    "https://juno-rest.publicnode.com",
    "https://juno-api.polkachu.com",
]

SENDER = "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57"
PAIR = "juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
NETA = "juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr"
JUNO_RAW = 1_000_000
MAX_NETA_RAW = 10_200
MEMO = "netareborn.com/wynd-recovery:liquidity-pilot:v1"


def execute_any(contract, message, funds=()):
    wasm = bfield(1, SENDER) + bfield(2, contract)
    wasm += bfield(3, json.dumps(message, separators=(",", ":")).encode())
    for denom, amount in funds:
        # Field 4 is reserved in MsgExecuteContract; native funds use field 5.
        wasm += bfield(5, bfield(1, denom) + bfield(2, str(amount)))
    return bfield(1, "/cosmwasm.wasm.v1.MsgExecuteContract") + bfield(2, wasm)


def main():
    acc, endpoint = recovery_sim.account(SENDER)
    pool_query = base64.b64encode(b'{"pool":{}}').decode()
    pool = requests.get(f"{endpoint}/cosmwasm/wasm/v1/contract/{PAIR}/smart/{pool_query}", timeout=30).json()["data"]
    juno_reserve = int(next(a["amount"] for a in pool["assets"] if a["info"].get("native") == "ujuno"))
    neta_reserve = int(next(a["amount"] for a in pool["assets"] if a["info"].get("token") == NETA))
    neta_raw = JUNO_RAW * neta_reserve // juno_reserve
    if not 0 < neta_raw <= MAX_NETA_RAW:
        raise RuntimeError("live NETA ratio exceeds pilot cap")
    height = int(requests.get(endpoint + "/cosmos/base/tendermint/v1beta1/blocks/latest", timeout=30).json()["block"]["header"]["height"])
    messages = [
        execute_any(NETA, {"increase_allowance": {"spender": PAIR, "amount": str(neta_raw), "expires": {"at_height": height + 100}}}),
        execute_any(PAIR, {"provide_liquidity": {"assets": [{"info": {"native": "ujuno"}, "amount": str(JUNO_RAW)}, {"info": {"token": NETA}, "amount": str(neta_raw)}], "slippage_tolerance": "0.01", "receiver": SENDER}}, (("ujuno", JUNO_RAW),)),
    ]
    pub = acc["pub_key"]
    pub_value = bfield(1, base64.b64decode(pub["key"]))
    pub_any = bfield(1, pub.get("@type", "/cosmos.crypto.secp256k1.PubKey")) + bfield(2, pub_value)
    body = b"".join(bfield(1, message) for message in messages) + bfield(2, MEMO)
    signer = bfield(1, pub_any) + bfield(2, bfield(1, vfield(1, 1))) + vfield(3, int(acc["sequence"]))
    raw = bfield(1, body) + bfield(2, bfield(1, signer) + bfield(2, vfield(2, 900_000))) + bfield(3, bytes(64))
    response = requests.post(endpoint + "/cosmos/tx/v1beta1/simulate", json={"tx_bytes": base64.b64encode(raw).decode()}, timeout=120)
    payload = response.json()
    if not response.ok:
        raise RuntimeError(json.dumps(payload, sort_keys=True))
    result = {"status": "VALIDATED", "unsigned": True, "broadcast": False, "sender": SENDER, "juno_raw": JUNO_RAW, "neta_raw": neta_raw, "height": height, "gas_info": payload.get("gas_info")}
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
