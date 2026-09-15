(()=>{
  const CHAIN_ID="juno-1";
  const OWNER="juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const STAKE_CONTRACT="juno1a7x8aj7k38vnj9edrlymkerhrl5d4ud3makmqhx6vt3dhu0d824qh038zh";
  const MINIMUM_STAKE="10000000";
  const WASM={url:"assets/contracts/neta_socials.wasm",sha256:"49da22c2837cbfb86bed4e714d840cffefa2e2d26e9660f47a3eb17f745ee869"};
  const RPCS=["https://juno-rpc.polkachu.com:443","https://juno-rpc.kleomedes.network","https://rpc.lavenderfive.com:443/juno"];
  const RESTS=["https://juno-api.polkachu.com","https://juno-api.lavenderfive.com"];
  const state={client:null,address:null,wasm:null,codeId:null,contract:null,preflight:false};
  const $=selector=>document.querySelector(selector),status=$("#mainnet-status"),output=$("#mainnet-output"),connect=$("#mainnet-connect");
  let phase="START";
  const show=(label,data)=>{status.textContent=label;output.textContent=JSON.stringify(data,null,2)};
  const fail=error=>{status.textContent="FAILED CLOSED";output.textContent=`${phase}: ${error instanceof Error?error.message:String(error)}`};
  const deadline=(promise,ms,label)=>Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error(`${label} TIMED OUT AFTER ${ms/1000} SECONDS`)),ms))]);
  const busy=async(button,task)=>{button.disabled=true;try{await task()}catch(error){fail(error)}finally{if(button.dataset.done!=="true")button.disabled=false}};
  const persist=()=>sessionStorage.setItem("neta-socials-mainnet-deployment",JSON.stringify({codeId:state.codeId,contract:state.contract}));
  let restored={};try{restored=JSON.parse(sessionStorage.getItem("neta-socials-mainnet-deployment")||"{}")}catch{sessionStorage.removeItem("neta-socials-mainnet-deployment")}state.codeId=restored.codeId||null;state.contract=restored.contract||null;
  async function rest(path){const errors=[];for(const base of RESTS)try{const response=await deadline(fetch(`${base}${path}`,{cache:"no-store"}),15000,"MAINNET REST");if(!response.ok)throw new Error(`HTTP ${response.status}`);return await response.json()}catch(error){errors.push(`${base}: ${error instanceof Error?error.message:String(error)}`)}throw new Error(`ALL MAINNET REST ENDPOINTS FAILED\n${errors.join("\n")}`)}
  const hashHex=value=>/^[0-9a-f]{64}$/i.test(value||"")?value.toLowerCase():[...Uint8Array.from(atob(value||""),character=>character.charCodeAt(0))].map(byte=>byte.toString(16).padStart(2,"0")).join("");
  async function loadWasm(){const response=await fetch(WASM.url,{cache:"no-store"});if(!response.ok)throw new Error("WASM DOWNLOAD FAILED");const bytes=new Uint8Array(await response.arrayBuffer());const digest=[...new Uint8Array(await crypto.subtle.digest("SHA-256",bytes))].map(byte=>byte.toString(16).padStart(2,"0")).join("");if(digest!==WASM.sha256)throw new Error(`WASM CHECKSUM MISMATCH: ${digest}`);return bytes}
  async function verifyCode(codeId){const info=(await rest(`/cosmwasm/wasm/v1/code/${codeId}`)).code_info||{};if(String(info.code_id)!==String(codeId)||info.creator!==OWNER||hashHex(info.data_hash)!==WASM.sha256)throw new Error("ON-CHAIN CODE CHECKSUM OR CREATOR VERIFICATION FAILED");return info}
  async function contractInfo(address){return (await rest(`/cosmwasm/wasm/v1/contract/${address}`)).contract_info||{}}
  function disconnect(){state.client?.disconnect?.();state.client=null;state.address=null;state.preflight=false;connect.textContent="CONNECT KEPLR";$("#mainnet-preflight").disabled=true;$("#mainnet-upload").disabled=true;$("#mainnet-instantiate").disabled=true;$("#mainnet-verify").disabled=true;show("NOT CONNECTED",{chain_id:CHAIN_ID})}
  connect.addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(state.client){disconnect();return}
    phase="KEPLR ACCESS";if(!window.keplr)throw new Error("KEPLR NOT FOUND — UNLOCK IT AND RELOAD");await deadline(window.keplr.enable(CHAIN_ID),20000,"KEPLR ACCESS");
    const base=window.keplr.getOfflineSigner?.(CHAIN_ID)||window.getOfflineSigner?.(CHAIN_ID);if(!base)throw new Error("JUNO-1 SIGNER UNAVAILABLE");
    const options={preferNoSetFee:true};const signer={getAccounts:()=>base.getAccounts(),signDirect:(address,document)=>window.keplr.signDirect(CHAIN_ID,address,document,options),signAmino:(address,document)=>window.keplr.signAmino(CHAIN_ID,address,document,options)};
    const address=(await deadline(signer.getAccounts(),12000,"ACCOUNT LOOKUP"))[0]?.address;if(address!==OWNER)throw new Error(`EXPECTED OWNER ${OWNER}, RECEIVED ${address||"NO ACCOUNT"}`);
    phase="JUNO-1 RPC CONNECTION";const connected=await NetaRecoverySigning.connect(RPCS,signer,"0.1ujuno",45000);state.client=connected.client;if(await state.client.getChainId()!==CHAIN_ID){state.client.disconnect?.();state.client=null;throw new Error("WRONG CHAIN ID")}
    state.address=address;const balance=await state.client.getBalance(address,"ujuno");connect.textContent="CONNECTED · DISCONNECT";$("#mainnet-preflight").disabled=false;
    show("CONNECTED TO JUNO-1",{address,juno:Number(balance.amount)/1e6,gas_price:"0.1ujuno",writes_enabled:false});
  }));
  $("#mainnet-preflight").addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(!state.client)throw new Error("CONNECT FIRST");phase="PRODUCTION STAKE QUERY";
    const stake=await state.client.queryContractSmart(STAKE_CONTRACT,{staked_balance_at_height:{address:OWNER,height:null}});phase="WASM CHECKSUM";state.wasm=await loadWasm();if(state.codeId)await verifyCode(state.codeId);state.preflight=true;event.currentTarget.dataset.done="true";if(state.contract)$("#mainnet-verify").disabled=false;else if(state.codeId)$("#mainnet-instantiate").disabled=false;else $("#mainnet-upload").disabled=false;
    show("READ-ONLY PREFLIGHT PASSED",{chain_id:await state.client.getChainId(),owner:OWNER,stake_contract:STAKE_CONTRACT,owner_stake_response:stake,minimum_stake:MINIMUM_STAKE,wasm_sha256:WASM.sha256,next:"StoreCode still requires a separate Keplr approval."});
  }));
  $("#mainnet-upload").addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(!state.preflight||!state.wasm)throw new Error("RUN PREFLIGHT FIRST");phase="MAINNET STORECODE";
    const result=await state.client.upload(state.address,state.wasm,"auto","NETA Socials v1 mainnet code upload");state.codeId=result.codeId;await verifyCode(state.codeId);persist();event.currentTarget.dataset.done="true";$("#mainnet-instantiate").disabled=false;
    show("MAINNET CODE STORED",{code_id:state.codeId,upload_tx:result.transactionHash,wasm_sha256:WASM.sha256,next:"Verify the Instantiate message in the next separate Keplr transaction."});
  }));
  $("#mainnet-instantiate").addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(!state.codeId)throw new Error("STORE CODE FIRST");phase="MAINNET INSTANTIATION";
    const message={owner:OWNER,stake_contract:STAKE_CONTRACT,minimum_stake:MINIMUM_STAKE};const result=await state.client.instantiate(state.address,state.codeId,message,"NETA Socials v1","auto",{admin:OWNER});state.contract=result.contractAddress;persist();event.currentTarget.dataset.done="true";$("#mainnet-verify").disabled=false;
    show("MAINNET CONTRACT INSTANTIATED · STILL PAUSED",{code_id:state.codeId,contract:state.contract,instantiate_tx:result.transactionHash,configuration:message,next:"Run read-only on-chain verification. This console cannot unpause."});
  }));
  $("#mainnet-verify").addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(!state.contract||!state.codeId)throw new Error("INSTANTIATE FIRST");phase="POST-DEPLOYMENT VERIFICATION";
    const config=await state.client.queryContractSmart(state.contract,{config:{}});const eligibility=await state.client.queryContractSmart(state.contract,{comment_eligibility:{address:OWNER}});await verifyCode(state.codeId);const info=await contractInfo(state.contract);
    if(config.owner!==OWNER||config.stake_contract!==STAKE_CONTRACT||String(config.minimum_stake)!==MINIMUM_STAKE||config.paused!==true)throw new Error("CONTRACT CONFIGURATION DOES NOT MATCH THE LOCKED MANIFEST");
    if(String(info.code_id)!==String(state.codeId)||info.admin!==OWNER||info.creator!==OWNER)throw new Error("CHAIN-LEVEL CODE OR ADMIN VERIFICATION FAILED");
    event.currentTarget.dataset.done="true";show("MAINNET DEPLOYMENT VERIFIED · PAUSED",{code_id:state.codeId,contract:state.contract,wasm_sha256:WASM.sha256,chain_contract_info:{creator:info.creator,admin:info.admin,label:info.label},config,owner_eligibility:eligibility,public_frontend_enabled:false});
  }));
})();
