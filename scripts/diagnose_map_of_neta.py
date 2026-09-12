#!/usr/bin/env python3
"""Read-only discovery of real NETA IBC and swap event shapes.

This diagnostic intentionally does not publish Map of NETA metrics. It records
small, bounded samples so production parsers can be based on observed events.
"""
from __future__ import annotations
import base64
import datetime as dt
import json
from typing import Any
import requests

TIMEOUT=45
WYND_PAIR="juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
NETA="juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr"
JUNO_BRIDGE="juno1v4887y83d6g28puzvt8cl0f3cdhd3y6y9mpysnsp3k8krdm7l6jqgm0rkn"
OSMO_DENOM="ibc/297C64CC42B5A8D8F82FE2EBE208A6FE8F94B86037FA28C4529A23701C228F7A"
JUNO_LCD=["https://juno-api.polkachu.com","https://juno-api.lavenderfive.com:443","https://api-juno.itastakers.com"]
OSMO_LCD=["https://osmosis-api.polkachu.com","https://lcd.osmosis.zone","https://osmosis-api.lavenderfive.com:443","https://api-osmosis-ia.cosmosia.notional.ventures"]
JUNO_RPC=["https://juno-rpc.polkachu.com","https://juno-rpc.lavenderfive.com:443","https://rpc-juno.itastakers.com"]
OSMO_RPC=["https://rpc.osmosis.zone","https://osmosis-rpc.polkachu.com","https://osmosis-rpc.lavenderfive.com:443","https://rpc-osmosis.ecostake.com"]
S=requests.Session()
S.headers.update({"User-Agent":"NETA-Map-Diagnostic/0.1 (+https://netareborn.com)"})

def get_first(bases: list[str], path: str, params: Any=None) -> dict:
    errors=[]
    for base in bases:
        try:
            r=S.get(base.rstrip("/")+path,params=params,timeout=TIMEOUT)
            r.raise_for_status()
            return {"endpoint":base,"ok":True,"data":r.json()}
        except Exception as e:
            errors.append(f"{base}: {e}; body={getattr(getattr(e, 'response', None), 'text', '')[:500]}")
    return {"ok":False,"errors":errors}

def lcd_txs(bases: list[str], events: list[str], limit: int=8) -> dict:
    params=[("events",e) for e in events]
    params += [("pagination.limit",str(limit)),("order_by","ORDER_BY_DESC")]
    return get_first(bases,"/cosmos/tx/v1beta1/txs",params)

def rpc_search(bases: list[str], query: str, limit: int=8) -> dict:
    return get_first(bases,"/tx_search",{
        "query":json.dumps(query),"prove":"false","page":"1",
        "per_page":str(limit),"order_by":"desc"
    })

def b64text(x: str) -> str:
    try: return base64.b64decode(x).decode("utf-8")
    except Exception: return x

def compact_rpc(result: dict) -> dict:
    if not result.get("ok"): return result
    root=result["data"].get("result") or {}
    out=[]
    for tx in root.get("txs") or []:
        events=[]
        for ev in ((tx.get("tx_result") or {}).get("events") or []):
            attrs={b64text(a.get("key","")):b64text(a.get("value","")) for a in ev.get("attributes") or []}
            events.append({"type":ev.get("type"),"attributes":attrs})
        out.append({"hash":tx.get("hash"),"height":tx.get("height"),"code":(tx.get("tx_result") or {}).get("code",0),"events":events})
    return {"ok":True,"endpoint":result.get("endpoint"),"total":root.get("total_count"),"txs":out}

def compact_lcd(result: dict) -> dict:
    if not result.get("ok"): return result
    d=result["data"]; txs=d.get("txs") or []; responses=d.get("tx_responses") or []
    out=[]
    for i,resp in enumerate(responses):
        body={}
        if i<len(txs): body=((txs[i].get("body") or {}).get("messages") or [])
        events=[]
        for log in resp.get("logs") or []:
            for ev in log.get("events") or []:
                events.append({"type":ev.get("type"),"attributes":{a.get("key"):a.get("value") for a in ev.get("attributes") or []}})
        out.append({"hash":resp.get("txhash"),"height":resp.get("height"),"timestamp":resp.get("timestamp"),"code":resp.get("code"),"messages":body,"events":events})
    return {"ok":True,"endpoint":result.get("endpoint"),"txs":out,"pagination":d.get("pagination")}

def main() -> None:
    probes={
      "wynd_lcd_pair":compact_lcd(lcd_txs(JUNO_LCD,[f"wasm._contract_address='{WYND_PAIR}'"])),
      "wynd_lcd_swap":compact_lcd(lcd_txs(JUNO_LCD,[f"wasm._contract_address='{WYND_PAIR}'","wasm.action='swap'"])),
      "juno_bridge_lcd":compact_lcd(lcd_txs(JUNO_LCD,[f"wasm._contract_address='{JUNO_BRIDGE}'"])),
      "juno_neta_lcd":compact_lcd(lcd_txs(JUNO_LCD,[f"wasm._contract_address='{NETA}'"])),
      "pool631_lcd":compact_lcd(lcd_txs(OSMO_LCD,["token_swapped.pool_id='631'"])),
      "pool631_rpc":compact_rpc(rpc_search(OSMO_RPC,"token_swapped.pool_id='631'")),
      "osmo_neta_packets":compact_rpc(rpc_search(OSMO_RPC,f"send_packet.packet_data CONTAINS '{OSMO_DENOM}'")),
      "osmo_neta_transfers":compact_rpc(rpc_search(OSMO_RPC,f"transfer.amount CONTAINS '{OSMO_DENOM}'")),
      "juno_bridge_rpc":compact_rpc(rpc_search(JUNO_RPC,f"wasm._contract_address='{JUNO_BRIDGE}'")),
    }
    report={
      "generated_at":dt.datetime.now(dt.timezone.utc).isoformat().replace("+00:00","Z"),
      "purpose":"event-shape discovery only; not production Map of NETA data",
      "constants":{"wynd_pair":WYND_PAIR,"neta_cw20":NETA,"juno_bridge":JUNO_BRIDGE,"osmosis_neta_denom":OSMO_DENOM,"pool_id":"631"},
      "probes":probes,
    }
    with open("map-of-neta-diagnostic.json","w",encoding="utf-8") as f:
        json.dump(report,f,indent=2)
    summary={k:{"ok":v.get("ok"),"txs":len(v.get("txs") or []),"endpoint":v.get("endpoint"),"errors":v.get("errors")} for k,v in probes.items()}
    print(json.dumps(summary,indent=2))

if __name__=="__main__":
    main()
