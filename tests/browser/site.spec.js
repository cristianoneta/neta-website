const {test, expect} = require("@playwright/test");
const fs = require("node:fs");
const registry = require("../../data/recovery/wynd-pools.json");
const leaderboard = require("../../data/recovery/wynd-leaderboard.json");

const pages = [
  ["/index.html", "RANKING"],
  ["/map-of-neta.html", "MAP OF NETA"],
  ["/neta-dao.html", "NETA DAO"],
  ["/wynd-recovery.html", "WYND RECOVERY"],
  ["/rescue-neta.html", "RESCUE NETA"],
];

function recoveryCodeIds() {
  const codeIds = new Map();
  for (const pool of registry.pools) {
    for (const contract of [pool.pair, pool.lp_token, pool.stake]) codeIds.set(contract.address, contract.code_id);
  }
  return codeIds;
}

async function mockRecoveryChain(page, {
  balanceFor = () => "0",
  stakesFor = () => [],
  claimsFor = () => [],
  delayFor = () => 0,
} = {}) {
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
    else if (query.all_staked) data = {stakes: stakesFor(address, contract)};
    else if (query.claims) data = {claims: claimsFor(address, contract)};
    else if (query.share) data = registry.pools.find(pool => pool.pair.address === contract).assets.map(asset => ({info: asset.info, amount: "1000000"}));
    else data = {};
    await route.fulfill({headers, body: JSON.stringify({data})});
  });
}

async function installSigningClient(page, executeBody) {
  await page.route("**/assets/recovery-signing-client.js*", route => route.fulfill({
    contentType: "application/javascript",
    body: `window.NetaRecoverySigning={
      connect:async()=>({client:{},endpoint:"https://rpc.test"}),
      simulate:async()=>123456,
      execute:async()=>{${executeBody}}
    };`,
  }));
}

for (const [path, activeLabel] of pages) {
  test(`${activeLabel} loads with the shared shell`, async ({page}) => {
    const pageErrors = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    await page.goto(path, {waitUntil: "domcontentloaded"});

    await expect(page.locator("header nav a")).toHaveCount(6);
    await expect(page.locator("header nav .nav-disabled")).toHaveAttribute("aria-disabled", "true");
    await expect(page.locator("header nav a.active")).toHaveText(activeLabel);
    await expect(page.locator("#keplr-connect")).toContainText("CONNECT KEPLR");
    await expect(page.locator('meta[name="referrer"]')).toHaveAttribute("content", "no-referrer");
    await expect(page.locator("#keplr-connect img")).toHaveAttribute("src", "assets/keplr-symbol.svg");
    expect(await page.locator("header").evaluate(element => getComputedStyle(element).position)).toBe("sticky");
    await expect(page.locator("#matrix")).toHaveAttribute("data-matrix-ready", "true");
    await expect(page.locator("footer")).toContainText("MORE THAN A TOKEN");
    expect(pageErrors).toEqual([]);
  });
}

test("NETA Socials starts with an honest empty state", async ({page}) => {
  await page.goto("/neta-socials.html", {waitUntil: "domcontentloaded"});
  await expect(page.locator(".thread-item")).toHaveCount(0);
  await expect(page.locator(".comment")).toHaveCount(0);
  await expect(page.locator(".thread-empty")).toContainText("THE BOARD IS EMPTY.");
  await expect(page.locator(".conversation-empty-body")).toContainText("NO MESSAGES TO DISPLAY");
});

test("NETA Socials can suggest the hidden Uni-7 chain", async ({page}) => {
  await page.addInitScript(() => {
    window.__suggestedChain = null;
    window.keplr = {experimentalSuggestChain: async chain => { window.__suggestedChain = chain; }};
  });
  await page.goto("/neta-socials.html", {waitUntil: "domcontentloaded"});
  const button = page.locator("#add-juno-testnet");
  await expect(button).toHaveText("· UNI-7");
  await button.click();
  await expect(button).toHaveText("· UNI-7 ADDED");
  const chain = await page.evaluate(() => window.__suggestedChain);
  expect(chain.chainId).toBe("uni-7");
  expect(chain.rpc).toBe("https://juno.test.rpc.nodeshub.online");
  expect(chain.rest).toBe("https://juno.test.api.nodeshub.online");
  expect(chain.feeCurrencies[0].coinMinimalDenom).toBe("ujunox");
  expect(chain.bech32Config.bech32PrefixAccAddr).toBe("juno");
});

test("NETA Socials testnet console is inert until explicitly connected", async ({page}) => {
  await page.addInitScript(() => {
    window.__keplrCalls = 0;
    window.keplr = {experimentalSuggestChain: async () => { window.__keplrCalls += 1; }};
  });
  await page.goto("/neta-socials-testnet.html", {waitUntil: "domcontentloaded"});
  await expect(page.locator("#test-status")).toHaveText("NOT CONNECTED");
  await expect(page.locator("#test-mock")).toBeDisabled();
  await expect(page.locator("#test-socials")).toBeDisabled();
  await expect(page.locator("#test-verify")).toBeDisabled();
  expect(await page.evaluate(() => window.__keplrCalls)).toBe(0);
});

test("NETA Socials testnet console surfaces a missing Keplr extension", async ({page}) => {
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.stack || error.message));
  await page.goto("/neta-socials-testnet.html", {waitUntil: "domcontentloaded"});
  await page.locator("#test-connect").click();
  expect(pageErrors).toEqual([]);
  await expect(page.locator("#test-status")).toHaveText("FAILED");
  await expect(page.locator("#test-output")).toContainText("KEPLR NOT FOUND");
});

test("NETA Socials testnet connection button toggles connected and disconnected", async ({page}) => {
  await page.route("**/assets/socials-testnet-client.js?v=3", route => route.fulfill({
    contentType: "application/javascript",
    body: "window.NetaSocialsTestnet={connect:async()=>({getBalance:async()=>({amount:'110000000'}),disconnect:()=>{window.__rpcDisconnected=true}})};",
  }));
  await page.addInitScript(() => {
    window.keplr = {
      experimentalSuggestChain: async () => {},
      enable: async () => {},
      getOfflineSigner: () => ({getAccounts: async () => [{address: "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57"}]}),
    };
  });
  await page.goto("/neta-socials-testnet.html", {waitUntil: "domcontentloaded"});
  const button = page.locator("#test-connect");
  await button.click();
  await expect(button).toHaveText("CONNECTED · DISCONNECT");
  await expect(button).toHaveAttribute("data-state", "connected");
  await expect(page.locator("#test-status")).toHaveText("CONNECTED TO UNI-7");
  await button.click();
  await expect(button).toHaveText("CONNECT KEPLR");
  await expect(button).toHaveAttribute("data-state", "disconnected");
  await expect(page.locator("#test-status")).toHaveText("NOT CONNECTED");
  expect(await page.evaluate(() => window.__rpcDisconnected)).toBe(true);
});

test("NETA Socials testnet passes fee protection to the actual Keplr sign call", async ({page}) => {
  await page.route("**/assets/socials-testnet-client.js?v=3", route => route.fulfill({
    contentType: "application/javascript",
    body: "window.NetaSocialsTestnet={connect:async(_rpc,signer)=>{await signer.signDirect('juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57',{});return{getBalance:async()=>({amount:'110000000'})}};",
  }));
  await page.addInitScript(() => {
    window.__signOptions = null;
    window.keplr = {
      experimentalSuggestChain: async () => {},
      enable: async () => {},
      getOfflineSigner: () => ({getAccounts: async () => [{address: "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57"}]}),
      signDirect: async (_chainId, _address, document, options) => { window.__signOptions = options; return {signed: document, signature: {}}; },
      signAmino: async () => { throw new Error("unexpected amino signing"); },
    };
  });
  await page.goto("/neta-socials-testnet.html", {waitUntil: "domcontentloaded"});
  await page.locator("#test-connect").click();
  await expect(page.locator("#test-status")).toHaveText("CONNECTED TO UNI-7");
  expect(await page.evaluate(() => window.__signOptions)).toEqual({preferNoSetFee: true});
});

test("recovery renders validated snapshots and stays fail-closed", async ({page}) => {
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});

  await expect(page.locator(".pool-card")).toHaveCount(8);
  await expect(page.locator("#leaderboard-list > *")).toHaveCount(10);
  await expect(page.locator("#pool-total-usd")).not.toHaveText("CALCULATING…");
  await expect(page.locator("#pool-total-usd")).toContainText("$");
  await expect(page.locator("#wallet-address")).toBeVisible();
  await expect(page.locator("#recovery-guide-title")).toHaveText("AVAILABLE RECOVERY ACTIONS");
  await expect(page.locator(".hero-recovery-actions > div")).toHaveCount(3);
  await expect(page.locator(".hero-recovery-guide")).toContainText("NO ACTION AVAILABLE");
  await expect(page.locator(".actions button:not([disabled])")).toHaveCount(0);
  await expect(page.locator("#execute-action")).toBeHidden();
  await expect(page.locator("#execute-action")).toBeDisabled();
  await expect(page.locator("#transaction-explorer")).toHaveAttribute("rel", "noopener noreferrer");
  await expect(page.locator("#transaction-explorer")).toHaveAttribute("target", "_blank");
  expect(pageErrors).toEqual([]);
});

test("Rescue NETA validates the fixed pair and renders a read-only live quote", async ({page}) => {
  const pair = "juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra";
  const neta = "juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr";
  await page.route(/^https:\/\/juno-api\./, async route => {
    const url = new URL(route.request().url());
    const headers = {"access-control-allow-origin": "*", "content-type": "application/json"};
    if (!url.pathname.includes("/smart/")) {
      await route.fulfill({headers, body: JSON.stringify({contract_info: {code_id: "2289"}})});
      return;
    }
    const query = JSON.parse(Buffer.from(decodeURIComponent(url.pathname.split("/smart/")[1]), "base64").toString("utf8"));
    let data;
    if (query.pair) data = {contract_addr: pair, asset_infos: [{native: "ujuno"}, {token: neta}], fee_config: {total_fee_bps: 30, protocol_fee_bps: 3333}};
    else if (query.pool) data = {assets: [{info: {native: "ujuno"}, amount: "94756644466"}, {info: {token: neta}, amount: "959346155"}], total_share: "8961183403"};
    else if (query.simulation) data = {return_amount: "10094", spread_amount: "0", commission_amount: "30", referral_amount: "0"};
    else data = {};
    await route.fulfill({headers, body: JSON.stringify({data})});
  });
  await page.goto("/rescue-neta.html", {waitUntil: "domcontentloaded"});
  await expect(page.locator("#contract-state")).toHaveText("LIVE CODE OK");
  await page.locator("#offer-amount").fill("1");
  await expect(page.locator("#receive-amount")).toHaveText("0.010094");
  await expect(page.locator("#price-impact")).toHaveText("0.00%");
  await expect(page.locator("#pool-fee")).toContainText("0.30%");
  await expect(page.locator("#minimum-received")).toHaveText("0.009589 NETA");
  await expect(page.locator(".swap-action")).toBeDisabled();
  await expect(page.locator(".prototype-note")).toContainText("any connected Juno wallet");

  await page.locator("#offer-amount").fill("0,0100000");
  await expect(page.locator("#quote-error")).toContainText("UP TO 6 DECIMALS");
  await expect(page.locator("#pool-fee")).toHaveText("0.30%");
  await page.locator("#offer-amount").fill("1");
  await expect(page.locator("#receive-amount")).toHaveText("0.010094");

  await page.locator("#reverse-swap").click();
  await expect(page.locator("#offer-symbol")).toHaveText("NETA");
  await expect(page.locator("#receive-symbol")).toHaveText("JUNO");
  await expect(page.locator("#offer-logo")).toHaveAttribute("src", "assets/neta-token.png");
  await expect(page.locator("#receive-logo")).toHaveAttribute("src", "assets/juno-chain.png");
});

test("Rescue NETA public signing builds exact native and CW20 swaps and fails closed on rejection", async ({page}) => {
  const pair = "juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra";
  const neta = "juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr";
  const wallet = "juno1d0g7f97v87xwe6r4vr4jj3jfhzcv4vvfhamy8w";
  await page.route("**/assets/swap-signing-client.js*", route => route.fulfill({
    contentType: "application/javascript",
    body: `window.NetaSwapSigning={
      connect:async()=>({client:{},endpoint:"https://rpc.test"}),
      simulate:async()=>150000,
      execute:async()=>{if(window.__swapReject)throw new Error("USER REJECTED");return window.__swapResult}
    };`,
  }));
  await page.route(/^https:\/\/juno-api\./, async route => {
    const url = new URL(route.request().url());
    const headers = {"access-control-allow-origin": "*", "content-type": "application/json"};
    if (url.pathname.includes("/balances/") && url.pathname.endsWith("/by_denom")) {
      await route.fulfill({headers, body: JSON.stringify({balance: {denom: "ujuno", amount: "100000000"}})});
      return;
    }
    if (!url.pathname.includes("/smart/")) {
      await route.fulfill({headers, body: JSON.stringify({contract_info: {code_id: "2289"}})});
      return;
    }
    const query = JSON.parse(Buffer.from(decodeURIComponent(url.pathname.split("/smart/")[1]), "base64").toString("utf8"));
    let data;
    if (query.pair) data = {contract_addr: pair, asset_infos: [{native: "ujuno"}, {token: neta}], fee_config: {total_fee_bps: 30, protocol_fee_bps: 3333}};
    else if (query.pool) data = {assets: [{info: {native: "ujuno"}, amount: "94756644466"}, {info: {token: neta}, amount: "959346155"}], total_share: "8961183403"};
    else if (query.balance) data = {balance: "1000000"};
    else if (query.simulation?.offer_asset?.info?.token) data = {return_amount: "983732", spread_amount: "1028", commission_amount: "2960", referral_amount: "0"};
    else if (query.simulation) data = {return_amount: "10094", spread_amount: "0", commission_amount: "30", referral_amount: "0"};
    else data = {};
    await route.fulfill({headers, body: JSON.stringify({data})});
  });

  await page.goto("/rescue-neta.html", {waitUntil: "domcontentloaded"});
  await expect(page.locator("#contract-state")).toHaveText("LIVE CODE OK");
  await page.evaluate(address => {
    window.NETA_WALLET_STATE = {address, signer: {}};
    dispatchEvent(new CustomEvent("neta:wallet-connected", {detail: window.NETA_WALLET_STATE}));
  }, wallet);
  await page.locator("#offer-amount").fill("3000");
  await expect(page.locator("#quote-error")).toContainText("$25 LIMIT EXCEEDED");
  await expect(page.locator("#swap-action")).toBeDisabled();
  await page.locator("#offer-amount").fill("1");
  await expect(page.locator("#swap-action")).toBeEnabled();
  await page.locator("#swap-action").click();
  let preview = JSON.parse(await page.locator("#swap-preview").textContent());
  expect(preview.contract).toBe(pair);
  expect(preview.funds).toEqual([{denom: "ujuno", amount: "1000000"}]);
  expect(preview.message.swap.offer_asset).toEqual({info: {native: "ujuno"}, amount: "1000000"});
  expect(preview.message.swap.max_spread).toBe("0.05");
  expect(preview.message.swap.referral_address).toBeNull();
  expect(preview.per_swap_limit_usd).toBe(25);
  expect(preview.pilot_only).toBeUndefined();
  expect(preview.memo).toBe("netareborn.com/rescue-neta:swap:v1");

  await page.locator("#close-swap").click();
  await page.locator("#slippage-summary-button").click();
  await expect(page.locator("#slippage-settings")).toBeVisible();
  await page.locator("#custom-slippage").fill("2.5");
  await expect(page.locator("#slippage-summary")).toHaveText("2.50%");
  await expect(page.locator("#minimum-received")).toHaveText("0.009841 NETA");
  await page.locator("#swap-action").click();
  preview = JSON.parse(await page.locator("#swap-preview").textContent());
  expect(preview.max_slippage).toBe("2.50%");
  expect(preview.message.swap.max_spread).toBe("0.025");
  expect(preview.minimum_received).toBe("0.009841 NETA");

  await page.evaluate(({neta, wallet}) => {
    window.__swapResult = {transactionHash: "A".repeat(64), events: [{type: "wasm", attributes: [
      {key: "_contract_address", value: neta}, {key: "action", value: "transfer"},
      {key: "to", value: wallet}, {key: "amount", value: "10094"},
    ]}]};
  }, {neta, wallet});
  await page.locator("#confirm-swap").click();
  await expect(page.locator("#swap-modal-state")).toContainText("TRANSACTION CONFIRMED");
  await expect(page.locator("#swap-result-hash")).toHaveText("A".repeat(64));
  await expect(page.locator("#swap-explorer")).toHaveAttribute("href", `https://atomscan.com/juno/transactions/${"A".repeat(64)}`);
  await page.locator("#close-swap").click();

  await page.locator("#reverse-swap").click();
  await page.locator("#offer-amount").fill("0,010");
  await expect(page.locator("#swap-action")).toBeEnabled();
  await page.locator("#swap-action").click();
  preview = JSON.parse(await page.locator("#swap-preview").textContent());
  expect(preview.contract).toBe(neta);
  expect(preview.funds).toEqual([]);
  expect(preview.message.send.contract).toBe(pair);
  expect(preview.message.send.amount).toBe("10000");
  const hook = JSON.parse(Buffer.from(preview.message.send.msg, "base64").toString("utf8"));
  expect(hook.swap.ask_asset_info).toEqual({native: "ujuno"});
  expect(hook.swap.max_spread).toBe("0.025");
  expect(hook.swap.referral_address).toBeNull();
  await page.evaluate(walletAddress => {
    window.__swapResult = {transactionHash: "B".repeat(64), events: [{type: "transfer", attributes: [
      {key: "recipient", value: walletAddress}, {key: "amount", value: "983732ujuno"},
    ]}]};
  }, wallet);
  await page.locator("#confirm-swap").click();
  await expect(page.locator("#swap-modal-state")).toContainText("TRANSACTION CONFIRMED");
  await page.locator("#close-swap").click();

  await page.locator("#swap-action").click();
  await page.evaluate(() => { window.__swapReject = true; });
  await page.locator("#confirm-swap").click();
  await expect(page.locator("#swap-modal-state")).toHaveText("TRANSACTION NOT CONFIRMED");
  await expect(page.locator("#swap-modal-message")).toHaveText("USER REJECTED");
  await expect(page.locator("#swap-result")).toBeHidden();
});

test("public signing policy allows only the exact Top-8 recovery contract tuples", async ({page}) => {
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});
  const policy = await page.evaluate(() => {
    const config = window.NETA_RECOVERY_SIGNING;
    try {
      config.recovery.actions.bond = true;
      config.recovery.contracts.extra = {lpToken: "x", stake: "y"};
    } catch (_) {}
    return {
      enabled: config.enabled && config.recovery.enabled,
      actions: Object.keys(config.recovery.actions).sort(),
      contracts: Object.fromEntries(Object.entries(config.recovery.contracts).map(
        ([pair, value]) => [pair, {lpToken: value.lpToken, stake: value.stake}],
      )),
      frozen: Object.isFrozen(config)
        && Object.isFrozen(config.recovery)
        && Object.isFrozen(config.recovery.actions)
        && Object.isFrozen(config.recovery.contracts),
      hasBond: Object.hasOwn(config.recovery.actions, "bond"),
      hasExtra: Object.hasOwn(config.recovery.contracts, "extra"),
    };
  });
  const expected = Object.fromEntries(registry.pools.map(pool => [
    pool.pair.address,
    {lpToken: pool.lp_token.address, stake: pool.stake.address},
  ]));
  expect(policy).toEqual({
    enabled: true,
    actions: ["claim", "unbond", "withdraw"],
    contracts: expected,
    frozen: true,
    hasBond: false,
    hasExtra: false,
  });
});

test("Map of NETA links Osmosis and Juno movers to their explorers", async ({page}) => {
  await page.goto("/map-of-neta.html", {waitUntil: "domcontentloaded"});
  const mapData = require("../../data/map/map-of-neta.json");
  await expect(page.locator("#swaps")).toHaveText(String(mapData.market.swaps));
  await expect(page.locator("#swapBreakdown")).toHaveText(
    `JUNO ${mapData.market.by_chain.juno} · OSMOSIS ${mapData.market.by_chain.osmosis}`,
  );
  await expect(page.locator("#marketUpdated")).not.toHaveText("—");
  await expect(page.locator("#terraAmount")).toHaveText("0 NETA");
  await expect(page.locator(".terra-node .chain-logo")).toHaveAttribute("src", "assets/terra-matrix-official.svg");
  await expect(page.locator(".terra-link")).toHaveCount(2);
  const centers = await page.locator(".flow-stage").evaluate(stage => {
    const center = selector => {
      const box = stage.querySelector(selector).getBoundingClientRect();
      return box.left + box.width / 2;
    };
    const stageBox = stage.getBoundingClientRect();
    return {terra: center(".terra-node"), juno: center(".juno-node"), osmosis: center(".osmo-node"), stage: stageBox.left + stageBox.width / 2};
  });
  expect(centers.terra).toBeLessThan(centers.juno);
  expect(centers.juno).toBeLessThan(centers.osmosis);
  expect(Math.abs(centers.juno - centers.stage)).toBeLessThan(3);
  const osmosis = page.locator('a.mover-wallet[href*="mintscan.io/osmosis/address/"]').first();
  const juno = page.locator('a.mover-wallet[href*="atomscan.com/juno/accounts/"]').first();
  await expect(osmosis).toHaveAttribute("href", /^https:\/\/www\.mintscan\.io\/osmosis\/address\/osmo1[0-9a-z]{38}$/);
  await expect(juno).toHaveAttribute("href", /^https:\/\/atomscan\.com\/juno\/accounts\/juno1[0-9a-z]{38}$/);
  for (const link of [osmosis,juno]) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});

test("IBC transfer panel exposes only active public routes and return assets", async ({page}) => {
  await page.goto("/map-of-neta.html", {waitUntil: "domcontentloaded"});
  const routes = [
    ["juno", "osmosis", ["JUNO", "OSMO", "NETA"], "channel-0 · JUNO"],
    ["osmosis", "juno", ["JUNO", "OSMO", "NETA"], "channel-42 · JUNO"],
    ["osmosis", "terra", ["OSMO", "LUNA"], "channel-251 · OSMO"],
    ["terra", "osmosis", ["OSMO", "LUNA"], "channel-1 · OSMO"],
  ];
  for (const [from, to, assets, channel] of routes) {
    await page.locator("#ibc-from").selectOption(from);
    await page.locator("#ibc-to").selectOption(to);
    await expect(page.locator("#ibc-asset option")).toHaveText(assets);
    await expect(page.locator("#ibc-channel")).toHaveText(channel);
  }
  await page.locator("#ibc-from").selectOption("juno");
  await expect(page.locator("#ibc-to option")).toHaveText(["OSMOSIS"]);
  await page.locator("#ibc-asset").selectOption("NETA");
  await expect(page.locator("#ibc-channel")).toHaveText("channel-47 · NETA");
  await page.locator("#ibc-reverse").click();
  await expect(page.locator("#ibc-channel")).toHaveText("channel-169 · NETA");
  await page.locator("#ibc-from").selectOption("terra");
  await expect(page.locator("#ibc-to option")).toHaveText(["OSMOSIS"]);
});

test("IBC transfer panel remains contained on desktop and mobile", async ({page}) => {
  for (const viewport of [{width: 1440, height: 900}, {width: 390, height: 844}]) {
    await page.setViewportSize(viewport);
    await page.goto("/map-of-neta.html", {waitUntil: "domcontentloaded"});
    const section = page.locator(".ibc-section");
    await expect(section).toBeVisible();
    const box = await section.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
    await expect(page.locator("#ibc-review")).toBeVisible();
    await expect(page.locator("#ibc-review")).toBeDisabled();
  }
});

test("IBC transfer accepts comma and point decimal separators", async ({page}) => {
  const accounts = {
    "juno-1": "juno1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqp4h6h",
    "osmosis-1": "osmo1z3xcalwan92yqxu9d406tlft9yy94jy8wafq9s",
    "phoenix-1": "terra1z3xcalwan92yqxu9d406tlft9yy94jy8qzqs3z",
  };
  await page.route("**/cosmos/bank/v1beta1/balances/**", route => route.fulfill({
    contentType: "application/json",
    body: JSON.stringify({balance: {amount: "1000000000"}}),
  }));
  await page.addInitScript(accounts => {
    window.ibcEnabledChains = [];
    window.keplr = {
      enable: async chainId => { window.ibcEnabledChains.push(chainId); },
      getOfflineSigner: chainId => ({getAccounts: async () => [{address: accounts[chainId]}]}),
    };
  }, accounts);
  await page.goto("/map-of-neta.html", {waitUntil: "domcontentloaded"});
  await page.evaluate(() => dispatchEvent(new CustomEvent("neta:wallet-connected")));
  await expect.poll(() => page.evaluate(() => window.ibcEnabledChains)).toEqual(["juno-1", "osmosis-1"]);
  await page.locator("#ibc-amount").fill("0,01");
  await expect(page.locator("#ibc-status")).toHaveText("ROUTE AND BALANCE READY FOR REVIEW.");
  await expect(page.locator("#ibc-review")).toBeEnabled();
  await page.locator("#ibc-amount").fill("0.01");
  await expect(page.locator("#ibc-review")).toBeEnabled();
});

test("capture IBC branch preview", async ({page}) => {
  fs.mkdirSync("artifacts/ibc-preview", {recursive: true});
  await page.emulateMedia({reducedMotion: "reduce"});
  await page.addInitScript(() => localStorage.setItem("neta-matrix-effect-enabled", "false"));
  for (const [name, viewport] of [
    ["desktop", {width: 1440, height: 900}],
    ["mobile", {width: 390, height: 844}],
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/map-of-neta.html", {waitUntil: "domcontentloaded"});
    await page.locator("header").evaluate(element => { element.style.display = "none"; });
    const section = page.locator(".ibc-section");
    await section.scrollIntoViewIfNeeded();
    await section.screenshot({path: `artifacts/ibc-preview/${name}.png`});
  }
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
  await expect(page.locator(".pool-card.has-position")).toHaveCount(8);
  await expect(page.locator(".pool-position-badge").first()).toContainText("YOUR POSITION");
  await expect(page.locator(".pool-action-state").first()).toHaveText("WITHDRAW AVAILABLE");
  await expect(page.locator(".actions button:not([disabled])")).toHaveCount(8);
  await expect(page.getByRole("button", {name: "PREVIEW STAKE 7D"})).toHaveCount(0);
  await page.locator("#keplr-connect").click();
  await page.locator('[data-wallet-action="disconnect"]').click();

  await expect(page.locator("#wallet-status")).toContainText("READ-ONLY CHECK 8/8 COMPLETE");
  await expect(page.locator("#position-address")).toHaveText(address);
  await expect(page.locator(".actions button:not([disabled])")).toHaveCount(0);
  await expect(page.locator(".actions").first()).toContainText("PREVIEW WITHDRAW");
  await expect(page.locator(".actions button").first()).toBeDisabled();
});

test("confirmed withdraw verifies its result and exposes the transaction hash", async ({page}) => {
  const pool = registry.pools.find(item => item.name === "ujuno / NETA");
  const address = leaderboard.top_wallets[0].address;
  let directRaw = "1000000";
  await page.exposeFunction("__confirmTestWithdrawal", () => { directRaw = "0"; });
  await installSigningClient(
    page,
    'await window.__confirmTestWithdrawal();return{code:0,transactionHash:"a".repeat(64)};',
  );
  await mockRecoveryChain(page, {
    balanceFor: (_wallet, contract) => contract === pool.lp_token.address ? directRaw : "0",
  });
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});
  await page.evaluate(walletAddress => {
    window.keplr = {
      enable: async () => {},
      getOfflineSigner: () => ({getAccounts: async () => [{address: walletAddress}]})
    };
  }, address);

  await page.locator("#keplr-connect").click();
  await expect(page.locator("#wallet-status")).toContainText("CONNECTED + CHECKED 8/8");
  await page.getByRole("button", {name: "PREVIEW WITHDRAW"}).click();
  await page.locator("#execute-action").click();

  await expect(page.locator("#transaction-feedback-title")).toHaveText("TRANSACTION + RESULT VERIFIED");
  await expect(page.locator("#transaction-hash")).toHaveText("A".repeat(64));
  await expect(page.locator("#transaction-explorer")).toHaveAttribute(
    "href",
    `https://atomscan.com/juno/transactions/${"A".repeat(64)}`,
  );
});

test("confirmed unbond creates a pending claim and verifies the live post-state", async ({page}) => {
  const pool = registry.pools.find(item => item.name === "ujuno / NETA");
  const address = leaderboard.top_wallets[0].address;
  let stakes = [{stake: "1000000", total_locked: "0", unbonding_period: 604800}];
  let claims = [];
  await page.exposeFunction("__confirmTestUnbond", () => {
    stakes = [];
    claims = [{amount: "1000000", release_at: {at_height: 99999999}}];
  });
  await installSigningClient(
    page,
    'await window.__confirmTestUnbond();return{transactionHash:"d".repeat(64)};',
  );
  await mockRecoveryChain(page, {
    stakesFor: (_wallet, contract) => contract === pool.stake.address ? stakes : [],
    claimsFor: (_wallet, contract) => contract === pool.stake.address ? claims : [],
  });
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});
  await page.evaluate(walletAddress => {
    window.keplr = {
      enable: async () => {},
      getOfflineSigner: () => ({getAccounts: async () => [{address: walletAddress}]})
    };
  }, address);

  await page.locator("#keplr-connect").click();
  await expect(page.locator("#wallet-status")).toContainText("CONNECTED + CHECKED 8/8");
  await page.getByRole("button", {name: "PREVIEW UNBOND 7D"}).click();
  await page.locator("#execute-action").click();

  await expect(page.locator("#transaction-feedback-title")).toHaveText("TRANSACTION + RESULT VERIFIED");
  await expect(page.locator("#transaction-hash")).toHaveText("D".repeat(64));
});

test("rejected claim signing never presents a transaction as confirmed", async ({page}) => {
  const pool = registry.pools.find(item => item.name === "ujuno / NETA");
  const address = leaderboard.top_wallets[0].address;
  await installSigningClient(page, 'throw new Error("Request rejected by user");');
  await mockRecoveryChain(page, {
    claimsFor: (_wallet, contract) => contract === pool.stake.address
      ? [{amount: "1000000", release_at: {at_height: 1}}]
      : [],
  });
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});
  await page.evaluate(walletAddress => {
    window.keplr = {
      enable: async () => {},
      getOfflineSigner: () => ({getAccounts: async () => [{address: walletAddress}]})
    };
  }, address);

  await page.locator("#keplr-connect").click();
  await expect(page.locator("#wallet-status")).toContainText("CONNECTED + CHECKED 8/8");
  await page.getByRole("button", {name: "PREVIEW CLAIM"}).click();
  await page.locator("#execute-action").click();

  await expect(page.locator("#transaction-feedback-title")).toHaveText("TRANSACTION NOT CONFIRMED");
  await expect(page.locator("#transaction-status")).toContainText("REQUEST REJECTED BY USER");
  await expect(page.locator("#transaction-hash")).toBeHidden();
  await expect(page.locator("#transaction-explorer")).toBeHidden();
});

test("confirmed claim returns LP tokens and verifies the live post-state", async ({page}) => {
  const pool = registry.pools.find(item => item.name === "ujuno / NETA");
  const address = leaderboard.top_wallets[0].address;
  let directRaw = "0";
  let claims = [{amount: "1000000", release_at: {at_height: 1}}];
  await page.exposeFunction("__confirmTestClaim", () => {
    directRaw = "1000000";
    claims = [];
  });
  await installSigningClient(
    page,
    'await window.__confirmTestClaim();return{transactionHash:"b".repeat(64)};',
  );
  await mockRecoveryChain(page, {
    balanceFor: (_wallet, contract) => contract === pool.lp_token.address ? directRaw : "0",
    claimsFor: (_wallet, contract) => contract === pool.stake.address ? claims : [],
  });
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});
  await page.evaluate(walletAddress => {
    window.keplr = {
      enable: async () => {},
      getOfflineSigner: () => ({getAccounts: async () => [{address: walletAddress}]})
    };
  }, address);

  await page.locator("#keplr-connect").click();
  await expect(page.locator("#wallet-status")).toContainText("CONNECTED + CHECKED 8/8");
  await page.getByRole("button", {name: "PREVIEW CLAIM"}).click();
  await page.locator("#execute-action").click();

  await expect(page.locator("#transaction-feedback-title")).toHaveText("TRANSACTION + RESULT VERIFIED");
  await expect(page.locator("#transaction-hash")).toHaveText("B".repeat(64));
  await expect(page.locator("#transaction-explorer")).toHaveAttribute(
    "href",
    `https://atomscan.com/juno/transactions/${"B".repeat(64)}`,
  );
});

test("confirmed claim keeps its hash when post-state verification is incomplete", async ({page}) => {
  test.slow();
  const pool = registry.pools.find(item => item.name === "ujuno / NETA");
  const address = leaderboard.top_wallets[0].address;
  const claims = [{amount: "1000000", release_at: {at_height: 1}}];
  await installSigningClient(page, 'return{transactionHash:"c".repeat(64)};');
  await mockRecoveryChain(page, {
    claimsFor: (_wallet, contract) => contract === pool.stake.address ? claims : [],
  });
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});
  await page.evaluate(walletAddress => {
    window.keplr = {
      enable: async () => {},
      getOfflineSigner: () => ({getAccounts: async () => [{address: walletAddress}]})
    };
  }, address);

  await page.locator("#keplr-connect").click();
  await expect(page.locator("#wallet-status")).toContainText("CONNECTED + CHECKED 8/8");
  await page.getByRole("button", {name: "PREVIEW CLAIM"}).click();
  await page.locator("#execute-action").click();

  await expect(page.locator("#transaction-feedback-title")).toHaveText(
    "TRANSACTION CONFIRMED // RESULT CHECK INCOMPLETE",
    {timeout: 12_000},
  );
  await expect(page.locator("#transaction-hash")).toHaveText("C".repeat(64));
  await expect(page.locator("#transaction-explorer")).toBeVisible();
});

test("wallet address conversion rejects an invalid Bech32 checksum", async ({page}) => {
  await page.goto("/index.html", {waitUntil: "domcontentloaded"});
  expect(await page.evaluate(() => {
    try {
      window.NetaWalletHeader.toPrefix("juno1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqp8h4x", "osmo");
      return false;
    } catch (error) {
      return error.message === "INVALID BECH32 CHECKSUM";
    }
  })).toBe(true);
});

test("wallet action menu supports keyboard navigation and restores focus", async ({page}) => {
  await page.goto("/index.html", {waitUntil: "domcontentloaded"});
  const address = await page.evaluate(() => {
    const row = window.NETA_ADDRESS_ROWS.find(item => item.juno_address);
    window.keplr = {enable: async () => {}, getOfflineSigner: () => ({getAccounts: async () => [{address: row.juno_address}]})};
    return row.juno_address;
  });
  await page.locator("#keplr-connect").click();
  await expect(page.locator("#q")).toHaveValue(address);
  await page.locator("#keplr-connect").click();
  await expect(page.locator('[data-wallet-action="ranking"]')).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator('[data-wallet-action="copy"]')).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#keplr-connect")).toBeFocused();
  await expect(page.locator("#wallet-menu")).toBeHidden();
});
