"""External USD price lookup with a compatible fallback provider."""
from __future__ import annotations

from decimal import Decimal

import requests

from .io import iso_now


def fetch_coingecko_prices(
    coin_ids,
    *,
    session: requests.Session | None = None,
    timeout: int = 45,
):
    ids = sorted(set(coin_ids))
    if not ids:
        raise ValueError("at least one CoinGecko identifier is required")
    http = session or requests.Session()
    errors = []
    try:
        response = http.get(
            "https://api.coingecko.com/api/v3/simple/price",
            params={"ids": ",".join(ids), "vs_currencies": "usd"},
            timeout=timeout,
        )
        response.raise_for_status()
        data = response.json()
        return (
            {coin_id: Decimal(str(data[coin_id]["usd"])) for coin_id in ids},
            "CoinGecko simple/price",
            iso_now(),
        )
    except (requests.RequestException, KeyError, TypeError, ValueError) as exc:
        errors.append(f"CoinGecko: {exc}")

    try:
        coins = ",".join("coingecko:" + coin_id for coin_id in ids)
        response = http.get(
            "https://coins.llama.fi/prices/current/" + coins,
            timeout=timeout,
        )
        response.raise_for_status()
        data = response.json()["coins"]
        return (
            {
                coin_id: Decimal(str(data["coingecko:" + coin_id]["price"]))
                for coin_id in ids
            },
            "DefiLlama price API (CoinGecko identifiers)",
            iso_now(),
        )
    except (requests.RequestException, KeyError, TypeError, ValueError) as exc:
        errors.append(f"DefiLlama: {exc}")
    raise RuntimeError("price lookup failed: " + "; ".join(errors))

