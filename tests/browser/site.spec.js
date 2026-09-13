const {test, expect} = require("@playwright/test");

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
  expect(pageErrors).toEqual([]);
});

test("mobile navigation and recovery lookup remain usable", async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto("/wynd-recovery.html", {waitUntil: "domcontentloaded"});

  await expect(page.locator("header nav")).toBeVisible();
  await expect(page.locator("#wallet-address")).toBeVisible();
  await expect(page.locator("#connect-wallet")).toBeVisible();
  await expect(page.locator(".pool-card")).toHaveCount(8);
});

