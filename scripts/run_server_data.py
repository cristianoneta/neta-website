#!/usr/bin/env python3
"""Run the existing legacy-site collectors on a host and publish one validated generation.

No Git writes, workflow dispatch, wallet material or re-dated observations. Private
checkpoints retain the Map history, forward cursors and locked recovery valuations.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import fcntl
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import signal
import subprocess
import sys
import tempfile

from check_data_freshness import inspect
from data_refresh_schedule import due_collectors
from validate_wynd_recovery_snapshots import validate

PUBLIC_FILES = (
    'metadata.json', 'address_index.json',
    'data/map/state.json', 'data/map/map-of-neta.json',
    'data/recovery/recovery-stats.json', 'data/recovery/recovery-events.json',
    'data/recovery/wynd-market.json', 'data/recovery/wynd-leaderboard.json',
)
SEED_FILES = (*PUBLIC_FILES, 'holders.json', 'data.js', 'address-index.js',
              'data/map/chains.json', 'data/recovery/wynd-pools.json')
MAX_BYTES = 25 * 1024 * 1024
SOURCE_ROOT = Path(__file__).resolve().parents[1]


def read_bytes(root, name):
    path = root / name
    if path.is_symlink() or not path.is_file() or not path.resolve().is_relative_to(root.resolve()):
        raise ValueError('Unsafe snapshot file: ' + name)
    if path.stat().st_size > MAX_BYTES:
        raise ValueError('Oversized snapshot: ' + name)
    return path.read_bytes()


def copy_state(source, target):
    names = [*SEED_FILES, *sorted(str(p.relative_to(source)) for p in (source/'data/map/days').glob('*.json'))]
    for name in names:
        raw = read_bytes(source, name)
        destination = target / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(raw)


def load(root, name):
    return json.loads(read_bytes(root, name))


def validate_state(root, now):
    stale = [row['name'] for row in inspect(root, now) if not row['fresh']]
    if stale:
        raise ValueError('Unhealthy observations: ' + ', '.join(stale))
    if load(root, 'metadata.json').get('validation', {}).get('passed') is not True:
        raise ValueError('Ranking accounting did not validate')
    index = load(root, 'address_index.json')
    if index.get('schema_version') != 4 or not index.get('fields') or not index.get('rows'):
        raise ValueError('Ranking address index unavailable')
    if load(root, 'data/map/map-of-neta.json').get('validation', {}).get('passed') is not True:
        raise ValueError('Map did not validate')
    stats = load(root, 'data/recovery/recovery-stats.json')
    events = load(root, 'data/recovery/recovery-events.json')['events']
    registry = load(root, 'data/recovery/wynd-pools.json')
    pairs = {row['pair']['address'] for row in registry['pools']}
    if (stats.get('status') != 'COLLECTING' or type(stats.get('juno_last_height')) is not int
            or stats['juno_last_height'] <= 0 or set(stats.get('pools', {})) != pairs
            or not all(stats.get('validation', {}).values())
            or len({e['id'] for e in events}) != len(events)
            or any(e['pair'] not in pairs or e.get('valuation_locked') is not True for e in events)):
        raise ValueError('Recovery evidence did not validate')
    validate(registry, load(root, 'data/recovery/wynd-market.json'),
             load(root, 'data/recovery/wynd-leaderboard.json'), now=now)


def run(command, cwd, seconds):
    env = {k: v for k, v in os.environ.items() if k not in ('NNS_PRICE_SIGNING_KEY', 'CREDENTIALS_DIRECTORY')}
    env['PYTHONDONTWRITEBYTECODE'] = '1'
    process = subprocess.Popen(command, cwd=cwd, env=env, start_new_session=True)
    try:
        if process.wait(timeout=seconds):
            raise RuntimeError('Collector failed: ' + Path(command[1]).name)
    except subprocess.TimeoutExpired:
        os.killpg(process.pid, signal.SIGKILL)
        process.wait()
        raise RuntimeError('Collector timed out: ' + Path(command[1]).name) from None


def collect(root, source, now, runner=run):
    due = due_collectors('schedule', now, root)
    jobs = [
        ('neta', 'run_neta_data.py', '--output', 900),
        ('map', 'update_map_of_neta.py', '--root', 300),
        ('market', 'update_wynd_recovery_market.py', '--root', 300),
        ('market', 'update_wynd_recovery_leaderboard.py', '--root', 600),
        ('stats', 'update_wynd_recovery_stats.py', '--root', 300),
    ]
    for name, script, flag, seconds in jobs:
        if due[name]:
            runner([sys.executable, str(source/'scripts'/script), flag, str(root)], root, seconds)
    return due


def sync_directory(path):
    descriptor = os.open(path, os.O_RDONLY | os.O_DIRECTORY)
    try:
        os.fsync(descriptor)
    finally:
        os.close(descriptor)


def sync_tree(root):
    for path in root.rglob('*'):
        if path.is_file():
            with path.open('rb') as file:
                os.fsync(file.fileno())
    for path in sorted((p for p in root.rglob('*') if p.is_dir()), key=lambda p: len(p.parts), reverse=True):
        sync_directory(path)
    sync_directory(root)


def switch_link(parent, name, destination):
    temporary = parent / ('.' + name + '-' + str(os.getpid()))
    temporary.symlink_to(destination)
    os.replace(temporary, parent / name)
    sync_directory(parent)


def prune(parent, current, keep=6):
    generations = sorted((p for p in parent.glob('generation-*') if p.is_dir() and not p.is_symlink()),
                         key=lambda p: p.stat().st_mtime, reverse=True)
    for path in generations[keep:]:
        if path.name != current:
            shutil.rmtree(path)


def publish(root, public, revision, now, *, activate=True):
    if not re.fullmatch('[0-9a-f]{40}', revision):
        raise ValueError('Reviewed source revision required')
    payload = {name: read_bytes(root, name) for name in PUBLIC_FILES}
    hashes = {name: hashlib.sha256(raw).hexdigest() for name, raw in payload.items()}
    generation = 'generation-' + hashlib.sha256(json.dumps(hashes, sort_keys=True).encode()).hexdigest()
    public.mkdir(parents=True, exist_ok=True)
    destination = public / generation
    if not destination.exists():
        temporary = Path(tempfile.mkdtemp(prefix='.publish-', dir=public))
        try:
            for name, raw in payload.items():
                path = temporary / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(raw)
                path.chmod(0o644)
            (temporary/'manifest.json').write_text(json.dumps({
                'schema_version': 1, 'generation': generation, 'source_revision': revision,
                'published_at': now.isoformat(), 'files': hashes,
            }, sort_keys=True) + '\n')
            for path in [temporary, *[p for p in temporary.rglob('*') if p.is_dir()]]:
                path.chmod(0o755)
            sync_tree(temporary)
            temporary.rename(destination)
            sync_directory(public)
        finally:
            if temporary.exists():
                shutil.rmtree(temporary)
    if activate:
        switch_link(public, 'current', generation)
        prune(public, generation)
    return generation


def cycle(state, public, source, seed, revision, *, now=None, collector=collect, validator=validate_state):
    state.mkdir(parents=True, exist_ok=True)
    with (state/'collector.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        previous = (state/'current').resolve() if (state/'current').exists() else seed
        temporary = Path(tempfile.mkdtemp(prefix='.collect-', dir=state))
        try:
            copy_state(previous, temporary)
            started = now or datetime.now(timezone.utc)
            due = collector(temporary, source, started)
            finished = now or datetime.now(timezone.utc)
            validator(temporary, finished)
            generation = publish(temporary, public, revision, finished, activate=False)
            checkpoint = state / generation
            if not checkpoint.exists():
                sync_tree(temporary)
                temporary.rename(checkpoint)
            # Retain forward cursors and locked valuations before exposing them.
            switch_link(state, 'current', generation)
            switch_link(public, 'current', generation)
            prune(state, generation)
            prune(public, generation)
            return {'status': 'published', 'generation': generation, 'collectors': due}
        finally:
            if temporary.exists():
                shutil.rmtree(temporary)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--state', type=Path, default=Path('/var/lib/cosmoot-neta-website'))
    parser.add_argument('--public', type=Path, required=True)
    parser.add_argument('--seed', type=Path, required=True)
    args = parser.parse_args()
    revision = (SOURCE_ROOT/'SOURCE_REVISION').read_text().strip()
    print(json.dumps(cycle(args.state, args.public, SOURCE_ROOT, args.seed, revision)), flush=True)


if __name__ == '__main__':
    main()
