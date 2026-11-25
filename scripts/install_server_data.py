#!/usr/bin/env python3
"""Install the legacy-site collector beside the existing public snapshot edge.

Run from a reviewed revision as root. Dry-run is the default. No GitHub credentials,
production Git writes, DNS changes, existing collector changes or cron removal.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
from pathlib import Path
import pwd
import re
import shutil
import subprocess
import tarfile
import tempfile
import urllib.request

REPO = 'cristianoneta/neta-website'
USER = 'cosmoot-neta-website'
UNIT = 'cosmoot-neta-website'
BASE = Path('/opt/cosmoot/neta-website')
STATE = Path('/var/lib/cosmoot-neta-website')
BEGIN = '    # BEGIN legacy NETA observations (managed)'
END = '    # END legacy NETA observations (managed)'
ROUTE = r'''    # BEGIN legacy NETA observations (managed)
    @legacy_neta path_regexp legacy_neta ^/data/neta-website/(current|generation-[a-f0-9]{64})/(manifest\.json|metadata\.json|address_index\.json|data/map/(state|map-of-neta)\.json|data/recovery/(recovery-stats|recovery-events|wynd-market|wynd-leaderboard)\.json)$
    handle @legacy_neta {
        root * /snapshots/neta-website
        header Cache-Control "public, max-age=60"
        header Access-Control-Allow-Origin "*"
        header X-Content-Type-Options nosniff
        file_server
    }
    # END legacy NETA observations (managed)
'''


def command(*args, capture=False):
    return subprocess.run(args, check=True, text=True, stdout=subprocess.PIPE if capture else None).stdout


def request(url, limit):
    req = urllib.request.Request(url, headers={'User-Agent': 'NETA-reviewed-server-install/1.0'})
    with urllib.request.urlopen(req, timeout=60) as response:
        raw = response.read(limit + 1)
    if len(raw) > limit:
        raise ValueError('Download exceeds install limit')
    return raw


def archive(revision, destination):
    if not re.fullmatch('[a-f0-9]{40}', revision):
        raise ValueError('Exact reviewed commit required')
    raw = request(f'https://codeload.github.com/{REPO}/tar.gz/{revision}', 40 * 1024 * 1024)
    total = 0
    with tarfile.open(fileobj=io.BytesIO(raw), mode='r:gz') as source:
        for entry in source:
            parts = Path(entry.name).parts[1:]
            if not parts or any(p in ('..', '.') for p in parts):
                continue
            name = Path(*parts)
            if not (str(name).startswith('scripts/') or str(name).startswith('data/map/') or
                    str(name).startswith('data/recovery/') or str(name) in (
                        'metadata.json', 'holders.json', 'address_index.json', 'data.js',
                        'address-index.js', 'requirements.txt')):
                continue
            if entry.isdir():
                continue
            if not entry.isfile() or entry.size > 25 * 1024 * 1024:
                raise ValueError('Unsafe archive member')
            total += entry.size
            if total > 100 * 1024 * 1024:
                raise ValueError('Unpacked source exceeds install limit')
            path = destination / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(source.extractfile(entry).read())
    (destination/'SOURCE_REVISION').write_text(revision + '\n')
    for path in [destination, *destination.rglob('*')]:
        path.chmod(0o755 if path.is_dir() else 0o644)


def patch_caddy(text):
    if BEGIN in text or END in text:
        if text.count(BEGIN) != 1 or text.count(END) != 1:
            raise ValueError('Ambiguous existing legacy route')
        start, end = text.index(BEGIN), text.index(END) + len(END)
        text = text[:start] + text[end:].lstrip('\n')
    marker = 'data.cosmoot.com {\n'
    if text.count(marker) != 1:
        raise ValueError('Expected one existing public data site; no configuration changed')
    return text.replace(marker, marker + ROUTE, 1)


def edge_configuration(explicit=None):
    ids = [explicit] if explicit else command('docker', 'ps', '--filter',
        'label=com.docker.compose.service=edge', '--format', '{{.ID}}', capture=True).split()
    candidates = []
    for identifier in ids:
        inspect = json.loads(command('docker', 'inspect', identifier, capture=True))[0]
        mounts = {m['Destination']: m['Source'] for m in inspect['Mounts'] if m['Type'] == 'bind'}
        for destination in ('/etc/caddy/Caddyfile.snapshots', '/etc/caddy/Caddyfile'):
            path = Path(mounts.get(destination, '/nonexistent'))
            if path.is_file() and 'data.cosmoot.com {' in path.read_text() and '/snapshots' in mounts:
                candidates.append((identifier, path, Path(mounts['/snapshots'])))
    if len(candidates) != 1:
        raise ValueError('Select the existing snapshot edge explicitly with --edge-container')
    return candidates[0]


def write_in_place(path, value):
    # Keep the inode: the running Docker container bind-mounts this file.
    with path.open('w') as handle:
        handle.write(value)
        handle.flush()
        os.fsync(handle.fileno())


def service_text(source, venv, public, seed):
    return f'''[Unit]
Description=Validated NETA website observations
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User={USER}
Group={USER}
WorkingDirectory={source}
Environment=PYTHONDONTWRITEBYTECODE=1
ExecStart={venv}/bin/python {source}/scripts/run_server_data.py --public {public} --seed {seed}
StateDirectory={UNIT}
StateDirectoryMode=0700
ReadWritePaths={public}
UMask=0022
TimeoutStartSec=40min
TimeoutStopSec=15s
KillMode=control-group
MemoryHigh=640M
MemoryMax=768M
CPUQuota=75%
TasksMax=64
Nice=15
IOSchedulingClass=idle
NoNewPrivileges=yes
PrivateTmp=yes
PrivateDevices=yes
ProtectSystem=strict
ProtectHome=yes
ProtectKernelTunables=yes
ProtectKernelModules=yes
ProtectControlGroups=yes
RestrictSUIDSGID=yes
RestrictAddressFamilies=AF_UNIX AF_INET AF_INET6
InaccessiblePaths=-/srv/cosmoot/state -/etc/cosmoot
'''


TIMER = '''[Unit]
Description=Refresh NETA website observations hourly
[Timer]
OnCalendar=*-*-* *:17:00 UTC
Persistent=true
RandomizedDelaySec=30
Unit=cosmoot-neta-website.service
[Install]
WantedBy=timers.target
'''


def verify_public(expected_generation):
    base = 'https://data.cosmoot.com/data/neta-website/'
    value = json.loads(request(base + 'current/manifest.json?generation=' + expected_generation, 16000))
    if value.get('generation') != expected_generation:
        raise ValueError('New collector generation is not yet publicly served')
    if not re.fullmatch('generation-[a-f0-9]{64}', value['generation']):
        raise ValueError('Invalid public generation')
    for name, expected in value['files'].items():
        if name.startswith('/') or '..' in Path(name).parts:
            raise ValueError('Invalid public file')
        raw = request(base + value['generation'] + '/' + name, 25 * 1024 * 1024)
        if hashlib.sha256(raw).hexdigest() != expected:
            raise ValueError('Public observation differs from validated generation')
    return value['generation']


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--revision', required=True)
    parser.add_argument('--edge-container')
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    if not re.fullmatch('[a-f0-9]{40}', args.revision):
        raise SystemExit('Use the exact reviewed source commit')
    edge, caddy, snapshots = edge_configuration(args.edge_container)
    original = caddy.read_text()
    candidate = patch_caddy(original)
    if not args.apply:
        print('Ready: add an independent collector and allowlisted JSON route; existing services and GitHub fallback remain.')
        return
    if os.geteuid() != 0:
        raise SystemExit('Installation requires root')
    if subprocess.run(['systemctl', 'is-active', '--quiet', UNIT + '.service']).returncode == 0:
        raise SystemExit('Collector is already running; retry after its bounded run completes')
    try:
        account = pwd.getpwnam(USER)
    except KeyError:
        command('useradd', '--system', '--home-dir', '/nonexistent', '--shell', '/usr/sbin/nologin', USER)
        account = pwd.getpwnam(USER)
    BASE.mkdir(parents=True, exist_ok=True)
    BASE.chmod(0o755)
    source = BASE / args.revision
    if not source.exists():
        with tempfile.TemporaryDirectory(dir=BASE, prefix='.source-') as temp:
            archive(args.revision, Path(temp))
            Path(temp).rename(source)
    # A separate seed is today's coherent main data, never executable code from main.
    seed = BASE / 'seed'
    if not (STATE/'current').exists() and not seed.exists():
        latest = json.loads(request(f'https://api.github.com/repos/{REPO}/commits/main', 100000))['sha']
        with tempfile.TemporaryDirectory(dir=BASE, prefix='.seed-') as temp:
            archive(latest, Path(temp))
            shutil.rmtree(Path(temp)/'scripts')
            Path(temp).rename(seed)
    venv = BASE / ('venv-' + hashlib.sha256((source/'requirements.txt').read_bytes()).hexdigest()[:16])
    if not (venv/'bin/python').exists():
        command('python3', '-m', 'venv', str(venv))
        command(str(venv/'bin/pip'), 'install', '--disable-pip-version-check', '-r', str(source/'requirements.txt'))
    public = snapshots / 'neta-website/data/neta-website'
    public.mkdir(parents=True, exist_ok=True)
    for directory in (snapshots/'neta-website', snapshots/'neta-website/data', public):
        directory.chmod(0o755)
    os.chown(public, account.pw_uid, account.pw_gid)
    public.chmod(0o755)
    STATE.mkdir(mode=0o700, parents=True, exist_ok=True)
    os.chown(STATE, account.pw_uid, account.pw_gid)
    STATE.chmod(0o700)
    (Path('/etc/systemd/system')/(UNIT+'.service')).write_text(service_text(source, venv, public, seed))
    (Path('/etc/systemd/system')/(UNIT+'.timer')).write_text(TIMER)
    command('systemctl', 'daemon-reload')
    print('Collecting and validating current data; previous public data remains in place.', flush=True)
    command('systemctl', 'start', UNIT+'.service')
    backup = BASE/'caddy-before-legacy-data.conf'
    if not backup.exists():
        backup.write_text(original)
        backup.chmod(0o600)
    try:
        write_in_place(caddy, candidate)
        command('docker', 'exec', edge, 'caddy', 'validate', '--config', '/etc/caddy/Caddyfile')
        command('docker', 'exec', edge, 'caddy', 'reload', '--config', '/etc/caddy/Caddyfile')
        generation = verify_public((public/'current').resolve().name)
    except BaseException:
        write_in_place(caddy, original)
        command('docker', 'exec', edge, 'caddy', 'reload', '--config', '/etc/caddy/Caddyfile')
        raise
    command('systemctl', 'enable', '--now', UNIT+'.timer')
    print(json.dumps({'status': 'installed-and-publication-verified', 'generation': generation,
        'remaining': 'Verify the next unattended cycle before retiring the GitHub fallback schedule.'}))


if __name__ == '__main__':
    main()
