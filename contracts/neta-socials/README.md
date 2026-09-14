# NETA Socials contract

CosmWasm contract for the on-chain NETA community board.

## V1 rules

- Reading is public and original content remains queryable on-chain.
- Creating a thread or comment requires at least 10 currently active NETA staked in the configured DAO staking contract.
- The configured owner is exempt from the stake threshold, but not from pause or cooldown.
- Every address has one global 30-second cooldown across threads and comments.
- The owner may ban or unban an address. Bans prevent new threads and comments and revoke moderator status.
- A thread author may close their own thread. Only the owner may reopen it.
- The owner appoints and revokes moderators. Moderators may mark threads and comments hidden or visible with an auditable on-chain record.
- Hidden content is not deleted or altered; clients decide whether to display it.
- The owner may pause new posts without disabling reads or moderation.
- A new deployment starts paused and must be deliberately opened by the owner after live verification.
- The owner may immediately replace the staking contract only after a compatible live query succeeds.
- Ownership transfers require proposal by the current owner and acceptance by the proposed owner.
- Threads and comments cannot be edited or deleted.
- The contract rejects all attached funds, including during instantiate.

## Roles and migration authority

`owner` is the application administrator stored by this contract. The Juno CosmWasm migration admin is a separate chain-level role. For the initial controlled deployment both may be the transition hot wallet. Moving to DAO control requires two deliberate operations:

1. `propose_owner` followed by `accept_ownership` for application administration.
2. `junod tx wasm set-contract-admin` for migration authority.

Neither operation performs the other implicitly.

## Initial mainnet configuration

```json
{
  "owner": "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57",
  "stake_contract": "juno1a7x8aj7k38vnj9edrlymkerhrl5d4ud3makmqhx6vt3dhu0d824qh038zh",
  "minimum_stake": "10000000"
}
```

The frontend must read `config` and `comment_eligibility` from the deployed contract. It must not treat a duplicated frontend threshold, owner, pause state or ban state as authoritative.

## Safety properties

- Stake lookups fail closed.
- Only current active DAO stake is counted; wallet balances, LP positions and unstaking claims do not count.
- A replacement staking contract is activated only after it answers the expected `staked_balance_at_height` query.
- Control characters, bidirectional overrides and zero-width format characters are rejected from user text.
- IDs and comment counts use checked arithmetic.
- Same-version and downgrade migrations are rejected.
- Configuration and moderation changes emit auditable attributes.

## Verification

```sh
cargo fmt --manifest-path contracts/neta-socials/Cargo.toml -- --check
cargo clippy --manifest-path contracts/neta-socials/Cargo.toml --all-targets -- -D warnings
cargo test --manifest-path contracts/neta-socials/Cargo.toml
cargo run --manifest-path contracts/neta-socials/Cargo.toml --example schema
rustup target add wasm32-unknown-unknown
cargo build --release --target wasm32-unknown-unknown --manifest-path contracts/neta-socials/Cargo.toml
docker run --rm -v "$(pwd)/contracts/neta-socials:/code" cosmwasm/optimizer:0.17.0
(cd contracts/neta-socials/artifacts && sha256sum -c checksums.txt)
```

Only the optimized `artifacts/neta_socials.wasm` file and its recorded checksum are intended for deployment.
