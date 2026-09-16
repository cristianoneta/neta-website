const $=s=>document.querySelector(s),fmt=(n,d=0)=>new Intl.NumberFormat("en-US",{maximumFractionDigits:d}).format(Number(n||0));
let mapData=null;
function short(a){return a&&a.length>18?a.slice(0,9)+"…"+a.slice(-5):a||"—"}
function moverWallet(address){
  const value=typeof address==="string"?address:"";
  let href=null,explorer=null;
  if(/^osmo1[0-9a-z]{38}$/.test(value)){href=`https://www.mintscan.io/osmosis/address/${encodeURIComponent(value)}`;explorer="Mintscan"}
  else if(/^juno1[0-9a-z]{38}$/.test(value)){href=`https://atomscan.com/juno/accounts/${encodeURIComponent(value)}`;explorer="ATOMScan"}
  if(!href){
    const label=document.createElement("span");label.className="mover-wallet";label.textContent=short(value);return label;
  }
  const link=document.createElement("a");link.className="mover-wallet";link.href=href;link.target="_blank";link.rel="noopener noreferrer";link.title=value;link.setAttribute("aria-label",`Open ${value} on ${explorer}`);link.textContent=short(value);return link;
}
function transferExplorer(address,chain){
  if(!address)return null;
  if(chain==="osmosis"||address.startsWith("osmo1"))return `https://www.mintscan.io/osmosis/address/${encodeURIComponent(address)}`;
  if(chain==="juno"||address.startsWith("juno1"))return `https://www.mintscan.io/juno/address/${encodeURIComponent(address)}`;
  return null;
}
function renderLargestTransfers(rows,period){
  const list=$("#largestTransfers");list.replaceChildren();$("#largest-transfers-period").textContent=period.toUpperCase();
  if(!rows.length){const empty=document.createElement("li");empty.className="empty-transfer";empty.textContent="No verified IBC transfers in this period.";list.append(empty);return}
  rows.slice(0,3).forEach((row,index)=>{
    const item=document.createElement("li"),rank=document.createElement("span"),route=document.createElement("span"),amount=document.createElement("strong"),meta=document.createElement("span");
    rank.className="transfer-rank";rank.textContent=String(index+1).padStart(2,"0");route.className="transfer-route";route.textContent=`${String(row.from_chain||"").toUpperCase()} → ${String(row.to_chain||"").toUpperCase()}`;amount.textContent=`${fmt(row.neta,6)} NETA`;
    meta.className="transfer-meta";const href=transferExplorer(row.wallet,row.wallet_chain);const wallet=href?document.createElement("a"):document.createElement("span");wallet.textContent=short(row.wallet);wallet.title=row.wallet||"";if(href){wallet.href=href;wallet.target="_blank";wallet.rel="noopener noreferrer";wallet.setAttribute("aria-label",`Open ${row.wallet} on Mintscan`)}
    const time=document.createElement("time");time.dateTime=row.timestamp;time.textContent=new Date(row.timestamp).toLocaleString();meta.append(wallet,time);item.append(rank,route,amount,meta);list.append(item);
  });
}
function renderMovers(id,rows,positive){
  const el=$(id);el.replaceChildren();
  if(!rows.length){const empty=document.createElement("li");empty.className="empty-mover";empty.textContent="No verified activity collected yet.";el.append(empty);return}
  rows.forEach((r,i)=>{const item=document.createElement("li"),rank=document.createElement("span"),value=document.createElement("span");rank.textContent=i+1;value.className="mover-value";value.textContent=`${positive?"+":""}${fmt(r.net_neta,6)} NETA`;item.append(rank,moverWallet(r.wallet),value);el.append(item)});
}
async function load(){
 try{
  const r=await fetch("data/map/map-of-neta.json?t="+Date.now(),{cache:"no-store"});if(!r.ok)throw Error("HTTP "+r.status);const d=await r.json();
  mapData=d;
  if(!d.validation?.passed)throw Error("unvalidated map data");
  const j=d.chains.find(x=>x.id==="juno-1"),o=d.chains.find(x=>x.id==="osmosis-1"),t=d.chains.find(x=>x.id==="phoenix-1");
  $("#junoAmount").textContent=fmt(j?.neta)+" NETA";$("#osmoAmount").textContent=fmt(o?.neta)+" NETA";$("#terraAmount").textContent=fmt(t?.neta)+" NETA";
  $("#flowOut").textContent=fmt(d.flows.juno_to_osmosis_neta,6)+" NETA OUT";
  $("#flowIn").textContent=fmt(d.flows.osmosis_to_juno_neta,6)+" NETA IN";
  $("#volume").textContent=fmt(d.flows.volume_neta,6)+" NETA";$("#transfers").textContent=fmt(d.flows.transfers);
  const net=Number(d.flows.net_to_osmosis_neta||0),direction=net>0?"→ OSMOSIS":net<0?"→ JUNO":"BALANCED";
  $("#netFlow").textContent=direction+" "+fmt(Math.abs(net),6)+" NETA";$("#swaps").textContent=fmt(d.market.swaps);
  renderLargestTransfers(d.periods["24h"]?.top_ibc_transfers||d.flows.top_transfers||[],"24h");
  const byChain=d.market.by_chain||{};
  $("#swapBreakdown").textContent=`JUNO ${fmt(byChain.juno)} · OSMOSIS ${fmt(byChain.osmosis)}`;
  renderMovers("#buyers",d.market.power_buyers||[],true);renderMovers("#sellers",d.market.top_sellers||[],false);
  const started=new Date(d.collection_started_at),updated=new Date(d.generated_at);
  $("#marketUpdated").textContent=Number.isNaN(updated.getTime())?"—":updated.toLocaleString();
  const p=d.periods["24h"],pct=Number(p.coverage_percent||0);
  $("#coverage").textContent=p.available?"VERIFIED DATA · 24H":"COLLECTING 24H · "+fmt(pct,1)+"%";
  $("#collectionNote").textContent=p.available?"Rolling verified 24-hour data. Collection began "+started.toLocaleString()+". Longer periods unlock as history accumulates.":"Forward collection began "+started.toLocaleString()+". The 24H view unlocks after one complete day.";
  for(const b of document.querySelectorAll(".periods button")){const x=d.periods[b.dataset.period];b.disabled=!x?.available;b.title=x?.available?"Show "+b.dataset.period:"Collecting verified history"}
 }catch(e){$("#coverage").textContent="DATA TEMPORARILY UNAVAILABLE";$("#collectionNote").textContent=e.message}
}
load();
$("#periods")?.addEventListener("click",event=>{
  const button=event.target.closest("button[data-period]");if(!button||button.disabled||!mapData)return;
  document.querySelectorAll("#periods button").forEach(item=>item.classList.toggle("active",item===button));
  renderLargestTransfers(mapData.periods[button.dataset.period]?.top_ibc_transfers||[],button.dataset.period);
});
