#!/usr/bin/env python3
"""Read-only WYND JUNO/NETA LP ownership diagnostic.

This never changes production holder outputs. It validates LP-token custody and
then inspects the dominant custody contract so its LP balance can be attributed
back to economic wallets.
"""
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
        except Exception as e: last=e
    raise RuntimeError(f"GET failed {path}: {last}")

def smart(contract,msg):
    q=base64.b64encode(json.dumps(msg,separators=(',',':')).encode()).decode()
    d=get(f"/cosmwasm/wasm/v1/contract/{contract}/smart/{q}")
    return d.get("data",d)

def dec_b64(s):
    s=s.strip(); s += '='*((4-len(s)%4)%4); return base64.b64decode(s,altchars=b'-_')

def dec_key(s):
    s=s.strip()
    if len(s)%2==0 and HEX_RE.fullmatch(s):
        try:return bytes.fromhex(s),"hex"
        except ValueError:pass
    return dec_b64(s),"base64"

def raw_models(contract):
    out=[]; key=None
    while True:
        q={"pagination.limit":"5000"}
        if key:q["pagination.key"]=key
        d=get(f"/cosmwasm/wasm/v1/contract/{contract}/state",q)
        out.extend(d.get("models",[])); key=(d.get("pagination") or {}).get("next_key")
        if not key:return out

def inspect(models,parse_balances=False):
    namespaces={}; encodings={}; balances={}; samples=[]
    for m in models:
        kb,enc=dec_key(m["key"]); vb=dec_b64(m["value"])
        encodings[enc]=encodings.get(enc,0)+1
        ns,suf=nskey(kb); n=ns if ns is not None else "<binary>"
        namespaces[n]=namespaces.get(n,0)+1
        if parse_balances and ns=="balance" and suf:
            try:
                a=suf.decode(); x=jint(vb)
                if x>0: balances[a]=x
            except Exception: pass
        if len(samples)<120:
            try: kt=kb.decode()
            except Exception: kt=None
            try: vt=vb.decode()
            except Exception: vt=None
            samples.append({"encoding":enc,"namespace":n,"key_hex":kb.hex(),"key_text":kt,"suffix_text":suf.decode(errors='replace') if suf else "","value_text":vt[:500] if vt else None,"value_hex":vb[:120].hex()})
    return {"rows":len(models),"encodings":encodings,"namespaces":namespaces,"balances":balances,"balance_sum":sum(balances.values()),"samples":samples}

def try_queries(contract):
    candidates=[
      {"config":{}},{"total_staked":{}},{"total_stake":{}},{"total_bonded":{}},
      {"list_stakers":{"limit":5}},{"stakers":{"limit":5}},{"all_staked_balances":{"limit":5}},
      {"claims":{"address":"juno100000000000000000000000000000000000000"}}
    ]
    out=[]
    for q in candidates:
        try: out.append({"query":q,"ok":True,"response":smart(contract,q)})
        except Exception as e: out.append({"query":q,"ok":False,"error":str(e)[:500]})
    return out

def main():
    token=smart(LP,{"token_info":{}}); supply=int(token["total_supply"])
    lp=inspect(raw_models(LP),True)
    if lp["balance_sum"]!=supply: raise RuntimeError(f"LP raw sum {lp['balance_sum']} != supply {supply}")
    pool_neta=int(smart(NETA,{"balance":{"address":PAIR}})["balance"])
    ordered=sorted(lp["balances"].items(),key=lambda x:(-x[1],x[0]))
    custody_amt=lp["balances"].get(CUSTODY,0)

    ci=get(f"/cosmwasm/wasm/v1/contract/{CUSTODY}")
    cstate=inspect(raw_models(CUSTODY),False)
    queries=try_queries(CUSTODY)

    result={
      "lp_supply_raw":supply,"lp_positive_holders":len(lp["balances"]),"lp_supply_check":True,
      "pool_neta":pool_neta/1e6,"pool_neta_raw":pool_neta,
      "custody_address":CUSTODY,"custody_lp_raw":custody_amt,
      "custody_lp_share_percent":custody_amt/supply*100,
      "custody_neta_claim":pool_neta*custody_amt/supply/1e6,
      "custody_contract_info":ci,"custody_state_rows":cstate["rows"],
      "custody_key_encodings":cstate["encodings"],"custody_namespaces":cstate["namespaces"],
      "custody_state_samples":cstate["samples"],"custody_query_probes":queries,
      "top_lp_holders":[{"address":a,"lp_raw":x,"share_percent":x/supply*100,"neta_claim":pool_neta*x/supply/1e6} for a,x in ordered[:20]]
    }
    OUT.write_text(json.dumps(result,indent=2,sort_keys=True)+"\n")
    print("LP SUPPLY",supply,"POSITIVE HOLDERS",len(lp["balances"]),"CHECK",lp["balance_sum"]==supply)
    print("POOL NETA",pool_neta/1e6)
    print("CUSTODY",CUSTODY,"LP",custody_amt,"SHARE",custody_amt/supply*100,"NETA",result["custody_neta_claim"])
    print("CONTRACT INFO",json.dumps(ci,sort_keys=True))
    print("CUSTODY STATE ROWS",cstate["rows"])
    print("CUSTODY NAMESPACES",json.dumps(cstate["namespaces"],sort_keys=True))
    print("QUERY PROBES",json.dumps(queries,sort_keys=True))
    print("CUSTODY STATE SAMPLES")
    for s in cstate["samples"][:80]: print(json.dumps(s,sort_keys=True))

if __name__=="__main__": main()
