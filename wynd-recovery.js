const LCD_ENDPOINTS=["https://juno-api.polkachu.com","https://juno-api.lavenderfive.com"];
const CHAIN_ID="juno-1";
const TX_MEMO="netareborn.com/wynd-recovery:v1";
const ATOMSCAN_TX_BASE="https://atomscan.com/juno/transactions/";
const SIGNING_CONFIG=window.NETA_RECOVERY_SIGNING;
const ADDRESS_PATTERN=/^juno1[0-9a-z]{38}$/;
const $=selector=>document.querySelector(selector);
const chainClient=new window.NetaCosmosClient(LCD_ENDPOINTS);

let registry=null;
let stats=null;
let market=null;
let leaderboard=null;
let wallet=null;
let viewedAddress=null;
let chainHeight=0;
const contractChecks=new Map();
const positions=new Map();
let queryGeneration=0;
let pendingAction=null;
let signingClientPromise=null;
const POOL_QUERY_CONCURRENCY=3;

const money=value=>new Intl.NumberFormat("en-US",{
  style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2,
}).format(Number(value||0));
const amount=(raw,decimals=6)=>Number(raw||0)/10**decimals;
const encode=value=>btoa(unescape(encodeURIComponent(JSON.stringify(value))));
const shortAddress=address=>`${address.slice(0,12)}…${address.slice(-8)}`;

function node(tag,className,text){
  const element=document.createElement(tag);
  if(className)element.className=className;
  if(text!==undefined)element.textContent=text;
  return element;
}

function labelValue(className,label,value,strongTag="strong"){
  const box=node("div",className);
  box.append(node("span","",label),node(strongTag,"",value));
  return box;
}

function disabledAction(label){
  const button=node("button","",label);button.disabled=true;return button;
}

function setTransactionFeedback(state,title,detail,txhash=""){
  const feedback=$("#transaction-feedback");
  feedback.dataset.state=state;
  $("#transaction-feedback-title").textContent=title;
  $("#transaction-status").textContent=detail;
  const hash=$("#transaction-hash"),explorer=$("#transaction-explorer");
  const normalizedHash=String(txhash||"").toUpperCase();
  const validHash=/^[0-9A-F]{64}$/.test(normalizedHash);
  hash.hidden=!validHash;hash.textContent=validHash?normalizedHash:"";
  explorer.hidden=!validHash;explorer.href=validHash?ATOMSCAN_TX_BASE+normalizedHash:"#";
  const ready=state==="ready";
  $("#preview-message").hidden=!ready;
  $("#preview-note").hidden=!ready;
  if(!ready){$("#execute-action").hidden=true;$("#execute-action").disabled=true;}
  const dialog=$("#preview-dialog");
  if(dialog.open)dialog.scrollTop=0;
}

function renderRetry(errorBox,error,retry){
  const button=node("button","","RETRY THIS POOL");button.type="button";button.onclick=retry;
  errorBox.replaceChildren(node("span","",error.message),button);
}

async function smart(contract,message){
  return chainClient.smart(contract,message);
}

async function contractInfo(address){
  return chainClient.contractInfo(address);
}

function poolStats(pair){
  return stats?.pools?.[pair]||{unstaked_usd:0,claimed_usd:0,unbond_transactions:0,claim_transactions:0};
}

function marketPool(pool){
  return market?.pools?.[pool.pair.address]||{
    pool_value_usd:pool.snapshot.recoverable_pool_value_usd,
    total_share_raw:pool.snapshot.lp_total_supply_raw,
    assets:[],
  };
}

function renderImpact(){
  const rows=registry.pools.map(pool=>poolStats(pool.pair.address));
  const unstaked=rows.reduce((sum,row)=>sum+Number(row.unstaked_usd||0),0);
  const claimed=rows.reduce((sum,row)=>sum+Number(row.claimed_usd||0),0);
  $("#total-unstaked").textContent=money(unstaked);
  $("#total-claimed").textContent=money(claimed);
  $("#total-unbond-txs").textContent=`${rows.reduce((sum,row)=>sum+Number(row.unbond_transactions||0),0)} confirmed transactions`;
  $("#total-claim-txs").textContent=`${rows.reduce((sum,row)=>sum+Number(row.claim_transactions||0),0)} confirmed transactions`;
  $("#stats-updated").textContent=stats?.collection_started_at
    ?`COLLECTING SINCE ${new Date(stats.collection_started_at).toLocaleString()}`
    :"FORWARD COLLECTION STARTS AT LAUNCH";
}

function renderPools(){
  const root=$("#pool-grid");
  root.replaceChildren();
  let totalPoolUsd=0;
  for(const pool of registry.pools){
    const community=poolStats(pool.pair.address);
    const live=marketPool(pool);
    totalPoolUsd+=Number(live.pool_value_usd||0);
    const reserves=live.assets.length
      ?live.assets.map(asset=>`${Number(asset.display).toLocaleString(undefined,{maximumFractionDigits:6})} ${asset.symbol}`).join(" + ")
      :"DAILY RESERVE SNAPSHOT PENDING";
    const card=node("details","pool-card"),summary=node("summary","pool-head"),identity=node("div","pool-identity"),detail=node("div","pool-detail"),position=node("div","position");
    card.className="pool-card";
    card.dataset.pair=pool.pair.address;
    identity.append(node("h3","",pool.name.replaceAll("ujuno","JUNO")),node("span","","LEGACY WYND POOL"));
    const status=node("span","validated","REGISTRY OK");status.dataset.field="contract-status";
    summary.append(node("span","pool-rank",String(pool.rank).padStart(2,"0")),identity,labelValue("pool-reserves","POOL RESERVES",reserves),labelValue("pool-value","DAILY VALUE",money(live.pool_value_usd)),status);
    const communityBox=node("div","pool-community");communityBox.append(labelValue("","UNSTAKED VIA SITE",money(community.unstaked_usd)),labelValue("","CLAIMED VIA SITE",money(community.claimed_usd)));
    const total=labelValue("position-total","THIS WALLET IN THIS POOL","—");total.querySelector("strong").dataset.field="position-usd";
    const underlying=labelValue("underlying","ESTIMATED UNDERLYING ASSETS","—");underlying.dataset.field="underlying";
    const breakdown=node("div","position-breakdown");
    for(const [field,label] of [["direct","DIRECT LP"],["active","ACTIVE STAKE"],["available","AVAILABLE TO UNBOND"],["locked","LOCKED COMPONENT"],["claimable","CLAIMABLE LP"],["unbonding","UNBONDING LP"]]){
      const line=labelValue("position-line",label,"—");line.querySelector("strong").dataset.field=field;breakdown.append(line);
    }
    const periods=node("div","periods");periods.dataset.field="periods";
    const queryError=node("div","query-error");queryError.dataset.field="query-error";
    const actions=node("div","actions");actions.dataset.field="actions";actions.append(disabledAction("ENTER ADDRESS OR CONNECT KEPLR"));
    position.append(total,underlying,breakdown,periods,queryError,actions);detail.append(communityBox,position);card.append(summary,detail);
    root.append(card);
  }
  $("#pool-total-usd").textContent=money(totalPoolUsd);
}

function renderLeaderboard(){
  const root=$("#leaderboard-list");
  const rows=leaderboard?.top_wallets||[];
  root.replaceChildren();
  if(!rows.length)root.textContent="LEADERBOARD SNAPSHOT UNAVAILABLE";
  for(const row of rows){
    const article=node("article","leader-row"),address=node("button","leader-address",shortAddress(row.address)),pools=node("div","leader-pools");
    address.type="button";address.dataset.address=row.address;
    for(const pool of row.pools){const item=node("span");item.append(node("b","",pool.name),document.createTextNode(` ${money(pool.usd_value)}`));pools.append(item)}
    article.append(node("span","leader-rank",String(row.rank).padStart(2,"0")),address,node("strong","leader-total",money(row.total_usd)),pools);root.append(article);
  }
  root.querySelectorAll("[data-address]").forEach(button=>button.onclick=()=>{
    $("#wallet-address").value=button.dataset.address;
    refreshPositions(button.dataset.address).catch(error=>$("#wallet-status").textContent=error.message.toUpperCase());
    $("#address-form").scrollIntoView({behavior:"smooth",block:"center"});
  });
  setSnapshotTimestamp($("#leaderboard-updated"),leaderboard?.updated_at,"DAILY SNAPSHOT");
}

function setSnapshotTimestamp(element,value,label){
  if(!value){element.textContent=`${label} UNAVAILABLE`;element.classList.add("stale");return;}
  const updated=new Date(value);
  const stale=Number.isNaN(updated.getTime())||Date.now()-updated.getTime()>36*60*60*1000;
  element.textContent=`${stale?"STALE · ":""}${label} UPDATED ${updated.toLocaleString()}`;
  element.classList.toggle("stale",stale);
}

function classifyClaims(claims){
  const now=BigInt(Date.now())*1000000n;
  let claimable=0n;
  const tranches=[];
  for(const claim of claims||[]){
    const value=BigInt(claim.amount||0);
    const release=claim.release_at||{};
    const mature=release.at_time!==undefined
      ?BigInt(release.at_time)<=now
      :release.at_height!==undefined&&BigInt(release.at_height)<=BigInt(chainHeight);
    if(mature)claimable+=value;
    else tranches.push({
      amount:value,
      releaseAt:release.at_time!==undefined?BigInt(release.at_time):null,
      releaseHeight:release.at_height!==undefined?BigInt(release.at_height):null,
    });
  }
  tranches.sort((a,b)=>{
    if(a.releaseAt!==null&&b.releaseAt!==null)return a.releaseAt<b.releaseAt?-1:a.releaseAt>b.releaseAt?1:0;
    if(a.releaseHeight!==null&&b.releaseHeight!==null)return a.releaseHeight<b.releaseHeight?-1:a.releaseHeight>b.releaseHeight?1:0;
    return a.releaseAt!==null?-1:1;
  });
  return{claimable,unbonding:tranches.reduce((sum,row)=>sum+row.amount,0n),tranches};
}

function unbondingDisplay(position,decimals){
  if(!position.unbondingTranches.length)return "0";
  return position.unbondingTranches.map(row=>{
    const value=amount(row.amount,decimals).toLocaleString(undefined,{maximumFractionDigits:6});
    if(row.releaseAt!==null){
      const ready=new Date(Number(row.releaseAt/1000000n));
      return `${value} · READY ${ready.toLocaleString()}`;
    }
    if(row.releaseHeight!==null)return `${value} · READY AT BLOCK ${row.releaseHeight}`;
    return value;
  }).join(" // ");
}

async function verifyContracts(pool,force=false){
  if(!force&&contractChecks.has(pool.pair.address))return contractChecks.get(pool.pair.address);
  const targets=[pool.pair,pool.lp_token,pool.stake];
  const live=await Promise.all(targets.map(target=>contractInfo(target.address)));
  const valid=targets.every((target,index)=>Number(target.code_id)===Number(live[index].code_id));
  const result={valid,live};
  contractChecks.set(pool.pair.address,result);
  return result;
}

function assetKey(info={}){
  if(info.native)return `native:${info.native}`;
  if(info.token)return `token:${info.token}`;
  throw new Error("UNKNOWN POOL ASSET TYPE");
}

async function expectedAssets(pool,raw){
  const response=await smart(pool.pair.address,{share:{amount:raw.toString()}});
  const assets=Array.isArray(response)?response:(response.assets||[]);
  if(assets.length!==pool.assets.length)throw new Error("POOL SHARE ASSET COUNT CHANGED");
  return assets.map(asset=>{
    const definition=pool.assets.find(item=>assetKey(item.info)===assetKey(asset.info));
    if(!definition)throw new Error("POOL SHARE RETURNED AN UNALLOWLISTED ASSET");
    return{
      info:definition.info,
      symbol:(definition.symbol||definition.key||"ASSET").replace(/^u(?=[a-z])/i,"").toUpperCase(),
      raw:asset.amount,
      display:amount(asset.amount,definition.decimals||6).toLocaleString(undefined,{maximumFractionDigits:6}),
    };
  });
}

async function loadPosition(pool,address){
  const [directData,staked,claimData]=await Promise.all([
    smart(pool.lp_token.address,{balance:{address}}),
    smart(pool.stake.address,{all_staked:{address}}),
    smart(pool.stake.address,{claims:{address}}),
  ]);
  const byPeriod=(staked.stakes||[]).map(row=>{
    const active=BigInt(row.stake||0);
    const locked=BigInt(row.total_locked||0);
    if(locked>active)throw new Error("LOCKED STAKE EXCEEDS ACTIVE");
    return{period:Number(row.unbonding_period),active,locked,available:active-locked};
  });
  const claims=classifyClaims(claimData.claims);
  const direct=BigInt(directData.balance||0);
  const active=byPeriod.reduce((sum,row)=>sum+row.active,0n);
  const totalEconomic=direct+active+claims.claimable+claims.unbonding;
  const live=marketPool(pool);
  const totalSupply=BigInt(live.total_share_raw);
  const positionUsd=totalSupply>0n
    ?Number(totalEconomic)*Number(live.pool_value_usd)/Number(totalSupply)
    :0;
  const underlying=totalEconomic>0n?await expectedAssets(pool,totalEconomic):[];
  const result={
    direct,active,totalEconomic,positionUsd,underlying,
    available:byPeriod.reduce((sum,row)=>sum+row.available,0n),
    locked:byPeriod.reduce((sum,row)=>sum+row.locked,0n),
    claimable:claims.claimable,unbonding:claims.unbonding,
    unbondingTranches:claims.tranches,byPeriod,
  };
  return result;
}

function signingEnabled(){
  return SIGNING_CONFIG?.enabled===true
    &&SIGNING_CONFIG.chainId===CHAIN_ID
    &&SIGNING_CONFIG.memo===TX_MEMO
    &&Array.isArray(SIGNING_CONFIG.rpcEndpoints)
    &&SIGNING_CONFIG.rpcEndpoints.length>0;
}

function recoveryAuthorized(pool,action,request){
  const policy=SIGNING_CONFIG?.recovery;
  if(!signingEnabled()||policy?.enabled!==true||!wallet||wallet.address!==viewedAddress)return false;
  if(!["unbond","claim","withdraw"].includes(action)||policy.actions?.[action]!==true)return false;
  const contracts=policy.contracts?.[pool.pair.address];
  if(contracts?.lpToken!==pool.lp_token.address||contracts?.stake!==pool.stake.address)return false;
  return typeof request?.raw==="bigint"&&request.raw>0n;
}

function loadSigningClient(){
  if(window.NetaRecoverySigning)return Promise.resolve(window.NetaRecoverySigning);
  if(signingClientPromise)return signingClientPromise;
  signingClientPromise=new Promise((resolve,reject)=>{
    const script=document.createElement("script");
    script.src="assets/recovery-signing-client.js?v=1";
    script.onload=()=>window.NetaRecoverySigning
      ?resolve(window.NetaRecoverySigning)
      :reject(new Error("SIGNING CLIENT DID NOT INITIALIZE"));
    script.onerror=()=>reject(new Error("SIGNING CLIENT UNAVAILABLE"));
    document.head.append(script);
  });
  return signingClientPromise;
}

async function prepareAction(pool,action,request){
  if(!wallet||wallet.address!==viewedAddress)throw new Error("CONNECTED WALLET NO LONGER MATCHES VIEWED ADDRESS");
  const contracts=await verifyContracts(pool,true);
  if(!contracts.valid)throw new Error("LIVE CONTRACT CODE-ID MISMATCH");
  const position=await loadPosition(pool,wallet.address);
  let contract;
  let message;
  let expected=null;
  if(action==="unbond"){
    const row=position.byPeriod.find(item=>item.period===request.period);
    if(!row||row.available<request.raw)throw new Error("AVAILABLE STAKE CHANGED");
    if(!pool.unbonding_periods_seconds.includes(request.period))throw new Error("UNALLOWLISTED UNBONDING PERIOD");
    contract=pool.stake.address;
    message={unbond:{tokens:request.raw.toString(),unbonding_period:request.period}};
  }else if(action==="claim"){
    if(position.claimable!==request.raw)throw new Error("CLAIMABLE POSITION CHANGED; REVIEW A NEW PREVIEW");
    contract=pool.stake.address;
    message={claim:{}};
  }else if(action==="withdraw"){
    if(position.direct<request.raw)throw new Error("DIRECT LP BALANCE CHANGED");
    contract=pool.lp_token.address;
    const hook={withdraw_liquidity:{assets:[]}};
    message={send:{contract:pool.pair.address,amount:request.raw.toString(),msg:encode(hook)}};
    expected=await expectedAssets(pool,request.raw);
  }else{
    throw new Error("UNALLOWLISTED RECOVERY ACTION");
  }
  return{contract,message,expected,before:position};
}

function postconditionSatisfied(action,request,before,after){
  if(action==="unbond")return after.active===before.active-request.raw&&after.unbonding+after.claimable>=before.unbonding+before.claimable+request.raw;
  if(action==="claim")return after.claimable===0n&&after.direct>=before.direct+request.raw;
  if(action==="withdraw")return after.direct===before.direct-request.raw;
  return false;
}

async function verifyPostcondition(pool,action,request,before){
  let last=null;
  for(let attempt=0;attempt<4;attempt++){
    if(attempt)await new Promise(resolve=>setTimeout(resolve,1200*attempt));
    last=await loadPosition(pool,wallet.address);
    if(postconditionSatisfied(action,request,before,last))return last;
  }
  throw new Error("TRANSACTION CONFIRMED, BUT THE EXPECTED POSITION CHANGE COULD NOT BE VERIFIED");
}

async function showPreview(pool,action,request){
  if(!wallet||wallet.address!==viewedAddress){
    $("#wallet-status").textContent="CONNECT THIS EXACT ADDRESS IN KEPLR TO PREVIEW ACTIONS";
    return;
  }
  document.body.classList.add("modal-open");
  dispatchEvent(new Event("neta:blackout-pause"));
  $("#wallet-status").textContent="RE-VALIDATING POSITION…";
  try{
    const prepared=await prepareAction(pool,action,request);
    pendingAction={pool,action,request,prepared};
    const enabled=recoveryAuthorized(pool,action,request);
    $("#preview-title").textContent=`${action.toUpperCase()} // ${pool.name.replaceAll("ujuno","JUNO")}`;
    $("#preview-message").textContent=JSON.stringify({
      network:CHAIN_ID,sender:wallet.address,memo:TX_MEMO,contract:prepared.contract,message:prepared.message,
      expected_assets:prepared.expected,
      output_protection:action==="withdraw"?"ESTIMATE ONLY: THIS LEGACY WYND CONTRACT DOES NOT ENFORCE MINIMUM WITHDRAWAL OUTPUTS":null,
      signing_enabled:enabled,
    },null,2);
    $("#execute-action").hidden=!enabled;
    $("#execute-action").disabled=!enabled;
    $("#preview-dialog").showModal();
    setTransactionFeedback("ready",enabled?"READY TO SIGN":"SIGNING UNAVAILABLE",enabled?"FINAL LIVE REVALIDATION WILL RUN BEFORE KEPLR OPENS":"SIGNING FEATURE FLAG: OFF");
  }catch(error){
    document.body.classList.remove("modal-open");
    dispatchEvent(new Event("neta:blackout-resume"));
    $("#wallet-status").textContent=error.message.toUpperCase();
  }
}

async function executePendingAction(){
  if(!pendingAction||!recoveryAuthorized(pendingAction.pool,pendingAction.action,pendingAction.request))throw new Error("RECOVERY ACTION IS NOT AUTHORIZED");
  const button=$("#execute-action");
  button.disabled=true;
  setTransactionFeedback("pending","REVALIDATING LIVE STATE","CHECKING CONTRACTS AND CURRENT POSITION…");
  let confirmedHash="";
  try{
    const signingClient=await loadSigningClient();
    await window.keplr.enable(CHAIN_ID);
    const signer=window.keplr.getOfflineSigner(CHAIN_ID);
    const accounts=await signer.getAccounts();
    if(accounts[0]?.address!==wallet.address||wallet.address!==viewedAddress)throw new Error("KEPLR ACCOUNT CHANGED");
    const fresh=await prepareAction(pendingAction.pool,pendingAction.action,pendingAction.request);
    if(JSON.stringify(fresh.message)!==JSON.stringify(pendingAction.prepared.message)||fresh.contract!==pendingAction.prepared.contract){
      throw new Error("RECOVERY ACTION CHANGED DURING APPROVAL");
    }
    setTransactionFeedback("pending","CONNECTING SIGNING RPC","PREPARING FINAL SIMULATION…");
    const connection=await signingClient.connect(SIGNING_CONFIG.rpcEndpoints,signer,SIGNING_CONFIG.gasPrice);
    const gas=await signingClient.simulate(connection.client,wallet.address,fresh.contract,fresh.message,TX_MEMO);
    const cap=SIGNING_CONFIG.gasCaps[pendingAction.action];
    if(!Number.isSafeInteger(gas)||gas<=0||gas>cap)throw new Error(`SIMULATED GAS ${gas} EXCEEDS SAFETY CAP ${cap}`);
    setTransactionFeedback("pending","SIGNATURE + NETWORK CONFIRMATION",`SIMULATED ${gas.toLocaleString()} GAS // WAITING FOR KEPLR AND JUNO…`);
    const result=await signingClient.execute(connection.client,wallet.address,fresh.contract,fresh.message,SIGNING_CONFIG.gasAdjustment,TX_MEMO);
    if(result.code!==undefined&&Number(result.code)!==0)throw new Error(`TRANSACTION FAILED WITH CODE ${result.code}`);
    confirmedHash=String(result.transactionHash||"").toUpperCase();
    const completed=pendingAction;
    await verifyPostcondition(completed.pool,completed.action,completed.request,fresh.before);
    pendingAction=null;
    setTransactionFeedback("success","TRANSACTION + RESULT VERIFIED","THE RECOVERY ACTION AND EXPECTED POSITION CHANGE WERE VERIFIED ON JUNO.",confirmedHash);
    await refreshPositions(wallet.address);
  }catch(error){
    if(confirmedHash){
      setTransactionFeedback("error","TRANSACTION CONFIRMED // RESULT CHECK INCOMPLETE",error.message.toUpperCase(),confirmedHash);
    }else{
      setTransactionFeedback("error","TRANSACTION NOT CONFIRMED",error.message.toUpperCase());
    }
    throw error;
  }finally{
    button.disabled=!pendingAction||!recoveryAuthorized(pendingAction.pool,pendingAction.action,pendingAction.request);
  }
}

function renderPosition(pool,position,valid){
  const card=document.querySelector(`[data-pair="${pool.pair.address}"]`);
  if(position.totalEconomic>0n)card.open=true;
  const decimals=pool.lp_token.decimals||6;
  card.querySelector('[data-field="query-error"]').replaceChildren();
  for(const key of ["direct","active","available","locked","claimable","unbonding"]){
    card.querySelector(`[data-field="${key}"]`).textContent=key==="unbonding"
      ?unbondingDisplay(position,decimals)
      :amount(position[key],decimals).toLocaleString(undefined,{maximumFractionDigits:6});
  }
  card.querySelector('[data-field="position-usd"]').textContent=money(position.positionUsd);
  card.querySelector('[data-field="underlying"] strong').textContent=position.underlying.length?position.underlying.map(asset=>`${asset.display} ${asset.symbol}`).join(" + "):"NO LP POSITION";
  const periods=card.querySelector('[data-field="periods"]');periods.replaceChildren();
  for(const row of position.byPeriod){const period=node("div","period-row");period.append(node("span","",`${row.period/86400}D STAKE`),node("strong","",amount(row.active,decimals).toLocaleString()),node("small","",`${amount(row.available,decimals).toLocaleString()} available`));periods.append(period)}
  const actions=card.querySelector('[data-field="actions"]');
  actions.replaceChildren();
  const ownsAddress=Boolean(wallet&&wallet.address===viewedAddress);
  const add=(label,action,request)=>{
    const button=document.createElement("button");
    button.textContent=label;
    button.disabled=!valid||!ownsAddress;
    button.onclick=()=>showPreview(pool,action,request);
    actions.append(button);
  };
  for(const row of position.byPeriod.filter(item=>item.available>0n))add(`PREVIEW UNBOND ${row.period/86400}D`,"unbond",{raw:row.available,period:row.period});
  if(position.claimable>0n)add("PREVIEW CLAIM","claim",{raw:position.claimable});
  if(position.direct>0n)add("PREVIEW WITHDRAW","withdraw",{raw:position.direct});
  if(!actions.children.length){
    actions.append(disabledAction(position.totalEconomic>0n&&!ownsAddress?"CONNECT THIS WALLET FOR ACTIONS":"NO ACTION AVAILABLE"));
  }
}

async function runWithConcurrency(items,limit,worker){
  let next=0;
  const runners=Array.from({length:Math.min(limit,items.length)},async()=>{
    while(next<items.length){
      const index=next++;
      await worker(items[index],index);
    }
  });
  await Promise.all(runners);
}

function updatePositionSummary(address,generation){
  if(generation!==queryGeneration)return;
  const cards=[...document.querySelectorAll(".pool-card")];
  const complete=cards.filter(card=>["success","failed"].includes(card.dataset.queryState)).length;
  const failed=cards.filter(card=>card.dataset.queryState==="failed").length;
  const totalUsd=[...positions.values()].reduce((sum,position)=>sum+position.positionUsd,0);
  $("#position-total-usd").textContent=money(totalUsd);
  $("#position-address").textContent=failed
    ?`PARTIAL VALUE · ${failed} POOL${failed===1?"":"S"} UNAVAILABLE · ${address}`
    :address;
  if(complete<8){
    $("#wallet-status").textContent=`CHECKED ${complete}/8 // ${shortAddress(address)}`;
  }else{
    $("#wallet-status").textContent=wallet?.address===address
      ?`CONNECTED + CHECKED ${8-failed}/8${failed?" · RETRY AVAILABLE":""} // ${address}`
      :`READ-ONLY CHECK ${8-failed}/8${failed?" · RETRY AVAILABLE":" COMPLETE"} // ${address}`;
  }
}

async function retryPool(pool,address,generation){
  if(generation!==queryGeneration||address!==viewedAddress)return;
  const card=document.querySelector(`[data-pair="${pool.pair.address}"]`);
  const badge=card.querySelector('[data-field="contract-status"]');
  const errorBox=card.querySelector('[data-field="query-error"]');
  card.dataset.queryState="checking";
  badge.textContent="RETRYING…";
  errorBox.replaceChildren();
  updatePositionSummary(address,generation);
  try{
    const [check,position]=await Promise.all([verifyContracts(pool,true),loadPosition(pool,address)]);
    if(generation!==queryGeneration||address!==viewedAddress)return;
    positions.set(pool.pair.address,position);
    card.dataset.queryState="success";
    badge.textContent=check.valid?"LIVE CODE OK":"CODE MISMATCH";
    badge.classList.toggle("invalid",!check.valid);
    renderPosition(pool,position,check.valid);
  }catch(error){
    if(generation!==queryGeneration)return;
    card.dataset.queryState="failed";
    badge.textContent="QUERY FAILED";
    renderRetry(errorBox,error,()=>retryPool(pool,address,generation));
  }
  updatePositionSummary(address,generation);
}

async function refreshPositions(address){
  const generation=++queryGeneration;
  const blockResult=await chainClient.get("/cosmos/base/tendermint/v1beta1/blocks/latest").catch(()=>({data:null}));
  if(blockResult.data)chainHeight=Number(blockResult.data.block.header.height);
  if(generation!==queryGeneration)return;
  viewedAddress=address;
  positions.clear();
  $("#wallet-address").value=address;
  $("#position-summary").hidden=false;
  $("#position-address").textContent=address;
  $("#position-total-usd").textContent="CALCULATING…";
  document.querySelectorAll(".pool-card").forEach(card=>card.dataset.queryState="pending");
  await runWithConcurrency(registry.pools,POOL_QUERY_CONCURRENCY,async pool=>{
    if(generation!==queryGeneration)return;
    const card=document.querySelector(`[data-pair="${pool.pair.address}"]`);
    const badge=card.querySelector('[data-field="contract-status"]');
    card.dataset.queryState="checking";
    badge.textContent="CHECKING…";
    card.querySelector('[data-field="query-error"]').replaceChildren();
    try{
      const [check,position]=await Promise.all([verifyContracts(pool),loadPosition(pool,address)]);
      if(generation!==queryGeneration||address!==viewedAddress)return;
      positions.set(pool.pair.address,position);
      badge.textContent=check.valid?"LIVE CODE OK":"CODE MISMATCH";
      badge.classList.toggle("invalid",!check.valid);
      card.dataset.queryState="success";
      renderPosition(pool,position,check.valid);
    }catch(error){
      if(generation!==queryGeneration)return;
      card.dataset.queryState="failed";
      card.open=true;
      badge.textContent="QUERY FAILED";
      badge.classList.add("invalid");
      card.querySelector('[data-field="actions"]').replaceChildren(disabledAction("ACTIONS UNAVAILABLE"));
      const errorBox=card.querySelector('[data-field="query-error"]');
      renderRetry(errorBox,error,()=>retryPool(pool,address,generation));
    }
    updatePositionSummary(address,generation);
  });
  if(generation!==queryGeneration)return;
  updatePositionSummary(address,generation);
}

function startGhost(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const ghost=$("#wynd-offline-ghost");
  const flash=()=>{
    if(document.hidden||document.body.classList.contains("neta-matrix-active")||document.body.classList.contains("neta-blackout-active")||document.querySelector("dialog[open],[aria-modal='true']"))return;
    ghost.classList.remove("visible");
    void ghost.offsetWidth;
    ghost.classList.add("visible");
    setTimeout(()=>ghost.classList.remove("visible"),3900);
  };
  flash();
  setInterval(flash,9000);
}

async function init(){
  startGhost();
  const [registryResponse,statsResponse,marketResponse,leaderboardResponse,blockResult]=await Promise.all([
    fetch("data/recovery/wynd-pools.json",{cache:"no-store"}),
    fetch("data/recovery/recovery-stats.json",{cache:"no-store"}),
    fetch("data/recovery/wynd-market.json",{cache:"no-store"}),
    fetch("data/recovery/wynd-leaderboard.json",{cache:"no-store"}),
    chainClient.get("/cosmos/base/tendermint/v1beta1/blocks/latest").catch(()=>({data:null})),
  ]);
  if(!registryResponse.ok)throw new Error("TOP-8 REGISTRY UNAVAILABLE");
  registry=await registryResponse.json();
  stats=statsResponse.ok?await statsResponse.json():{pools:{}};
  market=marketResponse.ok?await marketResponse.json():{pools:{}};
  leaderboard=leaderboardResponse.ok?await leaderboardResponse.json():{top_wallets:[]};
  if(registry.status!=="VALIDATED_FOR_READ_ONLY_FRONTEND"||registry.pools.length!==8)throw new Error("REGISTRY VALIDATION FAILED");
  if(blockResult.data)chainHeight=Number(blockResult.data.block.header.height);
  setSnapshotTimestamp($("#market-updated"),market?.updated_at,"POOL RESERVES + USD");
  renderImpact();
  renderPools();
  renderLeaderboard();
  $("#address-form button[type=submit]").disabled=false;
  $("#address-form").addEventListener("submit",event=>{
    event.preventDefault();
    const address=$("#wallet-address").value.trim().toLowerCase();
    if(!ADDRESS_PATTERN.test(address)){
      $("#wallet-status").textContent="INVALID JUNO WALLET ADDRESS";
      return;
    }
    refreshPositions(address).catch(error=>$("#wallet-status").textContent=error.message.toUpperCase());
  });
  $("#preview-dialog").addEventListener("close",()=>{
    pendingAction=null;
    document.body.classList.remove("modal-open");
    dispatchEvent(new Event("neta:blackout-resume"));
  });
  $("#execute-action").onclick=()=>executePendingAction().catch(error=>$("#wallet-status").textContent=error.message.toUpperCase());
  if(window.NETA_WALLET_STATE)acceptHeaderWallet(window.NETA_WALLET_STATE);
}

function acceptHeaderWallet(detail){
  if(!detail?.address||!ADDRESS_PATTERN.test(detail.address))return;
  wallet={address:detail.address,provider:detail.provider,signer:detail.signer};
  contractChecks.clear();
  if(registry)refreshPositions(wallet.address).catch(error=>$("#wallet-status").textContent=error.message.toUpperCase());
}

window.addEventListener("neta:wallet-connected",event=>acceptHeaderWallet(event.detail));
window.addEventListener("neta:wallet-disconnected",()=>{
  wallet=null;
  contractChecks.clear();
  pendingAction=null;
  const dialog=$("#preview-dialog");
  if(dialog.open)dialog.close();
  if(viewedAddress)refreshPositions(viewedAddress).catch(error=>$("#wallet-status").textContent=error.message.toUpperCase());
});

init().catch(error=>{
  $("#pool-grid").textContent=`RECOVERY DATA UNAVAILABLE: ${error.message}`;
});
