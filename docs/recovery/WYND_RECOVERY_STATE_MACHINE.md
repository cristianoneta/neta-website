# WYND Recovery State Machine

Status: **VALIDATED FOR READ-ONLY FRONTEND**. Signing remains disabled.

| Observed wallet state | UI state | Permitted next action |
|---|---|---|
| No direct LP, no active stake, no claims | Empty | None |
| Direct LP balance > 0 | LP ready | Preview proportional assets; Withdraw only after simulation gate |
| Active unlocked stake > 0 | Staked | Preview Unbond for one validated period |
| Stake contains time-locked components | Internally locked | Display separately; do not offer an amount exceeding currently releasable stake |
| Claim release condition is in the future | Unbonding | Display release time/height; no Claim action |
| Claim release condition is mature | Claimable | Preview Claim |
| Claim transaction confirmed and LP balance refreshed | LP ready | Preview proportional assets; Withdraw only after simulation gate |

## Mandatory transitions

1. Re-query the selected allowlisted pool and connected wallet before every preview.
2. Verify wallet network is exactly `juno-1`.
3. Show one transaction at a time: Unbond, then Claim after maturity, then Withdraw.
4. Re-query after confirmation; never infer the next state from the submitted message alone.
5. Disable all actions on code-ID/CW2 mismatch, incomplete RPC data, unknown claim encoding, or failed balance reconciliation.
6. `stake.unbond_all` is not available on deployed stake v2.0.0 and must not be queried.
7. The blackout presentation effect must pause during preview, wallet approval, broadcast, and result display.

## Signing gate still open

Before signing can be enabled, simulate and then test with tiny controlled positions for every distinct action shape. Validate fees, gas, transaction events, proportional withdrawal results, rejection paths, and post-transaction refresh. The read-only frontend may be built before this gate closes.

The simulation gate requires successful unsigned `/simulate` responses for
Unbond, Claim and Withdraw on every allowlisted pool (24 positive simulations),
plus rejection of representative invalid-period, excess-balance, empty-claim
and wrong-contract cases. The
simulation tool contains no broadcast path and uses the dedicated memo
`netareborn.com/wynd-recovery:simulation`.

Before simulation, `scripts/audit_wynd_recovery_actions.py` must pass for all
eight allowlisted pools. It performs read-only live checks of code IDs, CW2
versions, Pair-to-LP/Stake routing, asset identities, unbonding periods and the
exact Unbond/Claim message templates. It never signs or broadcasts.
