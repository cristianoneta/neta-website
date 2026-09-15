(()=>{
  const init=()=>{
  const CHAIN_ID="uni-7";
  const OWNER="juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const RPC="https://juno.rpc.t.stavr.tech";
  const ARTIFACTS={
    mock:{url:"assets/contracts/neta_socials_stake_mock.wasm",sha256:"c4920d17c0c44fd8dfe72f01d9c3d0faa8b1fafc1d70f511684f3426a4c30f81"},
    socials:{url:"assets/contracts/neta_socials.wasm",sha256:"49da22c2837cbfb86bed4e714d840cffefa2e2d26e9660f47a3eb17f745ee869"},
  };
  const CHAIN={chainId:CHAIN_ID,chainName:"Juno Testnet",rpc:RPC,rest:"https://juno.api.t.stavr.tech",bip44:{coinType:118},bech32Config:{bech32PrefixAccAddr:"juno",bech32PrefixAccPub:"junopub",bech32PrefixValAddr:"junovaloper",bech32PrefixValPub:"junovaloperpub",bech32PrefixConsAddr:"junovalcons",bech32PrefixConsPub:"junovalconspub"},currencies:[{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6}],feeCurrencies:[{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6,gasPriceStep:{low:.003,average:.0045,high:.006}}],stakeCurrency:{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6},features:["cosmwasm"]};
  const saved=(()=>{try{return JSON.parse(localStorage.getItem("neta-socials-uni7")||"{}")}catch{return{}}})();
  const state={client:null,address:null,mock:saved.mock||null,socials:saved.socials||null};
  const $=selector=>document.querySelector(selector),connect=$("#test-connect");
  const status=$("#test-status"),output=$("#test-output");
  const show=(label,data)=>{status.textContent=label;output.textContent=JSON.stringify(data,null,2)};
  const fail=error=>{status.textContent="FAILED";output.textContent=error instanceof Error?error.message:String(error)};
  const deadline=(promise,ms,label)=>Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error(`${label} TIMED OUT AFTER ${ms/1000} SECONDS`)),ms))]);
  const persist=()=>localStorage.setItem("neta-socials-uni7",JSON.stringify({mock:state.mock,socials:state.socials}));
  const busy=async(button,task)=>{button.disabled=true;try{await task()}catch(error){fail(error)}finally{button.disabled=button.dataset.done==="true"}};
  async function wasm(name){
    const item=ARTIFACTS[name],response=await fetch(item.url,{cache:"no-store"});
    if(!response.ok)throw new Error("WASM DOWNLOAD FAILED");
    const bytes=new Uint8Array(await response.arrayBuffer());
    const digest=[...new Uint8Array(await crypto.subtle.digest("SHA-256",bytes))].map(x=>x.toString(16).padStart(2,"0")).join("");
    if(digest!==item.sha256)throw new Error("WASM CHECKSUM MISMATCH");
    return bytes;
  }
  connect.addEventListener("click",event=>busy(event.currentTarget,async()=>{
    show("CONNECTING · CHECK KEPLR",{"next":"Approve the uni-7 connection in Keplr."});
    if(!window.keplr?.experimentalSuggestChain)throw new Error("KEPLR NOT FOUND — UNLOCK THE EXTENSION AND RELOAD THIS PAGE");
    await deadline(window.keplr.experimentalSuggestChain(CHAIN),25000,"CHAIN SUGGESTION");
    show("CONNECTING · WAITING FOR KEPLR",{"next":"Approve access to your uni-7 account."});
    await deadline(window.keplr.enable(CHAIN_ID),12000,"KEPLR ACCESS");
    const signer=window.getOfflineSigner?.(CHAIN_ID)||window.keplr.getOfflineSigner?.(CHAIN_ID);
    if(!signer)throw new Error("KEPLR OFFLINE SIGNER IS UNAVAILABLE");
    const accounts=await deadline(signer.getAccounts(),12000,"ACCOUNT LOOKUP"),address=accounts[0]?.address;
    if(address!==OWNER)throw new Error(`EXPECTED OWNER ${OWNER}, RECEIVED ${address||"NO ACCOUNT"}`);
    show("CONNECTING · CHECKING RPC",{"rpc":RPC});
    state.client=await deadline(NetaSocialsTestnet.connect(RPC,signer),25000,"UNI-7 RPC CONNECTION");state.address=address;
    const balance=await state.client.getBalance(address,"ujunox");
    $("#test-mock").disabled=Boolean(state.mock);$("#test-socials").disabled=!state.mock||Boolean(state.socials);$("#test-verify").disabled=!state.socials;
    show("CONNECTED TO UNI-7",{address,junox:Number(balance.amount)/1e6,recovered:{stake_contract:state.mock,socials_contract:state.socials}});
  }));
  $("#test-mock")?.addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(!state.client)throw new Error("CONNECT FIRST");
    const upload=await NetaSocialsTestnet.upload(state.client,state.address,await wasm("mock"),"NETA Socials uni-7 stake mock upload");
    const instance=await NetaSocialsTestnet.instantiate(state.client,state.address,upload.codeId,{owner:state.address,balances:[{address:state.address,balance:"10000000"}]},"NETA Socials uni-7 stake mock");
    state.mock=instance.contractAddress;persist();event.currentTarget.dataset.done="true";$("#test-socials").disabled=false;show("STAKE MOCK DEPLOYED",{code_id:upload.codeId,contract:state.mock,upload_tx:upload.transactionHash,instantiate_tx:instance.transactionHash});
  }));
  $("#test-socials")?.addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(!state.mock)throw new Error("DEPLOY MOCK FIRST");
    const upload=await NetaSocialsTestnet.upload(state.client,state.address,await wasm("socials"),"NETA Socials uni-7 code upload");
    const instance=await NetaSocialsTestnet.instantiate(state.client,state.address,upload.codeId,{owner:state.address,stake_contract:state.mock,minimum_stake:"10000000"},"NETA Socials uni-7");
    state.socials=instance.contractAddress;persist();event.currentTarget.dataset.done="true";$("#test-verify").disabled=false;show("SOCIALS DEPLOYED · PAUSED",{code_id:upload.codeId,contract:state.socials,stake_contract:state.mock,upload_tx:upload.transactionHash,instantiate_tx:instance.transactionHash});
  }));
  $("#test-verify")?.addEventListener("click",event=>busy(event.currentTarget,async()=>{
    if(!state.socials)throw new Error("DEPLOY SOCIALS FIRST");
    const before=await NetaSocialsTestnet.query(state.client,state.socials,{config:{}});
    if(!before.paused||before.stake_contract!==state.mock)throw new Error("DEPLOYMENT CONFIG VERIFICATION FAILED");
    const tx=await NetaSocialsTestnet.execute(state.client,state.address,state.socials,{set_paused:{paused:false}},"Enable NETA Socials uni-7 testing");
    const config=await NetaSocialsTestnet.query(state.client,state.socials,{config:{}});
    const eligibility=await NetaSocialsTestnet.query(state.client,state.socials,{comment_eligibility:{address:state.address}});
    if(config.paused||!eligibility.can_post)throw new Error("POST-DEPLOY VERIFICATION FAILED");
    event.currentTarget.dataset.done="true";show("UNI-7 DEPLOYMENT VERIFIED · POSTING ENABLED",{contract:state.socials,stake_contract:state.mock,unpause_tx:tx.transactionHash,config,eligibility});
  }));
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
