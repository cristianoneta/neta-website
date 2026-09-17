use crate::state::{Config, Proposal, ProposalStatus, Revision, DiscussionComment};
use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;

#[cw_serde]
pub struct InstantiateMsg {
    pub owner: String,
    pub dao_voting_contract: String,
    pub stake_contract: String,
    pub comment_threshold: Uint128,
}

#[cw_serde]
pub enum ExecuteMsg {
    PublishDraft { title: String, summary: String, body: String, actions_json: String },
    PublishRevision { proposal_id: u64, summary: String, body: String, actions_json: String, change_note: String },
    AddComment { proposal_id: u64, body: String },
    FinalizeAndSubmit { proposal_id: u64 },
    SetStatus { proposal_id: u64, status: ProposalStatus, dao_proposal_id: Option<u64> },
    SetPaused { paused: bool },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(Config)] Config {},
    #[returns(Proposal)] Proposal { proposal_id: u64 },
    #[returns(Vec<Proposal>)] Proposals { start_after: Option<u64>, limit: Option<u32> },
    #[returns(Vec<Revision>)] Revisions { proposal_id: u64 },
    #[returns(Vec<DiscussionComment>)] Comments { proposal_id: u64, start_after: Option<u64>, limit: Option<u32> },
    #[returns(AccessResponse)] Access { address: String },
}

#[cw_serde]
pub struct VotingPowerAtHeightQuery { pub voting_power_at_height: VotingPowerAtHeight }
#[cw_serde]
pub struct VotingPowerAtHeight { pub address: String, pub height: Option<u64> }
#[cw_serde]
pub struct VotingPowerResponse { pub power: Uint128, pub height: u64 }

#[cw_serde]
pub struct StakedBalanceQuery { pub staked_balance_at_height: StakedBalanceAtHeight }
#[cw_serde]
pub struct StakedBalanceAtHeight { pub address: String, pub height: Option<u64> }
#[cw_serde]
pub struct StakedBalanceResponse { pub balance: Uint128, pub height: u64 }

#[cw_serde]
pub struct AccessResponse {
    pub address: String,
    pub voting_power: Uint128,
    pub staked_neta: Uint128,
    pub can_publish: bool,
    pub can_comment: bool,
    pub paused: bool,
}

