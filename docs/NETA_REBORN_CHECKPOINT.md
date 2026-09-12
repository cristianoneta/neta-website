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


## WYND DEX user recovery page — NEW PROJECT CHECKPOINT 2026-09-12

### Goal
Create a new subpage on the existing NETA Reborn website that lets **any user** connect a Juno wallet and recover liquidity currently inaccessible through the former normal WYND DEX frontend. This is not limited to selected wallets. The initial scope is the **five largest relevant WYND pools by current recoverable USD pool value**.

Expected per-wallet flow:
1. Connect a Juno wallet using a standard wallet provider such as Keplr/Leap.
2. Read and display all of that address's positions in the selected five pools.
3. Separate direct LP tokens, actively staked LP, locked-token stake components, unbonding claims and already claimable LP.
4. Show the estimated underlying assets and USD value for each position, with timestamp and price source.
5. Offer only actions valid for the current state:
   - **Unstake / Unbond**
   - **Claim LP** after its release condition is satisfied
   - **Withdraw Liquidity** by sending the recovered LP token to the relevant pair contract with the exact withdrawal hook
6. Preview the contract, message, amounts and expected next state before the wallet asks the user to sign.

The page must be non-custodial. It never receives funds or seed phrases and never signs transactions. It only constructs messages; the user's wallet signs and broadcasts them.

### Known validated reference pool
WYND JUNO/NETA remains the only pool already fully reconstructed:
- Pair: `juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra`
- LP CW20: `juno1uu3cewmpynvgsdu3lfqv2rh2n5nwtrguahkw64wjk99eg8r6fsss0e757x`
- Stake: `juno1tlhf68k8aksl30mdf5yngudk6z8w4qqzvvauzr92w3gwm7er9p9qxvudu7`
- LP supply: `8,961,136,120 raw LP`
- Stake custody: `8,738,464,169 raw LP`
- Active stake including `locked_tokens`: `7,157,563,479 raw LP`
- Claims/unbonding: `1,580,900,690 raw LP`
- Pool reserve at the validated snapshot: `959.341093 NETA`
- Active stake wallets found: `3,334`
- Claims found: `724`

### Top-five pool discovery — OPEN
A previously discussed “top five WYND pools by USD value” list was not persisted in the checkpoint and could not be recovered reliably from available project artifacts. Do **not** guess or reuse an unverified list.

Required next step:
- enumerate the live WYND factory/pair set on Juno;
- query each pair's assets/reserves, LP token and staking contract;
- determine which pools still hold economically recoverable user liquidity;
- value both sides consistently using explicit current price sources;
- rank by total current recoverable pool value;
- persist the exact top five with Juno height, UTC timestamp, pair, LP and stake addresses, raw reserves, display reserves, prices and USD value;
- prove for each selected pool that stake plus claim accounting reconciles to stake-contract LP custody before enabling transactions.

Current technical progress:
- The current Juno LCD is reachable.
- The original public WYND DEX contract repository `wynddao/wynddex` is available and confirms the relevant message families.
- Contract definitions show stake actions including `Unbond` and `Claim`, and pair liquidity withdrawal via `WithdrawLiquidity`.
- Exact serialized execute messages and all state/edge-case handling still need to be verified against the deployed code versions of each selected contract. Never infer a deployed message shape solely from a current source branch.

### Recovery UI safety requirements
- Start read-only and build a transaction simulator/preview before enabling signing.
- Verify wallet network is `juno-1`.
- Never request or handle mnemonic/seed phrases.
- Use explicit allowlisted pair, LP and stake addresses from the validated pool registry.
- Disable action buttons if the live contract code ID/config no longer matches the validated deployment record.
- Re-query the wallet position immediately before constructing a transaction.
- Never label a claim as withdrawable until its release condition is mature at the current Juno block time/height.
- Do not combine multiple destructive financial actions invisibly. Display each transaction and resulting state.
- Pause all decorative animation while a wallet approval modal is expected.
- Test every message with tiny controlled positions or reliable simulation before production.
- Production must remain unchanged during pool discovery and contract-message validation.

### Visual direction
The user requested a “risky recovery mission” presentation consistent with the existing Matrix/terminal style.

Specific effect:
- On the recovery subpage only, the screen should go completely black for **0.5 seconds every 5 seconds**.
- Provide a clearly discoverable **BLACKOUT EFFECT ON/OFF** control.
- Default behavior and accessibility must be evaluated in the draft; at minimum respect `prefers-reduced-motion`.
- Suspend the blackout while the user is reading a transaction preview, signing in Keplr/Leap, broadcasting, or viewing success/error feedback.
- The blackout is presentation only and must never cause navigation, lose component state, reset forms, move scroll position or interrupt RPC/wallet operations.

### Separate frontend issue — OPEN
The user reported that scrolling on an existing page can cause the view to jump back to the top. This predates the recovery subpage and is not caused by unpublished recovery work. Investigate recurring DOM replacement, focus management, hash navigation, data refresh/reload and scroll restoration separately. Do not carry the defect into the recovery page.

### Immediate continuation instruction for the next chat
Read this checkpoint first. Then:
1. finish on-chain enumeration and valuation of all recoverable WYND pools;
2. present the verified top five in a table;
3. validate deployed query/execute message shapes and recovery state machine for all five;
4. update this checkpoint with the evidence;
5. create and show the user a frontend draft **before** changing production;
6. do not publish until the user explicitly approves the draft.


### WYND recovery top-five discovery — VALIDATED 2026-09-12

Read-only diagnostic branch: `diagnostic/wynd-recovery-discovery`.

Evidence files:
- `docs/diagnostics/wynd_recovery_discovery.json`
- `docs/diagnostics/wynd_recovery_validation.json`

The deployed factory was derived from the known JUNO/NETA pair's on-chain creator:
- Factory: `juno16adshp473hd9sruwztdqrtsfckgtd69glqm6sqk0hc4q40c296qsxl3u3s`
- Factory code ID: `2285`
- 32 registered pairs were enumerated and all 32 pair/pool/LP/stake records were read successfully.
- Discovery snapshot: Juno height `41699538`, generated `2026-09-12T20:37:27.855545Z`.
- Price source: CoinGecko simple/price, timestamp `2026-09-12T20:36:32.960143Z`.
- Pools with both priced assets use the sum of both externally priced reserves. Pools with one priced reserve use twice that reserve and are explicitly marked as an estimate; unpriced token values are never guessed.

Validated top five by current recoverable USD pool value:

| Rank | Pool | Estimated value | Pair |
|---|---|---:|---|
| 1 | JUNO / ATOM | $26,794.33 | `juno17uv02azt545ag23xq7whw6z3r3chw7jwztnr9lypugy62drq3caqeyd2r3` |
| 2 | JUNO / USDC | $13,169.87 | `juno1gqy6rzary8vwnslmdavqre6jdhakcd4n2z4r803ajjmdq08r66hq7zcwrj` |
| 3 | JUNO / OSMO | $4,502.50 | `juno1u2pl8ql778655wakqmnhpln65q9pughd6jnrp93xwf4zakqjdh6qx3y9yt` |
| 4 | WYND / USDC | $3,044.23 | `juno18zk9xqj9xjm0ry39jjam8qsysj7qh49xwt4qdfp9lgtrk08sd58s2n54ve` |
| 5 | JUNO / NETA | $2,181.41 | `juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra` |

All five selected deployments share:
- pair code ID `2289`, CW2 `wyndex-pair 1.0.0`;
- LP code ID `1699`, CW2 `crates.io:cw20-base 1.0.1`;
- stake code ID `2291`, CW2 `crates.io:wyndex_stake 2.0.0`;
- unbonding periods of 7, 14, 28 and 42 days.

Fail-closed economic reconciliation for the initial top five completed before the final top-eight run:
- JUNO/ATOM: supply `89,761,104,045`; stake custody `87,491,323,725`; active `71,525,759,016`; claims `15,965,564,709`; difference zero.
- JUNO/USDC: supply `52,511,840,165`; stake custody `52,026,132,133`; active `45,677,563,933`; claims `6,348,568,200`; difference zero.
- JUNO/OSMO: supply `104,783,420,853`; stake custody `104,279,904,828`; active `94,669,225,628`; claims `9,610,679,200`; difference zero.
- WYND/USDC: supply `74,958,722,515`; stake custody `71,688,224,514`; active `58,163,579,814`; claims `13,524,644,700`; difference zero.
- JUNO/NETA: supply `8,961,136,120`; stake custody `8,738,464,169`; active `7,157,563,479`; claims `1,580,900,690`; difference zero.

Across all five, every claim record was matured and claimable at the validation snapshot; actively unbonding records were zero. The deployed stake v2.0.0 contracts do not support the later `unbond_all` query, so the recovery UI must not depend on it.

Validated serialized action families for these deployments:
- Stake unbond: `{"unbond":{"tokens":"<raw_lp>","unbonding_period":<seconds>}}`
- Stake claim: `{"claim":{}}`
- LP withdrawal: execute CW20 `send` on the allowlisted LP token, with the allowlisted pair as `contract` and Base64 hook `{"withdraw_liquidity":{"assets":[]}}`.

The UI must still re-query the connected wallet immediately before preview/signing. Signing remains disabled until simulation with controlled positions is complete.


### WYND recovery top-eight frontend foundation — VALIDATED 2026-09-12

The selected scope is now ranks 1–8: JUNO/ATOM, JUNO/USDC, JUNO/OSMO, WYND/USDC, JUNO/NETA, WYND/JUNO, WYND/ATOM and WYND/OSMO.

Final read-only validation:
- Diagnostic output generated at `2026-09-12T21:03:23.499321Z`.
- Juno snapshot height `41700087`, block time `2026-09-12T20:59:17.788755915Z`.
- All eight pools use pair code ID `2289`, LP code ID `1699` and stake code ID `2291`.
- For every pool, direct LP balances equal total LP supply exactly.
- For every pool, active stake including `locked_tokens` plus claims equals stake-contract LP custody exactly.
- Every observed claim record was matured and claimable; actively unbonding records were zero.
- All live pair and required stake query shapes passed.
- The deployed `stake.unbond_all` query remains unsupported and excluded.

Additional pool reconciliations:
- WYND/JUNO: supply `250,846,698,920`; stake custody `242,151,413,511`; active `198,000,063,111`; claims `44,151,350,400`; difference zero; 798 claim records, all claimable.
- WYND/ATOM: supply `16,230,598,229`; stake custody `16,018,688,288`; active `7,012,992,488`; claims `9,005,695,800`; difference zero; 87 claim records, all claimable.
- WYND/OSMO: supply `95,380,460,556`; stake custody `51,166,119,305`; active `42,938,276,505`; claims `8,227,842,800`; difference zero; 150 claim records, all claimable.

Frontend foundation artifacts:
- `data/recovery/wynd-pools.json`: generated Top-8 allowlist with exact contract addresses, code IDs/CW2 versions, assets/decimals, unbonding periods, validated query/action schemas and snapshot evidence.
- `docs/recovery/WYND_RECOVERY_STATE_MACHINE.md`: fail-closed wallet/action state machine.
- Registry status: `VALIDATED_FOR_READ_ONLY_FRONTEND`.
- Signing is intentionally disabled until controlled simulation and tiny-position transaction tests have validated gas, fees, events, rejection paths and post-transaction refresh.


### WYND recovery frontend draft and achievement statistics — WORKING 2026-09-12

Draft files on `diagnostic/wynd-recovery-discovery`:
- `wynd-recovery.html`
- `wynd-recovery.css`
- `wynd-recovery.js`
- `data/recovery/recovery-stats.json`

Implemented draft behavior:
- Loads only the validated Top-8 registry.
- Connects a Juno wallet through an injected Keplr/Leap provider and reads direct LP, active stake, internal locked components, claimable LP and still-unbonding LP.
- Uses current block height as well as block time to classify claim maturity.
- Never offers locked stake as freely unbondable.
- Shows transaction previews with signing disabled.
- Implements the requested 0.5-second blackout every 5 seconds, an ON/OFF control, reduced-motion handling and automatic suspension while a preview dialog is open.
- Shows aggregate and per-pool `Unstaked via NETA Reborn` and `Claimed via NETA Reborn` USD statistics.

Statistics attribution decision:
- Site-created transactions use memo `netareborn.com/wynd-recovery:v1`.
- Only confirmed, allowlisted transactions with the exact memo may be counted.
- Collection starts at launch with zero; no historical action is attributed retroactively.
- Unstaked USD is valued when an Unbond transaction is confirmed.
- Claimed USD is valued when a Claim transaction returns LP to the wallet.
- These are separate process milestones; the same LP value may appear in both and the figures must not be summed as unique recovered value.
- Production collector implementation and price-at-block validation remain required before publication.

Testing without the user's own stake:
- Read-only empty-wallet behavior can be tested immediately.
- State-dependent execute messages can be tested with unsigned chain simulation using existing on-chain position holders as the sender context; this does not sign, broadcast or move their assets.
- Final broadcast testing still requires a consenting test wallet or a tiny controlled position.


### Recovery statistics collector and unsigned simulations — VALIDATED 2026-09-12

Statistics implementation:
- `scripts/update_wynd_recovery_stats.py`
- `scripts/test_wynd_recovery_stats.py`
- `.github/workflows/update-wynd-recovery-stats.yml`
- Exact public memo: `netareborn.com/wynd-recovery:v1`.
- Forward-only cursor with five-block finality buffer.
- Only successful transactions with the exact memo, an allowlisted stake contract and a recognized `unbond` or `claim` event are accepted.
- Deterministic event IDs prevent duplicate counting.
- USD values use the LP share of live pool reserves at the first successful collector run after confirmation, with price source and timestamp retained per event.
- Statistics parser and Top-8 registry dry-run completed successfully.
- Collection is intentionally not initialized on the unpublished branch; the official counters start at production launch.

Unsigned simulation:
- Evidence: `docs/diagnostics/wynd_recovery_simulation.json`.
- Network: `juno-1`; representative JUNO/ATOM pool uses the same validated pair/LP/stake code IDs as all Top-8 pools.
- Unbond succeeded in simulation: 215,620 gas used.
- Claim succeeded in simulation: 221,614 gas used.
- CW20 Send + WithdrawLiquidity hook succeeded in simulation: 320,811 gas used.
- Real existing position owners were used only as unsigned simulation sender context.
- All simulations returned result data; no signature was created and no transaction was broadcast.
- A controlled tiny-position broadcast and post-transaction state verification remain required before signing can be enabled.
