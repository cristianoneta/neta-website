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

The browser UI should expose `FINALIZE + SUBMIT ON-CHAIN` in the fixed bottom action area while a proposal is in Discussion and the connected wallet has publishing access.
