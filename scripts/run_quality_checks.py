#!/usr/bin/env python3
"""Run the deterministic repository checks used locally and in CI."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def run(command: list[str]) -> None:
    print("+", " ".join(command), flush=True)
    subprocess.run(command, cwd=ROOT, check=True)


for test in sorted((ROOT / "scripts").glob("test_*.py")):
    run([sys.executable, str(test)])

for script in sorted(ROOT.glob("*.js")) + sorted((ROOT / "src").glob("*.js")):
    run(["node", "--check", str(script)])

print("Deterministic repository checks passed")
