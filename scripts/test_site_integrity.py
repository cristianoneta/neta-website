#!/usr/bin/env python3
"""Static integration checks across every public page."""
from __future__ import annotations

import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

from site_shell import NAVIGATION, PAGES


ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.assets = []
        self.active_links = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.append(values["id"])
        if tag == "a" and values.get("href"):
            self.links.append(values["href"])
            classes = (values.get("class") or "").split()
            if "active" in classes:
                self.active_links.append(values["href"])
        if tag in {"script", "img", "link"}:
            value = values.get("src") or values.get("href")
            if value:
                self.assets.append(value)


subprocess.run(
    ["python3", str(ROOT / "scripts/site_shell.py"), "--root", str(ROOT), "--check"],
    check=True,
)

expected_nav = {href for href, _ in NAVIGATION}
for page in PAGES:
    parser = PageParser()
    source = (ROOT / page).read_text(encoding="utf-8")
    parser.feed(source)
    assert len(parser.ids) == len(set(parser.ids)), f"{page}: duplicate HTML id"
    assert expected_nav.issubset(parser.links), f"{page}: incomplete navigation"
    assert parser.active_links == [page], f"{page}: incorrect active navigation link"
    assert source.count("<!-- site-header:start -->") == 1
    assert source.count("<!-- site-footer:start -->") == 1
    for asset in parser.assets:
        parsed = urlsplit(asset)
        if parsed.scheme or parsed.netloc or asset.startswith("#"):
            continue
        local_path = parsed.path.lstrip("/")
        assert (ROOT / local_path).is_file(), f"{page}: missing asset {local_path}"

recovery = (ROOT / "wynd-recovery.js").read_text(encoding="utf-8")
assert "setInterval(flash,9000)" in recovery
assert "signing_enabled:false" in recovery
assert "signAndBroadcast" not in recovery
print(f"Site integrity tests passed for {len(PAGES)} pages")
