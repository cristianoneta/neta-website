#!/usr/bin/env python3
import json, sys
from pathlib import Path

out=Path(sys.argv[1] if len(sys.argv)>1 else "diagnostic-output")
meta=json.loads((out/"metadata.json").read_text())
rows=json.loads((out/"holders.json").read_text())
required={"neta_dao_staking","neta_dao_unstaking","neta_dao_claimable","lp_neta","total_neta"}
if meta.get("schema_version")!=3: raise SystemExit("schema_version is not 3")
if not meta.get("validation",{}).get("passed"): raise SystemExit("validation.passed false")
failed=[k for k,v in meta["validation"].items() if v is not True]
if failed: raise SystemExit(f"failed validation flags: {failed}")
if not rows: raise SystemExit("no holder rows")
missing=[r.get("rank") for r in rows if not required.issubset(r)]
if missing: raise SystemExit(f"rows missing v3 fields: {missing[:10]}")
addresses={r.get("juno_address") for r in rows}|{r.get("osmosis_address") for r in rows}
if "juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra" in addresses:
    raise SystemExit("WYND pool custody address remains ranked")
if "osmo1yn7z42al3mafmztjayjduz42a8at3whyd279fkdsyumzar83x8mqvpw83x" in addresses:
    raise SystemExit("Pool 631 custody address remains ranked")
summary={
 "passed":True,
 "schema_version":meta["schema_version"],
 "generated_at":meta["generated_at"],
 "economic_holders":meta["economic_master_entries"],
 "dao_staked_neta":meta["dao_active_staking_neta"],
 "dao_unstaking_neta":meta["dao_unstaking_neta"],
 "dao_claimable_neta":meta["dao_claimable_neta"],
 "lp_neta":meta["lp_neta"],
 "wallet_attributed_neta":meta["wallet_attributed_neta"],
 "residual_neta":meta["dao_residual_neta"],
 "total_supply_neta":meta["total_supply_neta"],
 "validations":meta["validation"],
 "wynd":meta["juno"]["wynd"],
 "pool_631":meta["osmosis"]["pool_631"],
}
Path("docs/diagnostics/integrated_indexer_summary.json").write_text(json.dumps(summary,indent=2)+"\n")
print(json.dumps(summary,indent=2))
