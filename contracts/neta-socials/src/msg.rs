use crate::state::{BanRecord, Comment, Config, Thread};
use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;

#[cw_serde]
pub struct InstantiateMsg { pub owner: String, pub stake_contract: String, pub minimum_stake: Uint128 }

#[cw_serde]
pub struct MigrateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    CreateThread { title: String, body: String },
    AddComment { thread_id: u64, body: String },
    SetThreadClosed { thread_id: u64, closed: bool },
    SetThreadHidden { thread_id: u64, hidden: bool, reason: Option<String> },
    SetCommentHidden { thread_id: u64, comment_id: u64, hidden: bool, reason: Option<String> },
    SetModerator { address: String, enabled: bool },
    SetUserBanned { address: String, banned: bool, reason: Option<String> },
    SetPaused { paused: bool },
    UpdateMinimumStake { minimum_stake: Uint128 },
    UpdateStakeContract { stake_contract: String },
    ProposeOwner { owner: String },
    AcceptOwnership {},
    CancelOwnershipTransfer {},
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(Config)] Config {},
    #[returns(Thread)] Thread { thread_id: u64 },
    #[returns(Vec<Thread>)] Threads { start_after: Option<u64>, limit: Option<u32>, descending: Option<bool> },
    #[returns(Vec<Comment>)] Comments { thread_id: u64, start_after: Option<u64>, limit: Option<u32>, descending: Option<bool> },
    #[returns(CommentEligibilityResponse)] CommentEligibility { address: String },
    #[returns(ModeratorResponse)] Moderator { address: String },
    #[returns(Vec<String>)] Moderators { start_after: Option<String>, limit: Option<u32> },
    #[returns(BanStatusResponse)] BanStatus { address: String },
}

#[cw_serde]
pub struct StakedBalanceQuery { pub staked_balance_at_height: StakedBalanceAtHeight }

#[cw_serde]
pub struct StakedBalanceAtHeight { pub address: String, pub height: Option<u64> }

#[cw_serde]
pub struct StakedBalanceResponse { pub balance: Uint128, pub height: u64 }

#[cw_serde]
pub struct CommentEligibilityResponse {
    pub address: String,
    pub staked: Uint128,
    pub minimum_stake: Uint128,
    pub owner_exempt: bool,
    pub stake_eligible: bool,
    pub banned: bool,
    pub paused: bool,
    pub cooldown_remaining_seconds: u64,
    pub can_post: bool,
}

#[cw_serde]
pub struct ModeratorResponse { pub address: String, pub moderator: bool }

#[cw_serde]
pub struct BanStatusResponse { pub address: String, pub record: Option<BanRecord> }
