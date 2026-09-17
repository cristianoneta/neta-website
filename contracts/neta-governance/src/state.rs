use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Uint128};
use cw_storage_plus::{Item, Map};

#[cw_serde]
pub struct Config {
    pub owner: Addr,
    pub dao_voting_contract: Addr,
    pub stake_contract: Addr,
    pub comment_threshold: Uint128,
    pub paused: bool,
}

#[cw_serde]
pub enum ProposalStatus { Discussion, Voting, Approved, Declined }

#[cw_serde]
pub struct Proposal {
    pub id: u64,
    pub author: Addr,
    pub title: String,
    pub status: ProposalStatus,
    pub current_revision: u64,
    pub dao_proposal_id: Option<u64>,
    pub created_height: u64,
    pub created_time: u64,
}

#[cw_serde]
pub struct Revision {
    pub proposal_id: u64,
    pub revision: u64,
    pub author: Addr,
    pub summary: String,
    pub body: String,
    pub actions_json: String,
    pub change_note: String,
    pub created_height: u64,
    pub created_time: u64,
}

#[cw_serde]
pub struct DiscussionComment {
    pub id: u64,
    pub proposal_id: u64,
    pub author: Addr,
    pub body: String,
    pub verified_stake: Uint128,
    pub created_height: u64,
    pub created_time: u64,
}

pub const CONFIG: Item<Config> = Item::new("config");
pub const NEXT_PROPOSAL_ID: Item<u64> = Item::new("next_proposal_id");
pub const PROPOSALS: Map<u64, Proposal> = Map::new("proposals");
pub const REVISIONS: Map<(u64, u64), Revision> = Map::new("revisions");
pub const NEXT_COMMENT_ID: Map<u64, u64> = Map::new("next_comment_id");
pub const COMMENTS: Map<(u64, u64), DiscussionComment> = Map::new("comments");

