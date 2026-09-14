use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Uint128};
use cw_storage_plus::{Item, Map};

#[cw_serde]
pub struct Config {
    pub owner: Addr,
    pub stake_contract: Addr,
    pub minimum_stake: Uint128,
}

#[cw_serde]
pub struct Thread {
    pub id: u64,
    pub author: Addr,
    pub title: String,
    pub body: String,
    pub created_height: u64,
    pub created_time: u64,
    pub comment_count: u64,
    pub closed: bool,
}

#[cw_serde]
pub struct Comment {
    pub id: u64,
    pub thread_id: u64,
    pub author: Addr,
    pub body: String,
    pub created_height: u64,
    pub created_time: u64,
}

pub const CONFIG: Item<Config> = Item::new("config");
pub const NEXT_THREAD_ID: Item<u64> = Item::new("next_thread_id");
pub const THREADS: Map<u64, Thread> = Map::new("threads");
pub const NEXT_COMMENT_ID: Map<u64, u64> = Map::new("next_comment_id");
pub const COMMENTS: Map<(u64, u64), Comment> = Map::new("comments");

