#!/usr/bin/env python3
"""Static fail-closed checks for the controlled IBC transfer surface."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / "ibc-transfer.js").read_text(encoding="utf-8")
html = (ROOT / "map-of-neta.html").read_text(encoding="utf-8")
bundle = (ROOT / "assets/ibc-signing-client.js").read_text(encoding="utf-8")

required = {
    'HOT_JUNO': 'juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57',
    'Juno/Osmosis': '"juno:osmosis":"channel-0"',
    'Osmosis/Juno': '"osmosis:juno":"channel-42"',
    'Juno/Terra': '"juno:terra":"channel-86"',
    'Terra/Juno': '"terra:juno":"channel-2"',
    'Osmosis/Terra': '"osmosis:terra":"channel-251"',
    'Terra/Osmosis': '"terra:osmosis":"channel-1"',
    'NETA Osmosis': '"juno:osmosis":"channel-47"',
    'NETA Terra': '"juno:terra":"channel-154"',
    'NETA return Osmosis': '"osmosis:juno":"channel-169"',
    'NETA return Terra': '"terra:juno":"channel-33"',
}
for label, needle in required.items():
    assert needle in source, f"missing {label}: {needle}"

for denom in (
    "ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518",
    "107D152BB3176FAEBF4C2A84C5FFDEEA7C7CB4FE1BBDAB710F1FD25BCD055CBF",
    "46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED",
    "785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",
    "4CD525F166D32B0132C095F353F4C6F033B0FF5C49141470D1EFDA1D63303D04",
    "0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B",
    "297C64CC42B5A8D8F82FE2EBE208A6FE8F94B86037FA28C4529A23701C228F7A",
    "24EDDB84AD007CD83BD8D2DCCFF5FB71F93912AB143411AD870F2FE7DBE658FB",
):
    assert denom in source

assert 'ORIGIN[symbol]===from||ORIGIN[symbol]===to' in source
assert 'TRANSFER PARAMETERS CHANGED — REVIEW AGAIN' in source
assert 'gas>900000' in source
assert 'SOURCE TRANSACTION CONFIRMED · PACKET SUBMITTED' in source
assert 'destination_receipt_verified:false' in source
assert 'assets/ibc-signing-client.js' in html
assert '/ibc.applications.transfer.v1.MsgTransfer' in bundle
assert '/cosmwasm.wasm.v1.MsgExecuteContract' in bundle
print("Controlled IBC frontend safety tests passed")
