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
print("multichain route classification: OK")
