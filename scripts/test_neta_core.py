#!/usr/bin/env python3
"""Fast unit checks for shared collector infrastructure."""
from decimal import Decimal

import requests

from neta_core import CosmosClient, fetch_coingecko_prices


class Response:
    def __init__(self, payload=None, error=False):
        self.payload = payload or {}
        self.error = error

    def raise_for_status(self):
        if self.error:
            raise requests.HTTPError("test failure")

    def json(self):
        return self.payload


class Session:
    def __init__(self, responses):
        self.headers = {}
        self.responses = iter(responses)

    def get(self, *_args, **_kwargs):
        return next(self.responses)


lcd_session = Session([Response(error=True), Response({"data": {"ok": True}})])
client = CosmosClient(["https://one", "https://two/"], session=lcd_session)
data, endpoint = client.smart("contract", {"pool": {}})
assert data == {"ok": True}
assert endpoint == "https://two"

price_session = Session([
    Response(error=True),
    Response({"coins": {"coingecko:cosmos": {"price": 2.5}}}),
])
prices, source, _ = fetch_coingecko_prices(["cosmos"], session=price_session)
assert prices == {"cosmos": Decimal("2.5")}
assert source.startswith("DefiLlama")

print("NETA core infrastructure tests passed")

