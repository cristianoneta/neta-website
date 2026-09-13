#!/usr/bin/env python3
"""Render and verify the shared static header and footer on every page."""
from __future__ import annotations

import argparse
import re
from pathlib import Path


PAGES = (
    "index.html",
    "map-of-neta.html",
    "what-is-neta.html",
    "neta-dao.html",
    "wynd-recovery.html",
)
NAVIGATION = (
    ("index.html", "RANKING"),
    ("map-of-neta.html", "MAP OF NETA"),
    ("what-is-neta.html", "WHAT IS NETA"),
    ("neta-dao.html", "NETA DAO"),
    ("wynd-recovery.html", "WYND RECOVERY"),
)
HEADER_RE = re.compile(
    r"(?:<!-- site-header:start -->\n)?<header\b.*?</header>(?:\n<!-- site-header:end -->)?",
    re.DOTALL,
)
FOOTER_RE = re.compile(
    r"(?:<!-- site-footer:start -->\n)?<footer\b.*?</footer>(?:\n<!-- site-footer:end -->)?",
    re.DOTALL,
)


def render_header(active_page: str) -> str:
    links = []
    for href, label in NAVIGATION:
        active = ' class="active" aria-current="page"' if href == active_page else ""
        links.append(f"    <a{active} href=\"{href}\">{label}</a>")
    links.append('    <a href="#" title="Coming next" aria-disabled="true">VALUE CALCULATOR</a>')
    return "\n".join((
        "<!-- site-header:start -->",
        "<header>",
        '  <a class="logo" href="index.html" aria-label="NETA Reborn home">',
        '    <img src="assets/neta-mark.svg" alt=""><span>[ NETA ]</span>',
        "  </a>",
        '  <nav aria-label="Primary navigation">',
        *links,
        "  </nav>",
        '  <div class="wallet-shell">',
        '    <button id="keplr-connect" class="keplr-connect" type="button" aria-label="Connect Keplr wallet">',
        '      <img src="assets/keplr-symbol.svg" alt=""><span><b data-wallet-label>CONNECT KEPLR</b><small data-wallet-balance>READ-ONLY</small></span>',
        '    </button>',
        '  </div>',
        "</header>",
        "<!-- site-header:end -->",
    ))


def render_footer() -> str:
    return "\n".join((
        "<!-- site-footer:start -->",
        "<footer>",
        "  <div>[ NETA ] &nbsp; MORE THAN A TOKEN. A COMMUNITY.</div>",
        "  <div>BUILT ON JUNO &amp; OSMOSIS</div>",
        "</footer>",
        "<!-- site-footer:end -->",
    ))


def expected_page(source: str, page: str) -> str:
    source, header_count = HEADER_RE.subn(render_header(page), source, count=1)
    source, footer_count = FOOTER_RE.subn(render_footer(), source, count=1)
    if header_count != 1 or footer_count != 1:
        raise RuntimeError(f"{page}: expected exactly one header and footer")
    return source


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".")
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    root = Path(args.root)
    stale = []
    for page in PAGES:
        path = root / page
        source = path.read_text(encoding="utf-8")
        expected = expected_page(source, page)
        if source == expected:
            continue
        if args.check:
            stale.append(page)
        else:
            path.write_text(expected, encoding="utf-8")
            print(f"updated {page}")
    if stale:
        raise SystemExit("shared shell is stale: " + ", ".join(stale))


if __name__ == "__main__":
    main()
