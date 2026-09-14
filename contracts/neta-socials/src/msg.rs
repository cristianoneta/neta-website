use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;
use crate::state::{Comment, Config, Thread};

#[cw_serde]
pub struct InstantiateMsg {
    pub owner: String,
    pub stake_contract: String,
    pub minimum_stake: Uint128,
}

#[cw_serde]
pub struct MigrateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    CreateThread { title: String, body: String },
    AddComment { thread_id: u64, body: String },
    SetThreadClosed { thread_id: u64, closed: bool },
    UpdateMinimumStake { minimum_stake: Uint128 },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(Config)]
    Config {},
    #[returns(Thread)]
    Thread { thread_id: u64 },
    #[returns(Vec<Thread>)]
    Threads { start_after: Option<u64>, limit: Option<u32> },
    #[returns(Vec<Comment>)]
    Comments { thread_id: u64, start_after: Option<u64>, limit: Option<u32> },
    #[returns(CommentEligibilityResponse)]
    CommentEligibility { address: String },
}

#[cw_serde]
pub struct StakedBalanceQuery {
    pub staked_balance_at_height: StakedBalanceAtHeight,
}

#[cw_serde]
pub struct StakedBalanceAtHeight {
    pub address: String,
    pub height: Option<u64>,
}

#[cw_serde]
pub struct StakedBalanceResponse {
    pub balance: Uint128,
    pub height: u64,
}

#[cw_serde]
pub struct CommentEligibilityResponse {
    pub address: String,
    pub staked: Uint128,
    pub minimum_stake: Uint128,
    pub owner_exempt: bool,
    pub eligible: bool,
}
