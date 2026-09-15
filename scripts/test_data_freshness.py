import json
import tempfile
from datetime import datetime, timezone
from pathlib import Path

from check_data_freshness import TARGETS, inspect


NOW = datetime(2026, 9, 15, 15, tzinfo=timezone.utc)


def fixture(timestamp: str) -> Path:
    root = Path(tempfile.mkdtemp())
    for target in TARGETS:
        path = root / target.path
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps({target.field: timestamp}), encoding="utf-8")
    return root


fresh = inspect(fixture("2026-09-15T14:00:00Z"), NOW)
assert all(item["fresh"] for item in fresh)

stale_root = fixture("2026-09-15T14:00:00Z")
(stale_root / "data/map/state.json").write_text(
    json.dumps({"updated_at": "2026-09-15T06:59:59Z"}), encoding="utf-8"
)
stale = inspect(stale_root, NOW)
assert next(item for item in stale if item["name"] == "Map of NETA")["fresh"] is False

invalid_root = fixture("2026-09-15T14:00:00Z")
(invalid_root / "metadata.json").write_text("{}", encoding="utf-8")
invalid = inspect(invalid_root, NOW)
ranking = next(item for item in invalid if item["name"] == "economic ranking")
assert ranking["fresh"] is False and ranking["error"]

print("Production worker freshness tests passed")
