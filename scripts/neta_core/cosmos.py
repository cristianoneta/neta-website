"""Small failover client for Cosmos SDK LCD and CosmWasm queries."""
from __future__ import annotations

import base64
import json
from collections.abc import Iterable, Mapping

import requests


class CosmosClient:
    def __init__(
        self,
        endpoints: Iterable[str],
        *,
        user_agent: str = "NETA-Reborn-Collector/1.0 (+https://netareborn.com)",
        timeout: int = 45,
        session: requests.Session | None = None,
    ) -> None:
        self.endpoints = tuple(endpoint.rstrip("/") for endpoint in endpoints)
        if not self.endpoints:
            raise ValueError("at least one LCD endpoint is required")
        self.timeout = timeout
        self.session = session or requests.Session()
        self.session.headers.update({"User-Agent": user_agent})

    def get(self, path: str, params: Mapping[str, object] | None = None):
        errors = []
        for endpoint in self.endpoints:
            try:
                response = self.session.get(
                    endpoint + path,
                    params=params,
                    timeout=self.timeout,
                )
                response.raise_for_status()
                return response.json(), endpoint
            except requests.RequestException as exc:
                errors.append(f"{endpoint}: {exc}")
        raise RuntimeError("all LCD endpoints failed: " + "; ".join(errors))

    def smart(self, contract: str, message: Mapping[str, object]):
        raw = json.dumps(message, separators=(",", ":")).encode()
        query = base64.b64encode(raw).decode()
        data, endpoint = self.get(
            f"/cosmwasm/wasm/v1/contract/{contract}/smart/{query}"
        )
        return data.get("data", data), endpoint

    def contract_info(self, contract: str):
        data, endpoint = self.get(f"/cosmwasm/wasm/v1/contract/{contract}")
        return data.get("contract_info", data), endpoint

