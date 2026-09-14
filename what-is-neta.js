(()=>{
  "use strict";
  const target=name=>document.querySelector(`[data-neta-fact="${name}"]`);
  const integer=value=>new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(Number(value||0));
  const decimal=value=>new Intl.NumberFormat("en-US",{minimumFractionDigits:6,maximumFractionDigits:6}).format(Number(value||0));
  fetch("metadata.json",{cache:"no-store"})
    .then(response=>{if(!response.ok)throw new Error("SNAPSHOT UNAVAILABLE");return response.json();})
    .then(data=>{
      if(data.validation?.passed!==true)throw new Error("SNAPSHOT NOT VALIDATED");
      target("supply").textContent=`${decimal(data.total_supply_neta)} NETA`;
      target("juno").textContent=integer(data.juno_custody_addresses);
      target("osmosis").textContent=integer(data.osmosis_primary_state_addresses);
      target("matches").textContent=integer(data.cross_chain_matches);
      target("entries").textContent=integer(data.economic_master_entries);
      target("updated").textContent=`Validated snapshot: ${new Date(data.generated_at).toLocaleString()}`;
    })
    .catch(error=>{
      for(const name of ["supply","juno","osmosis","matches","entries"])target(name).textContent="UNAVAILABLE";
      target("updated").textContent=error.message;
    });
})();
