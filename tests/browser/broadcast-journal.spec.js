const {test,expect}=require('@playwright/test');
const {AuthInfo}=require('cosmjs-types/cosmos/tx/v1beta1/tx');
const auth=Array.from(AuthInfo.encode(AuthInfo.fromPartial({signerInfos:[{sequence:7n}]})).finish());
test('actual signing bundle persists broadcast uncertainty and blocks another signature after reload',async({page})=>{
 await page.route('https://**/*',route=>route.fulfill({contentType:'application/json',body:'{}'}));
 await page.goto('/rescue-neta.html');
 await page.waitForFunction(()=>!!window.NetaSwapSigning);
 const attempt=async()=>page.evaluate(async auth=>{
  let signatures=0,broadcasts=0;
  const client={getChainId:async()=> 'juno-1',getTx:async()=>null,
   sign:async()=>{signatures++;return {bodyBytes:new Uint8Array([1]),authInfoBytes:Uint8Array.from(auth),signatures:[new Uint8Array([2])]};},
   broadcastTx:async()=>{broadcasts++;throw Error('accepted by node, reply lost');}};
  let error;try{await window.NetaSwapSigning.execute(client,'juno1journalfixture','contract',{test:{}},[],{gas:'100',amount:[]},'fixture');}catch(e){error=e.message;}
  return {error,signatures,broadcasts,record:JSON.parse(localStorage.getItem('neta-pending-tx-v1:juno-1:juno1journalfixture'))};
 },auth);
 const first=await attempt();expect(first.error).toContain('OUTCOME UNKNOWN');expect(first.signatures).toBe(1);expect(first.broadcasts).toBe(1);
 expect(first.record.hash).toMatch(/^[0-9A-F]{64}$/);expect(first.record.sequence).toBe('7');
 await page.reload();await page.waitForFunction(()=>!!window.NetaSwapSigning);
 const second=await attempt();expect(second.error).toContain('RETRY LOCKED');expect(second.signatures).toBe(0);expect(second.broadcasts).toBe(0);
 expect(second.record).toEqual(first.record);
});
