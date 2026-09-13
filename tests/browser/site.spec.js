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

function recoveryCodeIds() {
  const codeIds = new Map();
  for (const pool of registry.pools) {
    for (const contract of [pool.pair, pool.lp_token, pool.stake]) codeIds.set(contract.address, contract.code_id);
  }
  return codeIds;
}

async function mockRecoveryChain(page, {balanceFor = () => "0", delayFor = () => 0} = {}) {
  const codeIds = recoveryCodeIds();
  await page.route(/^https:\/\/juno-api\./, async route => {
    const url = new URL(route.request().url());
    const headers = {"access-control-allow-origin": "*", "content-type": "application/json"};
    if (url.pathname.endsWith("/blocks/latest")) {
      await route.fulfill({headers, body: JSON.stringify({block: {header: {height: "12345678"}}})});
      return;
    }
    const contract = url.pathname.match(/\/contract\/([^/]+)/)?.[1];
    if (!url.pathname.includes("/smart/")) {
      await route.fulfill({headers, body: JSON.stringify({contract_info: {code_id: String(codeIds.get(contract))}})});
      return;
    }
    const encoded = decodeURIComponent(url.pathname.split("/smart/")[1]);
    const query = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
    const address = query.balance?.address || query.all_staked?.address || query.claims?.address || null;
    const delay = delayFor(address, query, contract);
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    let data;
    if (query.balance) data = {balance: balanceFor(address, contract)};
    else if (query.all_staked) data = {stakes: []};
    else if (query.claims) data = {claims: []};
    else if (query.share) data = registry.pools.find(pool => pool.pair.address === contract).assets.map(() => ({amount: "1000000"}));
    else data = {};
    await route.fulfill({headers, body: JSON.stringify({data})});
  });
}

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

test("Map of NETA links Osmosis movers safely to Mintscan", async ({page}) => {
  await page.goto("/map-of-neta.html", {waitUntil: "domcontentloaded"});
  const link = page.locator("#buyers a.mover-wallet").first();
  await expect(link).toHaveAttribute("href", /^https:\/\/www\.mintscan\.io\/osmosis\/address\/osmo1[0-9a-z]{38}$/);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  await expect(link).toHaveAttribute("title", /^osmo1[0-9a-z]{38}$/);
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
  await expect(page.locator("#q")).toHaveValue(await page.evaluate(() => window.__testWalletAddress));
  await expect(page.locator("#rankPanelResult")).toBeVisible();

  await page.locator("#keplr-connect").click();
  await expect(page.locator("#wallet-menu")).toBeVisible();
  await expect(page.locator("[data-wallet-menu-rank]")).toContainText("RANK #");
  await page.locator('[data-wallet-action="disconnect"]').click();
  await expect(page.locator("[data-wallet-label]")).toHaveText("CONNECT KEPLR");
  await expect(page.locator("#rankPanelDefault")).toBeVisible();
  await expect(page.locator("#result")).toBeHidden();
  expect(await page.evaluate(() => ({state: window.NETA_WALLET_STATE, session: sessionStorage.getItem("neta:keplr-connected")}))).toEqual({state: null, session: null});
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

test("compact address index keeps one canonical row with both address aliases", async ({page}) => {
  await page.goto("/index.html", {waitUntil: "domcontentloaded"});
  const result = await page.evaluate(() => {
    const row = window.NETA_ADDRESS_ROWS.find(item => item.juno_address && item.osmosis_address);
    return {
      rowCount: window.NETA_ADDRESS_ROWS.length,
      expectedCount: window.NETA_METADATA.economic_master_entries,
      sameObject: window.NETA_ADDRESS_INDEX[row.juno_address] === window.NETA_ADDRESS_INDEX[row.osmosis_address],
      rank: window.NETA_ADDRESS_INDEX[row.juno_address].rank,
    };
  });
  expect(result.rowCount).toBe(result.expectedCount);
  expect(result.sameObject).toBe(true);
  expect(result.rank).toBeGreaterThan(0);
});

test("ranking treats snapshot labels as text instead of HTML", async ({page}) => {
  await page.goto("/index.html", {waitUntil: "domcontentloaded"});
  const address = await page.evaluate(() => {
    const row = window.NETA_ADDRESS_ROWS[0];
    row.label = '<img id="snapshot-injection" src=x onerror="window.__snapshotInjected=true">';
    return row.juno_address || row.osmosis_address;
  });
  await page.locator("#q").fill(address);
  await page.locator("#go").click();
  await expect(page.locator("#result")).toContainText("<img id=");
  await expect(page.locator("#snapshot-injection")).toHaveCount(0);
  expect(await page.evaluate(() => window.__snapshotInjected)).toBeUndefined();
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

test("a late wallet lookup cannot contaminate a newer recovery total", async ({page}) => {
  const firstAddress = leaderboard.top_wallets[0].address;
  const secondAddress = leaderboard.top_wallets[1].address;
  await mockRecoveryChain(page, {
    balanceFor: address => address === firstAddress ? "10000000000" : "0",
    delayFor: address => address === firstAddress ? 80 : address === secondAddress ? 240 : 0,
  });
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});
  await page.evaluate(() => {
    window.__recoveryTotals = [];
    new MutationObserver(() => window.__recoveryTotals.push(document.querySelector("#position-total-usd").textContent))
      .observe(document.querySelector("#position-total-usd"), {childList: true, subtree: true, characterData: true});
  });

  await page.locator("#wallet-address").fill(firstAddress);
  await page.locator("#address-form button[type=submit]").click();
  await page.waitForTimeout(20);
  await page.locator("#wallet-address").fill(secondAddress);
  await page.locator("#address-form button[type=submit]").click();
  await page.evaluate(() => { window.__recoveryTotals = []; });

  await expect(page.locator("#wallet-status")).toContainText("READ-ONLY CHECK 8/8 COMPLETE");
  await expect(page.locator("#position-address")).toHaveText(secondAddress);
  await expect(page.locator("#position-total-usd")).toHaveText("$0.00");
  const observed = await page.evaluate(() => window.__recoveryTotals);
  const settledTotals = observed.filter(value => value !== "CALCULATING…");
  expect(settledTotals.length).toBeGreaterThan(0);
  expect(new Set(settledTotals)).toEqual(new Set(["$0.00"]));
});

test("disconnect removes recovery action authority but keeps read-only results", async ({page}) => {
  const address = leaderboard.top_wallets[0].address;
  await mockRecoveryChain(page, {balanceFor: () => "1000000"});
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});
  await page.evaluate(walletAddress => {
    window.keplr = {
      enable: async () => {},
      getOfflineSigner: () => ({getAccounts: async () => [{address: walletAddress}]})
    };
  }, address);

  await page.locator("#keplr-connect").click();
  await expect(page.locator("#wallet-status")).toContainText("CONNECTED + CHECKED 8/8");
  await expect(page.locator(".actions button:not([disabled])")).toHaveCount(8);
  await page.locator("#keplr-connect").click();
  await page.locator('[data-wallet-action="disconnect"]').click();

  await expect(page.locator("#wallet-status")).toContainText("READ-ONLY CHECK 8/8 COMPLETE");
  await expect(page.locator("#position-address")).toHaveText(address);
  await expect(page.locator(".actions button:not([disabled])")).toHaveCount(0);
  await expect(page.locator(".actions").first()).toContainText("PREVIEW WITHDRAW");
  await expect(page.locator(".actions button").first()).toBeDisabled();
});
