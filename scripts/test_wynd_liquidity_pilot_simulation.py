#!/usr/bin/env python3
"""Static safety checks for the unsigned JUNO/NETA liquidity pilot simulator."""
from pathlib import Path

import simulate_wynd_liquidity_pilot as pilot


source = Path(pilot.__file__).read_text(encoding="utf-8")

assert pilot.JUNO_RAW == 1_000_000
assert pilot.MAX_NETA_RAW == 10_200
assert pilot.SENDER == "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57"
assert pilot.MEMO == "netareborn.com/wynd-recovery:liquidity-pilot:v1"
assert '"/cosmos/tx/v1beta1/simulate"' in source
assert "/cosmos/tx/v1beta1/txs" not in source
assert "broadcast_tx" not in source
assert '"broadcast": False' in source
assert "neta_raw <= MAX_NETA_RAW" in source

# MsgExecuteContract reserves field 4 and encodes native funds at field 5.
native_funds = pilot.execute_any("contract", {"test": {}}, (("ujuno", 1),))
assert b"\x2a\x0a\x0a\x05ujuno\x12\x011" in native_funds

print("WYND liquidity pilot unsigned-simulation safety tests passed")
