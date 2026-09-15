# NETA Reborn operational knowledge

Last verified: 2026-09-15

This is the canonical current-state reference. Historical investigation logs
remain in `NETA_REBORN_CHECKPOINT.md`, but must not override this document.

## Production surfaces and authority

| Surface | Network | Authority and safety boundary |
| --- | --- | --- |
| Ranking | Juno + Osmosis snapshots | Read-only; economic ownership is computed by collectors |
| Map of NETA | Juno + Osmosis events | Read-only activity plus controlled, self-custodial IBC signing |
| WYND Recovery | Juno mainnet | Only Unbond, Claim and Withdraw on eight frozen contract tuples |
| Rescue NETA | Juno mainnet | Only the frozen WYND JUNO/NETA pair; $25 estimated-value cap per transaction |
| NETA Socials | Juno mainnet | Live; writes are stake-gated and every transaction needs a separate Keplr approval with no funds attached |

Browser state and UI checks are never protocol authorization. Contracts and
chain state remain authoritative. The site never requests a seed phrase or
private key.

## Production data monitoring

`monitor-data-freshness.yml` runs hourly with read-only repository permission.
It fails if the economic ranking or Map of NETA snapshot is older than eight
hours, recovery statistics are older than three hours, or the daily recovery
market snapshot is older than 30 hours. Missing, invalid, timezone-free or
materially future-dated timestamps also fail closed. The JSON result is written
to the GitHub Actions job summary so a stale worker is distinguishable from a
source-format failure. Thresholds deliberately exceed the intended schedules
to tolerate normal GitHub cron delays without concealing a missed production
cycle.

## Economic NETA accounting

The holder model is:

`direct Juno + direct Osmosis + DAO active stake + DAO unbonding + DAO claimable + attributed LP NETA`

Custody accounts must not be presented as economic owners. The collectors
remove known pool, staking, lockup and escrow custody before attributing the
underlying NETA. Publication fails closed when supply, LP shares or reserves do
not reconcile exactly.

### Validated liquidity pools

WYND JUNO/NETA on Juno:

- Pair: `juno1h6x5jlvn6jhpnu63ufe4sgv4utyk8hsfl5rqnrpg2cvp6ccuq4lqwqnzra`
- LP token: `juno1uu3cewmpynvgsdu3lfqv2rh2n5nwtrguahkw64wjk99eg8r6fsss0e757x`
- Stake contract: `juno1tlhf68k8aksl30mdf5yngudk6z8w4qqzvvauzr92w3gwm7er9p9qxvudu7`
- Staked LP parsing includes both ordinary stake and `locked_tokens`.
- Active stake plus claims reconciles exactly to stake-contract LP custody.

Osmosis NETA/OSMO:

- Pool ID: `631`; share denom: `gamm/pool/631`
- Pool address: `osmo1yn7z42al3mafmztjayjduz42a8at3whyd279fkdsyumzar83x8mqvpw83x`
- Lockup module: `osmo1njty28rqtpw6n59sjj4esw76enp4mg6g7cwrhc`
- PeriodLocks reconcile exactly to lockup-module custody; module shares are
  replaced by their underlying owners before NETA attribution.
- Four unusual lock records ending in 2061 remain an interpretation question,
  not an accounting difference.

DAO claims are separated by maturity. Matured but unclaimed amounts are
claimable, not actively unbonding.

## IBC and escrow accounting

The Juno CW20-ICS20 bridge contract is
`juno1v4887y83d6g28puzvt8cl0f3cdhd3y6y9mpysnsp3k8krdm7l6jqgm0rkn`.
Escrow must be reconciled per channel, not only as one bridge balance:

| Route | Source / destination channels | Accounting state |
| --- | --- | --- |
| NETA Juno ↔ Osmosis | `channel-47` / `channel-169` | Osmosis outstanding is reconciled against channel-47 escrow |
| NETA Juno ↔ Terra | `channel-154` / `channel-33` | 10,000 raw NETA (`0.010000`) remains represented by packet commitment sequence 36 |
| JUNO Juno ↔ Osmosis | `channel-0` / `channel-42` | Validated live outbound transfer |
| Native Juno ↔ Terra | `channel-86` / `channel-2` | Route known; restore only after timeout/refund behavior is verified |
| Native Osmosis ↔ Terra | `channel-251` / `channel-1` | Route registry only |

The exact `0.010000 NETA` difference is not rounding noise and must never be
hidden by tolerance or retries. Check packet commitment, acknowledgement,
receipt and timeout/refund state. Until sequence 36 is resolved, Juno↔Terra
NETA is not a public frontend route and Terra is displayed with zero NETA.

## NETA Socials deployments

| Item | Verified value |
| --- | --- |
| Deployment/admin/owner wallet | `juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57` |
| Stake mock | code 109, `juno1gfwuyxn774nk5u430vjwtw6szjn4nhzmkqfxql4nqsp322drrcfqhveamm` |
| Uni-7 Socials (historical test deployment) | code 110, `juno1vgh9dd4zs7gsg7p602pv5lw3xly6wq6xww3s98keddc6vqazga8qgnm4g8` |
| Mainnet Socials | code 5167, `juno1a0s5kaavcfnjgewtka0vr5tmmssynqfxmqyat3hm5lw75us0em9qcjdfv9` |
| Contract/CW2 version | `crates.io:neta-socials` `0.2.1` |
| Minimum stake | `10000000` raw NETA (10 NETA) |
| Cooldown | 30 seconds per address across threads and comments |
| Current mainnet state | `paused: false`; activated at height `41784461`; owner is stake-exempt |

The contract supports immutable threads/comments, close/reopen, hide/unhide
with an on-chain reason, moderator assignment, bans, pause, configuration and a
two-step ownership transfer. Hidden content is not deleted; it remains
queryable on-chain and clients render a moderation tombstone.

The testnet stake mock is hard-restricted to `uni-7` and must never be used as a
mainnet dependency. Owner exemption proves deployment control, not the 10-NETA
gate. That gate still needs a second non-owner wallet with synthetic stake for
an end-to-end positive and negative test.

### Uni-7 and Keplr lessons

- Primary endpoints: `https://juno.test.rpc.nodeshub.online` and
  `https://juno.test.api.nodeshub.online`; STAVR is fallback.
- Observed minimum gas price was `0.075ujunox`; the frontend uses
  `0.2ujunox` with Keplr steps `0.1/0.2/0.3`.
- `MsgStoreCode` is gas-heavy. A displayed fee below the chain minimum is not
  repaired by reloading the page; Keplr's manual fee must satisfy gas × minimum
  gas price.
- Keplr caches suggested chains and endpoints. If balance fetches fail after
  endpoints change, reset cache data and, only if necessary, suggested chains
  and custom endpoints. Never clear keys or re-enter a seed phrase for this.
- Uni-7 transaction indexing can be disabled even when a transaction was
  included. Recovery accepts only that exact indexer error and then proves the
  expected post-state by contract query; unrelated errors fail closed.
- Uni-7 REST has returned code checksums as hex rather than Base64. Deployment
  recovery accepts both encodings and reuses verified code IDs instead of
  uploading duplicate WASM.

## Mainnet activation gates

The exact contract is deployed and verified paused. Before unpausing:

1. Keep locked Rust, optimized-WASM, JavaScript and browser checks green.
2. Merge and deploy the public frontend configured for the recorded mainnet
   contract while the contract remains paused.
3. Confirm one non-owner below 10 active NETA is ineligible and one non-owner at
   or above 10 active NETA is eligible according to the production stake query.
4. Explicitly unpause with one reviewed owner transaction.
5. Smoke-test thread, comment, cooldown, close/reopen, hide/unhide, moderator and
   ban/unban behavior; pause immediately if any invariant differs.

Compatibility evidence collected on 2026-09-15: live Juno reported app
`v30.0.0`; the official tag pins `wasmd v0.61.11` and `wasmvm/v3 v3.0.4`.
The exact Socials artifact was accepted on Uni-7 and then stored on mainnet as
code `5167`. Mainnet instantiation and read-only verification completed at
height `41783543` with `paused: true`.

The distinct-role frontend test covers owner-only moderator assignment and
banning, moderator-only hide execution, automatic moderator revocation on ban,
and the banned user's disabled posting controls. Ownership transfer remains an
intentional contract/CLI administration path; the public community UI does not
expose proposal, acceptance or cancellation controls.

Separately, the outstanding Terra packet and the controlled WYND Claim remain
operational follow-ups; neither should be represented as silently complete.

## Mainnet deployment — 2026-09-15

The guarded mainnet deployment path is defined by
`data/socials-mainnet-release.json` and `docs/NETA_SOCIALS_MAINNET_RUNBOOK.md`.
The guarded console connected only the configured owner on `juno-1`, verified
the production staking contract and locked checksum, stored code `5167`, and
instantiated `juno1a0s5kaavcfnjgewtka0vr5tmmssynqfxmqyat3hm5lw75us0em9qcjdfv9`.
Independent REST queries confirmed creator, migration admin, owner, stake
contract, threshold and cooldown. Deployment initially completed paused. The
deployment console still has no execute or unpause capability.

The production stake gate was then verified read-only with distinct non-owner
wallets: a wallet with zero active stake returned `stake_eligible: false`, and
a wallet with 300 active NETA returned `stake_eligible: true`. The unlinked
`neta-socials-admin.html` surface rechecks those gates plus contract identity and
configuration before exposing its only two writes: explicit unpause and
emergency pause. Both are `set_paused` messages with no attached funds.

The owner unpaused the production contract with transaction
`8B2354A8C603CB9EE0A95009FA734D3C4FEF84CA31AFB563D97D3EFDDADC3FD6`
at height `41784461`. Independent verification returned code `0`,
`paused: false` and owner `can_post: true`; no funds were attached. The public
frontend is live, and the admin surface retains the emergency-pause path.


## Data-worker refresh and immutable snapshots

Production refreshes must be dispatched from the current `main` branch. Do not
use GitHub's "re-run job" action on an old scheduled run: GitHub retains that
run's original head SHA, so the worker can calculate valid data from stale
source and then conflict with newer generated files. All production collectors
therefore explicitly check out `main`. Each collector has its own concurrency
group because GitHub retains only one running and one pending job per group;
a shared group silently cancelled excess refreshes. The collectors write
disjoint generated files, and current-main checkout plus deterministic rebases
allow all four refreshes to run without losing newer commits.

The NETA indexer chooses one finalized Juno height at the beginning of a build.
Every Juno CW20, DAO, WYND LP, WYND staking, pair-reserve and ICS20 query carries
that same `x-cosmos-block-height` header. Osmosis bank state, Pool 631 state,
locks and IBC commitments likewise use one recorded Osmosis height. Never mix a
live REST response with height-pinned state in an accounting invariant.

A Juno/Osmosis difference may be published as `in_transit_neta` only when an
open packet commitment exists on Juno `channel-47` or Osmosis `channel-169`.
The amount remains an explicit unattributed bridge residual until delivery. A
negative difference or a positive difference without packet evidence fails
closed. The unresolved Terra `0.010000 NETA` remains separate and is not
covered by this active Osmosis-transit classification.

Every collector that commits generated data must also tolerate a concurrent
writer landing between its fetch/rebase and push. Use a bounded three-attempt
`fetch main` → deterministic rebase → push loop with short backoff. Separate
concurrency groups prevent cancellation; the retry loop prevents the remaining
non-fast-forward race without weakening any data validation.
