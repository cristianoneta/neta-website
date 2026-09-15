const {test, expect} = require("@playwright/test");

test("NETA Socials owner closes and reopens a thread with exact messages", async ({page}) => {
  const owner = "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const contract = "juno1vgh9dd4zs7gsg7p602pv5lw3xly6wq6xww3s98keddc6vqazga8qgnm4g8";
  let closed = false;
  await page.exposeFunction("__setSocialThreadClosed", value => { closed = value; });
  await page.route("**/assets/socials-testnet-client.js?v=3", route => route.fulfill({
    contentType: "application/javascript",
    body: `window.NetaSocialsTestnet={connect:async()=>({}),execute:async(_client,sender,target,message,memo)=>{window.__socialTx={sender,target,message,memo};await window.__setSocialThreadClosed(message.set_closed.closed);return{transactionHash:"TEST_HASH"}}};`,
  }));
  await page.route("**/cosmwasm/wasm/v1/contract/**/smart/**", async route => {
    const query = JSON.parse(Buffer.from(decodeURIComponent(route.request().url().split("/smart/")[1]), "base64").toString("utf8"));
    let data = [];
    if (query.threads) data = [{id: 1, author: owner, title: "Test thread", body: "Body", created_time: 1, comment_count: 0, closed}];
    if (query.comment_eligibility) data = {address: owner, staked: "0", minimum_stake: "10000000", owner_exempt: true, stake_eligible: true, banned: false, paused: false, cooldown_remaining_seconds: 0, can_post: true};
    await route.fulfill({contentType: "application/json", body: JSON.stringify({data})});
  });
  await page.addInitScript(() => { window.keplr = {experimentalSuggestChain: async () => {}, enable: async () => {}, getOfflineSigner: () => ({getAccounts: async () => [{address: "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57"}]}), signDirect: async () => ({}), signAmino: async () => ({})}; });
  await page.goto("/neta-socials.html", {waitUntil: "domcontentloaded"});
  await page.evaluate(address => dispatchEvent(new CustomEvent("neta:wallet-connected", {detail: {address}})), owner);
  await expect(page.getByRole("button", {name: "CLOSE THREAD"})).toBeVisible();
  await page.getByRole("button", {name: "CLOSE THREAD"}).click();
  await expect.poll(() => page.evaluate(() => window.__socialTx)).toEqual({sender: owner, target: contract, message: {set_closed: {thread_id: 1, closed: true}}, memo: "NETA Socials uni-7 close thread"});
  await expect(page.getByRole("button", {name: "REOPEN THREAD"})).toBeVisible();
  await expect(page.locator("#comment-body")).toBeDisabled();
  await page.getByRole("button", {name: "REOPEN THREAD"}).click();
  await expect.poll(() => page.evaluate(() => window.__socialTx.message)).toEqual({set_closed: {thread_id: 1, closed: false}});
  await expect(page.getByRole("button", {name: "CLOSE THREAD"})).toBeVisible();
  await expect(page.locator("#comment-body")).toBeEnabled();
});
