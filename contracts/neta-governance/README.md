# NETA Governance

Independent governance-discussion contract for the NETA Reborn proposal studio.

## Uni-7 scope

The testnet release persists published drafts, revisions, comments and the transition from Discussion to Voting. It does not call the production DAO proposal module. That integration is deliberately deferred until the complete flow and permissions have passed Uni-7 testing.

## Permissions

- Reads are public.
- Publishing, revisions and finalization require positive live DAO voting power.
- Comments require active NETA DAO stake strictly greater than the configured threshold (10 NETA in production).
- Every execute rejects attached funds.
- New instances start paused.

The DAO repository currently labels this action `FINALIZE + SUBMIT ON-CHAIN`, but this crate only sets UNI-7 status to Voting. It emits no mainnet proposal message. The label does not prove DAO submission.

## Current ownership and legacy boundary

This crate is the legacy Operations API still referenced by `cristianoneta/neta-dao`.
The active DAO frontend and current continuation documentation belong there.
`contracts/neta-proposal-workshop` v0.3.0 in that repository is a different API,
currently used for Juno community review; its hash, JSON-array validation,
comment cooldown and author-withdrawal claims do not apply to this crate.
Legacy access queries map dependency errors to zero, comments have no contract
cooldown, and revisions are queried without a cursor. Do not call the legacy
instance migrated or hardened without deployment evidence.
