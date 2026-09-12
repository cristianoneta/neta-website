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

## NETA DAO claims / “Unstaking” — VALIDATED

Diagnostic snapshot: Juno height `41688972`, block time `2026-09-12T12:25:44.563839Z`.

The production indexer currently sums every DAO `claims` entry into `neta_dao_unstaking` without evaluating `release_at`. A dedicated diagnostic classified each claim against the snapshot block time/height:

- Total claims: `702.382593 NETA`
- Claim records: `295`
- Wallets: `289`
- Still locked / actively unbonding: `0 NETA`, `0` records
- Matured and immediately claimable: `702.382593 NETA`, all `295` records
- Oldest still-unclaimed release time: `2022-11-15T17:38:37.201157Z`
- Latest release time: `2026-08-19T16:57:21.974613Z`

Conclusion: the website label “Unstaking” is technically misleading for the current snapshot. These tokens remain held in the DAO contract and economically attributable to their owners, but none is still time-locked. They are matured, unclaimed withdrawals. Before production integration, consider renaming/splitting the field into `Claimable` and `Unbonding`; current `Unstaking` would entirely map to `Claimable` at this snapshot.

## Osmosis NETA/OSMO Pool 631 — VALIDATED
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

Validated economic-owner reconciliation at Osmosis height `70424425`:
- Pool total shares: `225004459685449894124978 raw shares`
- Direct bank share holders: `578`
- Pool-631 PeriodLock records: `1,422`
- Unique lock owners: `1,411`
- Lockup-module bank balance: `131997302629907807636139 raw shares`
- Sum of Pool-631 PeriodLocks: `131997302629907807636139 raw shares`
- Lockup reconciliation difference: `0`
- Economic wallets after replacing module custody with underlying owners: `1,969`
- Economic shares after unwrapping: exactly total pool supply
- NETA reserve: `901.155656 NETA`
- Attributed NETA: `901.155656 NETA`
- NETA attribution difference: `0.000000 NETA`
- Diagnostic exit code: `0`

Lock metadata at this height:
- `1,418` records had no end time, holding `130442789155461559710253 raw shares`.
- `4` records had an end time, holding `1554513474446247925886 raw shares`.
- Duration distribution: 14 × 1 day, 11 × 7 days, 1,392 × 14 days, 1 × 14 days + 1 second, and 4 × `1209600000` seconds.
- The four explicit end times fall in March/April 2061. These unusual long-duration records must be investigated before interpreting them as ordinary user-initiated unbonding.
- Lock IDs span `1007513` to `1502489`.

All three attribution validations are now **VALIDATED**:
1. Pool-631 PeriodLocks equal the lockup-module bank balance exactly;
2. direct economic shares after replacing module custody equal pool total share supply exactly;
3. attributed NETA equals the Pool 631 NETA reserve exactly.

### Locked-position age investigation — OPEN
We also want to answer whether the Pool 631 positions are ancient locks from the 2022 incentive era or were touched/rebonded later.

Parser finding (2026-09-12):
- Osmosis `PeriodLock` protobuf is confirmed as ID=1, owner=2, duration=3, end_time=4, coins=5.
- Diagnostic run 15 failed because the generic protobuf reader returned negative `int64` timestamp seconds as an unsigned two's-complement integer. Python then raised `OverflowError: timestamp out of range`.
- For locks whose unlocking has not started, Go's zero time is serialized as year 0001, equivalent to Unix seconds `-62135596800`. This is a sentinel meaning “no unlocking end time”, not a future timestamp.
- Commit `8402fd20380e4c2d4a24fa8824219078c78a020b` fixes signed `int64`/`int32` decoding and maps this zero-time sentinel to `None`.
- The post-fix diagnostic completed successfully at height `70424425`; Pool 631 economic-owner attribution is **VALIDATED**. Historical lock age and the four unusual 2061 end-time records remain **OPEN**.

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

Run 15 then isolated the downstream failure to `PeriodLock.end_time` decoding: a negative protobuf `int64` representing Go zero time was interpreted as unsigned and overflowed Python datetime. Commit `8402fd20380e4c2d4a24fa8824219078c78a020b` corrects that parser on the diagnostic branch and triggered the next diagnostic run. The subsequent persisted diagnostic completed with exit code `0` and proved exact Pool 631 lockup, share-supply and NETA-reserve reconciliation at height `70424425`.

## Schema v3 integration — VALIDATED ON DIAGNOSTIC

Implementation exists on `diagnostic/wynd-lp-attribution`; production `main` is not yet changed.

Planned public holder components:
`Juno + Osmosis + DAO Staked + DAO Unstaking + DAO Claimable + LP NETA = Total NETA`.

Implemented behavior:
- DAO claims are classified on every run against the current Juno block time/height using `release_at.at_time` or `release_at.at_height`.
- Pool custody balances are removed from direct Juno/Osmosis attribution before LP redistribution.
- WYND staked/claimed LP and Osmosis Pool 631 locked LP are unwrapped to economic owners.
- Pool 631 GAMM shares are collected in the same 512-prefix Osmosis bank scan as NETA balances; no second full bank scan is performed.
- LP NETA uses deterministic largest-remainder allocation so each pool reserve reconciles to the raw micro-NETA exactly.
- Schema version is raised to `3`; holder rows add `neta_dao_claimable` and `lp_neta`.
- Frontend table, mobile cards, address lookup, headline metrics and methodology text support the new fields.

First integrated diagnostic snapshot:
- Total supply: `31,886.600000 NETA`
- Wallet-attributed: `31,886.390000 NETA`
- DAO residual: `0.210000 NETA`
- Exact total: `31,886.600000 NETA`
- DAO staked: `4,180.135927 NETA`
- DAO actively unbonding: `0.000000 NETA`
- DAO matured claimable: `702.382593 NETA`
- Economic entries before minimum-liquidity cleanup: `13,974`

WYND minimum-liquidity edge case:
- The WYND pair contract itself holds exactly `1,000 raw LP units`.
- That self-share initially received `107 raw NETA = 0.000107 NETA` and caused the strict “pool address absent” validator to fail.
- This is treated as protocol minimum liquidity with no external economic owner.
- Commit `20ac32b07c603467b397d51b467aa5e854a1dfa9` excludes the pair from economic owners, validates economic LP supply plus the 1,000-unit minimum against total LP supply, and allocates the full pool reserve across the attributable LP supply using largest remainder.
- Final persisted validation completed **GREEN** at `2026-09-12T13:00:05.660116Z`.
- Osmosis height: `70426458`.
- Economic holders: `13,973`.
- DAO staked: `4,180.135927 NETA`.
- DAO actively unbonding: `0.000000 NETA`.
- DAO matured claimable: `702.382593 NETA`.
- LP NETA: `1,860.496749 NETA` = WYND `959.341093` + Pool 631 `901.155656`.
- Wallet-attributed: `31,886.390000 NETA`; DAO residual: `0.210000 NETA`; total: `31,886.600000 NETA`.
- All seven schema-v3 validation flags passed, both pool custody addresses were absent from economic rows, and output schema fields were present.


## Production schema v3 — DEPLOYED AND VALIDATED

Production deployment:
- Atomic code/frontend integration commit on `main`: `491684eadf7bdd13ea6cbc6559ee4dfd72ac07d2`.
- Successful schema-v3 data commit: `845f3bd9dea382b572f0ac55554ce8661ed5b9f7`.
- Generated at: `2026-09-12T13:08:25.511118Z`.
- Juno DAO snapshot height: `41689824`.
- Osmosis snapshot height: `70426854`.
- Production metadata has `schema_version: 3` and all seven validation flags true.
- Production totals: `13,973` economic holders; `4,180.135927` staked; `0.000000` unstaking; `702.382593` claimable; `1,860.496749` LP NETA; `31,886.390000` wallet-attributed + `0.210000` residual = `31,886.600000` total supply.
- Production workflow requested the Pages rebuild after its data commit.

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


## Custody holder metric semantics — FIXED 2026-09-12

The unchanged frontend cards `JUNO CUSTODY` and `OSMOSIS CUSTODY` must count economic holders by custody chain, not merely addresses found in the direct token bank/CW20 scans.

Definitions:
- Juno custody includes direct Juno NETA, NETA DAO staking, actively unbonding DAO claims, matured claimable DAO claims, and economically attributed WYND LP NETA.
- Osmosis custody includes direct Osmosis NETA and economically attributed Pool 631 LP NETA.
- A holder present on both chains is counted in both custody cards but once in `economic_master_entries`.

Required invariant:

`juno_custody_addresses + osmosis_primary_state_addresses - overlap == economic_master_entries`

The metadata key names remain unchanged to preserve the existing frontend. Commit `850047c52341837bfd723c0fc17b9cd52cd1015e` changes only the indexer's calculation behind those values and adds a fail-closed validation flag, `custody_holder_union_equals_economic_holders`.


### Frontend cache refresh incident — 2026-09-12

The corrected production metadata was committed successfully at `eaff76a5c6fbcecb611c2875d18f01a729d1238e`, but the public page continued to display the preceding snapshot because `index.html` referenced generated assets with the unchanged fixed cache key `v=20260912-3`. Commit `0f6f75d64f996a1b55350700ec83d8ea8a727619` advances the invisible asset cache key to `v=20260912-4`; no visual frontend behavior changed. When generated data semantics change, refresh the asset query version or adopt a generated content/version key so browsers and the Pages CDN cannot retain an older `data.js`.


## Map of NETA — FORWARD-COLLECTION MVP

Branch: `feature/map-of-neta`.

Product decision (2026-09-12):
- Launch with a real rolling 24-hour view and no speculative historical backfill.
- Persist validated movements from the collection start onward.
- Unlock 7D, 30D and 90D only after that much continuous data has actually accumulated.
- Juno is the fixed central origin-chain node; NETA is the flowing asset, not a node.
- Chain nodes use chain symbols, rounded NETA custody amounts and hover labels.
- Right sidebar shows 30-day net Power Buyers and Top Sellers once sufficient history exists.
- DEX rankings exclude transfers, IBC movements, staking, claims and LP deposits/withdrawals; ranking is net bought or net sold NETA across validated markets.

Diagnostic findings:
- Initial LCD probes used the legacy repeated `events` parameters and returned `query cannot be empty`; the current endpoint expects one `query` expression.
- Initial Tendermint RPC probes encoded `query` correctly but not the string-valued `order_by` parameter, producing an HTTP-RPC parameter decoding error.
- Commit `94ff8564c6f27155956c998e3ce054df93e471bc` corrects both query formats. A new isolated diagnostic run will determine actual indexed event availability.
- Production remains unchanged until event parsing and accounting are validated.


### Map of NETA production collector — DEPLOYED 2026-09-12

- Forward collection started at `2026-09-12T18:05:26.203149Z`.
- Production collector and initial page were fast-forwarded to `main`; first production continuation commit: `1ca1d018415e3060b02ac9d806b6c6189fe97080`.
- The collector uses indexed transaction queries with persisted Juno/Osmosis height cursors, a five-block finality buffer, deterministic event IDs and fail-closed validation.
- Normalized events are stored by UTC day under `data/map/days/`; technical progress is in `data/map/state.json`; the frontend reads `data/map/map-of-neta.json`.
- The lightweight workflow runs at the same four Berlin-local windows as the holder data and requests a Pages rebuild after changed production data.
- The 24H period remains marked unavailable until a complete 24 hours has been collected. Longer periods remain unavailable until their full real history exists.
- The production page is `map-of-neta.html`; chain balances are sourced from validated holder metadata and displayed rounded, while raw stored values retain six decimals.
- Completed oversized discovery output and its temporary workflow/script were removed before production.


## Map of NETA visual/navigation update — DEPLOYED 2026-09-12

- Juno and Osmosis nodes use authentic chain-registry logo assets stored locally as `assets/juno-chain.png` and `assets/osmosis-chain.png`.
- Both marks are rendered in the site's phosphor-green Matrix palette while preserving their recognizable geometry.
- A restrained, irregular CSS flicker adds brief opacity shifts, horizontal clipping/glitch lines and scanlines; `prefers-reduced-motion` disables animation.
- Period controls include `180D` and `1Y` after `90D`; they remain disabled until sufficient verified forward-collected history exists.
- Map of NETA includes the same Telegram community CTA and footer treatment as the other pages.


### Map logo rendering correction — 2026-09-12

- The first monochrome PNG approach was rejected: a global CSS filter recolored Juno's opaque dark disc together with its emblem, producing a solid green circle.
- Production now uses transparent, purpose-built `juno-matrix.svg` and `osmosis-matrix.svg` artwork. Their recognizable chain silhouettes are filled with visible binary-code texture in the Matrix palette.
- The surrounding irregular flicker remains secondary; logo recognition and code texture are the primary visual treatment.


### Map logo selection — 2026-09-12

- The selected final direction is concept variant C, “Holographic Scan”.
- Original Juno and Osmosis silhouettes remain crisp in the foreground.
- Binary columns move vertically from top to bottom behind the emblems.
- A bright horizontal scan beam passes through each logo at offset intervals; the general flicker remains restrained.


### Map logo scale correction — 2026-09-12

- Production was compared against the approved concept and found materially undersized: the previous CSS constrained Juno/Osmosis artwork to 58/50 px and confined code to the badge.
- Corrected treatment uses approximately 90 px for Juno and 76 px for Osmosis on desktop, removes the extra badge border/background, keeps the official emblems dominant, and adds independent binary-code columns across the larger logo area.
- The vertical code rain moves top-to-bottom behind each emblem; a separate horizontal scan beam crosses the full logo/code area.


### Authentic-logo production correction — 2026-09-12

- The hand-built approximation SVGs were rejected after visual comparison with the approved concept.
- Production now uses the authentic chain-registry PNG artwork, recolored deterministically into a dark/mint phosphor palette while preserving original geometry, shading, transparency and internal detail.
- Assets: `assets/juno-matrix-official.png` and `assets/osmosis-matrix-official.png`.
- Matrix digits and the horizontal scan beam remain independent CSS layers behind/over the unmodified logo artwork; no filter collapses the Juno disc and no custom-drawn flask replaces Osmosis.


## Multichain NETA detection — BASE LAYER VALIDATED 2026-09-12

- Chain Registry search currently finds NETA officially on Juno and Osmosis only; no verified Terra NETA denom was found.
- The old Map parser hard-coded every outgoing CW20-ICS20 transfer as Juno→Osmosis and every receive as Osmosis→Juno.
- New resolution order: explicit event chain ID, verified Juno channel mapping, remote Bech32 prefix, then `unknown:<channel>`. Unknown routes are never silently labeled Osmosis.
- Shared registry: `data/map/chains.json`. Terra/Cosmos Hub are detection-only until exact NETA denom and reliable LCD are verified.
- Map exports generic `flows.routes` and `flows.discovered_chains` while retaining legacy Juno/Osmosis totals.
- Ranking remains fail-closed: movement detection may precede ranking support, but holder balances require verified denom, endpoint and custody reconciliation.


### Multichain detector production validation

- Implementation commit: `fe4b24968c9fa3136ea640010e331a1e1b3023ea`.
- First production data continuation: `dd2c66ced6fbf138b7e18897aa85cba760bccea2`.
- Workflow unit tests and collector completed successfully.
- Export validation: `unknown_routes_not_misclassified: true`; all validation flags passed.
- No IBC movements have yet been observed in the forward-collected window, so `routes` and `discovered_chains` are currently empty.
- This validates movement detection/classification infrastructure only. Holder-ranking support for a third chain remains pending until its NETA denom, endpoint and custody reconciliation are verified.
