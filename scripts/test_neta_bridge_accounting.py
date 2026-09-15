#!/usr/bin/env python3
"""Regression checks for channel-aware CW20-ICS20 accounting."""
import update_neta_data as neta


def smart(_contract,msg,height=None):
    if "list_channels" in msg:
        return {"channels":[
            {"id":"channel-47","counterparty_endpoint":{"port_id":"transfer","channel_id":"channel-169"},"connection_id":"connection-0"},
            {"id":"channel-154","counterparty_endpoint":{"port_id":"transfer","channel_id":"channel-33"},"connection_id":"connection-128"},
        ]},"lcd"
    channel=msg["channel"]["id"]
    counterparty="channel-169" if channel=="channel-47" else "channel-33"
    connection="connection-0" if channel=="channel-47" else "connection-128"
    amount="10480411540" if channel=="channel-47" else "10000"
    return {"info":{"id":channel,"counterparty_endpoint":{"port_id":"transfer","channel_id":counterparty},"connection_id":connection},"balances":[{"cw20":{"address":neta.NETA,"amount":amount}}]},"lcd"


def request(_bases,path,params=None,retries=3,height=None):
    channel=path.split("/channels/",1)[1].split("/",1)[0]
    rows=[] if channel=="channel-47" else [{"port_id":f"wasm.{neta.ESCROW}","channel_id":"channel-154","sequence":"36","data":"hash"}]
    return {"commitments":rows},"lcd"


original_smart,original_request=neta.smart_query,neta.req_json
try:
    neta.smart_query,neta.req_json=smart,request
    liabilities,commitments,endpoint=neta.bridge_accounting()
finally:
    neta.smart_query,neta.req_json=original_smart,original_request

assert liabilities=={"channel-47":10480411540,"channel-154":10000}
assert commitments=={"channel-154":[36]}
assert sum(liabilities.values())==10480421540
assert endpoint=="lcd"
assert neta.cw20_amount([{"native":{"denom":"ujuno","amount":"1"}}],neta.NETA)==0

assert neta.bridge_transit_amount(104_000_000,4_000_000,{"channel-47":[7]})==100_000_000
assert neta.bridge_transit_amount(4_000_000,4_000_000,{})==0
for liability,primary,commitments in (
    (3_000_000,4_000_000,{"channel-47":[7]}),
    (104_000_000,4_000_000,{}),
):
    try:
        neta.bridge_transit_amount(liability,primary,commitments)
    except RuntimeError:
        pass
    else:
        raise AssertionError("unexplained bridge difference must fail closed")

print("Channel-aware NETA bridge accounting tests passed")
