# NETA Socials mainnet runbook

Status: **deployed and independently verified paused**. Code ID `5167` and
contract `juno1a0s5kaavcfnjgewtka0vr5tmmssynqfxmqyat3hm5lw75us0em9qcjdfv9`
are recorded in the release manifest. Public writes remain disabled while the
contract is paused.

## Locked release

The authoritative machine-readable values are in
`data/socials-mainnet-release.json`. CI rebuilds both the optimized contract and
the browser signing client. It rejects the release if the optimized contract is
not byte-identical to `assets/contracts/neta_socials.wasm`.

## Broadcast sequence

1. Confirm both the website and contract workflows are green on the release PR.
2. Open the unlinked `neta-socials-mainnet.html` console.
3. Connect the exact configured owner on `juno-1`.
4. Run the read-only preflight. It must verify the real staking-contract query
   and the exact WASM SHA-256 checksum.
5. Review and approve the StoreCode transaction in Keplr. Confirm that no funds
   are attached. The console must verify the stored on-chain checksum and
   creator before enabling Instantiate; record the code ID and transaction hash.
6. Review and approve the separate Instantiate transaction. Confirm the owner,
   staking contract, `10000000` raw minimum and owner migration admin.
7. Run the read-only post-deployment verification. It must report
   `MAINNET DEPLOYMENT VERIFIED · PAUSED`.
8. Record the code ID, contract address and transaction hashes in the release
   manifest through a reviewed PR.

Steps 1–8 completed on 2026-09-15. StoreCode transaction
`A05F35033ACAC542863607B8E739A50EE0EE51F945F4F8DAB4BA6D53C29EB41B`
at height `41783460` stored code ID `5167`. Instantiate transaction
`DEDD5CB4CB02C4B0B3912E7350BF459CA3137B83857CE38D6152E8C6261E0701`
at height `41783543` created the recorded contract. Independent REST queries
confirmed the checksum, creator, migration admin, owner, production stake
contract, 10 NETA threshold, 30-second cooldown and `paused: true`.

The deployment console deliberately has no execute or unpause capability.

The unlinked, noindex `neta-socials-admin.html` console is the only browser
surface for changing the paused state. Before enabling either control it
requires the exact owner on `juno-1` and verifies code ID, creator, migration
admin, label, application config, one production wallet below the 10-NETA gate
and one production wallet above it. Its only execute message is `set_paused`;
it attaches no funds. It retains an explicit emergency-pause path after launch.

## Before public activation

- Query one non-owner below 10 active staked NETA and confirm
  `stake_eligible: false`.
- Query one non-owner at or above 10 active staked NETA and confirm
  `stake_eligible: true`.
- Prepare the public frontend change from Uni-7 to the verified mainnet contract
  in a separate PR.
- Keep the production instance paused until that PR is green and deployed.
- Unpause with one explicit owner transaction, then smoke-test thread, comment,
  cooldown, close/reopen, hide/unhide, moderator and ban/unban behavior.
- Pause immediately if any live invariant differs from the verified result.

Production gate evidence collected at heights `41784186`–`41784201`:

- `juno1w9ee57gnduzm4l9h6xwn9tee9pyh8wlrr3xckg`: `0` active stake,
  `stake_eligible: false`.
- `juno15agzfrclmqnq72asjssh80723c9fvkq2e5h02p`: `300000000` raw active
  stake (300 NETA), `stake_eligible: true`.

Both correctly returned `can_post: false` while the global pause remained set.

## Administrative recovery

Application ownership and the chain-level migration admin are independent.
Transfer application ownership through `propose_owner` and `accept_ownership`.
Transfer migration authority through Juno's `set-contract-admin` transaction.
Never assume one operation performs the other.
