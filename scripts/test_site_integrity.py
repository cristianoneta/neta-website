#!/usr/bin/env python3
"""Static integration checks across every public page."""
from __future__ import annotations

import json
import re
import subprocess
import tomllib
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

from site_shell import NAVIGATION, PAGES


ROOT = Path(__file__).resolve().parents[1]
ACTION_REF = re.compile(r"uses:\s+[^\s@]+@([^\s#]+)")
FULL_SHA = re.compile(r"^[0-9a-f]{40}$")


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

for workflow in (ROOT / ".github" / "workflows").glob("*.yml"):
    for reference in ACTION_REF.findall(workflow.read_text(encoding="utf-8")):
        assert FULL_SHA.fullmatch(reference), f"{workflow.name}: action is not pinned to a full commit SHA: {reference}"

assert (ROOT / ".github/workflows/ci.yml").is_file()
ci_workflow = (ROOT / ".github/workflows/ci.yml").read_text(encoding="utf-8")
assert "pages: write" in ci_workflow
assert 'github.event_name == \'push\'' in ci_workflow
assert 'repos/${{ github.repository }}/pages/builds' in ci_workflow
assert not (ROOT / ".github/workflows/test-site-integrity.yml").exists()
assert not (ROOT / ".github/workflows/test-wynd-recovery-frontend.yml").exists()
mainnet_html = (ROOT / "neta-socials-mainnet.html").read_text(encoding="utf-8")
mainnet_script = (ROOT / "neta-socials-mainnet.js").read_text(encoding="utf-8")
mainnet_manifest = (ROOT / "data/socials-mainnet-release.json").read_text(encoding="utf-8")
mainnet_release = json.loads(mainnet_manifest)
socials_package = tomllib.loads((ROOT / "contracts/neta-socials/Cargo.toml").read_text(encoding="utf-8"))
assert '<meta name="robots" content="noindex,nofollow,noarchive">' in mainnet_html
assert "THIS CONSOLE CANNOT UNPAUSE THE CONTRACT" in mainnet_html
assert 'const CHAIN_ID="juno-1"' in mainnet_script
assert 'const MINIMUM_STAKE="10000000"' in mainnet_script
assert 'config.paused!==true' in mainnet_script
assert "set_paused" not in mainnet_script
assert '"public_frontend_enabled": true' in mainnet_manifest
assert '"deployment_status": "live_verified"' in mainnet_manifest
assert mainnet_release["contract_version"] == socials_package["package"]["version"] == "0.2.1"
assert '"code_id": 5167' in mainnet_manifest
assert '"contract_address": "juno1a0s5kaavcfnjgewtka0vr5tmmssynqfxmqyat3hm5lw75us0em9qcjdfv9"' in mainnet_manifest
assert '"verified_paused": false' in mainnet_manifest
assert '"unpause_tx": "8B2354A8C603CB9EE0A95009FA734D3C4FEF84CA31AFB563D97D3EFDDADC3FD6"' in mainnet_manifest
socials_html = (ROOT / "neta-socials.html").read_text(encoding="utf-8")
socials_script = (ROOT / "neta-socials.js").read_text(encoding="utf-8")
assert "assets/recovery-signing-client.js?v=7" in socials_html
assert "ON-CHAIN MAINNET" in socials_html
assert "<strong>LIVE</strong>" in socials_html
assert 'href="https://t.me/+mfsF41Zra7I2ZDYy"' in socials_html
assert 'href="https://daodao.zone/dao/juno1c5v6jkmre5xa9vf9aas6yxewc7aqmjy0rlkkyk4d88pnwuhclyhsrhhns6/home"' in socials_html
assert 'rel="noopener noreferrer"' in socials_html
assert 'CONTRACT="juno1a0s5kaavcfnjgewtka0vr5tmmssynqfxmqyat3hm5lw75us0em9qcjdfv9"' in socials_script
assert 'CHAIN_ID="juno-1"' in socials_script
assert "NetaRecoverySigning.execute" in socials_script
assert '"0.1ujuno"' in socials_script
assert "experimentalSuggestChain" not in socials_script
assert "ujunox" not in socials_script
admin_html = (ROOT / "neta-socials-admin.html").read_text(encoding="utf-8")
admin_script = (ROOT / "neta-socials-admin.js").read_text(encoding="utf-8")
assert '<meta name="robots" content="noindex,nofollow,noarchive">' in admin_html
assert "REVIEW EMERGENCY PAUSE" in admin_html
assert 'const CHAIN_ID="juno-1"' in admin_script
assert 'const CODE_ID=5167' in admin_script
assert 'CONTRACT="juno1a0s5kaavcfnjgewtka0vr5tmmssynqfxmqyat3hm5lw75us0em9qcjdfv9"' in admin_script
assert "set_paused" in admin_script
assert "upload(" not in admin_script
assert "instantiate(" not in admin_script
assert "funds:" not in admin_script
publisher_workflow = (ROOT / ".github/workflows/update-production-data.yml").read_text(encoding="utf-8")
assert 'pull_request:\n    branches: [main]\n    paths:' in publisher_workflow
assert 'schedule:\n    - cron: "7 * * * *"' in publisher_workflow
assert "Publish one atomic data commit" in publisher_workflow
assert "Request one GitHub Pages rebuild" in publisher_workflow

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
    assert 'id="keplr-connect"' in source
    assert 'id="wallet-menu"' in source
    assert 'role="menu"' in source
    assert 'href="#" title="Coming next"' not in source
    assert '<meta name="referrer" content="no-referrer">' in source
    assert source.count('http-equiv="Content-Security-Policy"') == 1
    assert "script-src 'self'" in source
    assert "object-src 'none'" in source
    assert 'src="wallet-header.js?v=4"' in source
    for asset in parser.assets:
        parsed = urlsplit(asset)
        if parsed.scheme or parsed.netloc or asset.startswith("#"):
            continue
        local_path = parsed.path.lstrip("/")
        assert (ROOT / local_path).is_file(), f"{page}: missing asset {local_path}"

recovery = (ROOT / "wynd-recovery.js").read_text(encoding="utf-8")
map_script = (ROOT / "map-of-neta.js").read_text(encoding="utf-8")
address_index = (ROOT / "address-index.js").read_text(encoding="utf-8")
wallet_header = (ROOT / "wallet-header.js").read_text(encoding="utf-8")
rescue = (ROOT / "rescue-neta.js").read_text(encoding="utf-8")
ibc = (ROOT / "ibc-transfer.js").read_text(encoding="utf-8")
styles = (ROOT / "styles.css").read_text(encoding="utf-8")
assert 'position:sticky;top:0' in styles
assert 'window.keplr.enable(CHAIN_ID)' in wallet_header
assert 'INVALID BECH32 CHECKSUM' in wallet_header
assert 'aria-haspopup","menu"' in wallet_header
assert 'script.src="address-index.js"' in wallet_header
assert 'position?.total_neta' in wallet_header
assert 'index[osmosisAddress]' in wallet_header
assert 'neta:wallet-connected' in wallet_header
assert 'neta:wallet-disconnected' in wallet_header
assert 'const LIMIT_USD=25' in rescue
assert 'PAIR_CODE_ID="2289"' in rescue
assert 'ask_asset_info:null' in rescue
assert 'referral:false' in rescue
swap_config = (ROOT / "rescue-neta-signing-config.js").read_text(encoding="utf-8")
assert 'publicMaxUsd:25' in swap_config
assert 'pilotOnly' not in swap_config
assert 'pilotWallet' not in swap_config
assert 'pilotMaxUsd' not in swap_config
assert 'SIGNING.pilotOnly' not in rescue
assert 'per_swap_limit_usd:SIGNING.publicMaxUsd' in rescue
assert 'SIGNING.publicMaxUsd===LIMIT_USD' in rescue
assert 'gas>SIGNING.gasCap' in rescue
assert 'receivedFromEvents(result.events,liveQuote.receive,address)' in rescue
assert 'const HOT_JUNO=' not in ibc
assert 'function connectedAndAllowed(){return selectedRoute().every(chain=>Boolean(accounts[chain]))}' in ibc
assert 'Object.entries(CHAINS)' not in ibc
assert 'new AbortController()' in ibc
assert 'ORIGIN[symbol]===from||ORIGIN[symbol]===to' in ibc
assert '"juno:terra":"channel-154"' not in ibc
assert '"terra:juno":"channel-33"' not in ibc
assert '"osmosis:terra":"channel-251"' in ibc
assert '"terra:osmosis":"channel-1"' in ibc
assert 'amount>balanceRaw' in ibc
assert 'gas>900000' in ibc
assert 'item.type==="send_packet"' in ibc
assert 'assets/ibc-signing-client.js' in (ROOT / "map-of-neta.html").read_text(encoding="utf-8")
assert 'TRANSACTION INCLUDED · VERIFICATION INCOMPLETE' in rescue
assert 'belief_price:belief' in rescue
assert 'referral_address:null' in rescue
assert 'assets/swap-signing-client.js' in (ROOT / "rescue-neta.html").read_text(encoding="utf-8")
assert 'data-wallet-action="disconnect"' in wallet_header
assert 'acceptHeaderWallet' in recovery
assert 'neta:wallet-disconnected' in recovery
assert "setInterval(flash,9000)" in recovery
assert "SIGNING_CONFIG?.enabled===true" in recovery
assert "signing_enabled:enabled" in recovery
assert "signAndBroadcast" not in recovery
assert "https://www.mintscan.io/osmosis/address/" in map_script
assert 'link.rel="noopener noreferrer"' in map_script
for browser_script in ROOT.glob("*.js"):
    if browser_script.name in {"address-index.js", "data.js"}:
        continue
    source = browser_script.read_text(encoding="utf-8")
    assert ".innerHTML" not in source, f"{browser_script.name}: innerHTML is forbidden"
    assert "insertAdjacentHTML" not in source, f"{browser_script.name}: HTML string insertion is forbidden"
cosmos_client = (ROOT / "cosmos-client.js").read_text(encoding="utf-8")
assert "Promise.any(attempts)" in cosmos_client
assert "hedgeDelayMs = 350" in cosmos_client
assert "INVALID JUNO CONTRACT" in cosmos_client
assert "unescape(encodeURIComponent" not in cosmos_client
assert "window.NETA_ADDRESS_ROWS" in address_index
assert "Object.create(null)" in address_index
assert (ROOT / "address-index.js").stat().st_size < 2_000_000
print(f"Site integrity tests passed for {len(PAGES)} pages")
