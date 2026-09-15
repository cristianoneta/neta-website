(()=>{
  const init=()=>{
  const CHAIN_ID="uni-7";
  const OWNER="juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const RPCS=["https://juno.test.rpc.nodeshub.online","https://juno.rpc.t.stavr.tech"];
  const ARTIFACTS={
    mock:{url:"assets/contracts/neta_socials_stake_mock.wasm",sha256:"c4920d17c0c44fd8dfe72f01d9c3d0faa8b1fafc1d70f511684f3426a4c30f81"},
    socials:{url:"assets/contracts/neta_socials.wasm",sha256:"49da22c2837cbfb86bed4e714d840cffefa2e2d26e9660f47a3eb17f745ee869"},
  };
  const CHAIN={chainId:CHAIN_ID,chainName:"Juno Testnet",rpc:RPCS[0],rest:"https://juno.test.api.nodeshub.online",bip44:{coinType:118},bech32Config:{bech32PrefixAccAddr:"juno",bech32PrefixAccPub:"junopub",bech32PrefixValAddr:"junovaloper",bech32PrefixValPub:"junovaloperpub",bech32PrefixConsAddr:"junovalcons",bech32PrefixConsPub:"junovalconspub"},currencies:[{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6}],feeCurrencies:[{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6,gasPriceStep:{low:.1,average:.2,high:.3}}],stakeCurrency:{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6},features:["cosmwasm"]};
  const saved=(()=>{try{return JSON.parse(localStorage.getItem("neta-socials-uni7")||"{}")}catch{return{}}})();
  const state={client:null,address:null,mock:saved.mock||null,socials:saved.socials||null};
  const $=selector=>document.querySelector(selector),connect=$("#test-connect");
  const status=$("#test-status"),output=$("#test-output");
  let phase="START";
  const show=(label,data)=>{status.textContent=label;output.textContent=JSON.stringify(data,null,2)};
  const fail=error=>{status.textContent="FAILED";output.textContent=`${phase}: ${error instanceof Error?error.message:String(error)}`};
  const deadline=(promise,ms,label)=>Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error(`${label} TIMED OUT AFTER ${ms/1000} SECONDS`)),ms))]);
  const persist=()=>localStorage.setItem("neta-socials-uni7",JSON.stringify({mock:state.mock,socials:state.socials}));
  const busy=async(button,task)=>{button.disabled=true;try{await task()}catch(error){fail(error)}finally{button.disabled=button.dataset.done==="true"}};
  const disconnected=()=>{
    state.client?.disconnect?.();state.client=null;state.address=null;
    connect.textContent="CONNECT KEPLR";connect.dataset.state="disconnected";
    $("#test-mock").disabled=true;$("#test-socials").disabled=true;$("#test-verify").disabled=true;
    status.textContent="NOT CONNECTED";output.textContent="No transactions submitted.";
  };
  async function wasm(name){
    const item=ARTIFACTS[name],response=await fetch(item.url,{cache:"no-store"});
    if(!response.ok)throw new Error("WASM DOWNLOAD FAILED");
    const bytes=new Uint8Array(await response.arrayBuffer());
    const digest=[...new Uint8Array(await crypto.subtle.digest("SHA-256",bytes))].map(x=>x.toString(16).padStart(2,"0")).join("");
    if(digest!==item.sha256)throw new Error("WASM CHECKSUM MISMATCH");
    return bytes;
  }
  connect.addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(state.client){disconnected();return}
    phase="KEPLR DETECTION";show("CONNECTING · CHECK KEPLR",{"next":"Approve the uni-7 connection in Keplr."});
    if(!window.keplr?.experimentalSuggestChain)throw new Error("KEPLR NOT FOUND — UNLOCK THE EXTENSION AND RELOAD THIS PAGE");
    phase="CHAIN SUGGESTION";await deadline(window.keplr.experimentalSuggestChain(CHAIN),45000,"CHAIN SUGGESTION");
    phase="KEPLR ACCESS";show("CONNECTING · WAITING FOR KEPLR",{"next":"Approve access to your uni-7 account."});
    await deadline(window.keplr.enable(CHAIN_ID),12000,"KEPLR ACCESS");
    const signOptions={preferNoSetFee:true};
    const signer=window.keplr.getOfflineSigner?.(CHAIN_ID,signOptions)||window.getOfflineSigner?.(CHAIN_ID,signOptions);
    if(!signer)throw new Error("KEPLR OFFLINE SIGNER IS UNAVAILABLE");
    phase="ACCOUNT LOOKUP";const accounts=await deadline(signer.getAccounts(),12000,"ACCOUNT LOOKUP"),address=accounts[0]?.address;
    if(address!==OWNER)throw new Error(`EXPECTED OWNER ${OWNER}, RECEIVED ${address||"NO ACCOUNT"}`);
    phase="UNI-7 RPC CONNECTION";
    const failures=[];
    for(const rpc of RPCS){
      show("CONNECTING · CHECKING RPC",{rpc,attempt:failures.length+1,total:RPCS.length});
      try{state.client=await deadline(NetaSocialsTestnet.connect(rpc,signer),45000,"UNI-7 RPC CONNECTION");break}
      catch(error){failures.push(`${rpc}: ${error instanceof Error?error.message:String(error)}`)}
    }
    if(!state.client)throw new Error(`ALL RPC ENDPOINTS FAILED\n${failures.join("\n")}`);
    state.address=address;
    phase="JUNOX BALANCE";const balance=await deadline(state.client.getBalance(address,"ujunox"),45000,"JUNOX BALANCE");
    connect.textContent="CONNECTED · DISCONNECT";connect.dataset.state="connected";
    $("#test-mock").disabled=Boolean(state.mock);$("#test-socials").disabled=!state.mock||Boolean(state.socials);$("#test-verify").disabled=!state.socials;
    show("CONNECTED TO UNI-7",{address,junox:Number(balance.amount)/1e6,gas_price:"0.2ujunox",recovered:{stake_contract:state.mock,socials_contract:state.socials}});
  }));
  $("#test-mock")?.addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(!state.client)throw new Error("CONNECT FIRST");
    phase="STAKE MOCK UPLOAD";
    const upload=await NetaSocialsTestnet.upload(state.client,state.address,await wasm("mock"),"NETA Socials uni-7 stake mock upload");
    phase="STAKE MOCK INSTANTIATION";
    const instance=await NetaSocialsTestnet.instantiate(state.client,state.address,upload.codeId,{owner:state.address,balances:[{address:state.address,balance:"10000000"}]},"NETA Socials uni-7 stake mock");
    state.mock=instance.contractAddress;persist();event.currentTarget.dataset.done="true";$("#test-socials").disabled=false;show("STAKE MOCK DEPLOYED",{code_id:upload.codeId,contract:state.mock,upload_tx:upload.transactionHash,instantiate_tx:instance.transactionHash});
  }));
  $("#test-socials")?.addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(!state.mock)throw new Error("DEPLOY MOCK FIRST");
    phase="SOCIALS UPLOAD";
    const upload=await NetaSocialsTestnet.upload(state.client,state.address,await wasm("socials"),"NETA Socials uni-7 code upload");
    phase="SOCIALS INSTANTIATION";
    const instance=await NetaSocialsTestnet.instantiate(state.client,state.address,upload.codeId,{owner:state.address,stake_contract:state.mock,minimum_stake:"10000000"},"NETA Socials uni-7");
    state.socials=instance.contractAddress;persist();event.currentTarget.dataset.done="true";$("#test-verify").disabled=false;show("SOCIALS DEPLOYED · PAUSED",{code_id:upload.codeId,contract:state.socials,stake_contract:state.mock,upload_tx:upload.transactionHash,instantiate_tx:instance.transactionHash});
  }));
  $("#test-verify")?.addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(!state.socials)throw new Error("DEPLOY SOCIALS FIRST");
    phase="SOCIALS CONFIG VERIFICATION";
    const before=await NetaSocialsTestnet.query(state.client,state.socials,{config:{}});
    if(!before.paused||before.stake_contract!==state.mock)throw new Error("DEPLOYMENT CONFIG VERIFICATION FAILED");
    phase="SOCIALS UNPAUSE";const tx=await NetaSocialsTestnet.execute(state.client,state.address,state.socials,{set_paused:{paused:false}},"Enable NETA Socials uni-7 testing");
    phase="SOCIALS POST-DEPLOY VERIFICATION";
    const config=await NetaSocialsTestnet.query(state.client,state.socials,{config:{}});
    const eligibility=await NetaSocialsTestnet.query(state.client,state.socials,{comment_eligibility:{address:state.address}});
    if(config.paused||!eligibility.can_post)throw new Error("POST-DEPLOY VERIFICATION FAILED");
    event.currentTarget.dataset.done="true";show("UNI-7 DEPLOYMENT VERIFIED · POSTING ENABLED",{contract:state.socials,stake_contract:state.mock,unpause_tx:tx.transactionHash,config,eligibility});
  }));
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
