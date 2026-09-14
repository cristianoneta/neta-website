const $=s=>document.querySelector(s),fmt=(n,d=0)=>new Intl.NumberFormat("en-US",{maximumFractionDigits:d}).format(Number(n||0));
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
function renderMovers(id,rows,positive){
  const el=$(id);el.replaceChildren();
  if(!rows.length){const empty=document.createElement("li");empty.className="empty-mover";empty.textContent="No verified activity collected yet.";el.append(empty);return}
  rows.forEach((r,i)=>{const item=document.createElement("li"),rank=document.createElement("span"),value=document.createElement("span");rank.textContent=i+1;value.className="mover-value";value.textContent=`${positive?"+":""}${fmt(r.net_neta,6)} NETA`;item.append(rank,moverWallet(r.wallet),value);el.append(item)});
}
async function load(){
 try{
  const r=await fetch("data/map/map-of-neta.json?t="+Date.now(),{cache:"no-store"});if(!r.ok)throw Error("HTTP "+r.status);const d=await r.json();
  if(!d.validation?.passed)throw Error("unvalidated map data");
  const j=d.chains.find(x=>x.id==="juno-1"),o=d.chains.find(x=>x.id==="osmosis-1"),t=d.chains.find(x=>x.id==="phoenix-1");
  $("#junoAmount").textContent=fmt(j?.neta)+" NETA";$("#osmoAmount").textContent=fmt(o?.neta)+" NETA";$("#terraAmount").textContent=fmt(t?.neta)+" NETA";
  $("#flowOut").textContent=fmt(d.flows.juno_to_osmosis_neta,6)+" NETA OUT";
  $("#flowIn").textContent=fmt(d.flows.osmosis_to_juno_neta,6)+" NETA IN";
  $("#volume").textContent=fmt(d.flows.volume_neta,6)+" NETA";$("#transfers").textContent=fmt(d.flows.transfers);
  const net=Number(d.flows.net_to_osmosis_neta||0),direction=net>0?"→ OSMOSIS":net<0?"→ JUNO":"BALANCED";
  $("#netFlow").textContent=direction+" "+fmt(Math.abs(net),6)+" NETA";$("#swaps").textContent=fmt(d.market.swaps);
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
