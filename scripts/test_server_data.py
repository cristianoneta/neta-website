#!/usr/bin/env python3
import fcntl
import hashlib
import json
from datetime import datetime, timezone, timedelta
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import run_server_data as server
import install_server_data as installer

ROOT = Path(__file__).resolve().parents[1]
NOW = max(datetime.fromisoformat(json.loads((ROOT/name).read_text())[field].replace('Z', '+00:00'))
          for name, field in [('metadata.json', 'generated_at'),
                              ('data/map/state.json', 'updated_at'),
                              ('data/recovery/recovery-stats.json', 'updated_at')]) + timedelta(minutes=1)
REVISION = 'a' * 40


class ServerDataTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.seed, self.state, self.public = (self.base/n for n in ('seed', 'state', 'public'))
        self.seed.mkdir()
        server.copy_state(ROOT, self.seed)

    def cycle(self, **kwargs):
        return server.cycle(self.state, self.public, ROOT, self.seed, REVISION, now=NOW,
                            collector=kwargs.pop('collector', lambda *args: {'stats': True}),
                            validator=kwargs.pop('validator', lambda *args: None), **kwargs)

    def test_allowlisted_immutable_json_and_retained_history(self):
        expected = (self.seed/'data/recovery/recovery-events.json').read_bytes()
        result = self.cycle()
        manifest = json.loads((self.public/'current/manifest.json').read_text())
        self.assertEqual(manifest['generation'], result['generation'])
        self.assertEqual(set(manifest['files']), set(server.PUBLIC_FILES))
        for path, digest in manifest['files'].items():
            self.assertEqual(hashlib.sha256((self.public/'current'/path).read_bytes()).hexdigest(), digest)
        self.assertEqual((self.state/'current/data/recovery/recovery-events.json').read_bytes(), expected)
        self.assertFalse((self.public/'current/scripts').exists())
        self.assertFalse((self.public/'current/data.js').exists())
        self.assertEqual(list((self.seed/'data/map/days').glob('*.json')).__len__(),
                         len(list((self.state/'current/data/map/days').glob('*.json'))))

    def test_failed_partial_collection_never_advances_publication_or_cursor(self):
        before = self.cycle()['generation']
        expected = (self.state/'current/data/map/state.json').read_bytes()
        def fail(root, *args):
            (root/'data/map/state.json').write_text('{"juno_last_height":99999999}')
            raise RuntimeError('source failed')
        with self.assertRaisesRegex(RuntimeError, 'source failed'):
            self.cycle(collector=fail)
        self.assertEqual((self.public/'current').resolve().name, before)
        self.assertEqual((self.state/'current/data/map/state.json').read_bytes(), expected)

    def test_checkpoint_precedes_public_pointer_and_survives_publish_interruption(self):
        self.cycle()
        old_public = (self.public/'current').resolve()
        original = server.switch_link
        def changed(root, *args):
            p = root/'data/recovery/recovery-stats.json'
            value = json.loads(p.read_text()); value['juno_last_height'] += 1
            p.write_text(json.dumps(value)); return {'stats': True}
        def interrupted(parent, name, target):
            if parent == self.public:
                self.assertEqual((self.state/'current').resolve().name, target)
                raise OSError('publication interrupted')
            original(parent, name, target)
        with patch.object(server, 'switch_link', side_effect=interrupted), self.assertRaises(OSError):
            self.cycle(collector=changed)
        self.assertEqual((self.public/'current').resolve(), old_public)
        retained = (self.state/'current/data/recovery/recovery-stats.json').read_bytes()
        self.cycle()
        self.assertEqual((self.public/'current/data/recovery/recovery-stats.json').read_bytes(), retained)

    def test_busy_writer_and_unsafe_seed_fail_before_publication(self):
        self.state.mkdir()
        with (self.state/'collector.lock').open('a') as lock:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            with self.assertRaises(BlockingIOError): self.cycle()
        self.assertFalse(self.public.exists())
        path = self.seed/'metadata.json'; path.unlink(); path.symlink_to('/etc/passwd')
        with self.assertRaises(ValueError): self.cycle()

    def test_stale_and_invalid_observations_stay_rejected(self):
        server.validate_state(self.seed, NOW)
        with self.assertRaisesRegex(ValueError, 'Unhealthy observations'):
            server.validate_state(self.seed, NOW + timedelta(days=3))
        path = self.seed/'metadata.json'; value = json.loads(path.read_text())
        value['validation']['passed'] = False; path.write_text(json.dumps(value))
        with self.assertRaisesRegex(ValueError, 'Ranking accounting'):
            server.validate_state(self.seed, NOW)

    def test_existing_caddy_sites_survive_idempotent_route_addition(self):
        source = 'data.cosmoot.com {\n    root * /snapshots/current\n    @markets path /data/markets/*\n    respond 404\n}\napi.cosmoot.com {\n    reverse_proxy backend:8787\n}\n'
        changed = installer.patch_caddy(source)
        self.assertIn('root * /snapshots/neta-website', changed)
        self.assertIn('api.cosmoot.com {\n    reverse_proxy backend:8787\n}', changed)
        self.assertIn('@markets path /data/markets/*', changed)
        self.assertEqual(installer.patch_caddy(changed), changed)
        with self.assertRaises(ValueError): installer.patch_caddy('other.com {\n}\n')
        with self.assertRaises(ValueError): installer.patch_caddy(source + source)


if __name__ == '__main__':
    unittest.main()
