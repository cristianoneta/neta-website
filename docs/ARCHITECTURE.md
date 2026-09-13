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
- Live pool reserves and current USD totals may refresh daily.
- Unstake and claim values are fixed at collection time. Existing event records
  with `valuation_locked: true` are never repriced.
- Stake-contract custody is excluded from the economic-owner leaderboard to
  avoid double counting.
- Signing remains disabled until the documented safety gates pass.

## Refactor rules

- Add chain transport and external-price behavior to `scripts/neta_core/`; keep
  domain parsers in their collector modules.
- Prefer one shared browser module for site-wide visual behavior.
- Generate the static header and footer with `scripts/site_shell.py`; never edit
  one page's shell in isolation.
- Generated snapshots are build artifacts with an explicit owning workflow.
- Every production change must pass syntax checks and the relevant deterministic
  tests before it is merged.
