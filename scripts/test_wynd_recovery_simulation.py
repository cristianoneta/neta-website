#!/usr/bin/env python3
from pathlib import Path

import simulate_wynd_recovery as simulation


assert simulation.varint(1) == b"\x01"
assert simulation.varint(128) == b"\x80\x01"
assert simulation.key(1, 2) == b"\x0a"
assert simulation.bfield(1, "x") == b"\x0a\x01x"

source = Path(simulation.__file__).read_text(encoding="utf-8")
assert '"/cosmos/tx/v1beta1/simulate"' in source
assert "/cosmos/tx/v1beta1/txs" not in source
assert "broadcast_tx" not in source
assert '"broadcast": False' in source
assert 'len(pools) != 8' in source
assert 'len(pools) * 3' in source
assert '("unbond", unbond_sender' in source
assert '("claim", c["claim"]' in source
assert '("withdraw", withdraw_sender' in source
assert '"unbond_invalid_period"' in source
assert '"unbond_exceeds_position"' in source
assert '"claim_without_position"' in source
assert '"withdraw_exceeds_balance"' in source
assert '"claim_wrong_contract"' in source
print("WYND recovery all-pool simulation safety tests passed")
