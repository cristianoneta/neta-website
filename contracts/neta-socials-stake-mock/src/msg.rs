use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;

#[cw_serde]
pub struct StakeBalance {
    pub address: String,
    pub balance: Uint128,
}

#[cw_serde]
pub struct InstantiateMsg {
    pub owner: String,
    pub balances: Vec<StakeBalance>,
}

#[cw_serde]
pub enum ExecuteMsg {
    SetBalance { address: String, balance: Uint128 },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(StakedBalanceAtHeightResponse)]
    StakedBalanceAtHeight {
        address: String,
        height: Option<u64>,
    },
}

#[cw_serde]
pub struct StakedBalanceAtHeightResponse {
    pub balance: Uint128,
    pub height: u64,
}
