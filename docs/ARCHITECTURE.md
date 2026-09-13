# NETA Reborn architecture

## Layers

| Layer | Responsibility | Must not do |
| --- | --- | --- |
| Browser pages | Render committed snapshots and perform read-only wallet queries | Reconstruct canonical historical valuations |
| Page scripts | Page-specific interaction and rendering | Copy shared shell, canvas or network infrastructure |
| `scripts/neta_core/` | LCD failover, CosmWasm queries, price lookup and deterministic JSON I/O | Contain NETA/WYND business rules |
| Collectors | Fetch chain state and build validated snapshots | Publish partially validated output |
| GitHub Actions | Schedule, test and serialize generated-data commits | Commit routine test logs to `main` |

## Data pipelines

1. A scheduled or manually dispatched workflow checks out the latest branch.
2. The collector queries allowlisted chain endpoints and validates its result.
3. Tests run before generated files are staged.
4. Only changed data files are committed.
5. All repository-writing workflows share the same per-branch concurrency group.
6. GitHub Pages is rebuilt after a successful production data commit.

## Recovery invariants

- Exactly eight validated WYND pools are exposed.
- Pair, LP-token and stake contracts are allowlisted by address and code ID.
- Wallet inspection does not require a connected wallet.
- The shared sticky header offers one Keplr-only Juno connection on every page.
  After connection it displays the same `total_neta` economic position used by
  the ranking, including matched Osmosis, DAO and LP attribution. Juno and
  Osmosis addresses are matched by their identical Bech32 payload; no signature
  is requested for this display.
- Connected state exposes an accessible account menu with snapshot rank, total,
  copy-address and local-session disconnect. Disconnecting clears browser state
  and transaction authority but does not claim to revoke Keplr's extension-side
  site permission. The Ranking page consumes the shared wallet event to run the
  same lookup as a manually entered address.
- Wallet inspection evaluates at most three pools concurrently. Each LCD attempt
  times out after eight seconds and falls back to the next configured endpoint.
- A failed pool produces a partial total and can be retried independently; it
  never enables transaction actions or removes successful pool results.
- Live pool reserves and current USD totals may refresh daily.
- Unstake and claim values are fixed at collection time. Existing event records
  with `valuation_locked: true` are never repriced.
- Stake-contract custody is excluded from the economic-owner leaderboard to
  avoid double counting.
- Signing remains disabled until the documented safety gates pass. Its dormant
  Keplr path uses a pinned CosmJS dependency and an immutable `enabled:false`
  production configuration. CI proves that the adapter builds, but the disabled
  release omits the large generated bundle entirely. Adding that artifact and
  enabling the flag therefore require a later explicit review.
- The compact address index stores each economic wallet row once and maps both
  Juno and Osmosis aliases to that canonical object. Browser tests enforce alias
  identity and a two-megabyte size ceiling.
- Signing also requires a frozen single-action pilot scope: exact Juno wallet,
  allowlisted pair, action and positive raw-amount cap. The empty production
  scope fails closed even if the global feature flag were changed accidentally.
- The temporary JUNO/NETA liquidity pilot is separately wallet-scoped and
  hard-disabled. Its two messages are simulated atomically: a capped CW20
  allowance followed by `provide_liquidity` carrying exactly 1 JUNO. The live
  reserve ratio, balances, contract identities and gas are rechecked before any
  future Keplr prompt.

## Browser security boundary

- Snapshot and chain data is rendered with DOM creation plus `textContent`; the
  browser code must not use `innerHTML` or `insertAdjacentHTML`.
- Every page ships the same Content Security Policy. Scripts are restricted to
  same-origin assets, network access is limited to the declared Juno endpoints,
  and objects, framing bases and arbitrary form targets are disabled.
- Inline styles remain temporarily allowed because the shared Matrix canvas
  updates dimensions at runtime. Removing that exception is the next CSP
  tightening opportunity.

## Pull-request and workflow model

- `main` is protected by a repository ruleset against force-push and deletion.
- Pull requests use one consolidated `Test website` workflow for integrity,
  recovery safety, signing-gate, syntax, build and Playwright coverage.
- Superseded runs for the same PR/ref are cancelled. Data workflows only run for
  their owning files and keep scheduled/manual production writes serialized.
- Third-party Actions are pinned to full commit SHAs. Dependabot updates are
  reviewed and merged through the same protected-branch flow.

## Refactor rules

- Add chain transport and external-price behavior to `scripts/neta_core/`; keep
  domain parsers in their collector modules.
- Prefer one shared browser module for site-wide visual behavior.
- Generate the static header and footer with `scripts/site_shell.py`; never edit
  one page's shell in isolation.
- Generated snapshots are build artifacts with an explicit owning workflow.
- The WYND market and economic-owner leaderboard are published as one daily
  snapshot unit. Publication fails unless both cover the exact registry Top 8,
  share the same market timestamp, pass LP-supply conservation checks and the
  market data is no more than 36 hours old. The frontend labels older retained
  snapshots as stale instead of silently presenting them as current.
- Every production change must pass syntax checks and the relevant deterministic
  tests before it is merged.
