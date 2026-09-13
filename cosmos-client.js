class NetaCosmosClient {
  constructor(endpoints, {timeoutMs = 8000} = {}) {
    this.endpoints = endpoints.map(endpoint => endpoint.replace(/\/$/, ""));
    this.timeoutMs = timeoutMs;
    if (!this.endpoints.length) throw new Error("At least one LCD endpoint is required");
  }

  async get(path) {
    const errors = [];
    for (const endpoint of this.endpoints) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
      try {
        const response = await fetch(endpoint + path, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return {data: await response.json(), endpoint};
      } catch (error) {
        const message = error.name === "AbortError" ? `${this.timeoutMs}MS TIMEOUT` : error.message;
        errors.push(`${endpoint}: ${message}`);
      } finally {
        clearTimeout(timeout);
      }
    }
    throw new Error(`ALL JUNO LCD ENDPOINTS FAILED // ${errors.join(" // ")}`);
  }

  async smart(contract, message) {
    const raw = btoa(unescape(encodeURIComponent(JSON.stringify(message))));
    const {data} = await this.get(
      `/cosmwasm/wasm/v1/contract/${contract}/smart/${encodeURIComponent(raw)}`,
    );
    return data.data ?? data;
  }

  async contractInfo(contract) {
    const {data} = await this.get(`/cosmwasm/wasm/v1/contract/${contract}`);
    return data.contract_info ?? data;
  }
}

window.NetaCosmosClient = NetaCosmosClient;
