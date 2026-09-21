# NETA Reborn handoff

Last verified: 2026-09-21

Read this file, `README.md`, `docs/OPERATIONS_KNOWLEDGE.md` and
`docs/ARCHITECTURE.md` before changing the site. This repository owns
`https://netareborn.com`. The separate `cristianoneta/neta-dao` repository owns
`https://dao.netareborn.com`; governance, Delivery, Treasury and Contributors work
belongs there.

## Production scope

- The public site contains Ranking, Map of NETA, NETA DAO, WYND Recovery, Rescue
  NETA and NETA Socials. `What is NETA` remains offline pending a rewrite.
- Ranking and Map are generated read-only data products. Generated files have a
  single owning collector; do not hand-edit their mirrors.
- WYND Recovery is allowlisted to Unbond, Claim and Withdraw for eight frozen
  contract sets. Rescue NETA is limited to the frozen JUNO/NETA pair and USD 25
  estimated value per transaction.
- Controlled IBC routes are explicit. Wrapped assets may only return to origin;
  an unresolved packet remains visible and disables the affected route.
- NETA Socials is a checksum-locked Juno mainnet contract. Every write uses Keplr,
  attaches no funds and preserves the emergency pause path.

## Safety and workflow

- Never request or enter a seed phrase. Do not add raw private-key signing.
- Transaction code is fail-closed: revalidate wallet, chain, allowlist, live state,
  quote and gas immediately before opening Keplr.
- Change the shared shell through `scripts/site_shell.py`, then regenerate every
  page. CI intentionally fails if one page retains stale navigation or CSP.
- Use branches and pull requests; run `npm ci && npm run test:static` at minimum.
  Browser-facing changes also require the pinned Playwright suite in CI.
- Production collectors serialize writes. Do not force-update `main` or overwrite
  generated data to resolve a branch conflict.

## GitHub Actions diagnosis

- The only recent failed website test was PR #132, run `35532282737` on
  2026-09-20. The exact failure was `shared shell is stale: index.html`: the PR
  changed the shell definition without regenerating `index.html`. This is a useful
  guardrail failure, not a production outage. Current `main` tests and deployments
  subsequently passed.
- Cancelled Pages runs commonly occur when a newer deployment supersedes an older
  one. Treat a red build/test as actionable; verify the next Pages run before
  treating an auto-cancelled deployment as an incident.

## Commands

```bash
npm ci
npm run test:static
python scripts/site_shell.py --root .
python scripts/test_site_integrity.py
npm run test:browser:install
npm test
```

The shell generation command writes files. Use `python scripts/site_shell.py
--root . --check` for a non-mutating drift check.

## Current backlog

- Keep generated rankings, Map, recovery statistics and market data within the
  freshness limits documented in `README.md`.
- Complete the remaining controlled live recovery evidence only with explicit user
  approval; simulation coverage is already the public safety gate.
- Continue DAO product work in `neta-dao`, not by duplicating governance logic here.
- Reassess disabled/experimental IBC routes only from packet acknowledgement and
  destination-balance evidence, never from source inclusion alone.

## First steps for the next AI

1. Check the latest Actions runs and deployed page before assuming a saved checkpoint
   is still current.
2. Read the current operational knowledge; historical sections in
   `docs/NETA_REBORN_CHECKPOINT.md` are evidence, not continuation instructions.
3. Identify the owning collector before editing any JSON or generated JavaScript.
4. Preserve unrelated local changes and never use a destructive Git reset.
