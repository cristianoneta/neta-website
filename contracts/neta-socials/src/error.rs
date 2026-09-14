use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),
    #[error("unauthorized")]
    Unauthorized,
    #[error("this contract does not accept funds")]
    FundsNotAccepted,
    #[error("thread is closed")]
    ThreadClosed,
    #[error("minimum active DAO stake not met")]
    MinimumStakeNotMet,
    #[error("{field} must contain between {min} and {max} characters")]
    InvalidLength { field: String, min: usize, max: usize },
}
