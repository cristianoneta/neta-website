const $=s=>document.querySelector(s),fmt=(n,d=0)=>new Intl.NumberFormat("en-US",{maximumFractionDigits:d}).format(Number(n||0));
function short(a){return a&&a.length>18?a.slice(0,9)+"…"+a.slice(-5):a||"—"}
function renderMovers(id,rows,positive){const el=$(id);el.innerHTML=rows.length?rows.map((r,i)=>`<li><span>${i+1}</span><span title="${r.wallet||""}">${short(r.wallet)}</span><span class="mover-value">${positive?"+":""}${fmt(r.net_neta,6)} NETA</span></li>`).join(""):`<li class="empty-mover">No verified activity collected yet.</li>`}
async function load(){
 try{
  const r=await fetch("data/map/map-of-neta.json?t="+Date.now(),{cache:"no-store"});if(!r.ok)throw Error("HTTP "+r.status);const d=await r.json();
  if(!d.validation?.passed)throw Error("unvalidated map data");
  const j=d.chains.find(x=>x.id==="juno-1"),o=d.chains.find(x=>x.id==="osmosis-1");
  $("#junoAmount").textContent=fmt(j?.neta)+" NETA";$("#osmoAmount").textContent=fmt(o?.neta)+" NETA";
  $("#flowOut").textContent=fmt(d.flows.juno_to_osmosis_neta,6)+" NETA OUT";
  $("#flowIn").textContent=fmt(d.flows.osmosis_to_juno_neta,6)+" NETA IN";
  $("#volume").textContent=fmt(d.flows.volume_neta,6)+" NETA";$("#transfers").textContent=fmt(d.flows.transfers);
  const net=Number(d.flows.net_to_osmosis_neta||0),direction=net>0?"→ OSMOSIS":net<0?"→ JUNO":"BALANCED";
  $("#netFlow").textContent=direction+" "+fmt(Math.abs(net),6)+" NETA";$("#swaps").textContent=fmt(d.market.swaps);
  renderMovers("#buyers",d.market.power_buyers||[],true);renderMovers("#sellers",d.market.top_sellers||[],false);
  const started=new Date(d.collection_started_at);$("#collectingSince").textContent=started.toLocaleDateString();
  const p=d.periods["24h"],pct=Number(p.coverage_percent||0);
  $("#coverage").textContent=p.available?"VERIFIED DATA · 24H":"COLLECTING 24H · "+fmt(pct,1)+"%";
  $("#collectionNote").textContent=p.available?"Rolling verified 24-hour data. Longer periods unlock as history accumulates.":"Forward collection began "+started.toLocaleString()+". The 24H view unlocks after one complete day.";
  for(const b of document.querySelectorAll(".periods button")){const x=d.periods[b.dataset.period];b.disabled=!x?.available;b.title=x?.available?"Show "+b.dataset.period:"Collecting verified history"}
 }catch(e){$("#coverage").textContent="DATA TEMPORARILY UNAVAILABLE";$("#collectionNote").textContent=e.message}
}
load();
