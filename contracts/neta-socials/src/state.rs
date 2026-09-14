use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Uint128};
use cw_storage_plus::{Item, Map};

pub const POST_COOLDOWN_SECONDS: u64 = 30;

fn default_post_cooldown_seconds() -> u64 {
    POST_COOLDOWN_SECONDS
}

#[cw_serde]
pub struct Config {
    pub owner: Addr,
    #[serde(default)]
    pub pending_owner: Option<Addr>,
    pub stake_contract: Addr,
    pub minimum_stake: Uint128,
    #[serde(default)]
    pub paused: bool,
    #[serde(default = "default_post_cooldown_seconds")]
    pub post_cooldown_seconds: u64,
}

#[cw_serde]
pub struct Moderation {
    pub hidden: bool,
    pub reason: Option<String>,
    pub updated_by: Addr,
    pub updated_height: u64,
    pub updated_time: u64,
}

#[cw_serde]
pub struct Thread {
    pub id: u64,
    pub author: Addr,
    pub title: String,
    pub body: String,
    pub created_height: u64,
    pub created_time: u64,
    #[serde(default)]
    pub verified_stake_at_creation: Uint128,
    pub comment_count: u64,
    pub closed: bool,
    #[serde(default)]
    pub moderation: Option<Moderation>,
}

#[cw_serde]
pub struct Comment {
    pub id: u64,
    pub thread_id: u64,
    pub author: Addr,
    pub body: String,
    pub created_height: u64,
    pub created_time: u64,
    #[serde(default)]
    pub verified_stake_at_creation: Uint128,
    #[serde(default)]
    pub moderation: Option<Moderation>,
}

#[cw_serde]
pub struct BanRecord {
    pub banned: bool,
    pub reason: Option<String>,
    pub updated_by: Addr,
    pub updated_height: u64,
    pub updated_time: u64,
}

pub const CONFIG: Item<Config> = Item::new("config");
pub const NEXT_THREAD_ID: Item<u64> = Item::new("next_thread_id");
pub const THREADS: Map<u64, Thread> = Map::new("threads");
pub const NEXT_COMMENT_ID: Map<u64, u64> = Map::new("next_comment_id");
pub const COMMENTS: Map<(u64, u64), Comment> = Map::new("comments");
pub const MODERATORS: Map<&Addr, bool> = Map::new("moderators");
pub const BANS: Map<&Addr, BanRecord> = Map::new("bans");
pub const LAST_POST_TIME: Map<&Addr, u64> = Map::new("last_post_time");
