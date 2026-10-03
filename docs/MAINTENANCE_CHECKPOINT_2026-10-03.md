# Maintenance checkpoint — 2026-10-03

Reviewed current main, open PRs/issues, recent Actions, collector workflows and
production timestamps together with `cristianoneta/neta-dao`. No open PRs were
present initially. Latest completed website tests, Pages and the earlier freshness
monitor were green; those historical results did not prove fresh data at review time.

Recovery statistics at 13:45:49 UTC exceeded their three-hour freshness budget.
Reran the existing single-publisher job from production-data run
[37126914404](https://github.com/cristianoneta/neta-website/actions/runs/37126914404).
Latest job 111259866955 successfully collected due Map/Recovery data, validated the
complete publication snapshot and published one atomic bot commit:
`8c52316ea5d738f06e5586728db2ee2a62cde4f7`.

| Dataset | Timestamp on 2026-10-03 UTC | Maximum age |
| --- | --- | --- |
| Ranking | 13:42:48 | 8 hours |
| Map | 18:00:21 | 8 hours |
| Recovery statistics | 18:00:24 | 3 hours |
| Recovery market | 13:42:52 | 30 hours |

Ranking/market were not due in this rerun. All four are within their configured
limits at the post-refresh 18:15 UTC checkpoint. This is timestamped evidence,
not a guarantee of future scheduled execution. The afternoon schedule gap's cause
was not established. No generated outputs were hand-edited.

The collector architecture remains sequential with one validated atomic publisher.
[Issue #122](https://github.com/cristianoneta/neta-website/issues/122) is still open:
parallelize independent collection jobs while retaining one publication owner.
This maintenance does not claim that work complete. Measure the four lazy-loaded
signing bundles before attempting shared-chunk restructuring; retain reproducible
build/security tests and unknown-broadcast reconciliation.

DAO UI/Names work belongs in `neta-dao`: #114–#116 integrated the Names workspace,
flat RELAY navigation and shared heading/cards. Its current maintenance adds
reused desktop voxel artwork and CI caching/non-mutating format checks. Names v2
registry, dynamic quote service, profile writes and transfers are still unavailable;
mainnet messaging remains disabled. Do not duplicate those features here.

This repository change updates documentation only. Existing security, accounting,
IBC receipt and controlled live-wallet evidence limitations in CURRENT_STATE remain.
