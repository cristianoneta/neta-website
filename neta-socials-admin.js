(()=>{
  const CHAIN_ID="juno-1";
  const OWNER="juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const CONTRACT="juno1a0s5kaavcfnjgewtka0vr5tmmssynqfxmqyat3hm5lw75us0em9qcjdfv9";
  const STAKE_CONTRACT="juno1a7x8aj7k38vnj9edrlymkerhrl5d4ud3makmqhx6vt3dhu0d824qh038zh";
  const CODE_ID=5167,MINIMUM_STAKE="10000000";
  const BELOW_GATE="juno1w9ee57gnduzm4l9h6xwn9tee9pyh8wlrr3xckg";
  const ABOVE_GATE="juno15agzfrclmqnq72asjssh80723c9fvkq2e5h02p";
  const RPCS=["https://juno-rpc.polkachu.com:443","https://juno-rpc.kleomedes.network","https://rpc.lavenderfive.com:443/juno"];
  const state={client:null,address:null,preflight:false};
  const $=selector=>document.querySelector(selector),status=$("#admin-status"),output=$("#admin-output"),connect=$("#admin-connect"),unpause=$("#admin-unpause"),pause=$("#admin-pause");
  let phase="START";
  const show=(label,data)=>{status.textContent=label;output.textContent=JSON.stringify(data,null,2)};
  const fail=error=>{status.textContent="FAILED CLOSED";output.textContent=`${phase}: ${error instanceof Error?error.message:String(error)}`};
  const busy=async(button,task)=>{button.disabled=true;try{await task()}catch(error){fail(error)}finally{if(button.dataset.locked!=="true")button.disabled=false}};
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  function setControls(paused){unpause.disabled=!paused;pause.disabled=paused;unpause.dataset.locked=paused?"false":"true";pause.dataset.locked=paused?"true":"false"}
  async function snapshot(){
    const [info,config,below,above]=await Promise.all([
      state.client.getContract(CONTRACT),
      state.client.queryContractSmart(CONTRACT,{config:{}}),
      state.client.queryContractSmart(CONTRACT,{comment_eligibility:{address:BELOW_GATE}}),
      state.client.queryContractSmart(CONTRACT,{comment_eligibility:{address:ABOVE_GATE}}),
    ]);
    if(info.codeId!==CODE_ID||info.creator!==OWNER||info.admin!==OWNER||info.label!=="NETA Socials v1")throw new Error("CONTRACT IDENTITY OR ADMIN MISMATCH");
    if(config.owner!==OWNER||config.stake_contract!==STAKE_CONTRACT||String(config.minimum_stake)!==MINIMUM_STAKE||Number(config.post_cooldown_seconds)!==30)throw new Error("CONTRACT CONFIGURATION MISMATCH");
    if(below.owner_exempt||below.stake_eligible||BigInt(below.staked)>=BigInt(MINIMUM_STAKE))throw new Error("BELOW-THRESHOLD GATE FAILED");
    if(above.owner_exempt||!above.stake_eligible||BigInt(above.staked)<BigInt(MINIMUM_STAKE))throw new Error("ABOVE-THRESHOLD GATE FAILED");
    return{contract_info:info,config,below_threshold:below,above_threshold:above};
  }
  async function verifyPaused(expected){for(let attempt=0;attempt<8;attempt++){if(attempt)await wait(2000);const current=await state.client.queryContractSmart(CONTRACT,{config:{}});if(current.paused===expected)return current}throw new Error(`PAUSED STATE DID NOT BECOME ${expected}`)}
  function disconnect(){state.client?.disconnect?.();state.client=null;state.address=null;state.preflight=false;connect.textContent="CONNECT KEPLR";$("#admin-preflight").disabled=true;unpause.disabled=true;pause.disabled=true;show("NOT CONNECTED",{chain_id:CHAIN_ID})}
  connect.addEventListener("click",event=>{const button=event.currentTarget;busy(button,async()=>{
    if(state.client){disconnect();return}
    phase="KEPLR ACCESS";if(!window.keplr)throw new Error("KEPLR NOT FOUND — UNLOCK IT AND RELOAD");await window.keplr.enable(CHAIN_ID);
    const base=window.keplr.getOfflineSigner?.(CHAIN_ID)||window.getOfflineSigner?.(CHAIN_ID);if(!base)throw new Error("JUNO MAINNET SIGNER UNAVAILABLE");
    const options={preferNoSetFee:true},signer={getAccounts:()=>base.getAccounts(),signDirect:(address,document)=>window.keplr.signDirect(CHAIN_ID,address,document,options),signAmino:(address,document)=>window.keplr.signAmino(CHAIN_ID,address,document,options)};
    const address=(await signer.getAccounts())[0]?.address;if(address!==OWNER)throw new Error(`EXPECTED OWNER ${OWNER}, RECEIVED ${address||"NO ACCOUNT"}`);
    phase="JUNO MAINNET RPC";const connected=await NetaRecoverySigning.connect(RPCS,signer,"0.1ujuno",45000);state.client=connected.client;if(await state.client.getChainId()!==CHAIN_ID)throw new Error("WRONG CHAIN ID");
    state.address=address;connect.textContent="CONNECTED · DISCONNECT";$("#admin-preflight").disabled=false;show("CONNECTED TO JUNO MAINNET",{address,contract:CONTRACT,writes_enabled:false});
  })});
  $("#admin-preflight").addEventListener("click",event=>{const button=event.currentTarget;busy(button,async()=>{
    if(!state.client)throw new Error("CONNECT FIRST");phase="MAINNET ADMIN PREFLIGHT";const result=await snapshot();state.preflight=true;setControls(result.config.paused);show(result.config.paused?"PREFLIGHT PASSED · CONTRACT PAUSED":"PREFLIGHT PASSED · CONTRACT LIVE",result);
  })});
  async function changePaused(expected){
    if(!state.preflight||!state.client||state.address!==OWNER)throw new Error("RUN OWNER PREFLIGHT FIRST");phase=expected?"EMERGENCY PAUSE":"MAINNET UNPAUSE";
    const before=await snapshot();if(before.config.paused===expected){setControls(expected);show(expected?"ALREADY PAUSED":"ALREADY LIVE",before);return}
    let result;try{result=await NetaRecoverySigning.execute(state.client,state.address,CONTRACT,{set_paused:{paused:expected}},1.4,`NETA Socials mainnet ${expected?"emergency pause":"unpause"}`)}catch(error){if(!/transaction indexing is disabled/i.test(error?.message||String(error)))throw error}
    const config=await verifyPaused(expected);const ownerEligibility=await state.client.queryContractSmart(CONTRACT,{comment_eligibility:{address:OWNER}});
    if(ownerEligibility.paused!==expected||ownerEligibility.can_post===expected)throw new Error("POST-TRANSACTION ELIGIBILITY VERIFICATION FAILED");
    setControls(expected);show(expected?"MAINNET EMERGENCY PAUSE VERIFIED":"MAINNET UNPAUSE VERIFIED",{contract:CONTRACT,transaction_hash:result?.transactionHash||"RECOVERED_FROM_CHAIN",config,owner_eligibility:ownerEligibility,no_funds_attached:true});
  }
  unpause.addEventListener("click",event=>{const button=event.currentTarget;busy(button,()=>changePaused(false))});
  pause.addEventListener("click",event=>{const button=event.currentTarget;busy(button,()=>changePaused(true))});
})();
