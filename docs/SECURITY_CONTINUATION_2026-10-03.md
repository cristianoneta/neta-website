# Verified security continuation — 2026-10-03 UTC

This is a checked checkpoint, not a promise about future repository state.
Preserve later data-bot commits and recheck GitHub before continuing.

## Integrated website changes

- PR #137 merged as `4109b2ed3f8dcbbda587cc3d3f90c59a9ac40b14` after website run 308 and production-data run 410 passed.
- PR #138 merged as `3fb29ea5454d9f73b01bc24b746dbbaa0ba85358` after [website run 311](https://github.com/cristianoneta/neta-website/actions/runs/37108809394) and [production-data run 422](https://github.com/cristianoneta/neta-website/actions/runs/37108809457) passed. Main push run 312 also passed.
- Pages runs 1120/1121 for the merge passed. Production-data run 423 passed and retained its bot commit `6faa4443a91227ac1705d385818772f20b902894`; [Pages run 1122](https://github.com/cristianoneta/neta-website/actions/runs/37109546649) and freshness run 426 passed.
- Served swap, IBC, recovery and shared Socials bundles and recovery controller were compared byte-for-byte with checked local source/build output after deployment.

## Broadcast safety and limits

The signing adapter records signed public TxRaw bytes, SHA256 transaction hash and signer sequence in a durable browser journal before broadcasting. A per-chain/account Web Lock prevents concurrent signing in the same origin. Unclear broadcast outcomes retain that record across reload and block further signing until the exact hash is confirmed on-chain. There is no automatic rebroadcast or journal reset.

Adversarial browser coverage runs the actual generated swap bundle, loses the broadcast response, reloads and verifies that a second signature/broadcast is refused. Node tests cover journal persistence, exact-hash reconciliation, storage failure and fee caps. Reproducible generated bundles and dependency audit passed.

Scope is this browser/origin; different domains/devices and manually cleared storage are not coordinated. Interrupted signatures and permanently rejected transactions require manual investigation. No live attack transaction or real wallet key was used. Keplr failures before broadcast do not justify deleting a pending record.

## Cross-repository state

DAO PRs #100, #101, #102 and #103 are integrated after their relevant checks passed. #101 fixes transactional local receive recovery and scoped archive identity. #102 provides tested v0.2 consent/historical-identity source; the existing pinned v0.1 contract/artifact is unchanged. #103 copies this repository's guarded shared signing bundle and adds moderation/history protections.

Mainnet messaging remains disabled. Outstanding release gates include a verified new UNI-7 consent/refill deployment, generation-aware sessions, coherent automatic off-device recovery of ratchet/archive/outbox/descriptor and the full adversarial rotation/exhaustion/restore matrix. See the DAO handoff for deployment evidence and current blockers.
