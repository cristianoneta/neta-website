#!/usr/bin/env python3
"""Daily NETA Reborn on-chain indexer. Fail-closed: outputs are replaced only after all checks pass."""
from __future__ import annotations
import argparse, base64, datetime as dt, json, os, re, tempfile, time
from pathlib import Path
from typing import Dict, List, Tuple
from urllib.parse import quote
import requests

NETA="juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr"
DAO="juno1a7x8aj7k38vnj9edrlymkerhrl5d4ud3makmqhx6vt3dhu0d824qh038zh"
ESCROW="juno1v4887y83d6g28puzvt8cl0f3cdhd3y6y9mpysnsp3k8krdm7l6jqgm0rkn"
OSMOSIS_NETA_CHANNEL="channel-47"
OSMOSIS_NETA_COUNTERPARTY="channel-169"
DENOM="ibc/297C64CC42B5A8D8F82FE2EBE208A6FE8F94B86037FA28C4529A23701C228F7A"
WYND_PAIR="juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
OSMO_POOL_ADDR="osmo1yn7z42al3mafmztjayjduz42a8at3whyd279fkdsyumzar83x8mqvpw83x"
OSMO_SHARE_DENOM="gamm/pool/631"
JUNO=["https://juno-api.polkachu.com"]
OSMO=["https://rpc.osmosis.zone","https://osmosis-rpc.polkachu.com"]
TIMEOUT=45
S=requests.Session(); S.headers.update({"User-Agent":"NETA-Reborn-Indexer/1.0 (+https://netareborn.com)"})
LABELS={
 "juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra":("pool","WYND JUNO/NETA Pool"),
 "juno1e8n6ch7msks487ecznyeagmzd5ml2pq9tgedqt2u63vra0q0r9mqrjy6ys":("pool","JUNO/NETA Pool"),
 "osmo1yn7z42al3mafmztjayjduz42a8at3whyd279fkdsyumzar83x8mqvpw83x":("pool","Osmosis Pool 631"),
 NETA:("token_contract","NETA Token Contract"),
}
ADDRESS_INDEX_FIELDS=("rank","juno_address","osmosis_address","juno_neta","osmosis_neta","neta_dao_staking","neta_dao_unstaking","neta_dao_claimable","lp_neta","total_neta","type","label")

def log(x): print(f"[NETA] {x}",flush=True)

def req_json(bases,path,params=None,retries=3):
    err=None
    for base in bases:
        for n in range(retries):
            try:
                r=S.get(base.rstrip('/')+path,params=params,timeout=TIMEOUT); r.raise_for_status(); return r.json(),base
            except Exception as e:
                err=e; time.sleep(min(2**n,5))
        log(f"endpoint failed: {base}")
    raise RuntimeError(f"all endpoints failed for {path}: {err}")

def smart_query(contract,msg):
    encoded=quote(base64.b64encode(json.dumps(msg,separators=(',',':')).encode()).decode(),safe='')
    data,endpoint=req_json(JUNO,f"/cosmwasm/wasm/v1/contract/{contract}/smart/{encoded}")
    if "data" not in data: raise RuntimeError(f"smart query returned no data for {contract}")
    return data["data"],endpoint

def cw20_amount(amounts,contract):
    found=[]
    for item in amounts:
        cw20=item.get("cw20") if isinstance(item,dict) else None
        if isinstance(cw20,dict) and cw20.get("address")==contract:
            found.append(int(cw20["amount"]))
    if len(found)>1: raise RuntimeError(f"duplicate CW20 balance for {contract}")
    return found[0] if found else 0

def bridge_accounting():
    """Return per-channel NETA liabilities and open packet commitments."""
    listing,endpoint=smart_query(ESCROW,{"list_channels":{}})
    channels=listing.get("channels")
    if not isinstance(channels,list) or not channels:
        raise RuntimeError("ICS20 contract returned no channels")
    ids=[item.get("id") for item in channels if isinstance(item,dict)]
    if len(ids)!=len(channels) or len(set(ids))!=len(ids):
        raise RuntimeError("ICS20 contract returned invalid or duplicate channel IDs")

    liabilities={}; commitments={}; port=f"wasm.{ESCROW}"
    for info in channels:
        channel=info["id"]
        detail,_=smart_query(ESCROW,{"channel":{"id":channel}})
        if detail.get("info")!=info:
            raise RuntimeError(f"ICS20 channel metadata changed while reading {channel}")
        amount=cw20_amount(detail.get("balances",[]),NETA)
        if amount: liabilities[channel]=amount
        packet_data,_=req_json(JUNO,f"/ibc/core/channel/v1/channels/{channel}/ports/{port}/packet_commitments",{"pagination.limit":"1000"})
        rows=packet_data.get("commitments")
        if not isinstance(rows,list):
            raise RuntimeError(f"packet commitment query returned invalid data for {channel}")
        sequences=[]
        for row in rows:
            if row.get("channel_id")!=channel or row.get("port_id")!=port:
                raise RuntimeError(f"packet commitment identity mismatch for {channel}")
            sequences.append(int(row["sequence"]))
        if sequences: commitments[channel]=sorted(sequences)

    osmosis=next((x for x in channels if x.get("id")==OSMOSIS_NETA_CHANNEL),None)
    expected={"port_id":"transfer","channel_id":OSMOSIS_NETA_COUNTERPARTY}
    if not osmosis or osmosis.get("counterparty_endpoint")!=expected:
        raise RuntimeError("Osmosis NETA channel identity mismatch")
    return liabilities,commitments,endpoint

# ---- bech32 ----
CS="qpzry9x8gf2tvdw0s3jn54khce6mua7l"; CM={c:i for i,c in enumerate(CS)}
def polymod(vs):
    g=[0x3b6a57b2,0x26508e6d,0x1ea119fa,0x3d4233dd,0x2a1462b3]; chk=1
    for v in vs:
        top=chk>>25; chk=((chk&0x1ffffff)<<5)^v
        for i in range(5): chk^=g[i] if ((top>>i)&1) else 0
    return chk
def hrpex(h): return [ord(x)>>5 for x in h]+[0]+[ord(x)&31 for x in h]
def checksum(h,d):
    p=polymod(hrpex(h)+d+[0]*6)^1; return [(p>>5*(5-i))&31 for i in range(6)]
def conv(data,fb,tb,pad=True):
    acc=bits=0; out=[]; maxv=(1<<tb)-1; maxacc=(1<<(fb+tb-1))-1
    for value in data:
        if value<0 or value>>fb: raise ValueError("invalid convertbits")
        acc=((acc<<fb)|value)&maxacc; bits+=fb
        while bits>=tb: bits-=tb; out.append((acc>>bits)&maxv)
    if pad and bits: out.append((acc<<(tb-bits))&maxv)
    elif bits>=fb or ((acc<<(tb-bits))&maxv): raise ValueError("invalid padding")
    return out
def b32enc(hrp,raw):
    d=conv(raw,8,5,True); return hrp+'1'+''.join(CS[x] for x in d+checksum(hrp,d))
def payload(addr):
    p=addr.rfind('1')
    if p<=0: raise ValueError(f"bad bech32 {addr}")
    return bytes(conv([CM[c] for c in addr[p+1:-6]],5,8,False))

# ---- CosmWasm raw state ----
def contract_state(addr):
    rows=[]; key=None; endpoint=None
    while True:
        q={"pagination.limit":"5000"}
        if key: q["pagination.key"]=key
        d,endpoint=req_json(JUNO,f"/cosmwasm/wasm/v1/contract/{addr}/state",q)
        rows += [(base64.b64decode(x["key"]),base64.b64decode(x["value"])) for x in d.get("models",[])]
        key=(d.get("pagination") or {}).get("next_key")
        if not key: break
    log(f"contract {addr[:15]}…: {len(rows):,} rows via {endpoint}"); return rows

def nskey(k):
    if len(k)>=2:
        n=int.from_bytes(k[:2],'big')
        if 0<n<=len(k)-2:
            try: return k[2:2+n].decode(),k[2+n:]
            except UnicodeDecodeError: pass
    try: return k.decode(),b''
    except UnicodeDecodeError: return None,b''
def jval(raw): return json.loads(raw.decode())
def jint(raw):
    v=jval(raw)
    if isinstance(v,(str,int)): return int(v)
    if isinstance(v,dict):
        for k in ("amount","value","total"):
            if k in v: return int(v[k])
    raise ValueError(f"cannot parse integer from {raw[:100]!r}")

def scan_juno():
    bal={}; info=None
    for k,v in contract_state(NETA):
        ns,suf=nskey(k)
        if ns=="balance" and suf:
            a=suf.decode(); x=jint(v)
            if x>0: bal[a]=x
        elif k==b"token_info" or ns=="token_info":
            try: info=jval(v)
            except Exception: pass
    if not bal: raise RuntimeError("Juno scan returned zero balances")
    sm=sum(bal.values()); supply=int(info["total_supply"]) if isinstance(info,dict) and "total_supply" in info else sm
    src="cw20_token_info" if isinstance(info,dict) and "total_supply" in info else "sum_of_cw20_balances"
    if sm!=supply: raise RuntimeError(f"CW20 balance sum {sm} != supply {supply}")
    log(f"Juno: {len(bal):,} holders / {supply/1e6:,.6f} NETA"); return bal,supply,src

def juno_snapshot():
    d,ep=req_json(JUNO,"/cosmos/base/tendermint/v1beta1/blocks/latest")
    h=d["block"]["header"]
    when=dt.datetime.fromisoformat(h["time"].replace("Z","+00:00"))
    return int(h["height"]),int(when.timestamp()*1_000_000_000),when.isoformat(),ep

def claim_is_released(release_at,height,now_ns):
    if not isinstance(release_at,dict) or len(release_at)!=1:
        raise ValueError(f"unexpected release_at: {release_at!r}")
    kind,value=next(iter(release_at.items())); value=int(value)
    if kind=="at_time": return value<=now_ns
    if kind=="at_height": return value<=height
    raise ValueError(f"unexpected release_at kind: {kind}")

def scan_dao():
    height,now_ns,block_time,endpoint=juno_snapshot()
    staked={}; unbonding={}; claimable={}; stored_total=None; claim_records=0
    for k,v in contract_state(DAO):
        ns,suf=nskey(k)
        if ns=="staked_balances" and suf:
            a=suf.decode(); x=jint(v)
            if x>0: staked[a]=x
        elif ns=="claims" and suf:
            a=suf.decode(); x=jval(v)
            if isinstance(x,dict): x=x.get("claims",x.get("items",[]))
            if not isinstance(x,list): raise ValueError(f"unexpected claims for {a}")
            for item in x:
                if not isinstance(item,dict): continue
                amt=int(item.get("amount",0))
                if amt<=0: continue
                target=claimable if claim_is_released(item.get("release_at"),height,now_ns) else unbonding
                target[a]=target.get(a,0)+amt; claim_records+=1
        elif k==b"total_staked" or ns=="total_staked":
            try: stored_total=jint(v)
            except Exception: pass
    active=sum(staked.values())
    if stored_total is not None and active!=stored_total: raise RuntimeError(f"active {active} != total_staked {stored_total}")
    log(f"DAO at Juno {height:,} ({block_time}): {len(staked):,} active / {active/1e6:,.6f}; "
        f"{len(unbonding):,} unbonding / {sum(unbonding.values())/1e6:,.6f}; "
        f"{len(claimable):,} claimable / {sum(claimable.values())/1e6:,.6f}")
    return staked,unbonding,claimable,{"height":height,"block_time":block_time,"endpoint":endpoint,"claim_records":claim_records}

# ---- protobuf + Osmosis bank KV scan ----
def varint(buf,p):
    out=shift=0
    while True:
        if p>=len(buf): raise ValueError("truncated varint")
        b=buf[p]; p+=1; out|=(b&127)<<shift
        if not b&128: return out,p
        shift+=7
        if shift>70: raise ValueError("varint too long")
def fields(buf):
    p=0
    while p<len(buf):
        tag,p=varint(buf,p); f,w=tag>>3,tag&7
        if w==0: v,p=varint(buf,p)
        elif w==2:
            n,p=varint(buf,p)
            if p+n>len(buf): raise ValueError("truncated length-delimited field")
            v=buf[p:p+n]; p+=n
        elif w==1:
            if p+8>len(buf): raise ValueError("truncated fixed64")
            v=buf[p:p+8]; p+=8
        elif w==5:
            if p+4>len(buf): raise ValueError("truncated fixed32")
            v=buf[p:p+4]; p+=4
        else: raise ValueError(f"unsupported wire {w}")
        yield f,w,v
def kvpair(msg):
    k=v=b''
    for f,w,x in fields(msg):
        if w==2 and f==1: k=x
        elif w==2 and f==2: v=x
    if not k: raise ValueError("KVPair without key")
    return k,v
def kvpairs(buf):
    out=[]
    for f,w,x in fields(buf):
        if w==2 and f==1:
            try: out.append(kvpair(x))
            except Exception: pass
    if buf and not out: raise ValueError("non-empty subspace response without KVPairs")
    return out
def bank_amount(raw,expected_denom=DENOM):
    """Decode Cosmos SDK bank BalanceValueCodec exactly.

    Current balances are math.Int.Marshal() (ASCII decimal bytes). Legacy
    balances are protobuf cosmos.base.v1beta1.Coin: field 1 denom, field 2
    ASCII decimal amount. Never scrape arbitrary digit runs from protobuf.
    """
    if not raw: raise ValueError("empty bank balance value")
    try:
        s=raw.decode("ascii")
    except UnicodeDecodeError:
        s=""
    if s.isdigit(): return int(s)

    denom=None; amount=None
    for f,w,x in fields(raw):
        if w!=2: continue
        if f==1:
            try: denom=x.decode("utf-8")
            except UnicodeDecodeError: raise ValueError("invalid Coin denom encoding")
        elif f==2:
            try: a=x.decode("ascii")
            except UnicodeDecodeError: raise ValueError("invalid Coin amount encoding")
            if not a.isdigit(): raise ValueError(f"invalid Coin amount {a!r}")
            amount=int(a)
    if amount is None: raise ValueError(f"cannot decode bank balance value: {raw.hex()}")
    if denom is not None and denom!=expected_denom:
        raise ValueError(f"bank value denom mismatch: {denom}")
    return amount
def latest_height():
    d,ep=req_json(OSMO,"/status"); return int(d["result"]["sync_info"]["latest_block_height"]),ep
def subspace(prefix,height,rpc):
    q={"path":'"/store/bank/subspace"',"data":"0x"+prefix.hex(),"height":str(height),"prove":"false"}
    r=S.get(rpc.rstrip('/')+"/abci_query",params=q,timeout=TIMEOUT); r.raise_for_status(); d=r.json()["result"]["response"]
    if int(d.get("code",0) or 0)!=0: raise RuntimeError(f"ABCI code {d.get('code')}: {d.get('log')}")
    raw=base64.b64decode(d.get("value") or ""); return kvpairs(raw) if raw else []
def bank_key(k):
    if len(k)<3 or k[0]!=2: raise ValueError("not balance key")
    n=k[1]
    if n not in (20,32) or len(k)<=2+n: raise ValueError("bad address length")
    return k[2:2+n],k[2+n:].decode()
def scan_osmo():
    height,rpc=latest_height(); log(f"Osmosis primary-state height {height:,} via {rpc}")
    holders={}; pool_shares={}; failures=[]
    for n in (20,32):
        for first in range(256):
            try: pairs=subspace(bytes([2,n,first]),height,rpc)
            except Exception as e: failures.append((n,first,str(e))); continue
            for k,v in pairs:
                try: raw,denom=bank_key(k)
                except Exception: continue
                if denom not in (DENOM,OSMO_SHARE_DENOM): continue
                amt=bank_amount(v,denom)
                if amt>0:
                    a=b32enc("osmo",raw)
                    target=holders if denom==DENOM else pool_shares
                    target[a]=target.get(a,0)+amt
    if failures:
        sample='; '.join(f"{n}/{b:02x}: {e}" for n,b,e in failures[:5]); raise RuntimeError(f"Osmosis incomplete: {len(failures)} of 512 scans failed. {sample}")
    if not holders: raise RuntimeError("Osmosis scan returned zero holders")
    if not pool_shares: raise RuntimeError("Osmosis scan returned zero Pool 631 share holders")
    log(f"Osmosis: {len(holders):,} NETA holders; {len(pool_shares):,} Pool 631 share holders")
    return holders,pool_shares,height,rpc

# ---- economic attribution ----
def ekey(addr,chain):
    p=payload(addr); return ("p20",p.hex()) if len(p)==20 else (chain,addr)
def merge(juno,osmo,staked,unbonding,claimable,lp_neta,supply):
    g={}
    def row(key,addr): return g.setdefault(key,{"juno_address":None,"osmosis_address":None,"address_bytes":len(payload(addr)),"juno_raw":0,"osmosis_raw":0,"staking_raw":0,"unstaking_raw":0,"claimable_raw":0,"lp_raw":0,"juno_custody":False,"osmosis_custody":False})
    for a,x in juno.items():
        if a in (ESCROW,DAO,WYND_PAIR): continue
        r=row(ekey(a,"juno"),a); r["juno_address"]=a; r["juno_raw"]+=x; r["juno_custody"]=True
    for a,x in osmo.items():
        if a==OSMO_POOL_ADDR: continue
        r=row(ekey(a,"osmo"),a); r["osmosis_address"]=a; r["osmosis_raw"]+=x; r["osmosis_custody"]=True
    for src,f in ((staked,"staking_raw"),(unbonding,"unstaking_raw"),(claimable,"claimable_raw")):
        for a,x in src.items():
            r=row(ekey(a,"juno"),a); r["juno_address"]=r["juno_address"] or a; r[f]+=x; r["juno_custody"]=True
    for a,x in lp_neta.items():
        chain="juno" if a.startswith("juno1") else "osmo"
        r=row(ekey(a,chain),a)
        if chain=="juno": r["juno_address"]=r["juno_address"] or a; r["juno_custody"]=True
        else: r["osmosis_address"]=r["osmosis_address"] or a; r["osmosis_custody"]=True
        r["lp_raw"]+=x
    rows=[]
    for r in g.values():
        total=r["juno_raw"]+r["osmosis_raw"]+r["staking_raw"]+r["unstaking_raw"]+r["claimable_raw"]+r["lp_raw"]
        if total<=0: continue
        primary=r["juno_address"] or r["osmosis_address"]; typ,label=LABELS.get(primary,("wallet",None))
        rows.append({**r,"total_raw":total,"type":typ,"label":label,"cross_chain_match":bool(r["juno_address"] and r["osmosis_address"])})
    rows.sort(key=lambda r:(-r["total_raw"],r["juno_address"] or r["osmosis_address"] or ''))
    for i,r in enumerate(rows,1): r["rank"]=i
    residual=supply-sum(r["total_raw"] for r in rows)
    if residual<0: raise RuntimeError(f"economic attribution exceeds supply by {-residual/1e6:.6f}")
    if residual>1_000_000: raise RuntimeError(f"unattributed residual too large: {residual/1e6:.6f}")
    return rows,residual

def pub(r,supply):
    return {"rank":r["rank"],"juno_address":r["juno_address"],"osmosis_address":r["osmosis_address"],"address_bytes":r["address_bytes"],"juno_neta":round(r["juno_raw"]/1e6,6),"osmosis_neta":round(r["osmosis_raw"]/1e6,6),"neta_dao_staking":round(r["staking_raw"]/1e6,6),"neta_dao_unstaking":round(r["unstaking_raw"]/1e6,6),"neta_dao_claimable":round(r["claimable_raw"]/1e6,6),"lp_neta":round(r["lp_raw"]/1e6,6),"total_neta":round(r["total_raw"]/1e6,6),"type":r["type"],"label":r["label"],"supply_percent":round(r["total_raw"]/supply*100,8),"cross_chain_match":r["cross_chain_match"]}

def write_address_index(out, rows):
    """Write each economic holder once; the browser creates Juno/Osmosis aliases."""
    compact=[[row.get(field) for field in ADDRESS_INDEX_FIELDS] for row in rows]
    payload={"schema_version":4,"fields":ADDRESS_INDEX_FIELDS,"rows":compact}
    bootstrap=(
        "(()=>{const K="+json.dumps(ADDRESS_INDEX_FIELDS,separators=(',',':'))+
        ",R="+json.dumps(compact,separators=(',',':'))+
        ";window.NETA_ADDRESS_ROWS=R.map(v=>Object.fromEntries(K.map((k,i)=>[k,v[i]])));"
        "const I=Object.create(null);for(const r of window.NETA_ADDRESS_ROWS)"
        "for(const a of [r.juno_address,r.osmosis_address])if(a)I[a]=r;"
        "window.NETA_ADDRESS_INDEX=I})();\n"
    )
    (out/"address_index.json").write_text(json.dumps(payload,separators=(',',':')),encoding='utf-8')
    (out/"address-index.js").write_text(bootstrap,encoding='utf-8')
def gini(vals):
    xs=sorted(v for v in vals if v>=0); sm=sum(xs); n=len(xs)
    return 0 if not xs or sm==0 else (2*sum((i+1)*x for i,x in enumerate(xs)))/(n*sm)-(n+1)/n
def build(out):
    juno,supply,supply_src=scan_juno()
    staked,unbonding,claimable,dao_snapshot=scan_dao()
    osmo,osmo_shares,height,rpc=scan_osmo()
    import lp_attribution as lp
    wynd_lp,wynd_meta=lp.wynd_attribution()
    osmo_lp,osmo_lp_meta=lp.osmosis_attribution(osmo_shares,height,rpc)
    lp_neta=dict(wynd_lp)
    for a,x in osmo_lp.items(): lp_neta[a]=lp_neta.get(a,0)+x
    escrow=juno.get(ESCROW,0); osmo_total=sum(osmo.values())
    channel_liabilities,packet_commitments,bridge_endpoint=bridge_accounting()
    channel_total=sum(channel_liabilities.values())
    osmosis_liability=channel_liabilities.get(OSMOSIS_NETA_CHANNEL,0)
    if escrow!=channel_total:
        raise RuntimeError(f"bridge escrow {escrow/1e6:.6f} != all channel liabilities {channel_total/1e6:.6f}")
    if osmosis_liability!=osmo_total:
        raise RuntimeError(f"Osmosis channel liability {osmosis_liability/1e6:.6f} != Osmosis {osmo_total/1e6:.6f}")
    if juno.get(WYND_PAIR,0)!=sum(wynd_lp.values()): raise RuntimeError("WYND pool direct NETA != attributed LP NETA")
    if osmo.get(OSMO_POOL_ADDR,0)!=sum(osmo_lp.values()): raise RuntimeError("Pool 631 direct NETA != attributed LP NETA")
    dao_balance=juno.get(DAO,0); active=sum(staked.values()); unst=sum(unbonding.values()); claim=sum(claimable.values())
    dao_res=dao_balance-active-unst-claim
    if dao_res<0: raise RuntimeError("DAO attribution exceeds staking contract balance")
    rows,residual=merge(juno,osmo,staked,unbonding,claimable,lp_neta,supply)
    bridge_res=channel_total-osmosis_liability
    expected_residual=dao_res+bridge_res
    if residual!=expected_residual:
        raise RuntimeError(f"economic residual {residual} != DAO {dao_res} + non-Osmosis bridge {bridge_res}")
    if residual>1_000_000: raise RuntimeError("residual > 1 NETA")
    public=[pub(r,supply) for r in rows]; ranked=sum(r["total_raw"] for r in rows)
    juno_custody=sum(1 for r in rows if r["juno_custody"])
    osmosis_custody=sum(1 for r in rows if r["osmosis_custody"])
    custody_overlap=sum(1 for r in rows if r["juno_custody"] and r["osmosis_custody"])
    if juno_custody+osmosis_custody-custody_overlap!=len(rows):
        raise RuntimeError("custody-holder union does not equal economic holders")
    def top(n): return round(sum(r["total_raw"] for r in rows[:n])/1e6,6)
    onepct=max(1,(len(rows)+99)//100)
    bridge={"contract":ESCROW,"query_endpoint":bridge_endpoint,"osmosis_channel":OSMOSIS_NETA_CHANNEL,"osmosis_counterparty_channel":OSMOSIS_NETA_COUNTERPARTY,"channel_liabilities_neta":{k:round(v/1e6,6) for k,v in sorted(channel_liabilities.items())},"unattributed_non_osmosis_neta":round(bridge_res/1e6,6),"open_packet_commitments":packet_commitments}
    meta={"schema_version":3,"generated_at":dt.datetime.now(dt.timezone.utc).isoformat().replace('+00:00','Z'),"validation":{"passed":True,"cw20_balance_sum_equals_supply":True,"juno_ics20_escrow_equals_all_channel_liabilities":True,"osmosis_channel_liability_equals_osmosis_primary_state":True,"dao_contract_balance_equals_staked_plus_unstaking_plus_claimable_plus_residual":True,"wynd_pool_neta_fully_attributed":True,"osmosis_pool_631_neta_fully_attributed":True,"economic_total_plus_dao_and_bridge_residual_equals_supply":True,"custody_holder_union_equals_economic_holders":True},"total_supply_neta":round(supply/1e6,6),"total_supply_source":supply_src,"juno_custody_addresses":juno_custody,"osmosis_primary_state_addresses":osmosis_custody,"dao_active_stakers":len(staked),"dao_active_staking_neta":round(active/1e6,6),"dao_unstaking_wallets":len(unbonding),"dao_unstaking_neta":round(unst/1e6,6),"dao_claimable_wallets":len(claimable),"dao_claimable_neta":round(claim/1e6,6),"lp_wallets":len(lp_neta),"lp_neta":round(sum(lp_neta.values())/1e6,6),"economic_master_entries":len(rows),"cross_chain_matches":sum(r["cross_chain_match"] for r in rows),"wallet_attributed_neta":round(ranked/1e6,6),"dao_residual_neta":round(dao_res/1e6,6),"bridge_unattributed_neta":round(bridge_res/1e6,6),"unattributed_total_neta":round(residual/1e6,6),"excluded_bridge_escrow_neta":round(escrow/1e6,6),"bridge":bridge,"gini":round(gini([r["total_raw"] for r in rows]),6),"concentration_neta":{"top_1":top(1),"top_5":top(5),"top_10":top(10),"top_25":top(25),"top_50":top(50),"top_100":top(100),"top_1_percent":top(onepct),"top_1_percent_wallets":onepct},"osmosis":{"height":height,"rpc":rpc,"method":"single bank primary-state scan for NETA + Pool 631 shares","pool_631":osmo_lp_meta},"juno":{"method":"CosmWasm AllContractState / cw-storage-plus balance namespace","wynd":wynd_meta},"dao":{**dao_snapshot,"method":"CosmWasm AllContractState; claims classified by release_at at snapshot"}}
    (out/"holders.json").write_text(json.dumps(public,separators=(',',':')),encoding='utf-8')
    write_address_index(out,public)
    (out/"metadata.json").write_text(json.dumps(meta,indent=2),encoding='utf-8')
    (out/"data.js").write_text("window.NETA_METADATA="+json.dumps(meta,separators=(',',':'))+";\nwindow.NETA_TOP_HOLDERS="+json.dumps(public[:100],separators=(',',':'))+";\n",encoding='utf-8')
    return meta

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--output",default="."); a=ap.parse_args(); out=Path(a.output)
    with tempfile.TemporaryDirectory(prefix="neta-") as td:
        tmp=Path(td); meta=build(tmp)
        out.mkdir(parents=True,exist_ok=True)
        for name in ("holders.json","address_index.json","metadata.json","data.js","address-index.js"): os.replace(tmp/name,out/name)
    log(f"VALIDATED: {meta['economic_master_entries']:,} economic entries; {meta['wallet_attributed_neta']:,.6f} attributed + {meta['dao_residual_neta']:.6f} DAO + {meta['bridge_unattributed_neta']:.6f} bridge residual = {meta['total_supply_neta']:,.6f} NETA")
    return 0
if __name__=="__main__": raise SystemExit(main())
