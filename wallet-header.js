(()=>{
  const CHAIN_ID="juno-1";
  const ADDRESS_PATTERN=/^juno1[0-9a-z]{38}$/;
  const SESSION_KEY="neta:keplr-connected";
  const BECH32="qpzry9x8gf2tvdw0s3jn54khce6mua7l";
  const button=document.querySelector("#keplr-connect");
  if(!button)return;
  const label=button.querySelector("[data-wallet-label]");
  const balance=button.querySelector("[data-wallet-balance]");
  let indexPromise=null;
  let connecting=false;

  const format=value=>new Intl.NumberFormat("en-US",{maximumFractionDigits:6}).format(Number(value||0));
  const short=address=>`${address.slice(0,9)}…${address.slice(-6)}`;

  function polymod(values){
    const generators=[0x3b6a57b2,0x26508e6d,0x1ea119fa,0x3d4233dd,0x2a1462b3];
    let checksum=1;
    for(const value of values){
      const top=checksum>>>25;
      checksum=(checksum&0x1ffffff)<<5^value;
      for(let index=0;index<5;index++)if((top>>>index)&1)checksum^=generators[index];
    }
    return checksum;
  }

  function hrpExpand(prefix){
    return[...[...prefix].map(char=>char.charCodeAt(0)>>>5),0,...[...prefix].map(char=>char.charCodeAt(0)&31)];
  }

  function toPrefix(address,prefix){
    const separator=address.lastIndexOf("1");
    if(separator<1)throw new Error("INVALID BECH32 ADDRESS");
    const words=[...address.slice(separator+1)].map(char=>BECH32.indexOf(char));
    if(words.some(value=>value<0)||words.length<7)throw new Error("INVALID BECH32 ADDRESS");
    const data=words.slice(0,-6);
    const checksumInput=[...hrpExpand(prefix),...data,0,0,0,0,0,0];
    const checksum=polymod(checksumInput)^1;
    const tail=Array.from({length:6},(_,index)=>(checksum>>>5*(5-index))&31);
    return`${prefix}1${[...data,...tail].map(value=>BECH32[value]).join("")}`;
  }

  window.NetaWalletHeader=Object.freeze({toPrefix});

  function loadAddressIndex(){
    if(window.NETA_ADDRESS_INDEX)return Promise.resolve(window.NETA_ADDRESS_INDEX);
    if(indexPromise)return indexPromise;
    indexPromise=new Promise((resolve,reject)=>{
      const script=document.createElement("script");
      script.src=`address-index.js?t=${Date.now()}`;
      script.onload=()=>window.NETA_ADDRESS_INDEX?resolve(window.NETA_ADDRESS_INDEX):reject(new Error("NETA SNAPSHOT UNAVAILABLE"));
      script.onerror=()=>reject(new Error("NETA SNAPSHOT UNAVAILABLE"));
      document.head.append(script);
    });
    return indexPromise;
  }

  function showError(message){
    button.dataset.state="error";
    label.textContent="KEPLR ERROR";
    balance.textContent=message;
  }

  async function connect({silent=false}={}){
    if(connecting)return;
    if(!window.keplr){
      sessionStorage.removeItem(SESSION_KEY);
      showError("INSTALL KEPLR");
      if(!silent)window.open("https://www.keplr.app/download","_blank","noopener");
      return;
    }
    connecting=true;
    button.disabled=true;
    button.dataset.state="loading";
    label.textContent="KEPLR";
    balance.textContent="CONNECTING…";
    dispatchEvent(new Event("neta:blackout-pause"));
    try{
      await window.keplr.enable(CHAIN_ID);
      const signer=window.keplr.getOfflineSigner(CHAIN_ID);
      const accounts=await signer.getAccounts();
      const address=accounts[0]?.address;
      if(!address||!ADDRESS_PATTERN.test(address))throw new Error("INVALID JUNO ACCOUNT");
      const index=await loadAddressIndex();
      const osmosisAddress=toPrefix(address.toLowerCase(),"osmo");
      const position=index[address.toLowerCase()]||index[osmosisAddress]||null;
      const total=Number(position?.total_neta||0);
      window.NETA_WALLET_STATE={address,osmosisAddress,provider:window.keplr,signer,position};
      sessionStorage.setItem(SESSION_KEY,"1");
      button.dataset.state="connected";
      label.textContent=short(address);
      balance.textContent=`${format(total)} NETA`;
      button.title=position
        ?`Total NETA: ${format(total)} · Juno ${format(position.juno_neta)} · Osmosis ${format(position.osmosis_neta)} · DAO ${format(Number(position.neta_dao_staking||0)+Number(position.neta_dao_unstaking||0)+Number(position.neta_dao_claimable||0))} · LP ${format(position.lp_neta)}`
        :"No NETA position in the current ranking snapshot";
      dispatchEvent(new CustomEvent("neta:wallet-connected",{detail:window.NETA_WALLET_STATE}));
    }catch(error){
      sessionStorage.removeItem(SESSION_KEY);
      showError(error.message.toUpperCase());
      if(!silent)throw error;
    }finally{
      connecting=false;
      button.disabled=false;
      dispatchEvent(new Event("neta:blackout-resume"));
    }
  }

  button.addEventListener("click",()=>connect().catch(()=>{}));
  window.addEventListener("keplr_keystorechange",()=>connect({silent:true}));
  if(sessionStorage.getItem(SESSION_KEY)==="1")connect({silent:true});
})();
