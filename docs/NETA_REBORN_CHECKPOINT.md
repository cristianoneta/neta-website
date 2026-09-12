# NETA Reborn — Technical Checkpoint

Last updated: 2026-09-12

This file is the durable technical knowledge base for the NETA Reborn holder/indexer work. Future analysis should read this file before changing LP attribution logic.

## Status legend
- **VALIDATED**: reconciled exactly on-chain / by diagnostic.
- **WORKING**: implementation exists but final reconciliation is not yet green.
- **OPEN**: still requires investigation.
- **HYPOTHESIS**: plausible, but must not be treated as fact.

## Production architecture
Repository: `cristianoneta/neta-website`.

Production workflow: `.github/workflows/update-neta-data.yml` (`Update NETA on-chain data`). It runs `python scripts/run_neta_data.py`, validates `data/metadata.json`, commits generated `data/*.json` and `data/data.js`, pushes to `main`, and requests a Pages rebuild if data changed.

Normal production cadence is 4x/day at approximately 03:00, 09:00, 15:00 and 21:00 Europe/Berlin, implemented with an hourly cron plus Berlin-local-hour gate. Editing normal Python indexer files does not itself trigger production; the push trigger is scoped to the workflow file. Avoid unnecessary manual production runs.

Current production holder model includes direct Juno NETA, direct Osmosis NETA, DAO staked NETA and DAO claims/unstaking. LP NETA is not yet integrated into production.

## LP attribution design goal
Holder totals should ultimately represent economic ownership rather than custody addresses:

`Direct Juno + Direct Osmosis + DAO Staked + Unstaking + LP NETA`

For LP pools, NETA sitting at the pool address must be removed from direct pool-address attribution and redistributed to economic LP owners. Custody/staking/lockup module accounts must similarly be unwrapped to their underlying owners. All accounting should fail closed unless LP supply and pool NETA reserve reconcile exactly.

## WYND JUNO/NETA — VALIDATED
Do not redo JunoSwap research for this work. WYND was the relevant Juno LP and has been fully reconstructed.

Contracts:
- LP token: `juno1uu3cewmpynvgsdu3lfqv2rh2n5nwtrguahkw64wjk99eg8r6fsss0e757x`
  - code_id 1699
  - label `Wyndex LP token`
- Pair: `juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra`
- Stake contract: `juno1tlhf68k8aksl30mdf5yngudk6z8w4qqzvvauzr92w3gwm7er9p9qxvudu7`

Validated reconciliation:
- LP total supply: `8,961,136,120 raw LP`
- Direct LP balances sum: exactly total supply
- LP held by Wyndex stake contract: `8,738,464,169 raw LP`
- Active staked LP including `locked_tokens`: `7,157,563,479 raw LP`
- Claims/unbonding: `1,580,900,690 raw LP`
- Active + claims: `8,738,464,169 raw LP` exactly
- Economic LP total after replacing stake-contract custody with owners: `8,961,136,120 raw LP`
- Supply difference: `0`
- NETA reserve attributed in validated snapshot: `959.341093 NETA`
- NETA attribution difference: `0.000000 NETA`
- Active stake wallets found: 3,334

Important WYND edge case: seven non-empty `locked_tokens` entries inside stake objects accounted for a previously missing `7,796,900 raw LP`. Their amounts were `5,417,000`, `882,500`, `1,408,600`, `18,500`, `38,300`, `22,800`, `9,200`. This is why stake parsing must include both the ordinary stake amount and `locked_tokens`.

Small historical snapshot differences are acceptable for exploratory work because the pool is small, but production attribution should use a consistent snapshot/height where possible.

## Osmosis NETA/OSMO Pool 631 — WORKING
Pool:
- Pool ID: `631`
- share denom: `gamm/pool/631`
- pool address: `osmo1yn7z42al3mafmztjayjduz42a8at3whyd279fkdsyumzar83x8mqvpw83x`
- suspected/identified lockup module custody address: `osmo1njty28rqtpw6n59sjj4esw76enp4mg6g7cwrhc`

Initial fixed-height bank-share scan at Osmosis height `70421906` was internally exact:
- share holders in bank state: `578`
- sum share balances: `225004459685449894124978`
- pool total shares: `225004459685449894124978`
- share difference: `0`
- NETA reserve: `901.155656 NETA`
- OSMO reserve: `5498.125474 OSMO`

Largest apparent bank holder was `osmo1njty28rqtpw6n59sjj4esw76enp4mg6g7cwrhc` with `131997115844286440618885` shares, or about `58.664222%` of Pool 631. This must not be treated as one economic holder. Evidence indicates it is the Osmosis lockup module account holding bonded/locked GAMM shares on behalf of users. At the snapshot reserve this custody represented roughly 528.7 NETA.

Current diagnostic approach scans Osmosis `lockup` KV state and unwraps PeriodLock records containing `gamm/pool/631` back to `owner`. Required validation:
1. sum of Pool-631 PeriodLock amounts == bank balance of lockup module address;
2. direct economic shares after replacing module custody with lock owners == pool total share supply;
3. attributed NETA == Pool 631 NETA reserve exactly.

### Locked-position age investigation — OPEN
We also want to answer whether the Pool 631 positions are ancient locks from the 2022 incentive era or were touched/rebonded later.

Parser finding (2026-09-12):
- Osmosis `PeriodLock` protobuf is confirmed as ID=1, owner=2, duration=3, end_time=4, coins=5.
- Diagnostic run 15 failed because the generic protobuf reader returned negative `int64` timestamp seconds as an unsigned two's-complement integer. Python then raised `OverflowError: timestamp out of range`.
- For locks whose unlocking has not started, Go's zero time is serialized as year 0001, equivalent to Unix seconds `-62135596800`. This is a sentinel meaning “no unlocking end time”, not a future timestamp.
- Commit `8402fd20380e4c2d4a24fa8824219078c78a020b` fixes signed `int64`/`int32` decoding and maps this zero-time sentinel to `None`.
- The post-fix diagnostic reconciliation is still **OPEN** until its workflow output is inspected. Do not yet claim Pool 631 economic-owner closure.

PeriodLock contains at least ID, owner, duration, end time and coins. `end_time` is useful for distinguishing still-locked versus unlocking positions, but creation time is not necessarily stored directly in the current lock object. Exact creation/last-touch dates may therefore require transaction/event history keyed by lock ID and owner.

For every PeriodLock containing `gamm/pool/631`, collect:
- lock ID
- owner
- amount
- duration
- end time
- active locked vs unlocking/matured status

Then, where feasible, resolve creation / last relevant transaction timestamp using Osmosis transaction events. Do not infer age solely from the pool launch date.

Historical context: Pool 631 was launched/incentivized around February 2022. This makes old never-unbonded positions plausible, but that is currently a **HYPOTHESIS**, not yet a proven age for the present locked balances.

## Diagnostic branch
Branch: `diagnostic/wynd-lp-attribution`

Workflow: `.github/workflows/diagnose-wynd-lp.yml`

Diagnostic module: `scripts/lp_attribution.py`

It is intentionally read-only and should be used to prove the attribution before production integration.

Run 14 (`34691326477`, head `aaecec0b725899d58fa987889e4eaa9434976cbe`) completed on 2026-09-12 with **failure** after the combined attribution step ran for about seven minutes. The failure occurred after the earlier base64-padding issue had been fixed.

Run 15 then isolated the downstream failure to `PeriodLock.end_time` decoding: a negative protobuf `int64` representing Go zero time was interpreted as unsigned and overflowed Python datetime. Commit `8402fd20380e4c2d4a24fa8824219078c78a020b` corrects that parser on the diagnostic branch and triggered the next diagnostic run. Its final reconciliation result still needs inspection; do not claim Osmosis lockup reconciliation is green until that output proves it.

## Production integration plan — NOT YET EXECUTED
Only after Osmosis reconciliation is green:
1. Reuse the existing 4-worker Osmosis 512-prefix bank scan in `scripts/run_neta_data.py` to collect both NETA and `gamm/pool/631` in the same pass. Do not add a second expensive full bank scan.
2. Attribute WYND pool NETA from a consistent Juno snapshot and Pool 631 NETA from the same Osmosis snapshot/height used for shares where possible.
3. Add `lp_raw` / public `lp_neta` fields to economic holder rows.
4. Remove pool-address NETA from direct holdings before redistributing it to LP owners, preventing double counting.
5. Add `LP NETA` to the frontend holder table.
6. Use deterministic integer allocation. Prefer a largest-remainder method so raw NETA sums exactly to the pool reserve without assigning all rounding dust arbitrarily to one wallet.
7. Test on diagnostic branch first. Merge to `main` only after exact reconciliation.
8. Perform one deliberate manual production run after integration; avoid unnecessary extra production scans.

## Rules for future work
- Read this checkpoint first.
- Never treat module/staking/pool custody addresses as economic owners without checking underlying ownership.
- Mark new findings as VALIDATED / WORKING / OPEN / HYPOTHESIS.
- Record snapshot height/date with mutable on-chain quantities.
- Preserve exact integer reconciliation and fail closed on incomplete scans.
- Do not modify production merely to test an attribution hypothesis.
