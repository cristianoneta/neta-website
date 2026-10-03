# NETA Reborn code-backed current state

Reviewed **2026-10-02** against `main` checkout
`f435151bed2c3e09db834528934b252301fec96e`. Automated data commits advance
`main` frequently. Review scope: browser controllers/configuration, collector
and scheduling code, workflows, committed manifests and tests. This is a
maintenance review, not a new security audit or a live wallet/on-chain test.

## Repository boundary and product state

This repo owns <https://netareborn.com>. The DAO workspace is in
<https://github.com/cristianoneta/neta-dao> at <https://dao.netareborn.com>.
Do not recreate Governance/RELAY/Treasury/Names here.

| Surface | Connected behavior | Owning source / limits |
| --- | --- | --- |
| Ranking | Economic direct Juno/Osmosis, active DAO stake, unstaking, claimable and attributed LP holdings | `scripts/update_neta_data.py`, `scripts/lp_attribution.py`; WYND JUNO/NETA + Osmosis 631 attribution |
| Map of NETA | Snapshot market activity, separate Juno/Osmosis swaps and transfer UI | `scripts/update_map_of_neta.py`, `map-of-neta.js`, `ibc-transfer.js` |
| WYND Recovery | Public address inspection, wallet-bound Unbond/Claim/Withdraw | Eight frozen tuples in `data/recovery/wynd-pools.json`; no liquidity provision/bonding |
| Rescue NETA | JUNO↔NETA swap against frozen WYND pair | Estimated USD 25 per transaction, 5% default slippage, adjustable 0.1–10% |
| Socials | Read/write Juno mainnet board with moderation | `neta-socials.js`, release manifest; minimum 10 active NETA inclusive, owner stake exemption, 30-second cooldown |
| NETA DAO page | Community/DAO surface | Not the separate Operations governance application |
| What is NETA / Value Calculator | Intentionally offline / future navigation | No completed calculator or rewritten content |

Public access is not an audit claim. Frozen contract/wallet/live-state and gas
checks govern recovery/swap signing. IBC has its own chain/asset/channel checks;
its UI explicitly reports source confirmation separately from destination receipt.

## Economic accounting and public export formats

`run_neta_data.py` calls the ranking implementation; it reconciles Juno supply,
DAO ownership/claims, WYND LP ownership, Osmosis bank/Pool 631 lockup shares and
per-channel bridge liabilities. Raw-unit allocation is deterministic and
integer based. Known custody is removed before owner attribution. Juno and
Osmosis snapshots each pin a recorded finalized height; transit between those
heights stays explicit only with packet evidence. Claims distinguish waiting
release from matured/unclaimed.

| Output | Current format |
| --- | --- |
| `metadata.json` | schema v3; timestamps, source heights, validation flags, DAO/bridge residuals |
| `holders.json` | Ranked economic holder rows |
| `address_index.json` | **schema v4 compact**: `fields` plus wallet `rows`; browser code reconstructs address aliases; not an address→full-row object |
| `data.js` | Browser metadata / top-100 mirror |
| `address-index.js` | Browser compact lookup mirror |

Do not assume all exports have the same schema version. Read `app.js` and
`wallet-header.js` for compact lookup consumption. The September-12 exported
implementation handoff is historical and predates compact schema v4 and current
bridge validation. Total supply must equal wallet attribution plus explicit
DAO and bridge/transit residuals; a full CW20 bridge balance is not all Osmosis
custody. JunoSwap is not unwrapped by the economic LP model.

## Generated data ownership and actual cadence

`.github/workflows/update-production-data.yml` has **one sequential job**,
`collect-validate-publish`; it selects due collectors, validates the combined
snapshot and stages only their outputs before one changed-data commit.

| Collector | Outputs | Scheduled due time (Europe/Berlin) |
| --- | --- | --- |
| Ranking | Five root exports above | Every 3 hours (local hour divisible by 3) |
| Map | `data/map/` | Hourly |
| WYND market / leaderboard | `data/recovery/wynd-market.json`, `wynd-leaderboard.json` | 03/09/15/21 local hours |
| Recovery events/statistics | `recovery-events.json`, `recovery-stats.json` and retained diagnostic log | Hourly |

Cron is `7 * * * *` UTC; due selection uses Berlin time/DST. Manual and eligible
non-scheduled invocations run every collector. The workflow's main push filter
only matches the workflow/schedule script/test; not every collector-code push
triggers a full refresh. Use workflow_dispatch for an intentional complete refresh.
PR runs cannot publish. Normal production writes serialize under
`production-data-${github.ref}` with cancellation disabled, then use three
fetch/rebase/push attempts. Bot rebase includes `-X theirs`; overlap with human
collector-output edits requires care. Collector parallelization is unimplemented
[Issue #122](https://github.com/cristianoneta/neta-website/issues/122).

The current publisher contains **no explicit Pages build API call**. Explicit
request exists in `ci.yml`'s tested main-code deploy job. Generated-data commits
were followed by successful Pages runs in the 2026-10-02 operational check;
verify that relationship after changing auth/workflows rather than asserting
that the data workflow requests one rebuild. It also stages
`docs/diagnostics/latest_wynd_recovery_stats_test.log`; the old claim that no
routine logs are committed is too broad. Discovery diagnostic writers have
separate workflow behavior and do not share the production concurrency group.

Freshness monitor runs hourly (`23 * * * *` UTC) and reads these fields:

| Target | File / field | Maximum age |
| --- | --- | --- |
| Ranking | `metadata.json` / `generated_at` | 8 hours |
| Map | `data/map/state.json` / `updated_at` | 8 hours |
| Recovery statistics | `data/recovery/recovery-stats.json` / `updated_at` | 3 hours |
| Recovery market | `data/recovery/wynd-market.json` / `updated_at` | 30 hours |

Missing/invalid/naive/materially future timestamps fail the monitor. These
thresholds are not collector cadence. Market/leaderboard share a timestamp;
event valuations marked `valuation_locked` are immutable and not repriced.

## IBC route inventory and outstanding evidence

`ibc-transfer.js` exposes public Keplr signing (no old pilot-wallet gate).
Native table includes Juno↔Osmosis and Osmosis↔Terra; NETA only uses Juno
channel-47/Osmosis channel-169. Assets must originate on one end of the selected
route; wrapped assets return to origin. Direct Juno↔Terra is absent. No NETA
route to Terra is exposed. A source `send_packet` event does not prove delivery.

Last documented unresolved NETA packet: Juno channel-154 → Terra channel-33,
sequence 36, 10000 raw / 0.01 NETA. The accounting tracks non-Osmosis liabilities
separately. This review did not query packet commitment/receipt/acknowledgement
or refund, so do not assert it is still unresolved on-chain solely from old text.
The Map keeps Terra as a future NETA zone; this does not remove native Terra routes.

Recovery Claim evidence is still unrecorded in reviewed docs for the controlled
47283-raw LP claim whose release was 2026-09-21T07:58:06.734070343Z. It has
matured by calendar date; current wallet/claim state must be queried before any
signing. Historical unsigned all-pool Claim simulations and browser tests do
not constitute this live broadcast. Keplr hot-wallet paths have recorded live
proof; Ledger remains not live-tested.

## Deployments and legacy code

Socials release authority is `data/socials-mainnet-release.json`: Juno `juno-1`,
code 5167, v0.2.1, contract
`juno1a0s5kaavcfnjgewtka0vr5tmmssynqfxmqyat3hm5lw75us0em9qcjdfv9`,
WASM `49da22c2837cbfb86bed4e714d840cffefa2e2d26e9660f47a3eb17f745ee869`.
Recorded activation at height 41784461 on 2026-09-15; state can change after
that evidence. Owner stake exemption does not bypass pause/ban/cooldown.
Emergency pause path is retained on the guarded admin page.

The UNI-7 Socials/mock/governance consoles and legacy governance crate remain
maintenance/test assets, not the current public Socials or DAO workspace.
Operations still uses legacy `neta-governance` in the other site's UI:
`finalize_and_submit` only changes UNI-7 review status to `voting`. It does not
execute mainnet proposal creation. See the DAO repo's REVIEW_ARCHITECTURE.

## Shared layout, security and checks

`site_shell.py` renders exactly five pages: Ranking, Map, NETA DAO, WYND
Recovery, Rescue. Socials and guarded consoles have their own headers/CSP.
No claim that one generator rewrites every HTML page or every page has identical
CSP is correct. Map has the exact configured Osmosis REST/RPC and Terra REST
PublicNode fallback origins in its connect-src allowlist; the mismatch identified
during documentation review was corrected in the later security audit.
Inline-style exception remains in shared CSP. Main scripts use text nodes.

Run the deterministic runner after installing requirements; it executes all
`scripts/test_*.py` plus root/source JS syntax checks. The website CI builds
and byte-compares four signing bundles, audits npm and runs pinned Playwright.
Contract checks are separate workflows. All current workflow `uses` entries
here are SHA-pinned. Root README/Handoff and ordinary docs edits do not match
website CI filters; Markdown under `contracts/**` does. This reconciliation PR
includes a legacy contract README and therefore triggers the relevant CI.
A historical 46-test count or old launch failure is not today's execution evidence.

2026-10-02 local verification: all 18 deterministic Python test programs and
root/source JavaScript syntax checks passed; generated shell drift check passed.
No browser run, Rust execution, wallet write or new on-chain state attestation
was performed for this documentation-only change.

## Security audit continuation

Read [the security and efficiency audit](SECURITY_EFFICIENCY_AUDIT_2026-10-02.md)
before changing signing flows. Recovery, Rescue and IBC now reuse a checked gas
estimate as an explicit fee instead of triggering a second automatic simulation.
Swap and IBC signing freeze reviewed parameters and recheck wallet identity.
Recovery signing clients disconnect after each attempt. Ambiguous broadcasts
still require independent transaction reconciliation before another attempt.
