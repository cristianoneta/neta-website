# NETA Reborn handoff

Code/documentation reviewed: **2026-10-02**. This repository owns
<https://netareborn.com>. `cristianoneta/neta-dao` owns
<https://dao.netareborn.com>; Governance, Delivery, Treasury, Contributors,
RELAY and Names work belongs there.

## Read in this order

1. [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md): feature inventory, owning
   files, collector cadence, deployment boundaries and known limitations.
2. [README.md](README.md): local checks and transaction boundaries.
3. [docs/OPERATIONS_KNOWLEDGE.md](docs/OPERATIONS_KNOWLEDGE.md): contract,
   pool, IBC and recorded deployment evidence.
4. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): component invariants.

`docs/NETA_REBORN_CHECKPOINT.md` and dated reviews are historical evidence,
not current continuation instructions. Read the relevant owning code/tests
before changing behavior. Deployment records must be rechecked on-chain before
wallet writes; a docs review is not a fresh chain attestation.

## Working map

| Task | Owning files |
| --- | --- |
| Economic ranking / LP attribution | `scripts/run_neta_data.py`, `scripts/update_neta_data.py`, `scripts/lp_attribution.py`; `app.js` |
| Map / swaps / transfers | `scripts/update_map_of_neta.py`, `data/map/chains.json`, `map-of-neta.js`, `ibc-transfer.js`, `src/ibc-signing-client.js` |
| WYND recovery | `data/recovery/wynd-pools.json`, `wynd-recovery.js`, `recovery-signing-config.js`, `src/recovery-signing-client.js` |
| Rescue swap | `rescue-neta.js`, `rescue-neta-signing-config.js`, `src/swap-signing-client.js` |
| Socials | `neta-socials.js`, `data/socials-mainnet-release.json`, `contracts/neta-socials/` |
| Shared shell / wallet | `scripts/site_shell.py`, `wallet-header.js`, `cosmos-client.js` |
| Production publishing | `.github/workflows/update-production-data.yml`, `scripts/data_refresh_schedule.py` |

Legacy `contracts/neta-governance/` remains here because Operations UNI-7 uses
its API. It is not the v0.3.0 workshop in the DAO repository. Its
`finalize_and_submit` changes review status only, not mainnet governance.

## Workflow and verification

Use feature branches/PRs; preserve generated data and unrelated changes.
Install requirements in a venv, `npm ci`, then run `npm run test:static`.
For browser code, run the pinned Playwright checks and rebuild the affected
signing bundle; CI compares generated bundles with committed bytes.
For shell edits, regenerate only the five pages enumerated by `site_shell.py`,
then verify Socials/guarded consoles separately. `--check` is non-mutating.

Root README/Handoff and ordinary docs edits do not match website CI filters.
Markdown beneath `contracts/**` does match contract and website CI. Inspect the
actual changed paths and checks; run local checks/link review as well. A successful
Pages deployment proves publication, not a transaction or security audit.

## Non-negotiable boundaries

- Never request seeds/private keys; every wallet write requires Keplr approval.
- Recovery: eight frozen pools, Unbond/Claim/Withdraw only; no Bond/Provide Liquidity.
- Rescue: frozen JUNO/NETA pair, estimated USD 25 cap per individual swap.
- Source IBC inclusion means packet submitted, not destination receipt.
- Juno↔Terra is absent from the transfer route table. Osmosis↔Terra native routes
  are present; NETA only has Juno↔Osmosis channels. Do not describe all Terra paths
  as disabled or Terra as a NETA destination.
- Validate economic ownership with integer raw units and height-pinned chain
  queries; no tolerance or manual snapshot editing to close supply.
- Shared bridge custody is channel-specific; keep unexplained/transit amounts
  explicit. Old September-12 whole-escrow=Osmosis guidance is superseded.
- Collector outputs have one owner. Production collectors run sequentially in
  one job and publish one commit; parallel jobs remain open Issue #122.
- No force push/reset to resolve snapshot races. Current bot rebase uses
  `-X theirs`; never copy that blindly into a human conflict resolution.

## Next work / outstanding evidence

1. Check current Actions, freshness timestamps and served files at session start.
2. Controlled JUNO/NETA Claim matured on 2026-09-21; no completed live Claim
   evidence was found in the reviewed docs. Query current claim state before
   proposing/signing any action. Historical simulation coverage remains separate.
3. Last documented Terra NETA packet: channel-154/33, sequence 36, 0.01 NETA.
   Recheck commitment/receipt/acknowledgement/refund before claiming resolution.
4. Keep daily/periodic data within freshness limits. Parallelize collectors only
   behind a single validated publisher if pursuing Issue #122.
5. Rewrite `What is NETA` only when requested; it is intentionally offline.
6. Continue encrypted messaging in **neta-dao** using its current Handoff and
   existing UNI-7 lab; do not build duplicate DAO features here.

CURRENT_STATE and [the security audit](docs/SECURITY_EFFICIENCY_AUDIT_2026-10-02.md)
list remaining limitations, including ambiguous broadcast reconciliation,
legacy withdrawal output protection, explicit Pages-request absence in the data publisher, generated recovery
test-log commits, and old deployment/testing artifacts. Do not silently erase them
from the record or represent this documentation cleanup as code fixes.

## Security audit continuation — 2026-10-03 Berlin

Audit changes are published in PR #137, branch `audit/security-efficiency-20261002`; code checkpoint `ada510893206197a42a2648f4c691ac0caaaba31`. Cross-project PRs: https://github.com/cristianoneta/neta-dao/pull/100 and https://github.com/cristianoneta/neta-website/pull/137. At handoff, website tests and DAO RELAY browser tests passed; DAO contract/frontend CI was still running and website production-data CI pending. PRs were not merged. Check current results before integration.

The isolated adversarial browser test reproduced the persistent RELAY receive lock after malformed ciphertext and reload. Mainnet messaging remains blocked. Read `docs/SECURITY_EFFICIENCY_AUDIT_2026-10-02.md`; prioritize authenticated transactional receive/recovery, sender-scoped archive identity, prekey abuse and ambiguous mainnet broadcast retries. Preserve unrelated changes/data-bot updates. Local audit worktrees contain commits, while the original worktrees have documentation edits already published in the earlier documentation PRs; do not discard these blindly.

## Continuation 2026-10-03

Security PR #137 merged after successful relevant CI; deployed signing/controller
assets were checked byte-for-byte. The next broadcast-journal patch records signed
bytes/hash/sequence before broadcasting and blocks retries on unknown outcomes.
See the security audit for its browser-local scope and manual recovery limits.
Never discard pending transaction records just to re-enable confirmation.
Mainnet messaging remains blocked in the DAO repository.
