#!/usr/bin/env python3
from decimal import Decimal

import update_wynd_recovery_market as market


POOL = {
    "name": "JUNO / ATOM",
    "pair": {"address": "pair"},
    "assets": [
        {"info": {"native": "ujuno"}, "key": "native:ujuno", "symbol": "ujuno", "decimals": 6},
        {"info": {"native": "ibc/atom"}, "key": "native:ibc/atom", "symbol": "UATOM", "decimals": 6},
    ],
}
market.PRICE_ASSETS["native:ibc/atom"] = (6, "cosmos")
market.smart = lambda _contract, _msg: {
    "total_share": "5000000",
    "assets": [
        {"info": {"native": "ujuno"}, "amount": "100000000"},
        {"info": {"native": "ibc/atom"}, "amount": "50000000"},
    ],
}
result = market.build_pool(POOL, {"juno-network": Decimal("0.10"), "cosmos": Decimal("2.00")})
assert result["total_share_raw"] == "5000000"
assert result["pool_value_usd"] == "110.000000"
assert [(x["display"], x["symbol"]) for x in result["assets"]] == [("100", "JUNO"), ("50", "ATOM")]
print("WYND recovery daily market tests passed")
