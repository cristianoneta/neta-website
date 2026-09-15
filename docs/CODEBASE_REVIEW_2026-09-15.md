# Codebase review — 2026-09-15

Scope: browser frontend, data collectors, GitHub Actions, NETA Socials and its
Uni-7 stake mock. This review is a checkpoint, not a claim that future chain,
endpoint or dependency changes are safe automatically.

## Result

No new critical vulnerability or accounting bypass was found in the reviewed
source. The existing transaction flows remain fail-closed and require Keplr.
The project is suitable for controlled mainnet use. The NETA Socials findings
below were the pre-launch gates; they were subsequently completed, and the
production instance was activated at height `41784461`. Current state is
recorded in `OPERATIONS_KNOWLEDGE.md` and the release manifest.

## Post-launch closure review

The complete production tree was reviewed again after Socials activation.
Application JavaScript passed syntax checks, all deterministic Python suites
passed, npm reported no known vulnerabilities, and the required GitHub browser
suite remained the merge gate. No new critical transaction, authorization or
accounting defect was found. The deployed Socials contract and public signing
messages were intentionally left unchanged after launch.

The closure changes make local and CI checks use the same deterministic runner,
add manifest and contract paths to central CI, correct stale Uni-7 wording, and
add an hourly fail-closed production-data freshness monitor. Large browser
controllers remain a maintainability concern, but splitting them immediately
after mainnet activation would add regression risk without changing a security
boundary; that work should occur incrementally behind existing browser tests.

The review also corrected release metadata from `1.0.0` to the deployed
Cargo/CW2 version `0.2.1`. The stored WASM checksum and mainnet code ID were
already correct; this was a documentation mismatch, not a bytecode mismatch.

## Changes made by this review

- Central CI now installs Python dependencies and executes every deterministic
  `scripts/test_*.py` suite, rather than only a subset.
- GitHub Pages write permission moved out of the PR test job into a separate
  main-push deployment job with minimal permissions.
- Socials resolves the moderator set once per loaded page instead of querying
  moderator status once per author. Ban lookups remain per author because the
  contract has no paginated ban-list query.
- Socials now resolves roles for newly paginated comments as well as the first
  page, preventing missing moderator/banned state after “Load more”.
- Current operational knowledge was separated from the chronological checkpoint
  so stale handoffs no longer masquerade as current instructions.

## Verification

- All 14 deterministic Python test programs: passed.
- JavaScript syntax checks: passed.
- `npm audit --audit-level=low`: 0 vulnerabilities.
- Browser suite: 46 tests are defined and passed in the required GitHub CI
  acceptance gate. A fresh local checkout must run
  `npm run test:browser:install` once before `npm test`.
- Rust format/clippy/tests/audit: local Cargo is unavailable; the pinned contract
  workflows remain the acceptance gate.

## Prioritized findings

### Completed pre-launch findings

- The synthetic Uni-7 mock was replaced by the real DAO staking contract for
  mainnet. Distinct non-owner wallets below and above 10 NETA verified both
  sides of the production gate before activation.
- Contract dependencies remain intentionally locked on CosmWasm 1.5.x with two
  reviewed RustSec exceptions. The advisory database and Juno mainnet VM
  compatibility were checked before deployment; CI continues to rebuild and
  compare the exact optimized WASM.
- Application owner and chain migration admin are separate powers. A mainnet
  governance/multisig transition must address both explicitly.
- Hidden content remains publicly queryable by design. UI moderation is a
  presentation layer, not deletion; policy and user copy must preserve that fact.

### P1 — operational

- Terra packet sequence 36 still accounts for exactly `0.010000 NETA`. Keep the
  route disabled until acknowledgement or timeout/refund is proven.
- Endpoint health and scheduled collector completion are operational state, not
  guaranteed by passing source tests. Alerting should verify freshness timestamps
  and workflow conclusion, not merely that a cron was scheduled.

### P2 — maintainability and performance

- Large controllers (`wynd-recovery.js`, `neta-socials.js`) combine transport,
  state, rendering and transaction orchestration. Extracting typed/configured
  transport and pure state reducers would reduce regression surface, but should
  be incremental and test-backed.
- Several collectors intentionally catch broad endpoint/parser exceptions for
  failover. Each terminal failure is surfaced, but structured error categories
  would make worker incidents easier to diagnose than free-form messages.
- Browser and Python formatting/linting are not enforced centrally. Add a
  formatter/linter only in a dedicated mechanical PR to avoid mixing semantic
  chain changes with repository-wide churn.
- Chain endpoints and identifiers appear in multiple browser modules. A single
  generated, validated chain registry would reduce configuration drift.
- Socials still performs one ban query per unique author. If large threads make
  this material, add a contract-side paginated ban query in a migration rather
  than hiding the cost with client caching.

### P3 — known design debt

- CSP still permits inline styles for the Matrix canvas. Moving runtime sizing
  to classes or element attributes would allow removing `style-src 'unsafe-inline'`.
- The historical checkpoint is valuable but long. Keep new facts in the
  canonical operations document and reserve the checkpoint for dated evidence.

## Review standard going forward

Every release should identify the exact chain/network, immutable addresses and
code IDs, authority, allowed messages, attached funds, gas policy, post-state
proof, dependency lock, and rollback/pause path. A green UI test is not a chain
compatibility proof, and a successful broadcast is not confirmation unless the
expected state is observed.
