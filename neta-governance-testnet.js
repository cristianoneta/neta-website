(()=>{
  const CHAIN_ID="uni-7",OWNER="juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const RPCS=["https://juno.test.rpc.nodeshub.online","https://juno.rpc.t.stavr.tech"];
  const RESTS=["https://juno.test.api.nodeshub.online","https://juno.api.t.stavr.tech"];
  const CHAIN={chainId:CHAIN_ID,chainName:"Juno Testnet",rpc:RPCS[0],rest:RESTS[0],bip44:{coinType:118},bech32Config:{bech32PrefixAccAddr:"juno",bech32PrefixAccPub:"junopub",bech32PrefixValAddr:"junovaloper",bech32PrefixValPub:"junovaloperpub",bech32PrefixConsAddr:"junovalcons",bech32PrefixConsPub:"junovalconspub"},currencies:[{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6}],feeCurrencies:[{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6,gasPriceStep:{low:.1,average:.2,high:.3}}],stakeCurrency:{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6},features:["cosmwasm"]};
  const state={client:null,address:null,mock:null,governance:null,mockCodeId:null,governanceCodeId:null};
  const $=s=>document.querySelector(s),status=$("#test-status"),output=$("#test-output");
  const deadline=(p,ms,label)=>Promise.race([p,new Promise((_,reject)=>setTimeout(()=>reject(new Error(`${label} TIMED OUT`)),ms))]);
  const show=(label,data={})=>{status.textContent=label;output.textContent=JSON.stringify(data,null,2)};
  const fail=e=>show("FAILED",{error:e?.message||String(e)});
  const indexingDisabled=e=>/transaction indexing is disabled/i.test(e?.message||String(e));
  const persist=()=>localStorage.setItem("neta-governance-uni7",JSON.stringify({mock:state.mock,governance:state.governance,mockCodeId:state.mockCodeId,governanceCodeId:state.governanceCodeId}));
  const restore=()=>{try{Object.assign(state,JSON.parse(localStorage.getItem("neta-governance-uni7")||"{}"))}catch{}};
  async function rest(path){for(const base of RESTS)try{const r=await deadline(fetch(`${base}${path}`,{cache:"no-store"}),15000,"REST QUERY");if(r.ok)return r.json()}catch{}throw new Error("ALL UNI-7 REST ENDPOINTS FAILED")}
  const hex=bytes=>[...bytes].map(x=>x.toString(16).padStart(2,"0")).join("");
  const decodeHash=value=>/^[0-9a-f]{64}$/i.test(value||"")?value.toLowerCase():hex(Uint8Array.from(atob(value||""),x=>x.charCodeAt(0)));
  async function selected(id){const file=$(id).files[0];if(!file)throw new Error("SELECT THE REQUIRED WASM FILE FIRST");const bytes=new Uint8Array(await file.arrayBuffer());if(bytes.length<1000)throw new Error("THE SELECTED FILE IS NOT A VALID WASM ARTIFACT");return{bytes,sha256:hex(new Uint8Array(await crypto.subtle.digest("SHA-256",bytes)))}}
  async function recoverCode(hash){const data=await rest("/cosmwasm/wasm/v1/code?pagination.limit=1000&pagination.reverse=true");const hit=(data.code_infos||[]).find(x=>x.creator===OWNER&&decodeHash(x.data_hash)===hash);return hit?Number(hit.code_id):null}
  async function recoverContract(codeId,label){const data=await rest(`/cosmwasm/wasm/v1/code/${codeId}/contracts?pagination.limit=100&pagination.reverse=true`);for(const address of data.contracts||[]){const d=await rest(`/cosmwasm/wasm/v1/contract/${address}`),i=d.contract_info||{};if(i.creator===OWNER&&i.label===label&&Number(i.code_id)===Number(codeId))return address}return null}
  async function recover(task,label){for(let i=0;i<8;i++){if(i)await new Promise(r=>setTimeout(r,2000));const value=await task();if(value)return value}throw new Error(`${label} WAS BROADCAST BUT COULD NOT BE RECOVERED`)}
  async function upload(artifact,memo){try{return await NetaSocialsTestnet.upload(state.client,state.address,artifact.bytes,memo)}catch(e){if(!indexingDisabled(e))throw e;return{codeId:await recover(()=>recoverCode(artifact.sha256),"CODE UPLOAD"),transactionHash:"RECOVERED_FROM_CHAIN"}}}
  async function instantiate(codeId,msg,label){try{return await NetaSocialsTestnet.instantiate(state.client,state.address,codeId,msg,label)}catch(e){if(!indexingDisabled(e))throw e;return{contractAddress:await recover(()=>recoverContract(codeId,label),"INSTANTIATION"),transactionHash:"RECOVERED_FROM_CHAIN"}}}
  async function execute(contract,msg,memo,recovery){try{return await NetaSocialsTestnet.execute(state.client,state.address,contract,msg,memo)}catch(e){if(!indexingDisabled(e))throw e;await recover(recovery,"EXECUTION");return{transactionHash:"RECOVERED_FROM_CHAIN"}}}
  async function busy(button,task){button.disabled=true;try{await task(button)}catch(e){fail(e)}finally{button.disabled=button.dataset.done==="true"}}
  function enable(){$("#test-mock").disabled=!state.client||!$("#mock-wasm").files[0]||!!state.mock;$("#test-governance").disabled=!state.mock||!$("#governance-wasm").files[0]||!!state.governance;$("#test-verify").disabled=!state.governance;}
  restore();
  $("#mock-wasm").onchange=enable;$("#governance-wasm").onchange=enable;
  $("#test-connect").onclick=e=>busy(e.currentTarget,async button=>{
    button.textContent="CHECK KEPLR";
    show("CONNECTING · OPEN KEPLR",{next:"Approve the uni-7 chain suggestion. If no popup is visible, open the Keplr extension manually."});
    if(!window.keplr?.experimentalSuggestChain)throw new Error("KEPLR NOT FOUND — UNLOCK THE EXTENSION AND RELOAD THIS PAGE");
    await deadline(window.keplr.experimentalSuggestChain(CHAIN),45000,"CHAIN SUGGESTION");
    show("CONNECTING · WALLET ACCESS",{next:"Approve access to the uni-7 account in Keplr."});
    await deadline(window.keplr.enable(CHAIN_ID),15000,"KEPLR ACCESS");
    const base=window.keplr.getOfflineSigner?.(CHAIN_ID)||window.getOfflineSigner?.(CHAIN_ID);
    if(!base)throw new Error("UNI-7 SIGNER UNAVAILABLE");
    const signer={getAccounts:()=>base.getAccounts(),signDirect:(a,d)=>window.keplr.signDirect(CHAIN_ID,a,d,{preferNoSetFee:true}),signAmino:(a,d)=>window.keplr.signAmino(CHAIN_ID,a,d,{preferNoSetFee:true})};
    show("CONNECTING · CHECKING ACCOUNT");
    state.address=(await deadline(signer.getAccounts(),15000,"ACCOUNT LOOKUP"))[0]?.address;
    if(state.address!==OWNER)throw new Error(`EXPECTED ${OWNER}, RECEIVED ${state.address||"NO ACCOUNT"}`);
    const failures=[];
    for(const rpc of RPCS){
      show("CONNECTING · CHECKING RPC",{rpc,attempt:failures.length+1,total:RPCS.length});
      try{state.client=await deadline(NetaSocialsTestnet.connect(rpc,signer),45000,"RPC CONNECTION");break}catch(error){failures.push(`${rpc}: ${error?.message||String(error)}`)}
    }
    if(!state.client)throw new Error(`ALL UNI-7 RPC ENDPOINTS FAILED\n${failures.join("\n")}`);
    show("CONNECTING · READING JUNOX BALANCE");
    const balance=await deadline(state.client.getBalance(state.address,"ujunox"),30000,"BALANCE QUERY");
    button.textContent="CONNECTED · UNI-7";button.dataset.done="true";enable();
    show("CONNECTED",{address:state.address,junox:Number(balance.amount)/1e6,recovered:{access_mock:state.mock,governance:state.governance}})
  });
  $("#test-mock").onclick=e=>busy(e.currentTarget,async button=>{const artifact=await selected("#mock-wasm");const up=await upload(artifact,"NETA Governance uni-7 access mock upload");state.mockCodeId=up.codeId;const ins=await instantiate(up.codeId,{owner:state.address,balances:[{address:state.address,balance:"11000000"}]},"NETA Governance uni-7 access mock");state.mock=ins.contractAddress;persist();button.dataset.done="true";enable();show("ACCESS MOCK DEPLOYED",{code_id:up.codeId,contract:state.mock,synthetic_stake_neta:11,upload_tx:up.transactionHash,instantiate_tx:ins.transactionHash})});
  $("#test-governance").onclick=e=>busy(e.currentTarget,async button=>{const artifact=await selected("#governance-wasm");const up=await upload(artifact,"NETA Governance uni-7 upload");state.governanceCodeId=up.codeId;const ins=await instantiate(up.codeId,{owner:state.address,dao_voting_contract:state.mock,stake_contract:state.mock,comment_threshold:"10000000"},"NETA Governance uni-7");state.governance=ins.contractAddress;persist();button.dataset.done="true";enable();show("GOVERNANCE DEPLOYED · PAUSED",{code_id:up.codeId,contract:state.governance,access_mock:state.mock,threshold_neta:"strictly > 10",upload_tx:up.transactionHash,instantiate_tx:ins.transactionHash})});
  $("#test-verify").onclick=e=>busy(e.currentTarget,async button=>{const before=await NetaSocialsTestnet.query(state.client,state.governance,{config:{}});if(before.owner!==state.address||before.dao_voting_contract!==state.mock||before.stake_contract!==state.mock||before.comment_threshold!=="10000000"||!before.paused)throw new Error("PAUSED CONFIG VERIFICATION FAILED");const tx=await execute(state.governance,{set_paused:{paused:false}},"Enable NETA Governance uni-7",async()=>!(await NetaSocialsTestnet.query(state.client,state.governance,{config:{}})).paused);const config=await NetaSocialsTestnet.query(state.client,state.governance,{config:{}}),access=await NetaSocialsTestnet.query(state.client,state.governance,{access:{address:state.address}});if(config.paused||!access.can_publish||!access.can_comment)throw new Error("POST-DEPLOY ACCESS VERIFICATION FAILED");button.dataset.done="true";$("#test-smoke").disabled=false;show("DEPLOYMENT VERIFIED · TESTING ENABLED",{contract:state.governance,unpause_tx:tx.transactionHash,config,access})});
  $("#test-smoke").onclick=e=>busy(e.currentTarget,async button=>{const marker=`UNI-7 ${new Date().toISOString()}`;const first=await execute(state.governance,{publish_draft:{title:"NETA Governance Uni-7 smoke test",summary:marker,body:"Permission and lifecycle smoke test.",actions_json:"[]"}},"NETA Governance uni-7 publish smoke test",async()=>{const rows=await NetaSocialsTestnet.query(state.client,state.governance,{proposals:{start_after:null,limit:100}});return rows.find(x=>x.title==="NETA Governance Uni-7 smoke test")});const rows=await NetaSocialsTestnet.query(state.client,state.governance,{proposals:{start_after:null,limit:100}}),proposal=rows.at(-1);if(!proposal||proposal.status!=="discussion")throw new Error("PUBLISHED DRAFT WAS NOT RECOVERED");const second=await execute(state.governance,{finalize_and_submit:{proposal_id:proposal.id}},"NETA Governance uni-7 finalize smoke test",async()=>{const p=await NetaSocialsTestnet.query(state.client,state.governance,{proposal:{proposal_id:proposal.id}});return p.status==="voting"});const final=await NetaSocialsTestnet.query(state.client,state.governance,{proposal:{proposal_id:proposal.id}});if(final.status!=="voting")throw new Error("DISCUSSION TO VOTING TRANSITION FAILED");button.dataset.done="true";show("UNI-7 SMOKE TEST PASSED",{proposal:first.transactionHash,finalize:second.transactionHash,record:final})});
  enable();
})();
