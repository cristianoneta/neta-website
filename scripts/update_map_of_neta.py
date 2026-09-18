#!/usr/bin/env python3
"""Incremental, fail-closed Map of NETA collector (forward history only)."""
from __future__ import annotations
import argparse, datetime as dt, json, re, time
from pathlib import Path
from typing import Any
import requests

NETA="juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr"
CW20_DENOM="cw20:"+NETA
WYND_PAIR="juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
JUNO_BRIDGE="juno1v4887y83d6g28puzvt8cl0f3cdhd3y6y9mpysnsp3k8krdm7l6jqgm0rkn"
OSMO_DENOM="ibc/297C64CC42B5A8D8F82FE2EBE208A6FE8F94B86037FA28C4529A23701C228F7A"
JUNO_LCD=["https://juno-api.polkachu.com"]
OSMO_LCD=["https://osmosis-api.polkachu.com","https://lcd.osmosis.zone"]
TIMEOUT=45
FINALITY=5
S=requests.Session(); S.headers.update({"User-Agent":"NETA-Map-Collector/1.0 (+https://netareborn.com)"})
CS="qpzry9x8gf2tvdw0s3jn54khce6mua7l"; CM={c:i for i,c in enumerate(CS)}

def now(): return dt.datetime.now(dt.timezone.utc)
def iso(x): return x.isoformat().replace("+00:00","Z")
def parse_time(s): return dt.datetime.fromisoformat(s.replace("Z","+00:00"))
def get(bases,path,params=None):
    errors=[]
    for base in bases:
        try:
            r=S.get(base.rstrip("/")+path,params=params,timeout=TIMEOUT); r.raise_for_status(); return r.json(),base
        except Exception as e: errors.append(f"{base}: {e}")
    raise RuntimeError("; ".join(errors))
def latest(bases):
    d,ep=get(bases,"/cosmos/base/tendermint/v1beta1/blocks/latest")
    return int(d["block"]["header"]["height"])-FINALITY,ep
def query_txs(bases,expr):
    out=[]; key=None; endpoint=None
    for _ in range(100):
        p={"query":expr,"pagination.limit":"100","order_by":"ORDER_BY_ASC"}
        if key: p["pagination.key"]=key
        d,endpoint=get(bases,"/cosmos/tx/v1beta1/txs",p)
        txs=d.get("txs") or []; rs=d.get("tx_responses") or []
        by_hash={r.get("txhash"):r for r in rs}
        for tx in txs:
            body=tx.get("body") or {}; msgs=body.get("messages") or []
            h=None
            # Responses and txs are normally parallel; preserve fallback by index below.
            out.append({"tx":tx,"response":None,"messages":msgs})
        for i,r in enumerate(rs):
            if i<len(out) and out[-len(txs)+i]["response"] is None: out[-len(txs)+i]["response"]=r
        key=(d.get("pagination") or {}).get("next_key")
        if not key: break
    else: raise RuntimeError("transaction pagination exceeded 10,000 results")
    return out,endpoint

def attrs(ev): return {a.get("key"):a.get("value") for a in ev.get("attributes") or []}
def events(item): return (item.get("response") or {}).get("events") or []
def sender(item):
    for m in item.get("messages") or []:
        if m.get("sender"): return m["sender"]
    for ev in events(item):
        a=attrs(ev)
        if ev.get("type")=="message" and a.get("sender"): return a["sender"]
    return None
def txmeta(item):
    r=item.get("response") or {}
    return r.get("txhash"),int(r.get("height") or 0),r.get("timestamp")
def amount_coin(s,denom):
    m=re.fullmatch(r"(\d+)"+re.escape(denom),s or "")
    return int(m.group(1)) if m else None

def decode5(data):
    acc=bits=0; out=[]; maxacc=(1<<12)-1
    for v in data:
        acc=((acc<<5)|v)&maxacc; bits+=5
        while bits>=8: bits-=8; out.append((acc>>bits)&255)
    return bytes(out)
def identity(a):
    if not a or "1" not in a: return a or "unknown"
    p=a.rfind("1")
    try: return decode5([CM[c] for c in a[p+1:-6]]).hex()
    except Exception: return a
def event_id(chain,h,kind,index): return f"{chain}:{h}:{kind}:{index}"

def parse_wynd(items):
    out=[]
    for it in items:
        h,height,ts=txmeta(it)
        if not h or not ts or (it.get("response") or {}).get("code",0)!=0: continue
        who=sender(it)
        for i,ev in enumerate(events(it)):
            if ev.get("type")!="wasm": continue
            a=attrs(ev)
            if a.get("_contract_address")!=WYND_PAIR or a.get("action")!="swap": continue
            offer=a.get("offer_asset") or a.get("offer_asset_info") or ""
            ask=a.get("ask_asset") or a.get("ask_asset_info") or ""
            if NETA in offer:
                raw=int(a.get("offer_amount") or a.get("amount") or 0); direction="sell"
            elif NETA in ask:
                raw=int(a.get("return_amount") or a.get("ask_amount") or 0); direction="buy"
            else: continue
            if raw>0: out.append({"id":event_id("juno",h,"wynd",i),"timestamp":ts,"height":height,"type":"swap","chain":"juno","market":"wynd","wallet":who,"wallet_id":identity(who),"direction":direction,"neta_raw":raw,"txhash":h})
    return out

def parse_pool(items):
    out=[]
    for it in items:
        h,height,ts=txmeta(it)
        if not h or not ts or (it.get("response") or {}).get("code",0)!=0: continue
        who=sender(it)
        for i,ev in enumerate(events(it)):
            if ev.get("type")!="token_swapped": continue
            a=attrs(ev)
            if a.get("pool_id")!="631": continue
            bought=amount_coin(a.get("tokens_out"),OSMO_DENOM)
            sold=amount_coin(a.get("tokens_in"),OSMO_DENOM)
            if bought: direction,raw="buy",bought
            elif sold: direction,raw="sell",sold
            else: continue
            out.append({"id":event_id("osmosis",h,"pool631",i),"timestamp":ts,"height":height,"type":"swap","chain":"osmosis","market":"pool-631","wallet":who,"wallet_id":identity(who),"direction":direction,"neta_raw":raw,"txhash":h})
    return out

def address_prefix(address):
    if not address or "1" not in address: return None
    prefix=address.split("1",1)[0].lower()
    return prefix if re.fullmatch(r"[a-z0-9]{2,20}",prefix) else None

def resolve_remote_chain(a,registry,outbound):
    explicit=a.get("chain_id") or a.get("dest_chain_id") or a.get("destination_chain_id")
    if explicit:
        for chain_id,cfg in registry["chains"].items():
            if explicit==chain_id or explicit in cfg.get("chain_ids",[]): return chain_id,"event_chain_id"
    channel=a.get("channel") or a.get("channel_id") or a.get("dest_channel") or a.get("dest_channel_id")
    if channel and channel in registry.get("juno_channels",{}):
        return registry["juno_channels"][channel],"verified_channel"
    remote_address=a.get("receiver") if outbound else a.get("sender")
    prefix=address_prefix(remote_address)
    if prefix and prefix in registry.get("prefixes",{}):
        return registry["prefixes"][prefix],"address_prefix"
    return ("unknown:"+channel if channel else "unknown"),"unresolved"

def parse_ibc(items,registry):
    out=[]
    for it in items:
        h,height,ts=txmeta(it)
        if not h or not ts or (it.get("response") or {}).get("code",0)!=0: continue
        for i,ev in enumerate(events(it)):
            if ev.get("type")!="wasm": continue
            a=attrs(ev)
            if a.get("_contract_address")!=JUNO_BRIDGE or a.get("denom")!=CW20_DENOM: continue
            action=a.get("action")
            if action=="transfer":
                remote,method=resolve_remote_chain(a,registry,True); src,dst="juno",remote
            elif action=="receive" and a.get("success")=="true":
                remote,method=resolve_remote_chain(a,registry,False); src,dst=remote,"juno"
            else: continue
            raw=int(a.get("amount") or 0)
            channel=a.get("channel") or a.get("channel_id") or a.get("dest_channel") or a.get("dest_channel_id")
            verified=remote in registry["chains"] and registry["chains"][remote].get("movement_verified",False)
            if raw>0: out.append({"id":event_id("juno",h,"ibc",i),"timestamp":ts,"height":height,"type":"ibc","from_chain":src,"to_chain":dst,"remote_chain":remote,"chain_resolution":method,"chain_verified":verified,"channel":channel,"sender":a.get("sender"),"receiver":a.get("receiver"),"neta_raw":raw,"txhash":h})
    return out

def load_json(path,default):
    return json.loads(path.read_text()) if path.exists() else default
def write_json(path,data):
    path.parent.mkdir(parents=True,exist_ok=True); path.write_text(json.dumps(data,indent=2,sort_keys=True)+"\n")

def aggregate(root,all_events,state,metadata,registry,holder_totals=None):
    holder_totals=holder_totals or {}
    t=now(); cutoff=t-dt.timedelta(hours=24)
    recent=[e for e in all_events if parse_time(e["timestamp"])>=cutoff]
    flows=[e for e in recent if e["type"]=="ibc"]; swaps=[e for e in recent if e["type"]=="swap"]
    route_raw={}
    for e in flows:
        key=(e["from_chain"],e["to_chain"]); route_raw[key]=route_raw.get(key,0)+e["neta_raw"]
    routes=[{"from_chain":a,"to_chain":b,"neta":round(raw/1e6,6),"transfers":sum(1 for e in flows if e["from_chain"]==a and e["to_chain"]==b)} for (a,b),raw in sorted(route_raw.items())]
    j2o=route_raw.get(("juno","osmosis"),0)/1e6; o2j=route_raw.get(("osmosis","juno"),0)/1e6
    discovered={}
    for e in (x for x in all_events if x["type"]=="ibc"):
        remote=e.get("remote_chain") or (e["to_chain"] if e["from_chain"]=="juno" else e["from_chain"])
        x=discovered.setdefault(remote,{"id":remote,"name":registry["chains"].get(remote,{}).get("name",remote),"movement_verified":bool(e.get("chain_verified")),"ranking_supported":registry["chains"].get(remote,{}).get("ranking_supported",False),"events":0}); x["events"]+=1
    movers={}
    for e in swaps:
        x=movers.setdefault(e["wallet_id"],{"wallet":e.get("wallet"),"bought_raw":0,"sold_raw":0,"swaps":0})
        if e["direction"]=="buy": x["bought_raw"]+=e["neta_raw"]
        else: x["sold_raw"]+=e["neta_raw"]
        x["swaps"]+=1
    for x in movers.values(): x["net_raw"]=x["bought_raw"]-x["sold_raw"]
    by_chain={}
    for e in swaps: by_chain[e["chain"]]=by_chain.get(e["chain"],0)+1
    buyers=sorted((x for x in movers.values() if x["net_raw"]>0),key=lambda x:-x["net_raw"])[:3]; sellers=sorted((x for x in movers.values() if x["net_raw"]<0),key=lambda x:x["net_raw"])[:3]
    def public(x): return {"wallet":x["wallet"],"net_neta":round(x["net_raw"]/1e6,6),"bought_neta":round(x["bought_raw"]/1e6,6),"sold_neta":round(x["sold_raw"]/1e6,6),"swaps":x["swaps"],"total_neta":holder_totals.get(x["wallet"],0.0)}
    def transfer_public(e): return {"neta":round(e["neta_raw"]/1e6,6),"from_chain":e["from_chain"],"to_chain":e["to_chain"],"wallet":e.get("sender") or e.get("receiver"),"wallet_chain":e["from_chain"],"timestamp":e["timestamp"],"txhash":e["txhash"]}
    def top_transfers(hours):
        selected=(e for e in all_events if e["type"]=="ibc" and parse_time(e["timestamp"])>=t-dt.timedelta(hours=hours))
        return [transfer_public(e) for e in sorted(selected,key=lambda e:(-e["neta_raw"],e["timestamp"],e["id"]))[:3]]
    supply=float(metadata["total_supply_neta"]); osmo=float(metadata["excluded_bridge_escrow_neta"]); started=parse_time(state["collection_started_at"]); elapsed_hours=max(0,(t-started).total_seconds()/3600)
    periods={label:{"available":elapsed_hours>=hours,"coverage_percent":round(min(1,elapsed_hours/hours)*100,2),"top_ibc_transfers":top_transfers(hours)} for label,hours in (("24h",24),("7d",168),("30d",720),("90d",2160))}
    chain_totals_match=sum(by_chain.values())==len(swaps)
    return {"schema_version":1,"generated_at":iso(t),"collection_started_at":state["collection_started_at"],"validation":{"passed":chain_totals_match,"event_ids_unique":len(all_events)==len({e["id"] for e in all_events}),"cursors_monotonic":True,"unknown_routes_not_misclassified":all(not (e.get("chain_resolution")=="unresolved" and e.get("remote_chain")=="osmosis") for e in flows),"swap_chain_totals_match":chain_totals_match},"periods":periods,"chains":[{"id":"juno-1","name":"Juno","role":"origin","neta":round(supply-osmo,6)},{"id":"osmosis-1","name":"Osmosis","role":"ibc","neta":round(osmo,6)},{"id":"phoenix-1","name":"Terra","role":"future","neta":0.0}],"flows":{"juno_to_osmosis_neta":round(j2o,6),"osmosis_to_juno_neta":round(o2j,6),"volume_neta":round(j2o+o2j,6),"net_to_osmosis_neta":round(j2o-o2j,6),"transfers":len(flows),"routes":routes,"top_transfers":periods["24h"]["top_ibc_transfers"],"discovered_chains":sorted(discovered.values(),key=lambda x:x["id"])},"market":{"swaps":len(swaps),"by_chain":dict(sorted(by_chain.items())),"power_buyers":[public(x) for x in buyers],"top_sellers":[public(x) for x in sellers]}}

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--root",default="."); a=ap.parse_args(); root=Path(a.root)
    state_path=root/"data/map/state.json"; state=load_json(state_path,{})
    registry=load_json(root/"data/map/chains.json",{})
    if registry.get("schema_version")!=1 or "juno" not in registry.get("chains",{}): raise RuntimeError("invalid chain registry")
    j_latest,j_ep=latest(JUNO_LCD); o_latest,o_ep=latest(OSMO_LCD)
    if not state:
        state={"schema_version":1,"collection_started_at":iso(now()),"juno_last_height":j_latest,"osmosis_last_height":o_latest}
        new=[]
    else:
        j0=int(state["juno_last_height"]); o0=int(state["osmosis_last_height"])
        if j_latest<j0 or o_latest<o0: raise RuntimeError("chain height moved backwards")
        jq=lambda event:f"{event} AND tx.height>{j0} AND tx.height<={j_latest}"
        oq=lambda event:f"{event} AND tx.height>{o0} AND tx.height<={o_latest}"
        wynd,_=query_txs(JUNO_LCD,jq(f"wasm._contract_address='{WYND_PAIR}'"))
        bridge,_=query_txs(JUNO_LCD,jq(f"wasm._contract_address='{JUNO_BRIDGE}'"))
        pool,_=query_txs(OSMO_LCD,oq("token_swapped.pool_id='631'"))
        new=parse_wynd(wynd)+parse_ibc(bridge,registry)+parse_pool(pool)
        state["juno_last_height"]=j_latest; state["osmosis_last_height"]=o_latest
    existing=[]
    for p in sorted((root/"data/map/days").glob("*.json")):
        existing+=load_json(p,{}).get("events",[])
    merged={e["id"]:e for e in existing}
    for e in new: merged[e["id"]]=e
    all_events=sorted(merged.values(),key=lambda e:(e["timestamp"],e["id"]))
    by_day={}
    for e in all_events: by_day.setdefault(e["timestamp"][:10],[]).append(e)
    for day,es in by_day.items(): write_json(root/f"data/map/days/{day}.json",{"date":day,"events":es})
    metadata=load_json(root/"metadata.json",{})
    if not metadata.get("validation",{}).get("passed"): raise RuntimeError("holder metadata is not validated")
    address_index=load_json(root/"address_index.json",{})
    fields=address_index.get("fields") or []
    holder_totals={}
    for values in address_index.get("rows") or []:
        row=dict(zip(fields,values)); total=float(row.get("total_neta") or 0)
        for address in (row.get("juno_address"),row.get("osmosis_address")):
            if address: holder_totals[address]=total
    public=aggregate(root,all_events,state,metadata,registry,holder_totals)
    if not all(public["validation"].values()): raise RuntimeError("Map validation failed")
    state["updated_at"]=public["generated_at"]; state["juno_endpoint"]=j_ep; state["osmosis_endpoint"]=o_ep
    write_json(state_path,state); write_json(root/"data/map/map-of-neta.json",public)
    size=(root/"data/map/map-of-neta.json").stat().st_size
    if size>1_000_000: print(f"WARNING: public map JSON is {size} bytes")
    print(json.dumps({"new_events":len(new),"stored_events":len(all_events),"state":state,"flows":public["flows"],"market":public["market"]},indent=2))
if __name__=="__main__": main()
