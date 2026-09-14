#!/usr/bin/env python3
import importlib.util, pathlib
P=pathlib.Path(__file__).with_name("update_map_of_neta.py")
S=importlib.util.spec_from_file_location("mapmod",P); M=importlib.util.module_from_spec(S); S.loader.exec_module(M)
R={"chains":{"juno":{"movement_verified":True},"osmosis":{"movement_verified":True},"terra":{"movement_verified":False},"cosmoshub":{"movement_verified":False}},"prefixes":{"osmo":"osmosis","terra":"terra","cosmos":"cosmoshub"},"juno_channels":{}}
def a(receiver=None,sender=None,channel=None):
    x={"receiver":receiver,"sender":sender}
    if channel:x["channel"]=channel
    return x
assert M.resolve_remote_chain(a(receiver="osmo1abc"),R,True)==("osmosis","address_prefix")
assert M.resolve_remote_chain(a(receiver="terra1abc"),R,True)==("terra","address_prefix")
assert M.resolve_remote_chain(a(receiver="cosmos1abc"),R,True)==("cosmoshub","address_prefix")
assert M.resolve_remote_chain(a(receiver="stars1abc",channel="channel-77"),R,True)==("unknown:channel-77","unresolved")
assert M.resolve_remote_chain(a(sender="terra1abc"),R,False)==("terra","address_prefix")
assert M.resolve_remote_chain(a(sender="stars1abc"),R,False)==("unknown","unresolved")

wallet="juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57"
def wynd_item(txhash,height,timestamp,attributes):
    return {
        "messages":[{"sender":wallet}],
        "response":{"txhash":txhash,"height":str(height),"timestamp":timestamp,"code":0,"events":[
            {"type":"wasm","attributes":[{"key":key,"value":value} for key,value in attributes.items()]},
        ]},
    }

buy=wynd_item("A"*64,100,"2026-09-14T12:04:57Z",{
    "_contract_address":M.WYND_PAIR,"action":"swap","offer_asset":"ujuno",
    "ask_asset":M.NETA,"offer_amount":"1000000","return_amount":"10094",
})
sell=wynd_item("B"*64,101,"2026-09-14T12:37:27Z",{
    "_contract_address":M.WYND_PAIR,"action":"swap","offer_asset":M.NETA,
    "ask_asset":"ujuno","offer_amount":"10000","return_amount":"984768",
})
parsed=M.parse_wynd([buy,sell])
assert [(event["chain"],event["market"],event["direction"],event["neta_raw"],event["wallet"]) for event in parsed]==[
    ("juno","wynd","buy",10094,wallet),
    ("juno","wynd","sell",10000,wallet),
]
assert len({event["id"] for event in parsed})==2
print("multichain route and WYND swap classification: OK")
