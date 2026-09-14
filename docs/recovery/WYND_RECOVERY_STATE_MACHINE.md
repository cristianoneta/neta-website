# WYND Recovery State Machine

Status: **VALIDATED FOR PUBLIC RECOVERY**. Signing is restricted to Unbond,
Claim and Withdraw on the exact Top-8 contract allowlist.

| Observed wallet state | UI state | Permitted next action |
|---|---|---|
| No direct LP, no active stake, no claims | Empty | None |
| Direct LP balance > 0 | LP ready | Withdraw |
| Active unlocked stake > 0 | Staked | Unbond for one validated period |
| Stake contains time-locked components | Internally locked | Do not offer an amount exceeding currently releasable stake |
| Claim release condition is in the future | Unbonding | Display release time/height; no Claim action |
| Claim release condition is mature | Claimable | Claim |
| Claim confirmed and LP balance refreshed | LP ready | Withdraw |

## Mandatory transitions

1. Re-query the selected allowlisted pool and connected wallet before every preview.
2. Verify wallet network is exactly `juno-1`.
3. Allow only Unbond, Claim and Withdraw; Bond and Provide Liquidity are not shipped.
4. Re-query after confirmation; never infer the next state from the submitted message alone.
5. Disable all actions on address/code-ID mismatch, incomplete RPC data, unknown claim encoding or failed reconciliation.
6. `stake.unbond_all` is unavailable on deployed stake v2.0.0 and must not be queried.
7. Pause presentation effects throughout preview, wallet approval, broadcast and result display.

## Evidence and remaining validation

- Read-only live schema and routing audits pass for all eight allowlisted pools.
- Unsigned on-chain simulation passed for Unbond, Claim and Withdraw on all
  eight pools: 24/24 successful positive cases plus five required rejections.
- Controlled JUNO/NETA broadcasts validated Withdraw and Unbond, including
  emitted events, gas, before/after state and transaction-link handling.
- Claim success, user rejection and delayed post-state are covered by browser
  lifecycle tests. The first controlled Claim broadcast remains scheduled after
  the JUNO/NETA claim matures and will be recorded as additional production
  evidence.

## Public signing boundary

Every action must:

1. match the connected Keplr account to the inspected Juno address;
2. match the frozen Pair, LP-token and Stake allowlists;
3. re-check deployed code IDs and reload the wallet position;
4. derive the amount and period from current live state;
5. reconstruct and compare the final message with the reviewed preview;
6. simulate through the pinned local CosmJS adapter and enforce the action gas cap;
7. preserve a confirmed hash even if RPC post-state indexing is delayed; and
8. refresh and verify the expected on-chain state before reporting full success.

Bond and Provide Liquidity have no production policy, UI control or execution
branch. A code change and reviewed pull request are required to add any new
transaction class.
