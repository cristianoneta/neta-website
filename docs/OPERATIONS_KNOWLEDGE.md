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
| NETA Socials | Juno `uni-7` testnet | Reads are public; every write needs a separate Keplr approval and attaches no funds |

Browser state and UI checks are never protocol authorization. Contracts and
chain state remain authoritative. The site never requests a seed phrase or
private key.

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

## NETA Socials on Uni-7

| Item | Verified value |
| --- | --- |
| Deployment/admin/owner wallet | `juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57` |
| Stake mock | code 109, `juno1gfwuyxn774nk5u430vjwtw6szjn4nhzmkqfxql4nqsp322drrcfqhveamm` |
| Socials | code 110, `juno1vgh9dd4zs7gsg7p602pv5lw3xly6wq6xww3s98keddc6vqazga8qgnm4g8` |
| Minimum stake | `10000000` raw NETA (10 NETA) |
| Cooldown | 30 seconds per address across threads and comments |
| Current state | `paused: false`; owner is stake-exempt |

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

## Mainnet readiness gates

NETA Socials is not yet approved for mainnet. Before deployment:

1. Run locked Rust format, clippy, unit, schema, optimized-WASM checksum and
   current RustSec audit jobs successfully.
2. Confirm compatibility with the exact Juno mainnet `wasmd`/`wasmvm` stack and
   re-evaluate every documented advisory exception.
3. Complete the non-owner 10-NETA allow/deny test on Uni-7.
4. Exercise owner, moderator, banned-user, hidden-thread/comment and ownership
   transfer paths with distinct wallets.
5. Select production owner and CosmWasm migration admin deliberately; document
   how either moves to DAO/multisig control.
6. Deploy the exact optimized checksum against the real DAO staking contract,
   verify config and eligibility while paused, then unpause explicitly.

Separately, the outstanding Terra packet and the controlled WYND Claim remain
operational follow-ups; neither should be represented as silently complete.
