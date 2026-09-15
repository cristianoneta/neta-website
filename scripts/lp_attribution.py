#!/usr/bin/env python3
"""Economic NETA attribution for validated WYND and Osmosis Pool 631 LP positions.

Read-only. Returns underlying NETA by economic wallet and fails closed unless every
LP share and every pool NETA unit is reconciled. Diagnostic output also summarizes
Pool 631 PeriodLock metadata so old bonded positions can be distinguished from
positions already unlocking.
"""
from __future__ import annotations
import base64, json, re
from collections import Counter
from datetime import datetime, timezone
import requests
import update_neta_data as u

WYND_LP="juno1uu3cewmpynvgsdu3lfqv2rh2n5nwtrguahkw64wjk99eg8r6fsss0e757x"
WYND_PAIR="juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra"
WYND_STAKE="juno1tlhf68k8aksl30mdf5yngudk6z8w4qqzvvauzr92w3gwm7er9p9qxvudu7"
OSMO_POOL_ID=631
OSMO_SHARE_DENOM="gamm/pool/631"
OSMO_POOL_ADDR="osmo1yn7z42al3mafmztjayjduz42a8at3whyd279fkdsyumzar83x8mqvpw83x"
OSMO_LOCKUP_ADDR="osmo1njty28rqtpw6n59sjj4esw76enp4mg6g7cwrhc"
OSMO_LCD=["https://osmosis-api.polkachu.com","https://lcd.osmosis.zone"]
ADDR_RE=re.compile(rb"juno1[0-9a-z]{38}")
HEX_RE=re.compile(r"^[0-9a-fA-F]+$")


def decode_state_blob(s):
    s=s.strip()
    if len(s)%2==0 and HEX_RE.fullmatch(s):
        try:return bytes.fromhex(s)
        except ValueError:pass
    s += "="*((4-len(s)%4)%4)
    return base64.b64decode(s,altchars=b"-_")


def contract_state(addr,height=None):
    rows=[]; key=None
    while True:
        q={"pagination.limit":"5000"}
        if key:q["pagination.key"]=key
        d,_=u.req_json(u.JUNO,f"/cosmwasm/wasm/v1/contract/{addr}/state",q,height=height)
        rows += [(decode_state_blob(x["key"]),decode_state_blob(x["value"])) for x in d.get("models",[])]
        key=(d.get("pagination") or {}).get("next_key")
        if not key:return rows


def smart(contract,msg,height=None):
    q=base64.b64encode(json.dumps(msg,separators=(",",":" )).encode()).decode()
    d,_=u.req_json(u.JUNO,f"/cosmwasm/wasm/v1/contract/{contract}/smart/{q}",height=height)
    return d.get("data",d)


def amount_from_obj(obj):
    if isinstance(obj,int): return obj
    if isinstance(obj,str) and obj.isdigit(): return int(obj)
    if isinstance(obj,dict):
        for k in ("amount","balance","stake","staked","value"):
            if k in obj:
                x=amount_from_obj(obj[k])
                if x is not None:return x
    return None


def parse_json(raw):
    try:return json.loads(raw.decode())
    except Exception:return None


def allocate_exact(pool_neta,economic,supply):
    """Largest-remainder allocation; deterministic and exactly reserve-conserving."""
    out={a:(pool_neta*x)//supply for a,x in economic.items()}
    dust=pool_neta-sum(out.values())
    if dust:
        order=sorted(economic,key=lambda a:((pool_neta*economic[a])%supply,a),reverse=True)
        for a in order[:dust]: out[a]+=1
    if sum(out.values())!=pool_neta: raise RuntimeError("LP NETA allocation mismatch")
    return out


def wynd_attribution(height=None):
    lp_rows=contract_state(WYND_LP,height)
    direct={}; token_info=None
    for k,v in lp_rows:
        ns,suf=u.nskey(k)
        if ns=="balance" and suf:
            a=suf.decode(); x=u.jint(v)
            if x>0: direct[a]=x
        elif k==b"token_info" or ns=="token_info":
            try: token_info=u.jval(v)
            except Exception: pass
    if not token_info or "total_supply" not in token_info: raise RuntimeError("WYND LP total supply unavailable")
    supply=int(token_info["total_supply"])
    if sum(direct.values())!=supply: raise RuntimeError("WYND direct LP balances do not equal supply")
    custody=direct.get(WYND_STAKE,0)
    if custody<=0: raise RuntimeError("WYND stake contract has no LP custody")

    active={}; claims={}; unknown=[]
    for k,v in contract_state(WYND_STAKE,height):
        ns,suf=u.nskey(k); obj=parse_json(v)
        if ns=="stake":
            try:
                m=ADDR_RE.search(suf)
                if not m: raise ValueError("wallet missing from composite stake key")
                a=m.group(0).decode()
                x=amount_from_obj(obj)
                if x is None:x=u.jint(v)
                if isinstance(obj,dict) and isinstance(obj.get("locked_tokens"),list):
                    x=(x or 0)+sum(int(z[1]) for z in obj["locked_tokens"] if isinstance(z,list) and len(z)>1)
                if x:active[a]=active.get(a,0)+x
            except Exception as e: unknown.append((k.hex(),str(e)))
        elif ns=="claims" and suf:
            try:
                a=suf.decode()
                items=obj if isinstance(obj,list) else (obj.get("claims",[]) if isinstance(obj,dict) else [])
                x=sum((amount_from_obj(item) or 0) for item in items)
                if x:claims[a]=claims.get(a,0)+x
            except Exception as e: unknown.append((k.hex(),str(e)))
    if unknown: raise RuntimeError(f"WYND unparsed stake rows: {len(unknown)}")
    if sum(active.values())+sum(claims.values())!=custody:
        raise RuntimeError("WYND active+claims do not equal stake-contract LP custody")

    pair_self_lp=direct.get(WYND_PAIR,0)
    economic={a:x for a,x in direct.items() if a not in (WYND_STAKE,WYND_PAIR)}
    for src in (active,claims):
        for a,x in src.items():economic[a]=economic.get(a,0)+x
    attributable_supply=supply-pair_self_lp
    if sum(economic.values())!=attributable_supply:
        raise RuntimeError("WYND economic LP shares plus pair minimum liquidity do not equal LP supply")

    pool_neta=int(smart(u.NETA,{"balance":{"address":WYND_PAIR}},height=height)["balance"])
    neta=allocate_exact(pool_neta,economic,attributable_supply)
    return neta,{"pool_neta_raw":pool_neta,"lp_supply_raw":supply,"attributable_lp_supply_raw":attributable_supply,"economic_wallets":len(economic),"custody_lp_raw":custody,"active_lp_raw":sum(active.values()),"claim_lp_raw":sum(claims.values()),"pair_minimum_liquidity_lp_raw":pair_self_lp}


def bank_amount_any(raw,expected_denom):
    if not raw: raise ValueError("empty bank value")
    try:s=raw.decode("ascii")
    except UnicodeDecodeError:s=""
    if s.isdigit():return int(s)
    denom=None; amount=None
    for f,w,x in u.fields(raw):
        if w!=2:continue
        if f==1:denom=x.decode("utf-8")
        elif f==2:
            a=x.decode("ascii")
            if not a.isdigit():raise ValueError("invalid amount")
            amount=int(a)
    if amount is None:raise ValueError("cannot decode bank amount")
    if denom is not None and denom!=expected_denom:raise ValueError(f"denom mismatch {denom}")
    return amount


def subspace_store(store,prefix,height,rpc,timeout=180):
    q={"path":f'"/store/{store}/subspace"',"data":"0x"+prefix.hex(),"height":str(height),"prove":"false"}
    r=u.S.get(rpc.rstrip('/')+"/abci_query",params=q,timeout=timeout); r.raise_for_status(); d=r.json()["result"]["response"]
    if int(d.get("code",0) or 0)!=0:raise RuntimeError(f"ABCI {store} code {d.get('code')}: {d.get('log')}")
    raw=base64.b64decode(d.get("value") or ""); return u.kvpairs(raw) if raw else []


def parse_coin(buf):
    denom=None; amount=None
    for f,w,x in u.fields(buf):
        if w!=2:continue
        if f==1:denom=x.decode()
        elif f==2:amount=int(x.decode())
    return denom,amount


def parse_duration(buf):
    sec=0; nanos=0
    for f,w,x in u.fields(buf):
        if f==1 and w==0:sec=int(x)
        elif f==2 and w==0:nanos=int(x)
    return sec+nanos/1_000_000_000


def signed_varint(value,bits):
    """Interpret a protobuf int32/int64 varint as two's-complement signed."""
    value=int(value)
    sign=1 << (bits-1)
    return value-(1 << bits) if value & sign else value


def parse_timestamp(buf):
    sec=0; nanos=0
    for f,w,x in u.fields(buf):
        if f==1 and w==0:sec=signed_varint(x,64)
        elif f==2 and w==0:nanos=signed_varint(x,32)
    # PeriodLock uses Go's zero time (0001-01-01) until unlocking starts.
    # It is outside Python datetime's portable Unix range and semantically
    # means that no unlocking end time has been set.
    if (sec==0 and nanos==0) or sec<=-62135596800:return None
    try:
        return datetime.fromtimestamp(sec+nanos/1_000_000_000,tz=timezone.utc).isoformat()
    except (OverflowError,OSError,ValueError) as e:
        raise ValueError(f"invalid PeriodLock timestamp seconds={sec} nanos={nanos}") from e


def parse_lock(buf):
    # Osmosis PeriodLock protobuf: ID=1, owner=2, duration=3, end_time=4, coins=5.
    lock_id=None; owner=None; duration=None; end_time=None; coins=[]
    for f,w,x in u.fields(buf):
        if f==1 and w==0:lock_id=int(x)
        elif f==2 and w==2:owner=x.decode()
        elif f==3 and w==2:duration=parse_duration(x)
        elif f==4 and w==2:end_time=parse_timestamp(x)
        elif f==5 and w==2:coins.append(parse_coin(x))
    return {"id":lock_id,"owner":owner,"duration_seconds":duration,"end_time":end_time,"coins":coins}


def osmosis_attribution(direct=None,height=None,rpc=None):
    if direct is None:
        height,rpc=u.latest_height(); direct={}; failures=[]
        for n in (20,32):
            for first in range(256):
                try:pairs=u.subspace(bytes([2,n,first]),height,rpc)
                except Exception as e:failures.append((n,first,str(e)));continue
                for k,v in pairs:
                    try:raw,denom=u.bank_key(k)
                    except Exception:continue
                    if denom!=OSMO_SHARE_DENOM:continue
                    x=bank_amount_any(v,OSMO_SHARE_DENOM)
                    if x>0:
                        a=u.b32enc("osmo",raw);direct[a]=direct.get(a,0)+x
        if failures:raise RuntimeError(f"Osmosis LP bank scan incomplete: {len(failures)} prefixes failed")

    pool=None
    for base in OSMO_LCD:
        try:
            r=requests.get(
                base+f"/osmosis/gamm/v1beta1/pools/{OSMO_POOL_ID}",
                headers={"x-cosmos-block-height":str(height)},
                timeout=30,
            );r.raise_for_status();pool=r.json().get("pool")
            if pool:break
        except Exception:pass
    if not pool:raise RuntimeError("Osmosis Pool 631 query failed")
    supply=int(pool["total_shares"]["amount"])
    pool_neta=next((int(x["token"]["amount"]) for x in pool["pool_assets"] if x["token"]["denom"]==u.DENOM),None)
    if pool_neta is None:raise RuntimeError("Pool 631 NETA reserve missing")
    if sum(direct.values())!=supply:raise RuntimeError("Pool 631 bank share sum != supply")

    lock_module=direct.get(OSMO_LOCKUP_ADDR,0)
    locks=subspace_store("lockup",b"\x02",height,rpc)
    locked={}; pool_locks=[]
    for _,v in locks:
        lock=parse_lock(v)
        for denom,amount in lock["coins"]:
            if denom==OSMO_SHARE_DENOM and amount:
                if not lock["owner"]:raise RuntimeError("Pool 631 lock without owner")
                locked[lock["owner"]]=locked.get(lock["owner"],0)+amount
                pool_locks.append({"id":lock["id"],"owner":lock["owner"],"amount":amount,"duration_seconds":lock["duration_seconds"],"end_time":lock["end_time"]})

    locked_sum=sum(locked.values())
    duration_counts=Counter(int(x["duration_seconds"] or 0) for x in pool_locks)
    active=[x for x in pool_locks if not x["end_time"]]
    unlocking=[x for x in pool_locks if x["end_time"]]
    print("POOL631_LOCK_DIAGNOSTIC="+json.dumps({
        "height":height,
        "lockup_module_bank_shares_raw":lock_module,
        "periodlock_pool631_shares_raw":locked_sum,
        "difference_raw":locked_sum-lock_module,
        "pool631_lock_records":len(pool_locks),
        "unique_lock_owners":len(locked),
        "active_no_end_time_records":len(active),
        "active_no_end_time_shares_raw":sum(x["amount"] for x in active),
        "unlocking_with_end_time_records":len(unlocking),
        "unlocking_with_end_time_shares_raw":sum(x["amount"] for x in unlocking),
        "duration_counts":dict(sorted(duration_counts.items())),
        "min_lock_id":min((x["id"] for x in pool_locks if x["id"] is not None),default=None),
        "max_lock_id":max((x["id"] for x in pool_locks if x["id"] is not None),default=None),
        "unlocking_end_times":sorted([x["end_time"] for x in unlocking]),
        "sample_locks":sorted(pool_locks,key=lambda x:x["amount"],reverse=True)[:20],
    },sort_keys=True))

    if locked_sum!=lock_module:raise RuntimeError(f"Pool 631 lock owners != lockup module balance: locks={locked_sum} module={lock_module} diff={locked_sum-lock_module}")

    economic={a:x for a,x in direct.items() if a!=OSMO_LOCKUP_ADDR}
    for a,x in locked.items():economic[a]=economic.get(a,0)+x
    if sum(economic.values())!=supply:raise RuntimeError("Pool 631 economic LP shares != supply")

    neta=allocate_exact(pool_neta,economic,supply)
    return neta,{"height":height,"rpc":rpc,"pool_neta_raw":pool_neta,"lp_supply_raw":supply,"direct_share_holders":len(direct),"economic_wallets":len(economic),"lockup_module_shares_raw":lock_module,"lock_owners":len(locked),"lock_records":len(pool_locks),"active_lock_records":len(active),"unlocking_lock_records":len(unlocking)}


def build():
    juno_height=u.juno_snapshot()[0]
    osmo_height,osmo_rpc=u.latest_height()
    wynd,wm=wynd_attribution(juno_height)
    osmo,om=osmosis_attribution(height=osmo_height,rpc=osmo_rpc)
    return {"wynd":wm,"osmosis_pool_631":om,"wynd_wallet_neta_raw":wynd,"osmosis_pool_631_wallet_neta_raw":osmo}


if __name__=="__main__":
    out=build()
    print(json.dumps({"wynd":out["wynd"],"osmosis_pool_631":out["osmosis_pool_631"],"checks":{"wynd_wallet_sum_raw":sum(out["wynd_wallet_neta_raw"].values()),"osmosis_wallet_sum_raw":sum(out["osmosis_pool_631_wallet_neta_raw"].values())}},indent=2))
