class NetaCosmosClient {
  constructor(endpoints) {
    this.endpoints = endpoints.map(endpoint => endpoint.replace(/\/$/, ""));
    if (!this.endpoints.length) throw new Error("At least one LCD endpoint is required");
  }

  async get(path) {
    const errors = [];
    for (const endpoint of this.endpoints) {
      try {
        const response = await fetch(endpoint + path, {cache: "no-store"});
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return {data: await response.json(), endpoint};
      } catch (error) {
        errors.push(`${endpoint}: ${error.message}`);
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

