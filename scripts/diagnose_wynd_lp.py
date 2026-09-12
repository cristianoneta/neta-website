#!/usr/bin/env python3
"""Read-only WYND JUNO/NETA LP economic ownership diagnostic."""
from __future__ import annotations
import base64, json, re
from pathlib import Path
import requests
from update_neta_data import JUNO, NETA, TIMEOUT, jint, nskey

LP="juno1uu3cewmpynvgsdu3lfqv2rh2n5nwtrguahkw64wjk99eg8r6fsss0e757x"
PAIR="juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
CUSTODY="juno1tlhf68k8aksl30mdf5yngudk6z8w4qqzvvauzr92w3gwm7er9p9qxvudu7"
OUT=Path("wynd_lp_diagnostic.json")
HEADERS={"User-Agent":"NETA-Reborn-LP-Diagnostic/1.0"}
HEX_RE=re.compile(r"^[0-9a-fA-F]+$")

def get(path,params=None):
    last=None
    for base in JUNO:
        try:
            r=requests.get(base.rstrip('/')+path,headers=HEADERS,params=params,timeout=TIMEOUT)
            r.raise_for_status(); return r.json()
        except Exception as e:last=e
    raise RuntimeError(f"GET failed {path}: {last}")

def smart(contract,msg):
    q=base64.b64encode(json.dumps(msg,separators=(',',':')).encode()).decode()
    d=get(f"/cosmwasm/wasm/v1/contract/{contract}/smart/{q}")
    return d.get("data",d)

def dec_b64(s):
    s=s.strip(); s+='='*((4-len(s)%4)%4); return base64.b64decode(s,altchars=b'-_')

def dec_key(s):
    s=s.strip()
    if len(s)%2==0 and HEX_RE.fullmatch(s):
        try:return bytes.fromhex(s)
        except ValueError:pass
    return dec_b64(s)

def raw_models(contract):
    out=[]; key=None
    while True:
        q={"pagination.limit":"5000"}
        if key:q["pagination.key"]=key
        d=get(f"/cosmwasm/wasm/v1/contract/{contract}/state",q)
        out.extend(d.get("models",[])); key=(d.get("pagination") or {}).get("next_key")
        if not key:return out

def parse_state(contract):
    rows=[]
    for m in raw_models(contract):
        kb=dec_key(m["key"]); vb=dec_b64(m["value"]); ns,suf=nskey(kb)
        rows.append((ns,suf,vb,kb))
    return rows

def parse_lp_balances(rows):
    out={}
    for ns,suf,vb,_ in rows:
        if ns=="balance" and suf:
            try:
                a=suf.decode(); x=jint(vb)
                if x>0:out[a]=x
            except Exception:pass
    return out

def parse_json(vb):
    try:return json.loads(vb.decode())
    except Exception:return None

def amount_from_obj(obj):
    if isinstance(obj,int):return obj
    if isinstance(obj,str) and obj.isdigit():return int(obj)
    if isinstance(obj,dict):
        for k in ("amount","balance","stake","staked","value"):
            if k in obj:
                x=amount_from_obj(obj[k])
                if x is not None:return x
    return None

def main():
    supply=int(smart(LP,{"token_info":{}})["total_supply"])
    lp_rows=parse_state(LP); direct=parse_lp_balances(lp_rows)
    assert sum(direct.values())==supply,(sum(direct.values()),supply)
    custody_lp=direct[CUSTODY]
    pool_neta=int(smart(NETA,{"balance":{"address":PAIR}})["balance"])

    crows=parse_state(CUSTODY)
    namespaces={}
    active={}; claims={}; claim_records=0; unknown=[]
    for ns,suf,vb,kb in crows:
        namespaces[ns or "<binary>"]=namespaces.get(ns or "<binary>",0)+1
        obj=parse_json(vb)
        if ns=="staked_balances" and suf:
            try:
                a=suf.decode(); x=amount_from_obj(obj)
                if x is None:x=jint(vb)
                if x:active[a]=active.get(a,0)+x
            except Exception as e:unknown.append({"ns":ns,"key":kb.hex(),"error":str(e)})
        elif ns=="claims" and suf:
            try:
                a=suf.decode(); items=obj if isinstance(obj,list) else (obj.get("claims",[]) if isinstance(obj,dict) else [])
                total=0
                for item in items:
                    x=amount_from_obj(item)
                    if x is not None:total+=x; claim_records+=1
                if total:claims[a]=claims.get(a,0)+total
            except Exception as e:unknown.append({"ns":ns,"key":kb.hex(),"error":str(e)})

    # If namespace names differ, expose compact samples instead of guessing.
    samples=[]
    for ns,suf,vb,kb in crows:
        if ns in ("staked_balances","claims"):
            samples.append({"ns":ns,"suffix":suf.decode(errors="replace") if suf else "","value":vb.decode(errors="replace")[:500]})
            if len(samples)>=12:break

    active_total=sum(active.values()); claims_total=sum(claims.values())
    reconciliation=active_total+claims_total
    economic={a:x for a,x in direct.items() if a!=CUSTODY}
    for a,x in active.items():economic[a]=economic.get(a,0)+x
    for a,x in claims.items():economic[a]=economic.get(a,0)+x
    econ_total=sum(economic.values())
    result={
      "lp_supply_raw":supply,"pool_neta_raw":pool_neta,"pool_neta":pool_neta/1e6,
      "direct_lp_holders":len(direct),"direct_lp_sum_raw":sum(direct.values()),
      "custody_lp_raw":custody_lp,"custody_share_percent":custody_lp/supply*100,
      "custody_namespaces":namespaces,"active_wallets":len(active),"active_lp_raw":active_total,
      "claim_wallets":len(claims),"claim_records":claim_records,"claim_lp_raw":claims_total,
      "custody_reconciled_raw":reconciliation,"custody_residual_raw":custody_lp-reconciliation,
      "custody_check":reconciliation==custody_lp,
      "economic_lp_wallets":len(economic),"economic_lp_sum_raw":econ_total,
      "economic_supply_check":econ_total==supply,
      "economic_neta_sum":pool_neta*econ_total/supply/1e6,
      "samples":samples,"unknown":unknown[:20],
      "top_economic_lp":[{"address":a,"lp_raw":x,"share_percent":x/supply*100,"neta_claim":pool_neta*x/supply/1e6} for a,x in sorted(economic.items(),key=lambda z:(-z[1],z[0]))[:25]]
    }
    OUT.write_text(json.dumps(result,indent=2,sort_keys=True)+"\n")
    print(json.dumps(result,indent=2,sort_keys=True))
    if not result["custody_check"]:raise RuntimeError(f"custody not reconciled: {reconciliation} != {custody_lp}")
    if not result["economic_supply_check"]:raise RuntimeError(f"economic LP sum {econ_total} != supply {supply}")

if __name__=="__main__":main()
