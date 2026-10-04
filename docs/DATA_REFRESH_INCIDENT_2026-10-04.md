# Production data refresh incident — 2026-10-04

## Evidence and cause

Website production runs 37171404059 (02:33 UTC / 04:33 Berlin) and
37179378758 (05:15 UTC / 07:15 Berlin) failed the complete snapshot freshness gate.
Both selected `neta=false, market=false, map=true, stats=true` based only on the
actual start hour. Ranking remained at 2026-10-03T13:42:48.998596Z, exceeding its
8-hour limit. Map and recovery collection succeeded locally but the atomic
publisher correctly refused the stale combined snapshot. Monitor runs
37171851544 and 37179942423 consequently reported stale published data.

The observed scheduled starts missed the periodic collectors' hour windows.
GitHub scheduling delay/skipped invocations must not prevent catch-up. No chain
failure was reported in these failing steps. DAO repo failure history has no
2026-10-04 entry at review time; its recent snapshot and Pages runs succeeded.

## Correction

Retain Berlin calendar slots, plus rerun ranking when its published timestamp is
at least 3 hours old and market/leaderboard when at least 6 hours old. Missing,
invalid, timezone-less or materially future timestamps force recollection.
Hourly Map/stats and non-scheduled full refreshes remain unchanged. Do not weaken
accounting checks, loosen freshness thresholds, fabricate timestamps or manually
edit exported balances. Existing outputs remain authoritative until a validated
single publisher commit replaces them.

## Verification

Deterministic scheduling and freshness checks pass locally. Regression cases
cover both observed run times, fresh snapshots, exact interval boundaries,
invalid/missing/future timestamps and the DST fall-back. The existing main push
trigger on the scheduler file will run a complete refresh after merge.
Integration, fresh production collection and Pages evidence must be recorded
before calling the incident resolved.
