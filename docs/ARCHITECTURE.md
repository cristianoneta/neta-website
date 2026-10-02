# NETA Reborn architecture

Reviewed 2026-10-02. [CURRENT_STATE.md](CURRENT_STATE.md) owns the feature and
workflow inventory; this document describes component boundaries. Historical
review/checkpoint claims do not override current source.

## Layers

| Layer | Responsibility | Must not do |
| --- | --- | --- |
| Browser pages | Render committed snapshots and perform read-only wallet queries | Reconstruct canonical historical valuations |
| Page scripts | Page-specific interaction and rendering | Copy shared shell, canvas or network infrastructure |
| `scripts/neta_core/` | LCD failover, CosmWasm queries, price lookup and deterministic JSON I/O | Contain NETA/WYND business rules |
| Collectors | Fetch chain state and build validated snapshots | Publish partially validated output |
| GitHub Actions | Schedule, test and serialize generated-data commits | Publish partially validated output; the recovery-statistics diagnostic log is currently retained |

## Data pipelines

1. The central workflow checks out one coherent `main` or PR source snapshot.
2. Berlin-local due selection chooses collectors; they execute sequentially.
3. Collector checks and combined snapshot/freshness validation precede publication.
4. Only owned outputs plus the retained recovery-statistics diagnostic log are staged.
5. Production writes serialize in one workflow concurrency group; PRs do not publish.
6. At most one changed-data commit is pushed with bounded fetch/rebase retries.
7. Check Pages publication. The data workflow has no explicit Pages API call;
   the main website CI deploy job does. Diagnostic/discovery writers are separate.

Parallel collectors behind a central publisher are still open Issue #122.

Map of NETA stores Juno WYND-pair swaps and Osmosis pool-631 swaps as distinct
events before aggregating them. Ordinary transfers are not counted as swaps.
The public snapshot exposes both the total and the per-chain counts, plus its
generation timestamp, so collector lag is visible rather than mistaken for
missing market activity.

IBC escrow is reconciled per source channel. A bridge contract's aggregate
balance is not assumed to belong entirely to one destination chain. Outstanding
packet commitments remain explicit liabilities until acknowledgement or a
verified timeout/refund; no tolerance converts them into unexplained residuals.

## Recovery invariants

- Exactly eight validated WYND pools are exposed.
- Pair, LP-token and stake contracts are allowlisted by address and code ID.
- Wallet inspection does not require a connected wallet.
- The shared sticky header offers one Keplr-only Juno connection on every page.
  After connection it displays the same `total_neta` economic position used by
  the ranking, including matched Osmosis, DAO and LP attribution. Juno and
  Osmosis addresses are matched by their identical Bech32 payload; no signature
  is requested for this display.
- Connected state exposes a keyboard-operable account action menu with snapshot rank, total,
  copy-address and local-session disconnect. Disconnecting clears browser state
  and transaction authority but does not claim to revoke Keplr's extension-side
  site permission. The Ranking page consumes the shared wallet event to run the
  same lookup as a manually entered address.
- Wallet inspection evaluates at most three pools concurrently. LCD reads start
  with the last healthy endpoint and hedge to the next endpoint after 350 ms.
  Every individual attempt still has an eight-second timeout; successful reads
  abort redundant requests. Height-based claims refresh chain height for every
  new wallet lookup.
- A failed pool produces a partial total and can be retried independently; it
  never enables transaction actions or removes successful pool results.
- Live reserves and current USD totals follow the six-hour market cadence.
- Unstake and claim values are fixed at collection time. Existing event records
  with `valuation_locked: true` are never repriced.
- Stake-contract custody is excluded from the economic-owner leaderboard to
  avoid double counting.
- Public signing is recovery-only: Unbond, Claim and Withdraw are enabled for the
  exact frozen Top-8 Pair, LP-token and Stake address sets. Bond and Provide
  Liquidity have no policy, UI control or execution branch. The pinned local
  CosmJS adapter is loaded only after all wallet, contract and live-state gates
  pass; CI rebuilds it and rejects any difference from the committed artifact.
- Signing RPC connection attempts use the independent Polkachu, Kleomedes and
  Lavender.Five endpoints listed by the Cosmos Chain Registry. Each attempt has
  an eight-second deadline before the adapter fails over, and a client that
  connects after its deadline is disconnected.
- The compact address index is loaded without a per-navigation timestamp cache
  buster so browser/CDN revalidation can work. It stores each economic wallet row once and maps both
  Juno and Osmosis aliases to that canonical object. Browser tests enforce alias
  identity and a two-megabyte size ceiling.
- Keplr connection and the resulting recovery authority do not wait for the
  large ranking snapshot. The wallet event is dispatched after chain/account and
  Bech32 validation; rank and total NETA then fill in asynchronously. A snapshot
  failure leaves the verified wallet connected and labels only ranking data as
  unavailable.
- Signing requires the connected Juno wallet to match the inspected address and
  each Pair address to match its exact immutable LP-token and Stake-contract
  tuple. Contracts from different allowlisted pools cannot be mixed.
  Unbond amounts and periods, claimable totals and direct LP balances are loaded
  again before execution. Claims abort if the live claimable amount differs from
  the reviewed preview. Confirmed transactions are followed by an action-specific
  position check before the UI reports the result as verified.
- WYND's legacy pair schema contains an `assets` field for withdrawal hooks, but
  the deployed pair implementation ignores it. The frontend therefore labels
  withdrawal assets as estimates and never presents them as enforced minimums.

## Rescue NETA invariants

- Only the frozen WYND JUNO/NETA pair and exact native-JUNO/CW20-NETA asset tuple
  are accepted.
- Each swap is capped at an estimated USD value of $25; transaction count is not
  limited.
- Slippage is user-selectable from 0.1% through 10%, with 5% as the default.
- Pair identity, code ID, fee, wallet balance and a fresh contract quote are
  revalidated immediately before Keplr opens.
- JUNO offers execute directly on the pair; NETA offers use the CW20 send hook.
- A transaction is confirmed only after inclusion and a receiving-asset event
  satisfying the reviewed minimum output.

## NETA Socials invariants

- The production website targets the checksum-locked Juno mainnet deployment
  recorded in `data/socials-mainnet-release.json`. Contract state remains the
  authority. The production instance is live; an emergency pause makes the
  public page read-only without changing the deployed frontend.
- Contract `config`, `comment_eligibility`, moderator and ban queries are
  authoritative. Frontend labels and disabled controls are not authorization.
- Every execute message rechecks the connected signer and opens a separate
  Keplr approval. No execute or instantiate path accepts attached funds.
- The global 30-second cooldown applies to threads and comments. Owner stake
  exemption does not bypass pause, ban or cooldown.
- Thread and comment bodies are immutable. Close/reopen and moderation actions
  are separate on-chain state; hidden content remains queryable and is rendered
  as an auditable tombstone by the official client.
- Transaction-indexing-disabled errors are recovered only by querying the exact
  expected post-state. Other broadcast errors remain failures.
- Initial thread pages contain 10 rows; comment pages contain 100 rows. Exclusive
  cursors, ID de-duplication and request-version checks prevent duplicates and
  stale async responses.
- The production gate reads only the established mainnet NETA staking contract.
  The Uni-7 stake mock remains chain-ID restricted and is never a mainnet
  dependency.

## Browser security boundary

- Snapshot and chain data is rendered with DOM creation plus `textContent`; the
  browser code must not use `innerHTML` or `insertAdjacentHTML`.
- The five generated-shell pages share a CSP template with a Map-specific Terra
  REST addition. Socials and guarded consoles have separate policies. Scripts are
  same-origin and connection allowlists are explicit; configured RPC fallbacks
  do not necessarily appear in each page CSP. See CURRENT_STATE for the IBC
  PublicNode mismatch. Objects, bases and form targets are restricted.
- Inline styles remain temporarily allowed because the shared Matrix canvas
  updates dimensions at runtime. Removing that exception is the next CSP
  tightening opportunity.

## Pull-request and workflow model

- `main` is protected by a repository ruleset against force-push and deletion.
- Pull requests use one consolidated `Test website` workflow for all deterministic
  Python suites, syntax, reproducible signing bundles and Playwright coverage. Browser
  tests exercise Withdraw and Claim success, rejected Keplr approval and a
  confirmed transaction whose post-state is temporarily unavailable.
- The test job has read-only repository access. Pages write permission exists
  only in the dependent main-push deployment job. Superseded runs for the same
  PR/ref are cancelled. Data workflows only run for
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
- The WYND market and economic-owner leaderboard are published as one six-hour
  snapshot unit. Publication fails unless both cover the exact registry Top 8,
  share the same market timestamp, pass LP-supply conservation checks and the
  market data is no more than 36 hours old. The frontend labels older retained
  snapshots as stale instead of silently presenting them as current.
- Every production change must pass syntax checks and the relevant deterministic
  tests before it is merged.

## Accessibility and content freshness

- Address inputs have programmatic labels; decorative images have empty alternative
  text and changing wallet status is announced through a polite live region.
- The account action menu receives focus when opened, supports arrow-key movement,
  closes on Escape and restores focus to the wallet button.
- Disabled future navigation is non-interactive rather than a focusable dummy link.
- `What is NETA` is intentionally absent from the deployed page set pending a
  substantive rewrite; its previous implementation remains recoverable in Git.
