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

## Resumed closure verification — 2026-10-03

The interrupted session had already merged documentation PRs DAO #104 (08:44 UTC)
and Website #139 (08:39 UTC). All final checks on DAO #100–#103 and Website
#137/#138 were re-read through GitHub: applicable test/build/collector jobs succeeded.
Website PR deploy jobs were intentionally skipped; post-merge Pages runs succeeded.
No remaining security PR was found open. Audit branches are historical integrated
work; do not merge/reapply them again or reset later bot snapshots.

Latest publication evidence at resumption: [DAO Pages 1031](https://github.com/cristianoneta/neta-dao/actions/runs/37110860079)
deployed bot commit `11fa3c1ff447ed1722e78ba8bb310f23d384019a`;
[Website Pages 1123](https://github.com/cristianoneta/neta-website/actions/runs/37110457625)
deployed `9eebb50a5c517e15b34a901b7b7e61c0d140a8bc`. Both passed.

[Treasury 934](https://github.com/cristianoneta/neta-dao/actions/runs/37110836725)
checked out `f76bbab87325b80ae55e61c73519cb6c8ed5fb9d` and completed both
collection steps and publication. It retained 57 events (28 cross-chain commands,
5 proposal executions, 10 inflows, 14 payments), with 47 indexed Juno transactions.
Juno anchor height: 42320096; Osmosis anchor height: 71815297. Both selected RPCs
reported no range support, so this proves successful full-replay fallback, not a
live incremental scan. Three previously cached Osmosis TXs were absent from its
current index; they remain retained with coverage warnings. Balance snapshots are
PARTIAL because some assets are unpriced; USD totals are not complete valuations.

Public HTTPS GETs returned HTTP 200 and byte-for-byte equality against checked
GitHub files for the following assets. No wallet transaction or contract deployment
was performed. This is publication evidence, not a fresh on-chain security audit.

| File | SHA-256 of served bytes |
| --- | --- |
| `wynd-recovery.html` | `37e4c8999f5be5c436087336d47da9e00a855ccce7e2a43431f6d53c48672e8f` |
| `rescue-neta.html` | `629462aae2f93165651100960974787aff0aaa440b2f1bb85a844a11041d75b5` |
| `map-of-neta.html` | `fc4db31e1b6d0c49c864da6eda675d3561d5a8d905996d017607d18b4e47e78c` |
| `wynd-recovery.js` | `1293084c59658d59e893bf8423d8c4751d2e2b2c02d8d163003cd0e2a36d56d0` |
| `rescue-neta.js` | `d93b1ab9a17d507b424b2ea9985fdcae02a3fe0d27966ff3b00c700db2b0c4b5` |
| `ibc-transfer.js` | `0a146d2d4e339a6476aee6b4fa9464403557461bc88c69544ca803c2800f07e5` |
| `assets/recovery-signing-client.js` | `d97295c1e9cab49205268cf3177f19a4f833237c9350c89013426ee9213f09ed` |
| `assets/swap-signing-client.js` | `33cbb3aafb42d996a29847f302b42d8a4949130c82819e8c8ff6cc85bfba22d8` |
| `assets/ibc-signing-client.js` | `f4a5f6f57b1f23b3bc753f74e1dd3bf927d323e1882c8b515b21e3c774e69874` |
| `assets/socials-testnet-client.js` | `36142004f8f0d7be95cda49be573de2ef45acb3c5e6f7163757239af5f3ab917` |
