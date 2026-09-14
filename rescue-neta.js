(()=>{
  "use strict";
  const PAIR="juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra";
  const NETA="juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr";
  const PAIR_CODE_ID="2289";
  const LCD_ENDPOINTS=["https://juno-api.polkachu.com","https://juno-api.lavenderfive.com"];
  const LIMIT_USD=25;
  const DECIMALS=6;
  const QUOTE_REFRESH_MS=12000;
  const SIGNING=window.NETA_SWAP_SIGNING;
  const assets={
    JUNO:{symbol:"JUNO",mark:"J",info:{native:"ujuno"}},
    NETA:{symbol:"NETA",mark:"N",info:{token:NETA}},
  };
  const dom={
    amount:document.querySelector("#offer-amount"),receive:document.querySelector("#receive-amount"),
    offerSymbol:document.querySelector("#offer-symbol"),receiveSymbol:document.querySelector("#receive-symbol"),
    offerMark:document.querySelector("#offer-mark"),receiveMark:document.querySelector("#receive-mark"),
    offerUsd:document.querySelector("#offer-usd"),receiveUsd:document.querySelector("#receive-usd"),
    offerBalance:document.querySelector("#offer-balance"),max:document.querySelector("#max-button"),
    reverse:document.querySelector("#reverse-swap"),message:document.querySelector("#quote-error"),
    age:document.querySelector("#quote-age"),rate:document.querySelector("#quote-rate"),
    impact:document.querySelector("#price-impact"),fee:document.querySelector("#pool-fee"),
    minimum:document.querySelector("#minimum-received"),slippageSummary:document.querySelector("#slippage-summary"),slippageSummaryButton:document.querySelector("#slippage-summary-button"),
    contractState:document.querySelector("#contract-state"),source:document.querySelector("#quote-source"),
    settings:document.querySelector("#slippage-settings"),settingsToggle:document.querySelector("#settings-toggle"),
    custom:document.querySelector("#custom-slippage"),slippageButtons:[...document.querySelectorAll("[data-slippage]")],
    action:document.querySelector("#swap-action"),modal:document.querySelector("#swap-modal"),
    modalState:document.querySelector("#swap-modal-state"),preview:document.querySelector("#swap-preview"),
    modalMessage:document.querySelector("#swap-modal-message"),confirm:document.querySelector("#confirm-swap"),
    close:document.querySelector("#close-swap"),result:document.querySelector("#swap-result"),
    resultLabel:document.querySelector("#swap-result-label"),resultHash:document.querySelector("#swap-result-hash"),explorer:document.querySelector("#swap-explorer"),
  };
  if(!dom.amount||!window.NetaCosmosClient)return;
  const client=new window.NetaCosmosClient(LCD_ENDPOINTS);
  let offer="JUNO",slippage=5,junoUsd=null,pool=null,contractValid=false;
  let quote=null,requestId=0,debounceTimer=null,refreshTimer=null,ageTimer=null,balanceRaw=null;
  let signing=false;

  const other=symbol=>symbol==="JUNO"?"NETA":"JUNO";
  const asNumber=raw=>Number(raw)/10**DECIMALS;
  const money=value=>Number.isFinite(value)?`EST. $${value.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`:"EST. —";
  const amountText=(raw,max=6)=>asNumber(raw).toLocaleString("en-US",{useGrouping:false,maximumFractionDigits:max});
  const queryInfo=asset=>{const info=asset.info||asset;return info.native?`native:${info.native}`:`token:${info.token}`};
  const expectedAssets=new Set(["native:ujuno",`token:${NETA}`]);
  const signingConfigValid=Boolean(SIGNING&&SIGNING.chainId==="juno-1"&&SIGNING.pair===PAIR&&SIGNING.neta===NETA&&SIGNING.pairCodeId===PAIR_CODE_ID&&SIGNING.publicMaxUsd===LIMIT_USD);

  function parseAmount(value){
    const clean=value.trim();
    if(!/^(?:\d+)(?:\.\d{0,6})?$/.test(clean))throw new Error("ENTER A VALID AMOUNT WITH UP TO 6 DECIMALS");
    const [whole,fraction=""]=clean.split(".");
    const raw=BigInt(whole)*1000000n+BigInt((fraction+"000000").slice(0,6));
    if(raw<=0n)throw new Error("ENTER AN AMOUNT GREATER THAN ZERO");
    return raw;
  }

  function tokenUsd(symbol){
    if(!junoUsd||!pool)return null;
    if(symbol==="JUNO")return junoUsd;
    const junoReserve=pool.assets.find(asset=>asset.info.native==="ujuno");
    const netaReserve=pool.assets.find(asset=>asset.info.token===NETA);
    if(!junoReserve||!netaReserve||Number(netaReserve.amount)<=0)return null;
    return Number(junoReserve.amount)/Number(netaReserve.amount)*junoUsd;
  }

  function setMessage(text,state=""){
    dom.message.textContent=text;
    if(state)dom.message.dataset.state=state;else delete dom.message.dataset.state;
  }

  function clearQuote(message="ENTER AN AMOUNT TO REQUEST A LIVE QUOTE",state=""){
    quote=null;dom.receive.textContent="0.0";dom.receiveUsd.textContent="EST. $0.00";dom.age.textContent="ENTER AN AMOUNT";
    dom.rate.textContent="—";dom.impact.textContent="—";dom.minimum.textContent="—";
    setMessage(message,state);
    renderAction();
  }

  function renderDirection(){
    const receive=other(offer);
    dom.offerSymbol.textContent=offer;dom.receiveSymbol.textContent=receive;
    dom.offerMark.textContent=assets[offer].mark;dom.receiveMark.textContent=assets[receive].mark;
    dom.offerUsd.textContent="EST. $0.00";dom.receiveUsd.textContent="EST. $0.00";
    updateBalance();
    renderAction();
  }

  function signingAuthority(){
    const address=window.NETA_WALLET_STATE?.address;
    if(!SIGNING?.enabled||!signingConfigValid)return{ok:false,label:"SWAP SIGNING IS DISABLED"};
    if(!address)return{ok:false,label:"CONNECT PILOT WALLET TO TEST"};
    if(SIGNING.pilotOnly&&address!==SIGNING.pilotWallet)return{ok:false,label:"PILOT WALLET ONLY"};
    if(!quote)return{ok:false,label:"ENTER AN AMOUNT FOR A LIVE QUOTE"};
    if(balanceRaw!==null&&quote.raw>balanceRaw)return{ok:false,label:`INSUFFICIENT ${offer} BALANCE`};
    return{ok:true,label:"REVIEW PILOT SWAP"};
  }

  function renderAction(){
    if(!dom.action)return;
    const authority=signingAuthority();dom.action.disabled=!authority.ok||signing;dom.action.textContent=authority.label;
  }

  async function loadMarket(){
    const response=await fetch("data/recovery/wynd-market.json",{cache:"no-store"});
    if(!response.ok)throw new Error("MARKET SNAPSHOT UNAVAILABLE");
    const market=await response.json();
    const selected=market.pools?.[PAIR];
    const juno=selected?.assets?.find(asset=>asset.key==="native:ujuno");
    const stamp=Date.parse(market.price_timestamp||"");
    if(!selected||!juno?.usd_price||!Number.isFinite(stamp))throw new Error("INVALID MARKET SNAPSHOT");
    if(Date.now()-stamp>36*60*60*1000)throw new Error("USD PRICE SNAPSHOT IS STALE");
    junoUsd=Number(juno.usd_price);
  }

  async function validateContract(){
    const [info,pairInfo,livePool]=await Promise.all([
      client.contractInfo(PAIR),client.smart(PAIR,{pair:{}}),client.smart(PAIR,{pool:{}}),
    ]);
    if(String(info.code_id)!==PAIR_CODE_ID)throw new Error("PAIR CODE ID DOES NOT MATCH THE ALLOWLIST");
    if(pairInfo.contract_addr!==PAIR)throw new Error("PAIR IDENTITY DOES NOT MATCH");
    const listed=new Set((pairInfo.asset_infos||[]).map(queryInfo));
    if(listed.size!==2||[...expectedAssets].some(key=>!listed.has(key)))throw new Error("PAIR ASSETS DO NOT MATCH JUNO / NETA");
    if(String(pairInfo.fee_config?.total_fee_bps)!=="30")throw new Error("PAIR FEE DOES NOT MATCH 0.30%");
    pool=livePool;contractValid=true;
    dom.contractState.textContent="LIVE CODE OK";dom.contractState.dataset.ok="true";
    dom.source.textContent=client.preferredEndpoint?.replace("https://","").toUpperCase()||"JUNO LCD";
  }

  function quoteUsd(raw,symbol){const price=tokenUsd(symbol);return price===null?null:asNumber(raw)*price}

  async function requestQuote(){
    clearTimeout(debounceTimer);clearTimeout(refreshTimer);
    const id=++requestId;
    let raw;
    try{raw=parseAmount(dom.amount.value)}catch(error){
      dom.offerUsd.textContent="EST. $0.00";
      clearQuote(dom.amount.value?error.message:"ENTER AN AMOUNT TO REQUEST A LIVE QUOTE",dom.amount.value?"error":"");return;
    }
    if(!contractValid){clearQuote("LIVE CONTRACT VALIDATION IS NOT COMPLETE","loading");return}
    const usd=quoteUsd(raw,offer);dom.offerUsd.textContent=money(usd);
    if(usd===null){clearQuote("USD LIMIT CANNOT BE VERIFIED — QUOTE BLOCKED","error");return}
    if(usd>LIMIT_USD+0.000001){clearQuote(`$25 LIMIT EXCEEDED — CURRENT ESTIMATE ${money(usd).replace("EST. ","")}`,"error");return}
    setMessage("REQUESTING A FRESH ON-CHAIN QUOTE…","loading");
    try{
      const response=await client.smart(PAIR,{simulation:{offer_asset:{info:assets[offer].info,amount:String(raw)},ask_asset_info:null,referral:false,referral_commission:null}});
      if(id!==requestId)return;
      const returned=BigInt(response.return_amount),fee=BigInt(response.commission_amount),spread=BigInt(response.spread_amount);
      if(returned<=0n)throw new Error("CONTRACT RETURNED AN EMPTY QUOTE");
      const noImpact=returned+fee+spread;
      const impact=noImpact?Number(spread)*100/Number(noImpact):0;
      const min=returned*BigInt(Math.round((100-slippage)*100))/10000n;
      quote={raw,returned,fee,spread,min,at:Date.now(),offer,receive:other(offer),usd};
      dom.receive.textContent=amountText(returned);dom.receiveUsd.textContent=money(quoteUsd(returned,quote.receive));
      dom.rate.textContent=`1 ${offer} ≈ ${(asNumber(returned)/asNumber(raw)).toLocaleString("en-US",{maximumFractionDigits:8})} ${quote.receive}`;
      dom.impact.textContent=`${impact.toFixed(2)}%`;dom.impact.dataset.alert=String(impact>=2);
      dom.fee.textContent=`0.30% · ${amountText(fee)} ${quote.receive}`;
      dom.minimum.textContent=`${amountText(min)} ${quote.receive}`;
      setMessage(SIGNING?.pilotOnly?"LIVE QUOTE RECEIVED — PILOT WALLET MAY REVIEW":"LIVE QUOTE RECEIVED","ok");
      renderAction();
      renderAge();refreshTimer=setTimeout(requestQuote,QUOTE_REFRESH_MS);
    }catch(error){if(id===requestId)clearQuote(`QUOTE FAILED: ${(error.message||String(error)).toUpperCase()}`,"error")}
  }

  function scheduleQuote(){clearTimeout(debounceTimer);clearTimeout(refreshTimer);debounceTimer=setTimeout(requestQuote,320)}
  function renderAge(){if(!quote)return;const seconds=Math.max(0,Math.floor((Date.now()-quote.at)/1000));dom.age.textContent=seconds?`QUOTED ${seconds}S AGO`:"QUOTED NOW"}

  async function updateBalance(){
    const address=window.NETA_WALLET_STATE?.address;
    balanceRaw=null;dom.max.disabled=true;
    if(!address){dom.offerBalance.textContent="BALANCE —";return}
    dom.offerBalance.textContent="BALANCE LOADING…";
    try{
      if(offer==="JUNO"){
        const {data}=await client.get(`/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=ujuno`);
        balanceRaw=BigInt(data.balance?.amount||"0");
      }else{
        const result=await client.smart(NETA,{balance:{address}});balanceRaw=BigInt(result.balance||"0");
      }
      dom.offerBalance.textContent=`BALANCE ${amountText(balanceRaw)} ${offer}`;dom.max.disabled=balanceRaw<=0n;
    }catch{dom.offerBalance.textContent="BALANCE UNAVAILABLE"}finally{renderAction()}
  }

  function beliefPrice(raw,returned){
    const scale=10n**18n,value=raw*scale/returned,whole=value/scale,fraction=String(value%scale).padStart(18,"0").replace(/0+$/,"");
    return fraction?`${whole}.${fraction}`:String(whole);
  }

  function buildTransaction(liveQuote,address){
    const maxSpread=(slippage/100).toFixed(4).replace(/0+$/,"").replace(/\.$/,"");
    const belief=beliefPrice(liveQuote.raw,liveQuote.returned);
    if(liveQuote.offer==="JUNO")return{
      contract:PAIR,
      message:{swap:{offer_asset:{info:{native:"ujuno"},amount:String(liveQuote.raw)},ask_asset_info:{token:NETA},belief_price:belief,max_spread:maxSpread,to:address,referral_address:null,referral_commission:null}},
      funds:[{denom:"ujuno",amount:String(liveQuote.raw)}],
    };
    const hook={swap:{ask_asset_info:{native:"ujuno"},belief_price:belief,max_spread:maxSpread,to:address,referral_address:null,referral_commission:null}};
    return{contract:NETA,message:{send:{contract:PAIR,amount:String(liveQuote.raw),msg:btoa(JSON.stringify(hook))}},funds:[]};
  }

  async function assetBalance(symbol,address){
    if(symbol==="JUNO"){
      const {data}=await client.get(`/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=ujuno`);return BigInt(data.balance?.amount||"0");
    }
    const result=await client.smart(NETA,{balance:{address}});return BigInt(result.balance||"0");
  }

  async function freshQuoteForSigning(){
    const address=window.NETA_WALLET_STATE?.address;
    if(!address||!SIGNING?.enabled||!signingConfigValid)throw new Error("PILOT SIGNING IS NOT AVAILABLE");
    if(SIGNING.pilotOnly&&address!==SIGNING.pilotWallet)throw new Error("CONNECTED ACCOUNT IS NOT THE PILOT WALLET");
    await Promise.all([loadMarket(),validateContract()]);
    const raw=parseAmount(dom.amount.value),usd=quoteUsd(raw,offer),cap=SIGNING.pilotOnly?SIGNING.pilotMaxUsd:SIGNING.publicMaxUsd;
    if(usd===null||usd>cap+0.000001)throw new Error(`SWAP EXCEEDS THE $${cap} SIGNING LIMIT`);
    const available=await assetBalance(offer,address);if(raw>available)throw new Error(`INSUFFICIENT ${offer} BALANCE`);
    const response=await client.smart(PAIR,{simulation:{offer_asset:{info:assets[offer].info,amount:String(raw)},ask_asset_info:null,referral:false,referral_commission:null}});
    const returned=BigInt(response.return_amount),fee=BigInt(response.commission_amount),spread=BigInt(response.spread_amount);
    if(returned<=0n)throw new Error("FRESH QUOTE IS EMPTY");
    return{raw,returned,fee,spread,min:returned*BigInt(Math.round((100-slippage)*100))/10000n,offer,receive:other(offer),usd};
  }

  function transactionPreview(liveQuote,tx,address,gasWanted=null){
    return{network:SIGNING.chainId,sender:address,direction:`${liveQuote.offer} -> ${liveQuote.receive}`,estimated_usd:liveQuote.usd.toFixed(4),max_slippage:`${slippage.toFixed(2)}%`,minimum_received:`${amountText(liveQuote.min)} ${liveQuote.receive}`,memo:SIGNING.memo,contract:tx.contract,message:tx.message,funds:tx.funds,gas_wanted:gasWanted,signing_enabled:true,pilot_only:SIGNING.pilotOnly};
  }

  function openPreview(){
    if(!signingAuthority().ok)return;
    const address=window.NETA_WALLET_STATE.address,tx=buildTransaction(quote,address);
    dom.preview.textContent=JSON.stringify(transactionPreview(quote,tx,address),null,2);
    dom.modalState.textContent="READY FOR FINAL LIVE REVALIDATION";delete dom.modalState.dataset.state;
    dom.modalMessage.textContent="The quote, wallet balance, pair identity and $1 pilot limit will be checked again before Keplr opens.";
    dom.result.hidden=true;dom.confirm.hidden=false;dom.confirm.disabled=false;dom.modal.hidden=false;dom.confirm.focus();
  }

  function errorText(error){
    const raw=error instanceof Error?error.message:String(error||"UNKNOWN ERROR");
    return raw.replace(/\s+/g," ").trim().toUpperCase()||"UNKNOWN ERROR";
  }

  function receivedFromEvents(events,symbol,address){
    for(const event of events||[]){
      const attrs=Object.fromEntries((event.attributes||[]).map(item=>[item.key,item.value]));
      if(symbol==="NETA"&&event.type==="wasm"&&attrs._contract_address===NETA&&attrs.action==="transfer"&&attrs.to===address&&/^\d+$/.test(attrs.amount||""))return BigInt(attrs.amount);
      if(symbol==="JUNO"&&event.type==="transfer"&&(event.attributes||[]).some(item=>item.key==="recipient"&&item.value===address)){
        for(const item of event.attributes||[]){
          if(item.key!=="amount")continue;
          const match=String(item.value).match(/(?:^|,)(\d+)ujuno(?:,|$)/);if(match)return BigInt(match[1]);
        }
      }
    }
    return 0n;
  }

  async function signSwap(){
    if(signing)return;signing=true;renderAction();dom.confirm.disabled=true;dom.close.disabled=true;
    dom.modalState.dataset.state="loading";dom.modalState.textContent="REVALIDATING LIVE STATE…";dom.result.hidden=true;
    let signingClient,broadcastHash="";
    try{
      const address=window.NETA_WALLET_STATE?.address,liveQuote=await freshQuoteForSigning(),tx=buildTransaction(liveQuote,address);
      dom.modalState.textContent="CONNECTING TO SIGNING RPC…";
      const connection=await window.NetaSwapSigning.connect(SIGNING.rpcEndpoints,window.NETA_WALLET_STATE.signer,SIGNING.gasPrice);
      signingClient=connection.client;
      const gas=await window.NetaSwapSigning.simulate(signingClient,address,tx.contract,tx.message,tx.funds,SIGNING.memo);
      if(!Number.isSafeInteger(gas)||gas<=0||gas>SIGNING.gasCap)throw new Error(`SIMULATED GAS ${gas} EXCEEDS SAFETY CAP ${SIGNING.gasCap}`);
      dom.preview.textContent=JSON.stringify(transactionPreview(liveQuote,tx,address,gas),null,2);
      dom.modalState.textContent="CHECK KEPLR — REVIEW EVERY FIELD BEFORE APPROVING";
      const result=await window.NetaSwapSigning.execute(signingClient,address,tx.contract,tx.message,tx.funds,SIGNING.gasAdjustment,SIGNING.memo);
      broadcastHash=String(result?.transactionHash||"").toUpperCase();if(!/^[0-9A-F]{64}$/.test(broadcastHash))throw new Error("BROADCAST RETURNED NO VALID TRANSACTION HASH");
      dom.resultLabel.textContent="TRANSACTION INCLUDED";dom.resultHash.textContent=broadcastHash;dom.explorer.href=`https://atomscan.com/juno/transactions/${broadcastHash}`;dom.result.hidden=false;dom.confirm.hidden=true;
      dom.modalState.textContent="TRANSACTION INCLUDED — VERIFYING RECEIVED ASSET EVENT…";
      const received=receivedFromEvents(result.events,liveQuote.receive,address);
      if(received<liveQuote.min)throw new Error(`TRANSACTION WAS INCLUDED BUT THE RECEIVED ${liveQuote.receive} EVENT COULD NOT BE VERIFIED`);
      dom.modalState.dataset.state="ok";dom.modalState.textContent=`TRANSACTION CONFIRMED · RECEIVED ${amountText(received)} ${liveQuote.receive}`;
      dom.resultLabel.textContent="TRANSACTION CONFIRMED";
      dom.modalMessage.textContent="The transaction was included on Juno and its receiving-asset event satisfies the displayed minimum.";
      await updateBalance();scheduleQuote();
    }catch(error){
      dom.modalState.dataset.state="error";dom.modalState.textContent=broadcastHash?"TRANSACTION INCLUDED · VERIFICATION INCOMPLETE":"TRANSACTION NOT CONFIRMED";dom.modalMessage.textContent=errorText(error);
      if(broadcastHash){dom.resultLabel.textContent="TRANSACTION INCLUDED";dom.resultHash.textContent=broadcastHash;dom.explorer.href=`https://atomscan.com/juno/transactions/${broadcastHash}`;dom.result.hidden=false;dom.confirm.hidden=true}
    }
    finally{try{signingClient?.disconnect()}catch{}signing=false;dom.close.disabled=false;if(!dom.confirm.hidden)dom.confirm.disabled=false;renderAction()}
  }

  function selectSlippage(value){
    if(!Number.isFinite(value)||value<0.1||value>10){setMessage("SLIPPAGE MUST BE BETWEEN 0.1% AND 10%","error");return false}
    slippage=value;dom.slippageSummary.textContent=`${slippage.toFixed(2)}%`;
    dom.slippageButtons.forEach(button=>button.classList.toggle("selected",Number(button.dataset.slippage)===value));
    if(quote)scheduleQuote();return true;
  }

  function toggleSlippageSettings(forceOpen){
    const open=forceOpen===undefined?dom.settings.hidden:Boolean(forceOpen);
    dom.settings.hidden=!open;dom.settingsToggle.setAttribute("aria-expanded",String(open));
    if(open&&forceOpen)dom.custom.focus();
  }

  dom.amount.addEventListener("input",scheduleQuote);
  dom.reverse.addEventListener("click",()=>{
    const previous=quote?.returned;offer=other(offer);renderDirection();
    dom.amount.value=previous?amountText(previous):dom.amount.value;clearQuote();scheduleQuote();
  });
  dom.max.addEventListener("click",()=>{
    if(balanceRaw===null)return;const price=tokenUsd(offer);if(!price)return;
    const limitRaw=BigInt(Math.floor(LIMIT_USD/price*1e6));const chosen=balanceRaw<limitRaw?balanceRaw:limitRaw;
    dom.amount.value=amountText(chosen);scheduleQuote();
  });
  dom.settingsToggle.addEventListener("click",()=>toggleSlippageSettings());
  dom.slippageSummaryButton?.addEventListener("click",()=>toggleSlippageSettings(true));
  dom.slippageButtons.forEach(button=>button.addEventListener("click",()=>{dom.custom.value="";selectSlippage(Number(button.dataset.slippage))}));
  dom.custom.addEventListener("input",()=>{
    const value=Number(dom.custom.value.replace(",","."));
    if(dom.custom.value&&Number.isFinite(value)&&value>=0.1&&value<=10)selectSlippage(value);
  });
  dom.custom.addEventListener("change",()=>selectSlippage(Number(dom.custom.value.replace(",","."))));
  addEventListener("neta:wallet-connected",updateBalance);addEventListener("neta:wallet-disconnected",()=>{updateBalance();if(!signing)dom.modal.hidden=true});
  dom.action?.addEventListener("click",openPreview);dom.confirm?.addEventListener("click",signSwap);
  dom.close?.addEventListener("click",()=>{if(!signing)dom.modal.hidden=true});
  ageTimer=setInterval(renderAge,1000);addEventListener("pagehide",()=>{clearInterval(ageTimer);clearTimeout(refreshTimer)});

  renderDirection();
  Promise.all([loadMarket(),validateContract()]).then(()=>{
    setMessage("LIVE CONTRACT VERIFIED — ENTER AN AMOUNT","ok");if(dom.amount.value)scheduleQuote();
  }).catch(error=>{
    contractValid=false;dom.contractState.textContent="VALIDATION FAILED";dom.contractState.dataset.ok="false";
    clearQuote(`SAFETY CHECK FAILED: ${(error.message||String(error)).toUpperCase()}`,"error");
  });
})();
