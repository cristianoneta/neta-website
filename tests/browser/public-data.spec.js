const {test,expect}=require('@playwright/test');
const {createHash}=require('node:crypto');
const fs=require('node:fs');
const names=['metadata.json','address_index.json','data/map/state.json','data/map/map-of-neta.json',
 'data/recovery/recovery-stats.json','data/recovery/recovery-events.json','data/recovery/wynd-market.json','data/recovery/wynd-leaderboard.json'];
const origin='https://data.cosmoot.com/data/neta-website/';

test('ranking consumes a coherent server generation and an early wallet connection',async({page})=>{
 const values=Object.fromEntries(names.map(n=>[n,fs.readFileSync(n,'utf8')]));
 const metadata=JSON.parse(values['metadata.json']);metadata.generated_at='2026-11-25T21:40:00Z';values['metadata.json']=JSON.stringify(metadata);
 const compact=JSON.parse(values['address_index.json']);
 const row=compact.rows.find(r=>r[compact.fields.indexOf('juno_address')]);
 const address=row[compact.fields.indexOf('juno_address')];
 const manifest={schema_version:1,generation:'generation-'+ 'c'.repeat(64),source_revision:'d'.repeat(40),published_at:new Date().toISOString(),
 files:Object.fromEntries(names.map(n=>[n,createHash('sha256').update(values[n]).digest('hex')]))};
 await page.addInitScript(address=>{window.NETA_WALLET_STATE={address};},address);
 await page.route(origin+'**',async route=>{
  const url=route.request().url();
  if(url.endsWith('/manifest.json')){
   await new Promise(r=>setTimeout(r,200));
   return route.fulfill({contentType:'application/json',body:JSON.stringify(manifest)});
  }
  const path=url.slice((origin+manifest.generation+'/').length);
  await route.fulfill({contentType:'application/json',body:values[path]});
 });
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/index.html');
 await expect(page.locator('#q')).toHaveValue(address);
 await expect(page.locator('#result')).toContainText('RANK #');
 await expect.poll(()=>page.evaluate(()=>window.NETA_METADATA.generated_at)).toBe(metadata.generated_at);
 expect(errors).toEqual([]);
});

test('an absent unactivated server retains the dated static ranking',async({page})=>{
 await page.route(origin+'**',route=>route.fulfill({status:404,body:'not installed'}));
 await page.goto('/index.html');
 await expect(page.locator('#rows tr')).toHaveCount(100);
 await expect(page.locator('#neta-data-notice')).toHaveCount(0);
});
