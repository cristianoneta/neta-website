#!/usr/bin/env python3
"""Daily NETA Reborn on-chain indexer. Fail-closed: outputs are replaced only after all checks pass."""
from __future__ import annotations
import argparse, base64, datetime as dt, json, os, re, tempfile, time
from pathlib import Path
from typing import Dict, List, Tuple
import requests

NETA="juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr"
DAO="juno1a7x8aj7k38vnj9edrlymkerhrl5d4ud3makmqhx6vt3dhu0d824qh038zh"
ESCROW="juno1v4887y83d6g28puzvt8cl0f3cdhd3y6y9mpysnsp3k8krdm7l6jqgm0rkn"
DENOM="ibc/297C64CC42B5A8D8F82FE2EBE208A6FE8F94B86037FA28C4529A23701C228F7A"
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

def scan_dao():
    staked={}; claims={}; stored_total=None
    for k,v in contract_state(DAO):
        ns,suf=nskey(k)
        if ns=="staked_balances" and suf:
            a=suf.decode(); x=jint(v)
            if x>0: staked[a]=x
        elif ns=="claims" and suf:
            a=suf.decode(); x=jval(v)
            if isinstance(x,dict): x=x.get("claims",x.get("items",[]))
            if not isinstance(x,list): raise ValueError(f"unexpected claims for {a}")
            amt=sum(int(i.get("amount",0)) for i in x if isinstance(i,dict))
            if amt>0: claims[a]=claims.get(a,0)+amt
        elif k==b"total_staked" or ns=="total_staked":
            try: stored_total=jint(v)
            except Exception: pass
    active=sum(staked.values())
    if stored_total is not None and active!=stored_total: raise RuntimeError(f"active {active} != total_staked {stored_total}")
    log(f"DAO: {len(staked):,} active / {active/1e6:,.6f}; {len(claims):,} unstaking / {sum(claims.values())/1e6:,.6f}")
    return staked,claims

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
        elif w==2: n,p=varint(buf,p); v=buf[p:p+n]; p+=n
        elif w==1: v=buf[p:p+8]; p+=8
        elif w==5: v=buf[p:p+4]; p+=4
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
def bank_amount(raw):
    try:
        s=raw.decode('ascii')
        if s.isdigit(): return int(s)
    except UnicodeDecodeError: pass
    nums=re.findall(rb"[0-9]{1,80}",raw)
    if not nums: raise ValueError(f"cannot parse bank amount {raw!r}")
    return int(max(nums,key=len))
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
    holders={}; failures=[]
    for n in (20,32):
        for first in range(256):
            try: pairs=subspace(bytes([2,n,first]),height,rpc)
            except Exception as e: failures.append((n,first,str(e))); continue
            for k,v in pairs:
                try: raw,denom=bank_key(k)
                except Exception: continue
                if denom!=DENOM: continue
                amt=bank_amount(v)
                if amt>0:
                    a=b32enc("osmo",raw); holders[a]=holders.get(a,0)+amt
    if failures:
        sample='; '.join(f"{n}/{b:02x}: {e}" for n,b,e in failures[:5]); raise RuntimeError(f"Osmosis incomplete: {len(failures)} of 512 scans failed. {sample}")
    if not holders: raise RuntimeError("Osmosis scan returned zero holders")
    log(f"Osmosis: {len(holders):,} holders / {sum(holders.values())/1e6:,.6f} NETA")
    return holders,height,rpc

# ---- economic attribution ----
def ekey(addr,chain):
    p=payload(addr); return ("p20",p.hex()) if len(p)==20 else (chain,addr)
def merge(juno,osmo,staked,claims,supply):
    g={}
    def row(key,addr): return g.setdefault(key,{"juno_address":None,"osmosis_address":None,"address_bytes":len(payload(addr)),"juno_raw":0,"osmosis_raw":0,"staking_raw":0,"unstaking_raw":0})
    for a,x in juno.items():
        if a in (ESCROW,DAO): continue
        r=row(ekey(a,"juno"),a); r["juno_address"]=a; r["juno_raw"]+=x
    for a,x in osmo.items():
        r=row(ekey(a,"osmo"),a); r["osmosis_address"]=a; r["osmosis_raw"]+=x
    for src,f in ((staked,"staking_raw"),(claims,"unstaking_raw")):
        for a,x in src.items():
            r=row(ekey(a,"juno"),a); r["juno_address"]=r["juno_address"] or a; r[f]+=x
    rows=[]
    for r in g.values():
        total=r["juno_raw"]+r["osmosis_raw"]+r["staking_raw"]+r["unstaking_raw"]
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
    return {"rank":r["rank"],"juno_address":r["juno_address"],"osmosis_address":r["osmosis_address"],"address_bytes":r["address_bytes"],"juno_neta":round(r["juno_raw"]/1e6,6),"osmosis_neta":round(r["osmosis_raw"]/1e6,6),"neta_dao_staking":round(r["staking_raw"]/1e6,6),"neta_dao_unstaking":round(r["unstaking_raw"]/1e6,6),"total_neta":round(r["total_raw"]/1e6,6),"type":r["type"],"label":r["label"],"supply_percent":round(r["total_raw"]/supply*100,8),"cross_chain_match":r["cross_chain_match"]}
def gini(vals):
    xs=sorted(v for v in vals if v>=0); sm=sum(xs); n=len(xs)
    return 0 if not xs or sm==0 else (2*sum((i+1)*x for i,x in enumerate(xs)))/(n*sm)-(n+1)/n
def concentration(rows,supply):
    ts=[r["total_raw"] for r in rows]; out={f"top_{n}_percent":round(sum(ts[:n])/supply*100,8) for n in (1,5,10,25,50,100)}
    n=max(1,int(len(rows)*0.01+0.999999)); out["top_1pct_wallet_count"]=n; out["top_1pct_percent"]=round(sum(ts[:n])/supply*100,8); return out

def build(outdir):
    juno,supply,supply_src=scan_juno(); staked,claims=scan_dao(); osmo,height,rpc=scan_osmo()
    escrow=juno.get(ESCROW,0); osmo_total=sum(osmo.values())
    if escrow!=osmo_total: raise RuntimeError(f"bridge escrow {escrow/1e6:.6f} != Osmosis {osmo_total/1e6:.6f}")
    dao_bal=juno.get(DAO,0); active=sum(staked.values()); unstaking=sum(claims.values()); dao_res=dao_bal-active-unstaking
    if dao_res<0 or dao_res>1_000_000: raise RuntimeError(f"DAO closure failed: balance={dao_bal/1e6:.6f}, active={active/1e6:.6f}, unstaking={unstaking/1e6:.6f}, residual={dao_res/1e6:.6f}")
    rows,res=merge(juno,osmo,staked,claims,supply)
    if res!=dao_res: raise RuntimeError(f"economic residual {res} != DAO residual {dao_res}")
    holders=[pub(r,supply) for r in rows]; idx={}
    for h in holders:
        c={k:h[k] for k in ("rank","total_neta","juno_neta","osmosis_neta","neta_dao_staking","neta_dao_unstaking","type","label")}
        if h["juno_address"]: idx[h["juno_address"].lower()]=c
        if h["osmosis_address"]: idx[h["osmosis_address"].lower()]=c
    now=dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace('+00:00','Z')
    meta={"schema_version":2,"generated_at":now,"validation":"passed","stats":{"total_supply_neta":supply/1e6,"juno_custody_addresses":len(juno),"osmosis_primary_state_addresses":len(osmo),"dao_active_stakers":len(staked),"dao_active_staking_neta":active/1e6,"dao_unstaking_wallets":len(claims),"dao_unstaking_neta":unstaking/1e6,"economic_master_entries":len(rows),"cross_chain_matches":sum(r["cross_chain_match"] for r in rows),"ranked_total_neta":sum(r["total_raw"] for r in rows)/1e6,"dao_contract_residual_neta":dao_res/1e6,"excluded_bridge_escrow_neta":escrow/1e6,"gini":round(gini([r["total_raw"] for r in rows]),8),**concentration(rows,supply)},"sources":{"supply_source":supply_src,"osmosis_height":height,"osmosis_rpc":rpc,"osmosis_method":"primary bank KV state; 20-byte + 32-byte address scans","juno_method":"CW20 raw contract state","dao_method":"staking contract raw state: staked_balances + claims"},"methodology_short":"Economic NETA holdings across Juno + Osmosis + DAO staking + DAO unstaking. Juno bridge escrow is excluded to avoid double-counting Osmosis. The DAO staking contract is decomposed to wallet owners. Identical 20-byte Juno/Osmosis Bech32 payloads are merged."}
    outdir.mkdir(parents=True,exist_ok=True); compact=dict(ensure_ascii=False,separators=(',',':'))
    (outdir/'holders.json').write_text(json.dumps(holders,**compact),encoding='utf-8')
    (outdir/'address_index.json').write_text(json.dumps(idx,**compact),encoding='utf-8')
    (outdir/'metadata.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
    (outdir/'data.js').write_text('window.NETA_METADATA = '+json.dumps(meta,**compact)+';\nwindow.NETA_TOP_HOLDERS = '+json.dumps(holders[:100],**compact)+';\n',encoding='utf-8')
    (outdir/'address-index.js').write_text('window.NETA_ADDRESS_INDEX = '+json.dumps(idx,**compact)+';\n',encoding='utf-8')
    log(f"VALIDATED: {len(rows):,} holders; {sum(r['total_raw'] for r in rows)/1e6:,.6f} attributed + {res/1e6:.6f} residual = {supply/1e6:,.6f} NETA")
    return meta

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--output',default='.'); target=Path(ap.parse_args().output).resolve()
    with tempfile.TemporaryDirectory(prefix='neta-reborn-') as td:
        tmp=Path(td); meta=build(tmp)
        for name in ('holders.json','address_index.json','metadata.json','data.js','address-index.js'): os.replace(tmp/name,target/name)
    print(json.dumps(meta['stats'],indent=2)); return 0
if __name__=='__main__': raise SystemExit(main())
