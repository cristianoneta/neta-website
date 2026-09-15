(()=>{
  const $=selector=>document.querySelector(selector);
  const OWNER="juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const STAKE="juno1a7x8aj7k38vnj9edrlymkerhrl5d4ud3makmqhx6vt3dhu0d824qh038zh";
  const MINIMUM=10000000n;
  const LCD=["https://juno-api.polkachu.com","https://juno-api.lavenderfive.com"];
  const UNI_7={
    chainId:"uni-7",chainName:"Juno Testnet",
    rpc:"https://juno.test.rpc.nodeshub.online",rest:"https://juno.test.api.nodeshub.online",
    bip44:{coinType:118},
    bech32Config:{bech32PrefixAccAddr:"juno",bech32PrefixAccPub:"junopub",bech32PrefixValAddr:"junovaloper",bech32PrefixValPub:"junovaloperpub",bech32PrefixConsAddr:"junovalcons",bech32PrefixConsPub:"junovalconspub"},
    currencies:[{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6}],
    feeCurrencies:[{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6,gasPriceStep:{low:0.0025,average:0.003,high:0.04}}],
    stakeCurrency:{coinDenom:"JUNOX",coinMinimalDenom:"ujunox",coinDecimals:6},
    features:["cosmwasm"],
  };
  const short=address=>`${address.slice(0,9)}…${address.slice(-6)}`;
  const encode=value=>encodeURIComponent(btoa(JSON.stringify(value)));
  async function queryStake(address){
    const path=`/cosmwasm/wasm/v1/contract/${STAKE}/smart/${encode({staked_balance_at_height:{address}})}`;
    for(const base of LCD){try{const response=await fetch(base+path,{cache:"no-store"});if(!response.ok)continue;const json=await response.json();return BigInt(json.data.balance)}catch{}}
    throw new Error("STAKE QUERY FAILED");
  }
  async function renderAccess(state){
    const newThread=$("#new-thread");
    if(!state?.address){$("#social-wallet").textContent="NOT CONNECTED";$("#social-stake").textContent="— NETA";$("#social-access").textContent="LOCKED";$("#social-access").dataset.state="locked";newThread.disabled=true;return}
    const address=state.address.toLowerCase(),owner=address===OWNER;$("#social-wallet").textContent=short(address);$("#social-stake").textContent="CHECKING…";
    try{const raw=owner?0n:await queryStake(address),eligible=owner||raw>=MINIMUM;$("#social-stake").textContent=owner?"OWNER EXEMPT":`${Number(raw)/1e6} NETA`;$("#social-access").textContent=eligible?"ELIGIBLE":"10 NETA REQUIRED";$("#social-access").dataset.state=eligible?"ready":"locked";newThread.disabled=!eligible}
    catch{$("#social-stake").textContent="QUERY FAILED";$("#social-access").textContent="LOCKED";$("#social-access").dataset.state="locked";newThread.disabled=true}
  }
  const showDraft=()=>$("#draft-modal").hidden=false;
  $("#add-juno-testnet").addEventListener("click",async event=>{
    const button=event.currentTarget,label=button.textContent;
    if(!window.keplr?.experimentalSuggestChain){button.textContent="· INSTALL KEPLR";return}
    button.disabled=true;button.textContent="· ADDING…";
    try{await window.keplr.experimentalSuggestChain(UNI_7);button.textContent="· UNI-7 ADDED"}
    catch(error){button.textContent=error?.message?.toLowerCase().includes("reject")?"· CANCELLED":"· RETRY UNI-7"}
    finally{button.disabled=false;setTimeout(()=>button.textContent=label,5000)}
  });
  $("#new-thread").addEventListener("click",showDraft);$("#draft-close").addEventListener("click",()=>$("#draft-modal").hidden=true);$("#draft-modal").addEventListener("click",event=>{if(event.target===$("#draft-modal"))$("#draft-modal").hidden=true});
  addEventListener("neta:wallet-connected",event=>renderAccess(event.detail));addEventListener("neta:wallet-position-updated",event=>renderAccess(event.detail));addEventListener("neta:wallet-disconnected",()=>renderAccess(null));renderAccess(window.NETA_WALLET_STATE);
})();
