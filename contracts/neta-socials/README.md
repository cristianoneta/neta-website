# NETA Socials contract

CosmWasm contract for the on-chain NETA community board.

## V1 rules

- Reading is public.
- Creating a thread or comment requires at least 10 active NETA staked in the configured DAO staking contract.
- The configured owner is exempt from the stake threshold.
- A thread author may close their own thread.
- The owner may close or reopen any thread.
- Threads and comments cannot be deleted or edited.
- The contract rejects all attached funds.

## Mainnet configuration

```json
{
  "owner": "juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57",
  "stake_contract": "juno1a7x8aj7k38vnj9edrlymkerhrl5d4ud3makmqhx6vt3dhu0d824qh038zh",
  "minimum_stake": "10000000"
}
```

The instantiate transaction must set the same owner address as the contract admin so future code migrations remain possible.

## Verification

```sh
cargo test --manifest-path contracts/neta-socials/Cargo.toml
cargo clippy --manifest-path contracts/neta-socials/Cargo.toml --all-targets -- -D warnings
rustup target add wasm32-unknown-unknown
cargo build --release --target wasm32-unknown-unknown --manifest-path contracts/neta-socials/Cargo.toml
```
