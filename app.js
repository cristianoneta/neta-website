const M=window.NETA_METADATA,H=window.NETA_TOP_HOLDERS,I=window.NETA_ADDRESS_INDEX;
const S=M.stats||M;
const f=n=>new Intl.NumberFormat("en-US",{maximumFractionDigits:6}).format(Number(n||0));
const stake=h=>Number(h.neta_dao_staking||0);
const unstake=h=>Number(h.neta_dao_unstaking||0);
const supply=Number(S.total_supply_neta||0);
const totalEntries=Number(S.economic_master_entries||0);

document.querySelector("#stats").innerHTML=[
  ["TOTAL SUPPLY",S.total_supply_neta],
  ["ECONOMIC HOLDERS",S.economic_master_entries],
  ["JUNO CUSTODY",S.juno_custody_addresses],
  ["OSMOSIS CUSTODY",S.osmosis_primary_state_addresses],
  ["DAO STAKED",S.dao_active_staking_neta],
  ["DAO UNSTAKING",S.dao_unstaking_neta]
].map(x=>`<div class="stat"><div class="k">${x[0]}</div><div class="v">${f(x[1])}</div></div>`).join("");

document.querySelector("#updated").textContent="LAST UPDATED: "+new Date(M.generated_at).toLocaleString();
const sh=a=>a?(a.length>24?a.slice(0,12)+"…"+a.slice(-7):a):"—";

document.querySelector("#rows").innerHTML=H.slice(0,100).map(h=>`<tr>
  <td>${h.rank}</td>
  <td class="address">${h.label?`<span class="label">${h.label}</span><br>`:""}${sh(h.juno_address||h.osmosis_address)}</td>
  <td>${f(h.juno_neta)}</td>
  <td>${f(h.osmosis_neta)}</td>
  <td>${f(stake(h))}</td>
  <td>${f(unstake(h))}</td>
  <td><b>${f(h.total_neta)}</b></td>
  <td><span class="badge ${h.type}">${h.type.replaceAll("_"," ")}</span></td>
</tr>`).join("");

document.querySelector("#mobileRows").innerHTML=H.slice(0,100).map(h=>`<div class="mobile-holder-card">
  <div class="mobile-holder-head">
    <div class="mobile-rank">#${h.rank}</div>
    <div class="mobile-address">${h.label?`<div class="mobile-label">${h.label}</div>`:""}${sh(h.juno_address||h.osmosis_address)}</div>
    <div class="mobile-total">${f(h.total_neta)}</div>
  </div>
  <div class="mobile-breakdown">
    <div class="mobile-cell"><div class="mk">JUNO</div><div class="mv">${f(h.juno_neta)}</div></div>
    <div class="mobile-cell"><div class="mk">OSMOSIS</div><div class="mv">${f(h.osmosis_neta)}</div></div>
    <div class="mobile-cell"><div class="mk">STAKED</div><div class="mv">${f(stake(h))}</div></div>
    <div class="mobile-cell"><div class="mk">UNSTAKING</div><div class="mv">${f(unstake(h))}</div></div>
    <div class="mobile-cell"><div class="mk">TYPE</div><div class="mv">${h.type.replaceAll("_"," ")}</div></div>
  </div>
</div>`).join("");

function topPercentText(rank,total){
  const pct=(rank/total)*100;
  if(pct < 0.1) return "TOP <0.1%";
  if(pct < 1) return `TOP ${pct.toFixed(1)}%`;
  return `TOP ${Math.ceil(pct)}%`;
}

function lookup(){
  let q=document.querySelector("#q").value.trim().toLowerCase(),
      r=document.querySelector("#result"),
      h=I[q],
      def=document.querySelector("#rankPanelDefault"),
      panel=document.querySelector("#rankPanelResult");

  r.classList.remove("hidden");
  if(!h){
    r.innerHTML=`<div><div class="rank">NOT FOUND</div><div class="small">NO NETA BALANCE IN CURRENT SNAPSHOT</div></div>`;
    def.classList.remove("hidden");
    panel.classList.add("hidden");
    return;
  }

  const pct=(h.rank/totalEntries)*100;
  const topText=topPercentText(h.rank,totalEntries);
  const supplyShare=supply?((h.total_neta/supply)*100):0;

  r.innerHTML=`<div><div class="rank">RANK #${h.rank}</div><div class="small">${h.label||h.type}</div></div>
    <div class="rstat"><div class="small">TOTAL NETA</div><div class="big">${f(h.total_neta)}</div></div>
    <div class="rstat"><div class="small">STAKED</div><div class="big">${f(stake(h))}</div></div>
    <div class="rstat"><div class="small">UNSTAKING</div><div class="big">${f(unstake(h))}</div></div>`;

  def.classList.add("hidden");
  panel.classList.remove("hidden");
  panel.innerHTML=`<div class="rank-result-title">YOUR POSITION</div>
    <div class="rank-big">#${h.rank}</div>
    <div class="rank-percent">${topText} OF HOLDERS</div>
    <div class="rank-grid">
      <div class="rank-mini"><div class="rk">TOTAL NETA</div><div class="rv">${f(h.total_neta)}</div></div>
      <div class="rank-mini"><div class="rk">SUPPLY SHARE</div><div class="rv">${supplyShare.toFixed(4)}%</div></div>
      <div class="rank-mini"><div class="rk">JUNO</div><div class="rv">${f(h.juno_neta)}</div></div>
      <div class="rank-mini"><div class="rk">OSMOSIS</div><div class="rv">${f(h.osmosis_neta)}</div></div>
      <div class="rank-mini"><div class="rk">DAO STAKED</div><div class="rv">${f(stake(h))}</div></div>
      <div class="rank-mini"><div class="rk">DAO UNSTAKING</div><div class="rv">${f(unstake(h))}</div></div>
    </div>
    <div class="share-line">Ranked #${h.rank} of ${f(totalEntries)} economic holder entries in the current snapshot.</div>`;
}

document.querySelector("#go").onclick=lookup;
document.querySelector("#q").onkeydown=e=>{if(e.key==="Enter")lookup()};

const c=document.querySelector("#matrix"),x=c.getContext("2d");let cols,drops;
function resize(){c.width=innerWidth;c.height=innerHeight;cols=Math.floor(c.width/18);drops=Array(cols).fill(1)}resize();addEventListener("resize",resize);
setInterval(()=>{x.fillStyle="rgba(1,6,4,.075)";x.fillRect(0,0,c.width,c.height);x.fillStyle="#00ff78";x.font="13px monospace";
drops.forEach((y,i)=>{let t=Math.random()>.5?"1":"0";x.fillText(t,i*18,y*18);if(y*18>c.height&&Math.random()>.975)drops[i]=0;drops[i]++})},70);