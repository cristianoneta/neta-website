(()=>{
  const CHAIN_ID="juno-1";
  const ADDRESS_PATTERN=/^juno1[0-9a-z]{38}$/;
  const SESSION_KEY="neta:keplr-connected";
  const BECH32="qpzry9x8gf2tvdw0s3jn54khce6mua7l";
  const button=document.querySelector("#keplr-connect");
  if(!button)return;
  const label=button.querySelector("[data-wallet-label]");
  const balance=button.querySelector("[data-wallet-balance]");
  const menu=document.querySelector("#wallet-menu");
  const menuAddress=menu?.querySelector("[data-wallet-menu-address]");
  const menuTotal=menu?.querySelector("[data-wallet-menu-total]");
  const menuRank=menu?.querySelector("[data-wallet-menu-rank]");
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
    const sourcePrefix=address.slice(0,separator).toLowerCase();
    if(polymod([...hrpExpand(sourcePrefix),...words])!==1)throw new Error("INVALID BECH32 CHECKSUM");
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
      script.src="address-index.js";
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

  function renderConnected(address,position){
    const total=Number(position?.total_neta||0);
    button.dataset.state="connected";
    label.textContent=short(address);
    balance.textContent=position?`${format(total)} NETA`:"LOADING SNAPSHOT…";
    button.setAttribute("aria-label",`Open Keplr account menu for ${short(address)}`);
    button.setAttribute("aria-haspopup","menu");
    button.setAttribute("aria-expanded","false");
    if(menuAddress)menuAddress.textContent=address;
    if(menuTotal)menuTotal.textContent=position?`${format(total)} NETA`:"LOADING SNAPSHOT…";
    if(menuRank)menuRank.textContent=position?.rank?`RANK #${position.rank}`:position?"UNRANKED":"RANK LOADING…";
    button.title=position
      ?`Total NETA: ${format(total)} · Juno ${format(position.juno_neta)} · Osmosis ${format(position.osmosis_neta)} · DAO ${format(Number(position.neta_dao_staking||0)+Number(position.neta_dao_unstaking||0)+Number(position.neta_dao_claimable||0))} · LP ${format(position.lp_neta)}`
      :"Keplr connected; ranking snapshot is loading";
  }

  function menuItems(){
    return menu?[...menu.querySelectorAll("a[href],button:not([disabled])")]:[];
  }

  function setMenu(open){
    if(!menu)return;
    menu.hidden=!open;
    button.setAttribute("aria-expanded",String(open));
    if(open)queueMicrotask(()=>menuItems()[0]?.focus());
  }

  function resetButton(){
    button.dataset.state="";
    button.title="";
    button.setAttribute("aria-label","Connect Keplr wallet");
    label.textContent="CONNECT KEPLR";
    balance.textContent="READ-ONLY";
    setMenu(false);
  }

  function disconnect(){
    sessionStorage.removeItem(SESSION_KEY);
    window.NETA_WALLET_STATE=null;
    resetButton();
    dispatchEvent(new CustomEvent("neta:wallet-disconnected"));
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
      const osmosisAddress=toPrefix(address.toLowerCase(),"osmo");
      window.NETA_WALLET_STATE={address,osmosisAddress,provider:window.keplr,signer,position:null};
      sessionStorage.setItem(SESSION_KEY,"1");
      renderConnected(address,null);
      dispatchEvent(new CustomEvent("neta:wallet-connected",{detail:window.NETA_WALLET_STATE}));
      try{
        const index=await loadAddressIndex();
        if(window.NETA_WALLET_STATE?.address!==address)return;
        const position=index[address.toLowerCase()]||index[osmosisAddress]||null;
        window.NETA_WALLET_STATE.position=position;
        renderConnected(address,position||{});
        dispatchEvent(new CustomEvent("neta:wallet-position-updated",{detail:window.NETA_WALLET_STATE}));
      }catch{
        if(window.NETA_WALLET_STATE?.address!==address)return;
        balance.textContent="SNAPSHOT UNAVAILABLE";
        if(menuTotal)menuTotal.textContent="SNAPSHOT UNAVAILABLE";
        if(menuRank)menuRank.textContent="RANK UNAVAILABLE";
        button.title="Keplr connected; ranking snapshot unavailable";
      }
    }catch(error){
      sessionStorage.removeItem(SESSION_KEY);
      showError((error instanceof Error?error.message:String(error)).toUpperCase());
      if(!silent)throw error;
    }finally{
      connecting=false;
      button.disabled=false;
      dispatchEvent(new Event("neta:blackout-resume"));
    }
  }

  button.addEventListener("click",()=>{
    if(window.NETA_WALLET_STATE){setMenu(menu?.hidden!==false);return;}
    connect().catch(()=>{});
  });
  menu?.querySelector('[data-wallet-action="ranking"]')?.addEventListener("click",event=>{
    if(location.pathname.endsWith("/index.html")||location.pathname==="/"){
      event.preventDefault();
      setMenu(false);
      dispatchEvent(new CustomEvent("neta:wallet-connected",{detail:window.NETA_WALLET_STATE}));
      document.querySelector("#rankPanelResult")?.scrollIntoView({behavior:"smooth",block:"center"});
    }
  });
  menu?.querySelector('[data-wallet-action="copy"]')?.addEventListener("click",async event=>{
    const action=event.currentTarget;
    try{
      await navigator.clipboard.writeText(window.NETA_WALLET_STATE.address);
      action.firstChild.textContent="ADDRESS COPIED ";
      setTimeout(()=>{action.firstChild.textContent="COPY ADDRESS ";},1600);
    }catch{action.firstChild.textContent="COPY FAILED ";}
  });
  menu?.querySelector('[data-wallet-action="disconnect"]')?.addEventListener("click",disconnect);
  document.addEventListener("click",event=>{if(!menu?.hidden&&!button.parentElement.contains(event.target))setMenu(false)});
  document.addEventListener("keydown",event=>{
    if(menu?.hidden)return;
    if(event.key==="Escape"){setMenu(false);button.focus();return;}
    if(event.key==="ArrowDown"||event.key==="ArrowUp"){
      event.preventDefault();
      const items=menuItems(),current=items.indexOf(document.activeElement);
      const offset=event.key==="ArrowDown"?1:-1;
      items[(current+offset+items.length)%items.length]?.focus();
    }
  });
  window.addEventListener("keplr_keystorechange",()=>{if(sessionStorage.getItem(SESSION_KEY)==="1")connect({silent:true})});
  if(sessionStorage.getItem(SESSION_KEY)==="1")connect({silent:true});
})();
