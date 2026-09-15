#!/usr/bin/env python3
"""Regression tests for immutable-height Cosmos REST snapshots."""
import update_neta_data as neta


class Response:
    def raise_for_status(self):
        return None

    def json(self):
        return {"ok": True}


class Session:
    def __init__(self):
        self.headers = {}
        self.calls = []

    def get(self, url, **kwargs):
        self.calls.append((url, kwargs))
        return Response()


original = neta.S
session = Session()
try:
    neta.S = session
    payload, endpoint = neta.req_json(
        ["https://lcd.example"],
        "/cosmwasm/wasm/v1/contract/example/state",
        {"pagination.limit": "5000"},
        height=123456,
    )
finally:
    neta.S = original

assert payload == {"ok": True}
assert endpoint == "https://lcd.example"
assert session.calls[0][1]["headers"] == {"x-cosmos-block-height": "123456"}

print("Immutable-height snapshot tests passed")
