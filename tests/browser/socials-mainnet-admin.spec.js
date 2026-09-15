const {test,expect}=require("@playwright/test");

test("guarded Socials admin verifies gates and sends only exact pause messages",async({page})=>{
  const owner="juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const contract="juno1a0s5kaavcfnjgewtka0vr5tmmssynqfxmqyat3hm5lw75us0em9qcjdfv9";
  let paused=true;
  await page.route("**/assets/recovery-signing-client.js?v=7",route=>route.fulfill({contentType:"application/javascript",body:`window.NetaRecoverySigning={
    connect:async()=>({client:{
      getChainId:async()=>"juno-1",
      getContract:async()=>({codeId:5167,creator:"${owner}",admin:"${owner}",label:"NETA Socials v1"}),
      queryContractSmart:async(_target,message)=>{if(message.config)return{owner:"${owner}",pending_owner:null,stake_contract:"juno1a7x8aj7k38vnj9edrlymkerhrl5d4ud3makmqhx6vt3dhu0d824qh038zh",minimum_stake:"10000000",paused,post_cooldown_seconds:30};const address=message.comment_eligibility.address;if(address==="${owner}")return{address,staked:"0",minimum_stake:"10000000",owner_exempt:true,stake_eligible:true,banned:false,paused,cooldown_remaining_seconds:0,can_post:!paused};if(address.endsWith("5h02p"))return{address,staked:"300000000",minimum_stake:"10000000",owner_exempt:false,stake_eligible:true,banned:false,paused,cooldown_remaining_seconds:0,can_post:!paused};return{address,staked:"0",minimum_stake:"10000000",owner_exempt:false,stake_eligible:false,banned:false,paused,cooldown_remaining_seconds:0,can_post:false}}
    }}),
    execute:async(_client,sender,target,message,gas,memo)=>{window.__adminTx={sender,target,message,gas,memo};paused=message.set_paused.paused;return{transactionHash:"ADMIN_HASH"}}
  };`}));
  await page.addInitScript(address=>{window.keplr={enable:async chain=>{window.__enabledChain=chain},getOfflineSigner:()=>({getAccounts:async()=>[{address}]}),signDirect:async()=>({}),signAmino:async()=>({})}},owner);
  await page.goto("/neta-socials-admin.html",{waitUntil:"domcontentloaded"});
  await expect(page.locator("#admin-unpause")).toBeDisabled();
  await expect(page.locator("#admin-pause")).toBeDisabled();
  await page.locator("#admin-connect").click();
  await page.locator("#admin-preflight").click();
  await expect(page.locator("#admin-status")).toHaveText("PREFLIGHT PASSED · CONTRACT PAUSED");
  await expect(page.locator("#admin-unpause")).toBeEnabled();
  await page.locator("#admin-unpause").click();
  await expect(page.locator("#admin-status")).toHaveText("MAINNET UNPAUSE VERIFIED");
  await expect.poll(()=>page.evaluate(()=>window.__adminTx)).toEqual({sender:owner,target:contract,message:{set_paused:{paused:false}},gas:1.4,memo:"NETA Socials mainnet unpause"});
  await expect(page.locator("#admin-pause")).toBeEnabled();
  await page.locator("#admin-pause").click();
  await expect(page.locator("#admin-status")).toHaveText("MAINNET EMERGENCY PAUSE VERIFIED");
  await expect.poll(()=>page.evaluate(()=>window.__adminTx.message)).toEqual({set_paused:{paused:true}});
  expect(await page.evaluate(()=>window.__enabledChain)).toBe("juno-1");
});
