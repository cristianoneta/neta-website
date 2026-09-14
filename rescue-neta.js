(()=>{
  "use strict";
  const PAIR="juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra";
  const NETA="juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr";
  const PAIR_CODE_ID="2289";
  const LCD_ENDPOINTS=["https://juno-api.polkachu.com","https://juno-api.lavenderfive.com"];
  const LIMIT_USD=25;
  const DECIMALS=6;
  const QUOTE_REFRESH_MS=12000;
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
    minimum:document.querySelector("#minimum-received"),slippageSummary:document.querySelector("#slippage-summary"),
    contractState:document.querySelector("#contract-state"),source:document.querySelector("#quote-source"),
    settings:document.querySelector("#slippage-settings"),settingsToggle:document.querySelector("#settings-toggle"),
    custom:document.querySelector("#custom-slippage"),slippageButtons:[...document.querySelectorAll("[data-slippage]")],
  };
  if(!dom.amount||!window.NetaCosmosClient)return;
  const client=new window.NetaCosmosClient(LCD_ENDPOINTS);
  let offer="JUNO",slippage=5,junoUsd=null,pool=null,contractValid=false;
  let quote=null,requestId=0,debounceTimer=null,refreshTimer=null,ageTimer=null,balanceRaw=null;

  const other=symbol=>symbol==="JUNO"?"NETA":"JUNO";
  const asNumber=raw=>Number(raw)/10**DECIMALS;
  const money=value=>Number.isFinite(value)?`EST. $${value.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`:"EST. —";
  const amountText=(raw,max=6)=>asNumber(raw).toLocaleString("en-US",{useGrouping:false,maximumFractionDigits:max});
  const queryInfo=asset=>{const info=asset.info||asset;return info.native?`native:${info.native}`:`token:${info.token}`};
  const expectedAssets=new Set(["native:ujuno",`token:${NETA}`]);

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
  }

  function renderDirection(){
    const receive=other(offer);
    dom.offerSymbol.textContent=offer;dom.receiveSymbol.textContent=receive;
    dom.offerMark.textContent=assets[offer].mark;dom.receiveMark.textContent=assets[receive].mark;
    dom.offerUsd.textContent="EST. $0.00";dom.receiveUsd.textContent="EST. $0.00";
    updateBalance();
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
      setMessage("LIVE QUOTE RECEIVED — READ-ONLY PHASE, NOTHING WILL BE SIGNED","ok");
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
    }catch{dom.offerBalance.textContent="BALANCE UNAVAILABLE"}
  }

  function selectSlippage(value){
    if(!Number.isFinite(value)||value<0.1||value>10){setMessage("SLIPPAGE MUST BE BETWEEN 0.1% AND 10%","error");return false}
    slippage=value;dom.slippageSummary.textContent=`${slippage.toFixed(2)}%`;
    dom.slippageButtons.forEach(button=>button.classList.toggle("selected",Number(button.dataset.slippage)===value));
    if(quote)scheduleQuote();return true;
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
  dom.settingsToggle.addEventListener("click",()=>{
    const open=dom.settings.hidden;dom.settings.hidden=!open;dom.settingsToggle.setAttribute("aria-expanded",String(open));
  });
  dom.slippageButtons.forEach(button=>button.addEventListener("click",()=>{dom.custom.value="";selectSlippage(Number(button.dataset.slippage))}));
  dom.custom.addEventListener("change",()=>selectSlippage(Number(dom.custom.value.replace(",","."))));
  addEventListener("neta:wallet-connected",updateBalance);addEventListener("neta:wallet-disconnected",updateBalance);
  ageTimer=setInterval(renderAge,1000);addEventListener("pagehide",()=>{clearInterval(ageTimer);clearTimeout(refreshTimer)});

  renderDirection();
  Promise.all([loadMarket(),validateContract()]).then(()=>{
    setMessage("LIVE CONTRACT VERIFIED — ENTER AN AMOUNT","ok");if(dom.amount.value)scheduleQuote();
  }).catch(error=>{
    contractValid=false;dom.contractState.textContent="VALIDATION FAILED";dom.contractState.dataset.ok="false";
    clearQuote(`SAFETY CHECK FAILED: ${(error.message||String(error)).toUpperCase()}`,"error");
  });
})();
