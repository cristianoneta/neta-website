const {test, expect} = require("@playwright/test");

test("NETA Socials owner closes and reopens a thread with exact messages", async ({page}) => {
  const owner = "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const contract = "juno1vgh9dd4zs7gsg7p602pv5lw3xly6wq6xww3s98keddc6vqazga8qgnm4g8";
  let closed = false;
  await page.exposeFunction("__setSocialThreadClosed", value => { closed = value; });
  await page.route("**/assets/socials-testnet-client.js?v=3", route => route.fulfill({
    contentType: "application/javascript",
    body: `window.NetaSocialsTestnet={connect:async()=>({}),execute:async(_client,sender,target,message,memo)=>{window.__socialTx={sender,target,message,memo};await window.__setSocialThreadClosed(message.set_thread_closed.closed);return{transactionHash:"TEST_HASH"}}};`,
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
  const reconnect = async () => page.evaluate(address => dispatchEvent(new CustomEvent("neta:wallet-connected", {detail: {address}})), owner);
  await reconnect();
  await expect(page.getByRole("button", {name: "CLOSE THREAD"})).toBeVisible();
  await page.getByRole("button", {name: "CLOSE THREAD"}).click();
  await expect(page.getByRole("dialog", {name: "CLOSE THREAD"})).toBeVisible();
  await page.getByRole("button", {name: "CONFIRM IN KEPLR"}).click();
  await expect.poll(() => page.evaluate(() => window.__socialTx)).toEqual({sender: owner, target: contract, message: {set_thread_closed: {thread_id: 1, closed: true}}, memo: "NETA Socials uni-7 close thread"});
  await expect(page.getByRole("button", {name: "REOPEN THREAD"})).toBeVisible();
  await expect(page.locator("#comment-body")).toBeDisabled();
  await page.getByRole("button", {name: "REOPEN THREAD"}).click();
  await page.getByRole("button", {name: "CONFIRM IN KEPLR"}).click();
  await expect.poll(() => page.evaluate(() => window.__socialTx.message)).toEqual({set_thread_closed: {thread_id: 1, closed: false}});
  await expect(page.getByRole("button", {name: "CLOSE THREAD"})).toBeVisible();
  await expect(page.locator("#comment-body")).toBeEnabled();
});

test("NETA Socials confirms exact comment, ban and moderator actions", async ({page}) => {
  const owner = "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const user = "juno1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq5yw7w";
  let hidden = false, banned = false, moderator = false;
  await page.exposeFunction("__applySocialAction", message => {
    if (message.set_comment_hidden) hidden = message.set_comment_hidden.hidden;
    if (message.set_user_banned) banned = message.set_user_banned.banned;
    if (message.set_moderator) moderator = message.set_moderator.enabled;
  });
  await page.route("**/assets/socials-testnet-client.js?v=3", route => route.fulfill({
    contentType: "application/javascript",
    body: `window.NetaSocialsTestnet={connect:async()=>({}),execute:async(_client,sender,target,message,memo)=>{window.__socialTx={sender,target,message,memo};await window.__applySocialAction(message);return{transactionHash:"TEST_HASH"}}};`,
  }));
  await page.route("**/cosmwasm/wasm/v1/contract/**/smart/**", async route => {
    const query = JSON.parse(Buffer.from(decodeURIComponent(route.request().url().split("/smart/")[1]), "base64").toString("utf8"));
    let data = [];
    if (query.threads) data = [{id: 1, author: owner, title: "Moderation", body: "Body", created_time: 1, comment_count: 1, closed: false}];
    if (query.comments) data = [{id: 7, thread_id: 1, author: user, body: "Review me", created_time: 2, moderation: hidden ? {hidden: true, reason: "spam"} : null}];
    if (query.comment_eligibility) data = {address: owner, staked: "0", minimum_stake: "10000000", owner_exempt: true, stake_eligible: true, banned: false, paused: false, cooldown_remaining_seconds: 0, can_post: true};
    if (query.moderator) data = {address: query.moderator.address, moderator: query.moderator.address === owner || moderator};
    if (query.ban_status) data = {address: query.ban_status.address, record: banned ? {banned: true, reason: "spam"} : null};
    await route.fulfill({contentType: "application/json", body: JSON.stringify({data})});
  });
  await page.addInitScript(() => { window.keplr = {experimentalSuggestChain: async () => {}, enable: async () => {}, getOfflineSigner: () => ({getAccounts: async () => [{address: "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57"}]}), signDirect: async () => ({}), signAmino: async () => ({})}; });
  await page.goto("/neta-socials.html", {waitUntil: "domcontentloaded"});
  await page.evaluate(address => dispatchEvent(new CustomEvent("neta:wallet-connected", {detail: {address}})), owner);
  await expect(page.getByRole("button", {name: "HIDE", exact: true})).toBeVisible();

  await page.getByRole("button", {name: "HIDE", exact: true}).click();
  await page.getByRole("button", {name: "CANCEL", exact: true}).click();
  expect(await page.evaluate(() => window.__socialTx)).toBeUndefined();
  await page.getByRole("button", {name: "HIDE", exact: true}).click();
  await page.locator("#moderation-reason").fill("spam");
  await page.getByRole("button", {name: "CONFIRM IN KEPLR"}).click();
  await expect.poll(() => page.evaluate(() => window.__socialTx.message)).toEqual({set_comment_hidden: {thread_id: 1, comment_id: 7, hidden: true, reason: "spam"}});
  await page.reload({waitUntil: "domcontentloaded"});
  await reconnect();
  await expect(page.getByRole("button", {name: "UNHIDE", exact: true})).toBeVisible();
  await page.getByRole("button", {name: "UNHIDE", exact: true}).click();
  await page.getByRole("button", {name: "CONFIRM IN KEPLR"}).click();
  await expect.poll(() => page.evaluate(() => window.__socialTx.message)).toEqual({set_comment_hidden: {thread_id: 1, comment_id: 7, hidden: false, reason: null}});
  await page.reload({waitUntil: "domcontentloaded"});
  await reconnect();

  await page.getByRole("button", {name: "MAKE MODERATOR", exact: true}).click();
  await page.getByRole("button", {name: "CONFIRM IN KEPLR"}).click();
  await expect.poll(() => page.evaluate(() => window.__socialTx.message)).toEqual({set_moderator: {address: user, enabled: true}});
  await page.reload({waitUntil: "domcontentloaded"});
  await reconnect();
  await expect(page.getByRole("button", {name: "REMOVE MODERATOR", exact: true})).toBeVisible();
  await page.getByRole("button", {name: "REMOVE MODERATOR", exact: true}).click();
  await page.getByRole("button", {name: "CONFIRM IN KEPLR"}).click();
  await expect.poll(() => page.evaluate(() => window.__socialTx.message)).toEqual({set_moderator: {address: user, enabled: false}});
  await page.reload({waitUntil: "domcontentloaded"});
  await reconnect();

  await page.getByRole("button", {name: "BAN USER", exact: true}).click();
  await page.locator("#moderation-reason").fill("spam");
  await page.getByRole("button", {name: "CONFIRM IN KEPLR"}).click();
  await expect.poll(() => page.evaluate(() => window.__socialTx.message)).toEqual({set_user_banned: {address: user, banned: true, reason: "spam"}});
  await page.reload({waitUntil: "domcontentloaded"});
  await reconnect();
  await expect(page.getByRole("button", {name: "UNBAN USER", exact: true})).toBeVisible();
  await expect(page.getByRole("button", {name: "MAKE MODERATOR", exact: true})).toHaveCount(0);
  await page.getByRole("button", {name: "UNBAN USER", exact: true}).click();
  await page.getByRole("button", {name: "CONFIRM IN KEPLR"}).click();
  await expect.poll(() => page.evaluate(() => window.__socialTx.message)).toEqual({set_user_banned: {address: user, banned: false, reason: null}});
});

test("NETA Socials loads older threads in exact pages without duplicates", async ({page}) => {
  const author = "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const threads = Array.from({length: 35}, (_, index) => ({
    id: 65 - index, author, title: `Thread ${65 - index}`, body: "Body",
    created_time: 1000 - index, comment_count: 0, closed: index % 2 === 0,
  }));
  await page.route("**/cosmwasm/wasm/v1/contract/**/smart/**", async route => {
    const query = JSON.parse(Buffer.from(decodeURIComponent(route.request().url().split("/smart/")[1]), "base64").toString("utf8"));
    let data = [];
    if (query.threads) {
      const start = query.threads.start_after;
      data = threads.filter(thread => start == null || thread.id < start).slice(0, query.threads.limit);
    }
    await route.fulfill({contentType: "application/json", body: JSON.stringify({data})});
  });
  await page.goto("/neta-socials.html", {waitUntil: "domcontentloaded"});
  await expect(page.locator(".thread-item:not(.thread-load-more)")).toHaveCount(10);
  await expect(page.locator(".thread-author .author-holdings")).toContainText("NETA TOTAL · OF WHICH");
  await expect(page.locator(".thread-author .author-holdings")).toContainText("NETA STAKED");
  await expect(page.locator(".thread-author .author-name-row")).toHaveCSS("display", "flex");
  await expect(page.locator(".thread-author .author-holdings")).toHaveCSS("color", "rgb(0, 255, 157)");
  const loadMore = page.getByRole("button", {name: "LOAD MORE · 10 OLDER THREADS"});
  await expect(loadMore).toBeVisible();
  await loadMore.click();
  await expect(page.locator(".thread-item:not(.thread-load-more)")).toHaveCount(20);
  await loadMore.click();
  await expect(page.locator(".thread-item:not(.thread-load-more)")).toHaveCount(30);
  await loadMore.click();
  await expect(page.locator(".thread-item:not(.thread-load-more)")).toHaveCount(35);
  await expect(page.locator(".thread-load-more")).toHaveCount(0);
  const labels = await page.locator(".thread-item strong").allTextContents();
  expect(new Set(labels).size).toBe(35);
});

test("NETA Socials paginates comments and ignores stale thread responses", async ({page}) => {
  const author = "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const threads = [
    {id: 2, author, title: "Slow thread", body: "Body", created_time: 2, comment_count: 1, closed: false},
    {id: 1, author, title: "Paged thread", body: "Body", created_time: 1, comment_count: 205, closed: false},
  ];
  const comments = Array.from({length: 205}, (_, index) => ({
    id: index + 1, thread_id: 1, author, body: `Comment ${index + 1}`, created_time: index + 1,
  }));
  await page.route("**/cosmwasm/wasm/v1/contract/**/smart/**", async route => {
    const query = JSON.parse(Buffer.from(decodeURIComponent(route.request().url().split("/smart/")[1]), "base64").toString("utf8"));
    let data = [];
    if (query.threads) data = threads;
    if (query.comments?.thread_id === 2) {
      await new Promise(resolve => setTimeout(resolve, 250));
      data = [{id: 1, thread_id: 2, author, body: "Slow response", created_time: 1}];
    }
    if (query.comments?.thread_id === 1) {
      const start = query.comments.start_after;
      data = comments.filter(comment => start == null || comment.id > start).slice(0, query.comments.limit);
    }
    await route.fulfill({contentType: "application/json", body: JSON.stringify({data})});
  });
  await page.goto("/neta-socials.html", {waitUntil: "domcontentloaded"});
  await page.getByRole("button", {name: /Paged thread/}).click();
  await expect(page.getByRole("heading", {name: "Paged thread"})).toBeVisible();
  await page.getByRole("button", {name: "LOAD MORE COMMENTS"}).click();
  await expect(page.locator(".comment")).toHaveCount(200);
  await page.getByRole("button", {name: "LOAD MORE COMMENTS"}).click();
  await expect(page.locator(".comment")).toHaveCount(205);
  await expect(page.locator(".comments-load-more")).toHaveCount(0);
  await expect(page.getByRole("heading", {name: "Paged thread"})).toBeVisible();
  await expect(page.locator(".comment").last()).toContainText("Comment 205");
});
