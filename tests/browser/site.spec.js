const {test, expect} = require("@playwright/test");
const registry = require("../../data/recovery/wynd-pools.json");
const leaderboard = require("../../data/recovery/wynd-leaderboard.json");

const pages = [
  ["/index.html", "RANKING"],
  ["/map-of-neta.html", "MAP OF NETA"],
  ["/what-is-neta.html", "WHAT IS NETA"],
  ["/neta-dao.html", "NETA DAO"],
  ["/wynd-recovery.html", "WYND RECOVERY"],
];

for (const [path, activeLabel] of pages) {
  test(`${activeLabel} loads with the shared shell`, async ({page}) => {
    const pageErrors = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    await page.goto(path, {waitUntil: "domcontentloaded"});

    await expect(page.locator("header nav a")).toHaveCount(6);
    await expect(page.locator("header nav a.active")).toHaveText(activeLabel);
    await expect(page.locator("#keplr-connect")).toContainText("CONNECT KEPLR");
    await expect(page.locator("#keplr-connect img")).toHaveAttribute("src", "assets/keplr-symbol.svg");
    expect(await page.locator("header").evaluate(element => getComputedStyle(element).position)).toBe("sticky");
    await expect(page.locator("#matrix")).toHaveAttribute("data-matrix-ready", "true");
    await expect(page.locator("footer")).toContainText("MORE THAN A TOKEN");
    expect(pageErrors).toEqual([]);
  });
}

test("recovery renders validated snapshots and stays fail-closed", async ({page}) => {
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});

  await expect(page.locator(".pool-card")).toHaveCount(8);
  await expect(page.locator("#leaderboard-list > *")).toHaveCount(10);
  await expect(page.locator("#pool-total-usd")).not.toHaveText("CALCULATING…");
  await expect(page.locator("#pool-total-usd")).toContainText("$");
  await expect(page.locator("#wallet-address")).toBeVisible();
  await expect(page.locator(".actions button:not([disabled])")).toHaveCount(0);
  await expect(page.locator("#execute-action")).toBeHidden();
  await expect(page.locator("#execute-action")).toBeDisabled();
  expect(pageErrors).toEqual([]);
});

test("mobile navigation and recovery lookup remain usable", async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});

  await expect(page.locator("header nav")).toBeVisible();
  await expect(page.locator("#wallet-address")).toBeVisible();
  await expect(page.locator("#keplr-connect")).toBeVisible();
  await expect(page.locator(".pool-card")).toHaveCount(8);
});

test("shared Keplr header shows the ranking's total NETA position", async ({page}) => {
  await page.goto("/index.html", {waitUntil: "domcontentloaded"});
  const expected = await page.evaluate(() => {
    const row = Object.values(window.NETA_ADDRESS_INDEX).find(item => item.juno_address);
    window.__testWalletAddress = row.juno_address;
    window.keplr = {
      enable: async chainId => { if (chainId !== "juno-1") throw new Error("wrong chain"); },
      getOfflineSigner: () => ({getAccounts: async () => [{address: row.juno_address}]})
    };
    return {
      short: `${row.juno_address.slice(0, 9)}…${row.juno_address.slice(-6)}`,
      total: new Intl.NumberFormat("en-US", {maximumFractionDigits: 6}).format(row.total_neta),
    };
  });

  await page.locator("#keplr-connect").click();
  await expect(page.locator("[data-wallet-label]")).toHaveText(expected.short);
  await expect(page.locator("[data-wallet-balance]")).toHaveText(`${expected.total} NETA`);
  await expect(page.locator("#keplr-connect")).toHaveAttribute("data-state", "connected");
});

test("Keplr total resolves a wallet represented only by its Osmosis address", async ({page}) => {
  await page.goto("/index.html", {waitUntil: "domcontentloaded"});
  const expected = await page.evaluate(() => {
    const row = Object.values(window.NETA_ADDRESS_INDEX).find(item => item.osmosis_address && !item.juno_address);
    const address = window.NetaWalletHeader.toPrefix(row.osmosis_address, "juno");
    window.keplr = {
      enable: async () => {},
      getOfflineSigner: () => ({getAccounts: async () => [{address}]})
    };
    return new Intl.NumberFormat("en-US", {maximumFractionDigits: 6}).format(row.total_neta);
  });

  await page.locator("#keplr-connect").click();
  await expect(page.locator("[data-wallet-balance]")).toHaveText(`${expected} NETA`);
});

test("recovery falls back by endpoint and isolates one failed pool", async ({page}) => {
  const codeIds = new Map();
  for (const pool of registry.pools) {
    for (const contract of [pool.pair, pool.lp_token, pool.stake]) {
      codeIds.set(contract.address, contract.code_id);
    }
  }
  const failedContracts = new Set([
    registry.pools[0].pair.address,
    registry.pools[0].lp_token.address,
    registry.pools[0].stake.address,
  ]);
  let fallbackRequests = 0;
  let recoverFailedPool = false;
  const requestsByContract = new Map();

  await page.route(/^https:\/\/juno-api\./, async route => {
    const url = new URL(route.request().url());
    if (url.hostname.includes("polkachu")) {
      await route.abort("failed");
      return;
    }
    fallbackRequests++;
    const contract = url.pathname.match(/\/contract\/([^/]+)/)?.[1];
    if (contract) requestsByContract.set(contract, (requestsByContract.get(contract) || 0) + 1);
    if (contract && failedContracts.has(contract) && !recoverFailedPool) {
      await route.fulfill({status: 503, body: "pool unavailable"});
      return;
    }
    const headers = {"access-control-allow-origin": "*", "content-type": "application/json"};
    if (url.pathname.endsWith("/blocks/latest")) {
      await route.fulfill({headers, body: JSON.stringify({block: {header: {height: "12345678"}}})});
      return;
    }
    if (!url.pathname.includes("/smart/")) {
      await route.fulfill({headers, body: JSON.stringify({contract_info: {code_id: String(codeIds.get(contract))}})});
      return;
    }
    const encoded = decodeURIComponent(url.pathname.split("/smart/")[1]);
    const query = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
    let data;
    if (query.balance) data = {balance: "0"};
    else if (query.all_staked) data = {stakes: []};
    else if (query.claims) data = {claims: []};
    else data = {};
    await route.fulfill({headers, body: JSON.stringify({data})});
  });

  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});
  await page.locator("#wallet-address").fill(leaderboard.top_wallets[0].address);
  await page.locator("#address-form button[type=submit]").click();

  await expect(page.locator("#wallet-status")).toContainText("READ-ONLY CHECK 7/8 · RETRY AVAILABLE");
  await expect(page.locator("#position-address")).toContainText("PARTIAL VALUE · 1 POOL UNAVAILABLE");
  await expect(page.getByRole("button", {name: "RETRY THIS POOL"})).toHaveCount(1);
  await expect(page.locator(".actions button:not([disabled])")).toHaveCount(0);
  expect(fallbackRequests).toBeGreaterThan(0);

  const unaffectedPair = registry.pools[1].pair.address;
  const unaffectedRequests = requestsByContract.get(unaffectedPair);
  recoverFailedPool = true;
  await page.getByRole("button", {name: "RETRY THIS POOL"}).click();
  await expect(page.locator("#wallet-status")).toContainText("READ-ONLY CHECK 8/8 COMPLETE");
  await expect(page.getByRole("button", {name: "RETRY THIS POOL"})).toHaveCount(0);
  expect(requestsByContract.get(unaffectedPair)).toBe(unaffectedRequests);
});
