const M=window.NETA_METADATA,H=window.NETA_TOP_HOLDERS,I=window.NETA_ADDRESS_INDEX,A=window.NETA_ADDRESS_ROWS;
const S=M.stats||M;
const f=n=>new Intl.NumberFormat("en-US",{maximumFractionDigits:6}).format(Number(n||0));
const stake=h=>Number(h.neta_dao_staking||0),unstake=h=>Number(h.neta_dao_unstaking||0),claimable=h=>Number(h.neta_dao_claimable||0),lp=h=>Number(h.lp_neta||0);
const supply=Number(S.total_supply_neta||0),totalEntries=Number(S.economic_master_entries||0);
const sh=a=>a?(a.length>24?a.slice(0,12)+"…"+a.slice(-7):a):"—";
const allRows=A?.length?A:H;
let sortKey="total_neta",sortDir=-1;

function node(tag,className,text){
  const element=document.createElement(tag);
  if(className)element.className=className;
  if(text!==undefined)element.textContent=text;
  return element;
}

function appendMetric(parent,className,label,value){
  const box=node("div",className);
  box.append(node("div",className==="stat"?"k":"rk",label),node("div",className==="stat"?"v":"rv",value));
  parent.append(box);
}

const statsRoot=document.querySelector("#stats");
for(const [label,value] of [["TOTAL SUPPLY",S.total_supply_neta],["ECONOMIC HOLDERS",S.economic_master_entries],["JUNO CUSTODY",S.juno_custody_addresses],["OSMOSIS CUSTODY",S.osmosis_primary_state_addresses],["DAO STAKED",S.dao_active_staking_neta],["DAO UNSTAKING",S.dao_unstaking_neta],["DAO CLAIMABLE",S.dao_claimable_neta],["LP NETA",S.lp_neta]])appendMetric(statsRoot,"stat",label,f(value));
document.querySelector("#updated").textContent="LAST UPDATED: "+new Date(M.generated_at).toLocaleString();

const val=(h,k)=>k==="neta_dao_staking"?stake(h):k==="neta_dao_unstaking"?unstake(h):k==="neta_dao_claimable"?claimable(h):k==="lp_neta"?lp(h):Number(h[k]||0);
function sorted(){return [...allRows].sort((a,b)=>{const d=val(a,sortKey)-val(b,sortKey);return d?sortDir*d:Number(a.rank||0)-Number(b.rank||0)}).slice(0,100)}

function addressCell(holder,mobile=false){
  const root=node("div",mobile?"mobile-address":"");
  if(holder.label)root.append(node("div",mobile?"mobile-label":"label",holder.label));
  root.append(document.createTextNode(sh(holder.juno_address||holder.osmosis_address)));
  return root;
}

function tableCell(content,className){
  const cell=node("td",className);
  if(content instanceof Node)cell.append(content);else cell.textContent=content;
  return cell;
}

function mobileCell(label,value){
  const cell=node("div","mobile-cell");
  cell.append(node("div","mk",label),node("div","mv",value));
  return cell;
}

function render(){
  const rows=sorted(),desktop=document.querySelector("#rows"),mobile=document.querySelector("#mobileRows");
  desktop.replaceChildren();mobile.replaceChildren();
  for(const holder of rows){
    const row=node("tr");
    const total=node("b","",f(holder.total_neta));
    const badge=node("span",`badge ${holder.type}`,holder.type.replaceAll("_"," "));
    row.append(tableCell(String(holder.rank)),tableCell(addressCell(holder),"address"),tableCell(f(holder.juno_neta)),tableCell(f(holder.osmosis_neta)),tableCell(f(stake(holder))),tableCell(f(unstake(holder))),tableCell(f(claimable(holder))),tableCell(f(lp(holder))),tableCell(total),tableCell(badge));
    desktop.append(row);

    const card=node("div","mobile-holder-card"),head=node("div","mobile-holder-head"),breakdown=node("div","mobile-breakdown");
    head.append(node("div","mobile-rank",`#${holder.rank}`),addressCell(holder,true),node("div","mobile-total",f(holder.total_neta)));
    for(const [label,value] of [["JUNO",holder.juno_neta],["OSMOSIS",holder.osmosis_neta],["STAKED",stake(holder)],["UNSTAKING",unstake(holder)],["CLAIMABLE",claimable(holder)],["LP NETA",lp(holder)]])breakdown.append(mobileCell(label,f(value)));
    breakdown.append(mobileCell("TYPE",holder.type.replaceAll("_"," ")));
    card.append(head,breakdown);mobile.append(card);
  }
  document.querySelectorAll("th.sortable").forEach(th=>{const active=th.dataset.sort===sortKey;th.classList.toggle("active-sort",active);th.textContent=th.textContent.replace(/ [↕↑↓]$/,'')+(active?(sortDir<0?' ↓':' ↑'):' ↕')});
}

document.querySelectorAll("th.sortable").forEach(th=>{th.style.cursor="pointer";th.title="Click to sort";th.onclick=()=>{const key=th.dataset.sort;if(sortKey===key)sortDir*=-1;else{sortKey=key;sortDir=-1}render()}});
render();

function topPercentText(rank,total){const pct=(rank/total)*100;if(pct<.1)return"TOP <0.1%";if(pct<1)return`TOP ${pct.toFixed(1)}%`;return`TOP ${Math.ceil(pct)}%`}
function resultMetric(parent,label,value){
  const metric=node("div","rstat");metric.append(node("div","small",label),node("div","big",value));parent.append(metric);
}
function lookup(){
  const query=document.querySelector("#q").value.trim().toLowerCase(),result=document.querySelector("#result"),holder=I[query],fallback=document.querySelector("#rankPanelDefault"),panel=document.querySelector("#rankPanelResult");
  result.classList.remove("hidden");result.replaceChildren();panel.replaceChildren();
  if(!holder){
    const message=node("div");message.append(node("div","rank","NOT FOUND"),node("div","small","NO NETA BALANCE IN CURRENT SNAPSHOT"));result.append(message);fallback.classList.remove("hidden");panel.classList.add("hidden");return;
  }
  const heading=node("div");heading.append(node("div","rank",`RANK #${holder.rank}`),node("div","small",holder.label||holder.type));result.append(heading);
  for(const [label,value] of [["TOTAL NETA",holder.total_neta],["STAKED",stake(holder)],["UNSTAKING",unstake(holder)],["CLAIMABLE",claimable(holder)],["LP NETA",lp(holder)]])resultMetric(result,label,f(value));
  fallback.classList.add("hidden");panel.classList.remove("hidden");
  const topText=topPercentText(holder.rank,totalEntries),supplyShare=supply?holder.total_neta/supply*100:0,grid=node("div","rank-grid");
  panel.append(node("div","rank-result-title","YOUR POSITION"),node("div","rank-big",`#${holder.rank}`),node("div","rank-percent",`${topText} OF HOLDERS`));
  for(const [label,value] of [["TOTAL NETA",f(holder.total_neta)],["SUPPLY SHARE",`${supplyShare.toFixed(4)}%`],["JUNO",f(holder.juno_neta)],["OSMOSIS",f(holder.osmosis_neta)],["DAO STAKED",f(stake(holder))],["DAO UNSTAKING",f(unstake(holder))],["DAO CLAIMABLE",f(claimable(holder))],["LP NETA",f(lp(holder))]])appendMetric(grid,"rank-mini",label,value);
  panel.append(grid,node("div","share-line",`Ranked #${holder.rank} of ${f(totalEntries)} economic holder entries in the current snapshot.`));
}

document.querySelector("#go").onclick=lookup;
document.querySelector("#q").onkeydown=event=>{if(event.key==="Enter")lookup()};
function resetLookup(){document.querySelector("#q").value="";document.querySelector("#result").classList.add("hidden");document.querySelector("#rankPanelDefault").classList.remove("hidden");document.querySelector("#rankPanelResult").classList.add("hidden")}
window.addEventListener("neta:wallet-connected",event=>{if(!event.detail?.address)return;const address=I[event.detail.address.toLowerCase()]?event.detail.address:event.detail.osmosisAddress;document.querySelector("#q").value=address;lookup()});
window.addEventListener("neta:wallet-disconnected",resetLookup);
