use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")] Std(#[from] StdError),
    #[error("unauthorized")] Unauthorized,
    #[error("this contract does not accept funds")] FundsNotAccepted,
    #[error("thread is closed")] ThreadClosed,
    #[error("posting is paused")] Paused,
    #[error("address is banned")] Banned,
    #[error("posting cooldown has {remaining_seconds} seconds remaining")] Cooldown { remaining_seconds: u64 },
    #[error("minimum active DAO stake not met")] MinimumStakeNotMet,
    #[error("active stake query failed")] StakeQueryFailed,
    #[error("{field} must contain between {min} and {max} characters")] InvalidLength { field: String, min: usize, max: usize },
    #[error("{field} contains forbidden control or direction characters")] InvalidCharacters { field: String },
    #[error("a moderation reason is required when hiding content")] ModerationReasonRequired,
    #[error("the owner cannot be banned or configured as a moderator")] ProtectedOwner,
    #[error("only the pending owner may accept ownership")] NotPendingOwner,
    #[error("counter overflow")] CounterOverflow,
    #[error("invalid or unsupported contract version: {version}")] InvalidVersion { version: String },
    #[error("migration must move to a newer version")] NonIncreasingVersion,
}
