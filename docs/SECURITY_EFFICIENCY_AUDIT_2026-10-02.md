# Website security and efficiency audit — 2026-10-02

## Scope

First-party wallet signing, swap/recovery/IBC flows, chain data collection, browser sinks/CSP, dependency manifests, build outputs and CI were reviewed alongside the DAO repository. This is targeted source review and regression testing, not a formal audit of wallets, chains, deployed contracts or third-party cryptography. No live attack transactions were sent.

The cross-project findings and RELAY release blockers are documented in [DAO security audit](https://github.com/cristianoneta/neta-dao/blob/audit/security-efficiency-20261002/docs/SECURITY_EFFICIENCY_AUDIT_2026-10-02.md).

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
| Ambiguous broadcast acceptance after RPC timeout | Open, medium | The client may not receive a hash after a node accepted a transaction. Re-enabling confirmation can allow a duplicate user retry. Persist signed transaction bytes/hash/sequence and reconcile pending state before enabling resubmission. Do not interpret every transport failure as chain rejection. |
| Third-party contract/RPC trust | Architectural residual risk | Query data and transaction simulation rely on configured nodes; code review does not attest deployed chain state or third-party WYND contract correctness. Preserve exact contract/route allowlists and fail-closed checks. |

## Efficiency priorities

1. Completed: avoid duplicate transaction simulation and redundant IBC balance requests; disconnect recovery clients.
2. Measure shared signing bundle loading: three generated bundles are approximately 1.6 MB each before compression. Prefer measured shared chunks/lazy loading over broad changes without payload evidence.
3. Keep immutable-height collector consistency; avoid repeating full historical scans. Cache immutable ranges and denom traces, bound concurrency and detect pagination truncation.
4. Suppress hidden-view polling where it has no freshness benefit. Large map/holder datasets should load on demand and be profiled with real transfer/compression measurements.

## Validation

The deterministic website Python checks and JavaScript syntax checks passed. Both explicit-fee unit tests passed. npm audit reported zero advisories. Browser regression scenarios cover changed reviewed amount and frozen controls, but local browser execution remains pending because the Chromium download was invalid/truncated. CI browser checks must pass before integration. Cargo is unavailable locally; no Rust source changed in this audit.

The DAO has additional local passing suites and unresolved RELAY availability risks; see its report. No direct fund theft or wallet-key extraction was established. This is not a guarantee that every vulnerability has been found. Tracked-file pattern scanning was limited; no full git-history secret audit was performed.

## Continuation

Use CURRENT_STATE.md and HANDOFF.md as the navigation entry point. Resolve ambiguous broadcast retries before broadening transaction UX; retain reviewed intent and wallet identity checks. Mainnet messaging must remain disabled until the DAO RELAY blockers and adversarial regressions are resolved. Verify new bundle versions in deployment after integration.
