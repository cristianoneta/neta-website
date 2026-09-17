use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")] Std(#[from] StdError),
    #[error("unauthorized")] Unauthorized,
    #[error("this contract does not accept funds")] FundsNotAccepted,
    #[error("governance is paused")] Paused,
    #[error("proposal is not in discussion")] NotInDiscussion,
    #[error("strictly more than 10 NETA must be staked to comment")] CommentThresholdNotMet,
    #[error("DAO voting power is required")] VotingPowerRequired,
    #[error("{field} must contain between {min} and {max} characters")] InvalidLength { field: String, min: usize, max: usize },
    #[error("counter overflow")] CounterOverflow,
}

