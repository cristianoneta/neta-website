# Legacy website observation cadence — 25 November 2026

The Cosmoot public freshness runs 29–31 correctly identified stale Recovery
statistics on netareborn.com. All 45 observations on the three Cosmoot endpoints
passed. The legacy collector and Pages deployments were successful, but its
nominally hourly GitHub schedule started only after gaps of 8–12 hours. At 16:10
UTC the Recovery observation was from 12:47 UTC, beyond the unchanged three-hour
limit. By 21:18 UTC its ranking and Map also exceeded their eight-hour limits.

Rerunning the existing validated collector restored public Recovery collection
at 21:26:24 UTC, Juno height 44,112,396. Pages run 45704370518 published it. The
unchanged [external monitor](https://github.com/cristianoneta/neta-dao/actions/runs/45651532956)
then passed all 50 observations. This repairs the current observation; it does
not make GitHub's scheduler reliable. Recovery action USD valuations remain
locked at each action's first accepted collection; their historical price times
are not current market quotes.

## Prepared independent collector

`run_server_data.py` reuses the existing ranking, Map, WYND market/leaderboard
and Recovery collectors unchanged. An hourly systemd timer runs one bounded job
under a separate account. Each attempt starts from the previous private
checkpoint, retaining Map daily history, scan cursors and locked Recovery
valuations. Existing accounting, pool and freshness checks must pass before an
immutable JSON generation is published. The private checkpoint is durable before
the public pointer changes. Failed or concurrent attempts leave the previous
public observation intact. No Git write, workflow dispatch, signing material or
new publication credential is involved.

`public-data.js` accepts only the fixed origin's manifest and eight allowlisted
JSON paths. It verifies the content hashes and keeps related files in one
generation. Ranking also preserves an early wallet connection during asynchronous
loading. The frozen Recovery registry and all transaction/signing logic remain
local. Before installation, existing saved data remains available. An unavailable
previously active origin or rejected generation displays a saved-data notice;
timestamps are never refreshed in the browser. The external monitor's companion
change fails on invalid primary data rather than masking it with that fallback.

## Deployment and acceptance still required

The candidate has not been installed on the production host. The installer is
root-only with a read-only default; `--apply` installs the reviewed revision,
seeds retained data from one coherent current main revision, validates a first
collection, adds only the narrow public JSON route to the existing edge, validates
and reloads Caddy, compares the public generation with the just-collected local
generation, and enables the timer. An edge validation or publication failure
restores the previous Caddy file. It never removes the GitHub fallback schedule.

Run `python3 scripts/install_server_data.py --revision <reviewed-commit>` for
preflight and add `--apply` to install. An operator with host access must perform
that step. Confirm the next unattended cycle advances the original observations,
then retire the old GitHub schedule in a separate reviewed change. Keep the
private checkpoints in the existing backup inventory; first installation alone
does not prove independent backup or next-cycle health. Existing Cloudflare code
release policy and other Cosmoot collector services are unchanged.
