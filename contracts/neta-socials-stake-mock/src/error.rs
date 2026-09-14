use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),
    #[error("unauthorized")]
    Unauthorized,
    #[error("this test contract does not accept funds")]
    FundsNotAccepted,
    #[error("this mock may only be instantiated on uni-7")]
    WrongChain,
}
