const LCD="https://juno-api.polkachu.com";
const CHAIN_ID="juno-1";
const TX_MEMO="netareborn.com/wynd-recovery:v1";
const ADDRESS_PATTERN=/^juno1[0-9a-z]{38}$/;
const $=selector=>document.querySelector(selector);

let registry=null;
let stats=null;
let market=null;
let wallet=null;
let viewedAddress=null;
let chainHeight=0;
const contractChecks=new Map();
const positions=new Map();

const money=value=>new Intl.NumberFormat("en-US",{
  style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2,
}).format(Number(value||0));
const amount=(raw,decimals=6)=>Number(raw||0)/10**decimals;
const encode=value=>btoa(unescape(encodeURIComponent(JSON.stringify(value))));
const shortAddress=address=>`${address.slice(0,12)}…${address.slice(-8)}`;

async function smart(contract,message){
  const response=await fetch(`${LCD}/cosmwasm/wasm/v1/contract/${contract}/smart/${encodeURIComponent(encode(message))}`);
  if(!response.ok)throw new Error(`RPC ${response.status}`);
  const data=await response.json();
  return data.data??data;
}

async function contractInfo(address){
  const response=await fetch(`${LCD}/cosmwasm/wasm/v1/contract/${address}`);
  if(!response.ok)throw new Error(`RPC ${response.status}`);
  const data=await response.json();
  return data.contract_info??data;
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
  root.innerHTML="";
  let totalPoolUsd=0;
  for(const pool of registry.pools){
    const community=poolStats(pool.pair.address);
    const live=marketPool(pool);
    totalPoolUsd+=Number(live.pool_value_usd||0);
    const reserves=live.assets.length
      ?live.assets.map(asset=>`${Number(asset.display).toLocaleString(undefined,{maximumFractionDigits:6})} ${asset.symbol}`).join(" + ")
      :"DAILY RESERVE SNAPSHOT PENDING";
    const card=document.createElement("details");
    card.className="pool-card";
    card.dataset.pair=pool.pair.address;
    card.innerHTML=`
      <summary class="pool-head">
        <span class="pool-rank">${String(pool.rank).padStart(2,"0")}</span>
        <div class="pool-identity"><h3>${pool.name.replaceAll("ujuno","JUNO")}</h3><span>LEGACY WYND POOL</span></div>
        <div class="pool-reserves"><span>POOL RESERVES</span><strong>${reserves}</strong></div>
        <div class="pool-value"><span>DAILY VALUE</span><strong>${money(live.pool_value_usd)}</strong></div>
        <span class="validated" data-field="contract-status">REGISTRY OK</span>
      </summary>
      <div class="pool-detail">
        <div class="pool-community"><div><span>UNSTAKED VIA SITE</span><strong>${money(community.unstaked_usd)}</strong></div><div><span>CLAIMED VIA SITE</span><strong>${money(community.claimed_usd)}</strong></div></div>
        <div class="position">
          <div class="position-total"><span>THIS WALLET IN THIS POOL</span><strong data-field="position-usd">—</strong></div>
          <div class="underlying" data-field="underlying"><span>ESTIMATED UNDERLYING ASSETS</span><strong>—</strong></div>
          <div class="position-breakdown">
            <div class="position-line"><span>DIRECT LP</span><strong data-field="direct">—</strong></div>
            <div class="position-line"><span>ACTIVE STAKE</span><strong data-field="active">—</strong></div>
            <div class="position-line"><span>AVAILABLE TO UNBOND</span><strong data-field="available">—</strong></div>
            <div class="position-line"><span>LOCKED COMPONENT</span><strong data-field="locked">—</strong></div>
            <div class="position-line"><span>CLAIMABLE LP</span><strong data-field="claimable">—</strong></div>
            <div class="position-line"><span>UNBONDING LP</span><strong data-field="unbonding">—</strong></div>
          </div>
          <div class="periods" data-field="periods"></div>
          <div class="actions" data-field="actions"><button disabled>ENTER ADDRESS OR CONNECT KEPLR</button></div>
        </div>
      </div>`;
    root.append(card);
  }
  $("#pool-total-usd").textContent=money(totalPoolUsd);
}

function classifyClaims(claims){
  const now=BigInt(Date.now())*1000000n;
  let claimable=0n;
  let unbonding=0n;
  for(const claim of claims||[]){
    const value=BigInt(claim.amount||0);
    const release=claim.release_at||{};
    const mature=release.at_time!==undefined
      ?BigInt(release.at_time)<=now
      :release.at_height!==undefined&&BigInt(release.at_height)<=BigInt(chainHeight);
    if(mature)claimable+=value;
    else unbonding+=value;
  }
  return{claimable,unbonding};
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

async function expectedAssets(pool,raw){
  const response=await smart(pool.pair.address,{share:{amount:raw.toString()}});
  const assets=Array.isArray(response)?response:(response.assets||[]);
  return assets.map((asset,index)=>({
    symbol:(pool.assets[index]?.symbol||pool.assets[index]?.key||"ASSET").replace(/^u(?=[a-z])/i,"").toUpperCase(),
    raw:asset.amount,
    display:amount(asset.amount,pool.assets[index]?.decimals||6).toLocaleString(undefined,{maximumFractionDigits:6}),
  }));
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
    claimable:claims.claimable,unbonding:claims.unbonding,byPeriod,
  };
  positions.set(pool.pair.address,result);
  return result;
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
    const contracts=await verifyContracts(pool,true);
    if(!contracts.valid)throw new Error("LIVE CONTRACT CODE-ID MISMATCH");
    const position=await loadPosition(pool,wallet.address);
    let contract;
    let message;
    let expected=null;
    if(action==="unbond"){
      const row=position.byPeriod.find(item=>item.period===request.period);
      if(!row||row.available<request.raw)throw new Error("AVAILABLE STAKE CHANGED");
      contract=pool.stake.address;
      message={unbond:{tokens:request.raw.toString(),unbonding_period:request.period}};
    }else if(action==="claim"){
      if(position.claimable<request.raw)throw new Error("CLAIMABLE POSITION CHANGED");
      contract=pool.stake.address;
      message={claim:{}};
    }else{
      if(position.direct<request.raw)throw new Error("DIRECT LP BALANCE CHANGED");
      contract=pool.lp_token.address;
      const hook={withdraw_liquidity:{assets:[]}};
      message={send:{contract:pool.pair.address,amount:request.raw.toString(),msg:encode(hook)}};
      expected=await expectedAssets(pool,request.raw);
    }
    $("#preview-title").textContent=`${action.toUpperCase()} // ${pool.name.replaceAll("ujuno","JUNO")}`;
    $("#preview-message").textContent=JSON.stringify({
      network:CHAIN_ID,sender:wallet.address,memo:TX_MEMO,contract,message,
      expected_assets:expected,signing_enabled:false,
    },null,2);
    $("#preview-dialog").showModal();
  }catch(error){
    document.body.classList.remove("modal-open");
    dispatchEvent(new Event("neta:blackout-resume"));
    $("#wallet-status").textContent=error.message.toUpperCase();
  }
}

function renderPosition(pool,position,valid){
  const card=document.querySelector(`[data-pair="${pool.pair.address}"]`);
  if(position.totalEconomic>0n)card.open=true;
  const decimals=pool.lp_token.decimals||6;
  for(const key of ["direct","active","available","locked","claimable","unbonding"]){
    card.querySelector(`[data-field="${key}"]`).textContent=amount(position[key],decimals).toLocaleString(undefined,{maximumFractionDigits:6});
  }
  card.querySelector('[data-field="position-usd"]').textContent=money(position.positionUsd);
  card.querySelector('[data-field="underlying"]').innerHTML=`<span>ESTIMATED UNDERLYING ASSETS</span><strong>${position.underlying.length?position.underlying.map(asset=>`${asset.display} ${asset.symbol}`).join(" + "):"NO LP POSITION"}</strong>`;
  card.querySelector('[data-field="periods"]').innerHTML=position.byPeriod.map(row=>`
    <div class="period-row"><span>${row.period/86400}D STAKE</span><strong>${amount(row.active,decimals).toLocaleString()}</strong><small>${amount(row.available,decimals).toLocaleString()} available</small></div>`).join("");
  const actions=card.querySelector('[data-field="actions"]');
  actions.innerHTML="";
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
    actions.innerHTML=position.totalEconomic>0n&&!ownsAddress
      ?"<button disabled>CONNECT THIS WALLET FOR ACTIONS</button>"
      :"<button disabled>NO ACTION AVAILABLE</button>";
  }
}

async function refreshPositions(address){
  viewedAddress=address;
  positions.clear();
  $("#wallet-address").value=address;
  $("#position-summary").hidden=false;
  $("#position-address").textContent=address;
  $("#position-total-usd").textContent="CALCULATING…";
  let done=0;
  let totalUsd=0;
  for(const pool of registry.pools){
    const card=document.querySelector(`[data-pair="${pool.pair.address}"]`);
    try{
      const [check,position]=await Promise.all([verifyContracts(pool),loadPosition(pool,address)]);
      const badge=card.querySelector('[data-field="contract-status"]');
      badge.textContent=check.valid?"LIVE CODE OK":"CODE MISMATCH";
      badge.classList.toggle("invalid",!check.valid);
      totalUsd+=position.positionUsd;
      renderPosition(pool,position,check.valid);
    }catch(error){
      card.querySelector('[data-field="contract-status"]').textContent="QUERY FAILED";
      card.querySelector('[data-field="actions"]').innerHTML=`<button disabled>${error.message}</button>`;
    }
    $("#wallet-status").textContent=`CHECKED ${++done}/8 // ${shortAddress(address)}`;
  }
  $("#position-total-usd").textContent=money(totalUsd);
  $("#wallet-status").textContent=wallet?.address===address
    ?`CONNECTED + CHECKED // ${address}`
    :`READ-ONLY ADDRESS CHECK COMPLETE // ${address}`;
}

async function connect(){
  if(!window.keplr){
    $("#wallet-status").innerHTML='KEPLR NOT FOUND // <a href="https://www.keplr.app/download" target="_blank" rel="noopener">INSTALL KEPLR</a>';
    return;
  }
  dispatchEvent(new Event("neta:blackout-pause"));
  $("#wallet-status").textContent="WAITING FOR KEPLR…";
  try{
    await window.keplr.enable(CHAIN_ID);
    const signer=window.keplr.getOfflineSigner(CHAIN_ID);
    const accounts=await signer.getAccounts();
    if(!accounts[0]||!ADDRESS_PATTERN.test(accounts[0].address))throw new Error("NO VALID JUNO ACCOUNT RETURNED");
    wallet={address:accounts[0].address,provider:window.keplr,signer};
    $("#connect-wallet").textContent="REFRESH CONNECTED WALLET";
    await refreshPositions(wallet.address);
  }finally{
    dispatchEvent(new Event("neta:blackout-resume"));
  }
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
  setInterval(flash,15000);
}

async function init(){
  startGhost();
  const [registryResponse,statsResponse,marketResponse,blockResponse]=await Promise.all([
    fetch("data/recovery/wynd-pools.json"),
    fetch("data/recovery/recovery-stats.json"),
    fetch("data/recovery/wynd-market.json"),
    fetch(`${LCD}/cosmos/base/tendermint/v1beta1/blocks/latest`),
  ]);
  if(!registryResponse.ok)throw new Error("TOP-8 REGISTRY UNAVAILABLE");
  registry=await registryResponse.json();
  stats=statsResponse.ok?await statsResponse.json():{pools:{}};
  market=marketResponse.ok?await marketResponse.json():{pools:{}};
  if(registry.status!=="VALIDATED_FOR_READ_ONLY_FRONTEND"||registry.pools.length!==8)throw new Error("REGISTRY VALIDATION FAILED");
  if(blockResponse.ok)chainHeight=Number((await blockResponse.json()).block.header.height);
  $("#market-updated").textContent=market?.updated_at
    ?`POOL RESERVES + USD UPDATED ${new Date(market.updated_at).toLocaleString()}`
    :"DAILY MARKET SNAPSHOT PENDING";
  renderImpact();
  renderPools();
  $("#address-form").addEventListener("submit",event=>{
    event.preventDefault();
    const address=$("#wallet-address").value.trim().toLowerCase();
    if(!ADDRESS_PATTERN.test(address)){
      $("#wallet-status").textContent="INVALID JUNO WALLET ADDRESS";
      return;
    }
    refreshPositions(address).catch(error=>$("#wallet-status").textContent=error.message.toUpperCase());
  });
  $("#connect-wallet").onclick=()=>connect().catch(error=>$("#wallet-status").textContent=error.message.toUpperCase());
  $("#preview-dialog").addEventListener("close",()=>{
    document.body.classList.remove("modal-open");
    dispatchEvent(new Event("neta:blackout-resume"));
  });
  window.addEventListener("keplr_keystorechange",()=>{
    wallet=null;
    contractChecks.clear();
    $("#connect-wallet").textContent="RECONNECT KEPLR";
    $("#wallet-status").textContent="KEPLR ACCOUNT CHANGED — RECONNECT TO ENABLE ACTIONS";
    if(viewedAddress)refreshPositions(viewedAddress).catch(()=>{});
  });
}

init().catch(error=>{
  $("#pool-grid").textContent=`RECOVERY DATA UNAVAILABLE: ${error.message}`;
});
