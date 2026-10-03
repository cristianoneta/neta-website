# Website security and efficiency audit — 2026-10-02

## Scope

First-party wallet signing, swap/recovery/IBC flows, chain data collection, browser sinks/CSP, dependency manifests, build outputs and CI were reviewed alongside the DAO repository. This is targeted source review and regression testing, not a formal audit of wallets, chains, deployed contracts or third-party cryptography. No live attack transactions were sent.

The cross-project findings and RELAY release blockers are documented in [DAO security audit](https://github.com/cristianoneta/neta-dao/blob/main/docs/SECURITY_EFFICIENCY_AUDIT_2026-10-02.md).

## Changes and findings

| Finding | Status | Evidence / behavior |
| --- | --- | --- |
| Reviewed transaction parameters could change during asynchronous signing | Fixed | `rescue-neta.js` binds confirmation to address, amount, direction and slippage, checks after a fresh quote and freezes input controls. `ibc-transfer.js` captures the reviewed transfer and uses it throughout signing. Account identity is checked before signing. |
| Stale quote/balance response after changed input | Fixed | Quote invalidation advances request identity immediately, before debounce. IBC errors from superseded balance requests no longer replace the current state. |
| Numeric fee adjustment caused another automatic CosmJS simulation | Fixed | `src/transaction-fee.mjs` validates the approved gas estimate/cap and constructs an explicit fee. Swap, recovery and IBC send the checked estimate with one adjustment instead of triggering a second simulation. Unit tests cover gas bounds, unsafe adjustments and exact fees. |
| Recovery signing client resources remained open | Fixed | `wynd-recovery.js` disconnects signing clients in the attempt's finalizer. |
| Map IBC RPC endpoints blocked by page CSP | Fixed | Shell generator allows the exact required Osmosis REST/RPC/WSS origins on the map page. Signing bundles remain lazy-loaded. |
| Shared DAO signing client hardcoded testnet fee | Fixed | `src/socials-testnet-client.js` accepts an explicit gas price while keeping the testnet default. DAO mainnet caller supplies `0.075ujuno`; both generated bundles were rebuilt together. |
| Invalid/future price timestamp and non-positive price | Fixed | Swap market loader rejects invalid/non-positive prices and implausibly future timestamps. Existing age gate remains. |
| Ambiguous broadcast acceptance after RPC timeout | Repaired in #138 within browser/origin scope | Signed bytes/hash/sequence persist before broadcast. Unknown outcomes block new signatures across reloads until exact-hash inclusion is reconciled. Separate origins/devices, cleared storage, interrupted signing and upload/instantiate helpers remain outside the automatic recovery guarantee. |
| Third-party contract/RPC trust | Architectural residual risk | Query data and transaction simulation rely on configured nodes; code review does not attest deployed chain state or third-party WYND contract correctness. Preserve exact contract/route allowlists and fail-closed checks. |

## Efficiency priorities

1. Completed: avoid duplicate transaction simulation and redundant IBC balance requests; disconnect recovery clients.
2. Measure shared signing bundle loading: three generated bundles are approximately 1.6 MB each before compression. Prefer measured shared chunks/lazy loading over broad changes without payload evidence.
3. Keep immutable-height collector consistency; avoid repeating full historical scans. Cache immutable ranges and denom traces, bound concurrency and detect pagination truncation.
4. Suppress hidden-view polling where it has no freshness benefit. Large map/holder datasets should load on demand and be profiled with real transfer/compression measurements.

## Original audit validation (historical)

The deterministic website Python checks and JavaScript syntax checks passed. Both explicit-fee unit tests passed. npm audit reported zero advisories. Browser regression scenarios cover changed reviewed amount and frozen controls, but local browser execution remains pending because the Chromium download was invalid/truncated. CI browser checks must pass before integration. Cargo is unavailable locally; no Rust source changed in this audit.

The DAO has additional local passing suites and unresolved RELAY availability risks; see its report. No direct fund theft or wallet-key extraction was established. This is not a guarantee that every vulnerability has been found. Tracked-file pattern scanning was limited; no full git-history secret audit was performed.

## Continuation

Use CURRENT_STATE.md and HANDOFF.md as the navigation entry point. Resolve ambiguous broadcast retries before broadening transaction UX; retain reviewed intent and wallet identity checks. Mainnet messaging must remain disabled until the DAO RELAY blockers and adversarial regressions are resolved. Verify new bundle versions in deployment after integration.

### Original CI handoff (superseded by verified integration below)

Website Test website run 307 passed, including browser integration and reproducible bundles. DAO RELAY browser crypto run 31 passed, including stale-response regressions and the optional adversarial test that intentionally reproduces the open persistent-lock blocker. DAO contract/frontend run 136 was still running; website production-data run 409 was pending. Check final outcomes before merging. Code checkpoint SHAs are recorded in HANDOFF.md; these follow-up documentation changes do not change the tested implementation.

## 2026-10-03 continuation — broadcast journal

PR #137 was merged after Test website run 308 and production-data run 410
passed. Merge: `4109b2ed3f8dcbbda587cc3d3f90c59a9ac40b14`. Eight deployed
website/DAO code assets matched their reviewed bytes on both domains.

W2 follow-up adds `src/broadcast-journal.mjs` to recovery, swap, IBC and shared
Socials/DAO execute adapters. A Web Lock serializes attempts per origin/chain/
account. Signed TxRaw bytes, SHA-256 hash and signer sequence are persisted
and read back before broadcast. RPC errors, malformed results and missing
index entries keep the account locked across reloads. A later included result
produces a reconciliation notice before a separately reviewed new action.
Signature rejection before any broadcast may clear its signing intent.

The guarantee is browser/origin-local, not coordination with another device,
another domain, wallet app or manually cleared storage. Interrupted signing
intents and transactions permanently rejected before inclusion currently require
manual investigation; no automatic reset or rebroadcast is implemented. Storage
or Web Locks unavailability fails closed. Upload/instantiate helpers are not
covered. Final website/browser/reproducible-bundle run 311 and production-data
run 422 passed before #138 merged. Five local Node fee/journal tests and deterministic Python checks
passed. Mainnet messaging remains disabled.


## Current security checkpoint — 2026-10-03

Security PRs #137/#138 and documentation PR #139 are merged. The relevant final
website/browser, reproducible-bundle and production-data checks passed; Pages
1123 published #139. The resumed verification compared ten website production
files with the checked GitHub revision, including all four signing bundles.
See [the evidence](SECURITY_CONTINUATION_2026-10-03.md).

The broadcast journal is deployed: signed bytes/hash/sequence are persisted before
broadcast, and unknown outcomes block further signatures across reloads until
exact-hash inclusion is reconciled. This is browser/origin-local; other devices,
domains, manually cleared storage and upload/instantiate helpers are outside the
guarantee. Interrupted signing and permanent rejection require investigation.
Never delete pending records merely to enable another transaction.

Continue messaging work in neta-dao. Mainnet messaging stays disabled; coherent
automatic off-device recovery and v0.2 consent/generation integration remain open.
No real wallet keys or live attack transactions are permitted in this task.
