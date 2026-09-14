use crate::error::ContractError;
use crate::msg::{
    BanStatusResponse, CommentEligibilityResponse, ExecuteMsg, InstantiateMsg, MigrateMsg,
    ModeratorResponse, QueryMsg, StakedBalanceAtHeight, StakedBalanceQuery, StakedBalanceResponse,
};
use crate::state::{
    BanRecord, Comment, Config, Moderation, Thread, BANS, COMMENTS, CONFIG, LAST_POST_TIME,
    MODERATORS, NEXT_COMMENT_ID, NEXT_THREAD_ID, POST_COOLDOWN_SECONDS, THREADS,
};
use cosmwasm_std::{
    entry_point, to_json_binary, Addr, Binary, Deps, DepsMut, Env, MessageInfo, Order, Response,
    StdError, StdResult, Uint128,
};
use cw2::{get_contract_version, set_contract_version};
use cw_storage_plus::Bound;

const NAME: &str = "crates.io:neta-socials";
const VERSION: &str = env!("CARGO_PKG_VERSION");
const MAX_LIMIT: u32 = 100;
const MAX_REASON_LENGTH: usize = 240;

fn forbidden_character(c: char) -> bool {
    (c.is_control() && c != '\n' && c != '\t')
        || matches!(
            c,
            '\u{200b}'
                | '\u{200c}'
                | '\u{200d}'
                | '\u{202a}'
                | '\u{202b}'
                | '\u{202c}'
                | '\u{202d}'
                | '\u{202e}'
                | '\u{2066}'
                | '\u{2067}'
                | '\u{2068}'
                | '\u{2069}'
                | '\u{feff}'
        )
}

fn validate_text(
    field: &str,
    value: &str,
    min: usize,
    max: usize,
) -> Result<String, ContractError> {
    let clean = value.trim();
    let count = clean.chars().count();
    if count < min || count > max {
        return Err(ContractError::InvalidLength {
            field: field.into(),
            min,
            max,
        });
    }
    if clean.chars().any(forbidden_character) {
        return Err(ContractError::InvalidCharacters {
            field: field.into(),
        });
    }
    Ok(clean.to_string())
}

fn moderation_reason(
    hidden: bool,
    reason: Option<String>,
) -> Result<Option<String>, ContractError> {
    if hidden {
        Ok(Some(validate_text(
            "reason",
            &reason.ok_or(ContractError::ModerationReasonRequired)?,
            1,
            MAX_REASON_LENGTH,
        )?))
    } else {
        Ok(None)
    }
}

fn ensure_no_funds(info: &MessageInfo) -> Result<(), ContractError> {
    if info.funds.is_empty() {
        Ok(())
    } else {
        Err(ContractError::FundsNotAccepted)
    }
}

fn ensure_owner(cfg: &Config, sender: &Addr) -> Result<(), ContractError> {
    if sender == cfg.owner {
        Ok(())
    } else {
        Err(ContractError::Unauthorized)
    }
}

fn banned(deps: Deps, address: &Addr) -> StdResult<bool> {
    Ok(BANS
        .may_load(deps.storage, address)?
        .is_some_and(|record| record.banned))
}

fn moderator(deps: Deps, cfg: &Config, address: &Addr) -> StdResult<bool> {
    Ok(address == cfg.owner || MODERATORS.may_load(deps.storage, address)?.unwrap_or(false))
}

fn query_stake_contract(
    deps: Deps,
    contract: &Addr,
    address: &Addr,
    height: u64,
) -> StdResult<Uint128> {
    let response: StakedBalanceResponse = deps.querier.query_wasm_smart(
        contract.clone(),
        &StakedBalanceQuery {
            staked_balance_at_height: StakedBalanceAtHeight {
                address: address.to_string(),
                height: Some(height),
            },
        },
    )?;
    Ok(response.balance)
}

fn active_stake(
    deps: Deps,
    cfg: &Config,
    address: &Addr,
    height: u64,
) -> Result<Uint128, ContractError> {
    query_stake_contract(deps, &cfg.stake_contract, address, height)
        .map_err(|_| ContractError::StakeQueryFailed)
}

fn cooldown_remaining(deps: Deps, cfg: &Config, address: &Addr, now: u64) -> StdResult<u64> {
    let Some(last) = LAST_POST_TIME.may_load(deps.storage, address)? else {
        return Ok(0);
    };
    Ok(last
        .saturating_add(cfg.post_cooldown_seconds)
        .saturating_sub(now))
}

fn authorize_post(
    deps: Deps,
    env: &Env,
    cfg: &Config,
    sender: &Addr,
) -> Result<Uint128, ContractError> {
    if cfg.paused {
        return Err(ContractError::Paused);
    }
    if banned(deps, sender)? {
        return Err(ContractError::Banned);
    }
    let remaining = cooldown_remaining(deps, cfg, sender, env.block.time.seconds())?;
    if remaining > 0 {
        return Err(ContractError::Cooldown {
            remaining_seconds: remaining,
        });
    }
    if sender == cfg.owner {
        return Ok(Uint128::zero());
    }
    let stake = active_stake(deps, cfg, sender, env.block.height)?;
    if stake < cfg.minimum_stake {
        return Err(ContractError::MinimumStakeNotMet);
    }
    Ok(stake)
}

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    ensure_no_funds(&info)?;
    let owner = deps.api.addr_validate(&msg.owner)?;
    let stake_contract = deps.api.addr_validate(&msg.stake_contract)?;
    query_stake_contract(deps.as_ref(), &stake_contract, &owner, env.block.height)
        .map_err(|_| ContractError::StakeQueryFailed)?;
    set_contract_version(deps.storage, NAME, VERSION)?;
    CONFIG.save(
        deps.storage,
        &Config {
            owner: owner.clone(),
            pending_owner: None,
            stake_contract: stake_contract.clone(),
            minimum_stake: msg.minimum_stake,
            paused: false,
            post_cooldown_seconds: POST_COOLDOWN_SECONDS,
        },
    )?;
    NEXT_THREAD_ID.save(deps.storage, &1)?;
    Ok(Response::new()
        .add_attribute("action", "instantiate")
        .add_attribute("owner", owner)
        .add_attribute("stake_contract", stake_contract)
        .add_attribute("minimum_stake", msg.minimum_stake)
        .add_attribute("post_cooldown_seconds", POST_COOLDOWN_SECONDS.to_string()))
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    ensure_no_funds(&info)?;
    match msg {
        ExecuteMsg::CreateThread { title, body } => create_thread(deps, env, info, title, body),
        ExecuteMsg::AddComment { thread_id, body } => add_comment(deps, env, info, thread_id, body),
        ExecuteMsg::SetThreadClosed { thread_id, closed } => {
            set_closed(deps, info, thread_id, closed)
        }
        ExecuteMsg::SetThreadHidden {
            thread_id,
            hidden,
            reason,
        } => set_thread_hidden(deps, env, info, thread_id, hidden, reason),
        ExecuteMsg::SetCommentHidden {
            thread_id,
            comment_id,
            hidden,
            reason,
        } => set_comment_hidden(deps, env, info, thread_id, comment_id, hidden, reason),
        ExecuteMsg::SetModerator { address, enabled } => {
            set_moderator(deps, info, address, enabled)
        }
        ExecuteMsg::SetUserBanned {
            address,
            banned,
            reason,
        } => set_user_banned(deps, env, info, address, banned, reason),
        ExecuteMsg::SetPaused { paused } => set_paused(deps, info, paused),
        ExecuteMsg::UpdateMinimumStake { minimum_stake } => {
            update_minimum_stake(deps, info, minimum_stake)
        }
        ExecuteMsg::UpdateStakeContract { stake_contract } => {
            update_stake_contract(deps, env, info, stake_contract)
        }
        ExecuteMsg::ProposeOwner { owner } => propose_owner(deps, info, owner),
        ExecuteMsg::AcceptOwnership {} => accept_ownership(deps, info),
        ExecuteMsg::CancelOwnershipTransfer {} => cancel_ownership(deps, info),
    }
}

fn create_thread(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    title: String,
    body: String,
) -> Result<Response, ContractError> {
    let cfg = CONFIG.load(deps.storage)?;
    let stake = authorize_post(deps.as_ref(), &env, &cfg, &info.sender)?;
    let id = NEXT_THREAD_ID.load(deps.storage)?;
    let next = id.checked_add(1).ok_or(ContractError::CounterOverflow)?;
    let thread = Thread {
        id,
        author: info.sender.clone(),
        title: validate_text("title", &title, 1, 120)?,
        body: validate_text("body", &body, 1, 5_000)?,
        created_height: env.block.height,
        created_time: env.block.time.seconds(),
        verified_stake_at_creation: stake,
        comment_count: 0,
        closed: false,
        moderation: None,
    };
    THREADS.save(deps.storage, id, &thread)?;
    NEXT_THREAD_ID.save(deps.storage, &next)?;
    NEXT_COMMENT_ID.save(deps.storage, id, &1)?;
    LAST_POST_TIME.save(deps.storage, &info.sender, &env.block.time.seconds())?;
    Ok(Response::new()
        .add_attribute("action", "create_thread")
        .add_attribute("thread_id", id.to_string())
        .add_attribute("author", info.sender)
        .add_attribute("verified_stake", stake))
}

fn add_comment(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    thread_id: u64,
    body: String,
) -> Result<Response, ContractError> {
    let cfg = CONFIG.load(deps.storage)?;
    let mut thread = THREADS.load(deps.storage, thread_id)?;
    if thread.closed {
        return Err(ContractError::ThreadClosed);
    }
    let stake = authorize_post(deps.as_ref(), &env, &cfg, &info.sender)?;
    let id = NEXT_COMMENT_ID.load(deps.storage, thread_id)?;
    let next = id.checked_add(1).ok_or(ContractError::CounterOverflow)?;
    thread.comment_count = thread
        .comment_count
        .checked_add(1)
        .ok_or(ContractError::CounterOverflow)?;
    let comment = Comment {
        id,
        thread_id,
        author: info.sender.clone(),
        body: validate_text("comment", &body, 1, 1_000)?,
        created_height: env.block.height,
        created_time: env.block.time.seconds(),
        verified_stake_at_creation: stake,
        moderation: None,
    };
    COMMENTS.save(deps.storage, (thread_id, id), &comment)?;
    NEXT_COMMENT_ID.save(deps.storage, thread_id, &next)?;
    THREADS.save(deps.storage, thread_id, &thread)?;
    LAST_POST_TIME.save(deps.storage, &info.sender, &env.block.time.seconds())?;
    Ok(Response::new()
        .add_attribute("action", "add_comment")
        .add_attribute("thread_id", thread_id.to_string())
        .add_attribute("comment_id", id.to_string())
        .add_attribute("author", info.sender)
        .add_attribute("verified_stake", stake))
}

fn set_closed(
    deps: DepsMut,
    info: MessageInfo,
    thread_id: u64,
    closed: bool,
) -> Result<Response, ContractError> {
    let cfg = CONFIG.load(deps.storage)?;
    THREADS.update(
        deps.storage,
        thread_id,
        |item| -> Result<_, ContractError> {
            let mut thread = item.ok_or_else(|| StdError::not_found("thread"))?;
            let may_close = closed && (info.sender == cfg.owner || info.sender == thread.author);
            let may_reopen = !closed && info.sender == cfg.owner;
            if !may_close && !may_reopen {
                return Err(ContractError::Unauthorized);
            }
            thread.closed = closed;
            Ok(thread)
        },
    )?;
    Ok(Response::new()
        .add_attribute("action", "set_thread_closed")
        .add_attribute("thread_id", thread_id.to_string())
        .add_attribute("closed", closed.to_string())
        .add_attribute("actor", info.sender))
}

fn ensure_moderator(deps: Deps, cfg: &Config, sender: &Addr) -> Result<(), ContractError> {
    if moderator(deps, cfg, sender)? {
        Ok(())
    } else {
        Err(ContractError::Unauthorized)
    }
}

fn set_thread_hidden(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    thread_id: u64,
    hidden: bool,
    reason: Option<String>,
) -> Result<Response, ContractError> {
    let cfg = CONFIG.load(deps.storage)?;
    ensure_moderator(deps.as_ref(), &cfg, &info.sender)?;
    let reason = moderation_reason(hidden, reason)?;
    THREADS.update(
        deps.storage,
        thread_id,
        |item| -> Result<_, ContractError> {
            let mut thread = item.ok_or_else(|| StdError::not_found("thread"))?;
            thread.moderation = Some(Moderation {
                hidden,
                reason: reason.clone(),
                updated_by: info.sender.clone(),
                updated_height: env.block.height,
                updated_time: env.block.time.seconds(),
            });
            Ok(thread)
        },
    )?;
    Ok(Response::new()
        .add_attribute("action", "set_thread_hidden")
        .add_attribute("thread_id", thread_id.to_string())
        .add_attribute("hidden", hidden.to_string())
        .add_attribute("moderator", info.sender))
}

fn set_comment_hidden(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    thread_id: u64,
    comment_id: u64,
    hidden: bool,
    reason: Option<String>,
) -> Result<Response, ContractError> {
    let cfg = CONFIG.load(deps.storage)?;
    ensure_moderator(deps.as_ref(), &cfg, &info.sender)?;
    let reason = moderation_reason(hidden, reason)?;
    COMMENTS.update(
        deps.storage,
        (thread_id, comment_id),
        |item| -> Result<_, ContractError> {
            let mut comment = item.ok_or_else(|| StdError::not_found("comment"))?;
            comment.moderation = Some(Moderation {
                hidden,
                reason: reason.clone(),
                updated_by: info.sender.clone(),
                updated_height: env.block.height,
                updated_time: env.block.time.seconds(),
            });
            Ok(comment)
        },
    )?;
    Ok(Response::new()
        .add_attribute("action", "set_comment_hidden")
        .add_attribute("thread_id", thread_id.to_string())
        .add_attribute("comment_id", comment_id.to_string())
        .add_attribute("hidden", hidden.to_string())
        .add_attribute("moderator", info.sender))
}

fn set_moderator(
    deps: DepsMut,
    info: MessageInfo,
    address: String,
    enabled: bool,
) -> Result<Response, ContractError> {
    let cfg = CONFIG.load(deps.storage)?;
    ensure_owner(&cfg, &info.sender)?;
    let address = deps.api.addr_validate(&address)?;
    if address == cfg.owner {
        return Err(ContractError::ProtectedOwner);
    }
    if enabled && banned(deps.as_ref(), &address)? {
        return Err(ContractError::Banned);
    }
    if enabled {
        MODERATORS.save(deps.storage, &address, &true)?
    } else {
        MODERATORS.remove(deps.storage, &address)
    }
    Ok(Response::new()
        .add_attribute("action", "set_moderator")
        .add_attribute("address", address)
        .add_attribute("enabled", enabled.to_string())
        .add_attribute("admin", info.sender))
}

fn set_user_banned(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    address: String,
    is_banned: bool,
    reason: Option<String>,
) -> Result<Response, ContractError> {
    let cfg = CONFIG.load(deps.storage)?;
    ensure_owner(&cfg, &info.sender)?;
    let address = deps.api.addr_validate(&address)?;
    if address == cfg.owner {
        return Err(ContractError::ProtectedOwner);
    }
    let reason = moderation_reason(is_banned, reason)?;
    BANS.save(
        deps.storage,
        &address,
        &BanRecord {
            banned: is_banned,
            reason,
            updated_by: info.sender.clone(),
            updated_height: env.block.height,
            updated_time: env.block.time.seconds(),
        },
    )?;
    if is_banned {
        MODERATORS.remove(deps.storage, &address)
    }
    Ok(Response::new()
        .add_attribute("action", "set_user_banned")
        .add_attribute("address", address)
        .add_attribute("banned", is_banned.to_string())
        .add_attribute("admin", info.sender))
}

fn set_paused(deps: DepsMut, info: MessageInfo, paused: bool) -> Result<Response, ContractError> {
    CONFIG.update(deps.storage, |mut cfg| -> Result<_, ContractError> {
        ensure_owner(&cfg, &info.sender)?;
        cfg.paused = paused;
        Ok(cfg)
    })?;
    Ok(Response::new()
        .add_attribute("action", "set_paused")
        .add_attribute("paused", paused.to_string())
        .add_attribute("admin", info.sender))
}

fn update_minimum_stake(
    deps: DepsMut,
    info: MessageInfo,
    minimum_stake: Uint128,
) -> Result<Response, ContractError> {
    let old = CONFIG.load(deps.storage)?.minimum_stake;
    CONFIG.update(deps.storage, |mut cfg| -> Result<_, ContractError> {
        ensure_owner(&cfg, &info.sender)?;
        cfg.minimum_stake = minimum_stake;
        Ok(cfg)
    })?;
    Ok(Response::new()
        .add_attribute("action", "update_minimum_stake")
        .add_attribute("old_minimum_stake", old)
        .add_attribute("new_minimum_stake", minimum_stake)
        .add_attribute("admin", info.sender))
}

fn update_stake_contract(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    stake_contract: String,
) -> Result<Response, ContractError> {
    let mut cfg = CONFIG.load(deps.storage)?;
    ensure_owner(&cfg, &info.sender)?;
    let candidate = deps.api.addr_validate(&stake_contract)?;
    query_stake_contract(deps.as_ref(), &candidate, &info.sender, env.block.height)
        .map_err(|_| ContractError::StakeQueryFailed)?;
    let old = cfg.stake_contract.clone();
    cfg.stake_contract = candidate.clone();
    CONFIG.save(deps.storage, &cfg)?;
    Ok(Response::new()
        .add_attribute("action", "update_stake_contract")
        .add_attribute("old_stake_contract", old)
        .add_attribute("new_stake_contract", candidate)
        .add_attribute("admin", info.sender))
}

fn propose_owner(
    deps: DepsMut,
    info: MessageInfo,
    owner: String,
) -> Result<Response, ContractError> {
    let mut cfg = CONFIG.load(deps.storage)?;
    ensure_owner(&cfg, &info.sender)?;
    let candidate = deps.api.addr_validate(&owner)?;
    if banned(deps.as_ref(), &candidate)? {
        return Err(ContractError::Banned);
    }
    cfg.pending_owner = Some(candidate.clone());
    CONFIG.save(deps.storage, &cfg)?;
    Ok(Response::new()
        .add_attribute("action", "propose_owner")
        .add_attribute("current_owner", info.sender)
        .add_attribute("pending_owner", candidate))
}

fn accept_ownership(deps: DepsMut, info: MessageInfo) -> Result<Response, ContractError> {
    let mut cfg = CONFIG.load(deps.storage)?;
    if cfg.pending_owner.as_ref() != Some(&info.sender) {
        return Err(ContractError::NotPendingOwner);
    }
    if banned(deps.as_ref(), &info.sender)? {
        return Err(ContractError::Banned);
    }
    let old = cfg.owner.clone();
    cfg.owner = info.sender.clone();
    cfg.pending_owner = None;
    MODERATORS.remove(deps.storage, &info.sender);
    CONFIG.save(deps.storage, &cfg)?;
    Ok(Response::new()
        .add_attribute("action", "accept_ownership")
        .add_attribute("old_owner", old)
        .add_attribute("new_owner", info.sender))
}

fn cancel_ownership(deps: DepsMut, info: MessageInfo) -> Result<Response, ContractError> {
    let mut cfg = CONFIG.load(deps.storage)?;
    ensure_owner(&cfg, &info.sender)?;
    let cancelled = cfg
        .pending_owner
        .take()
        .map(|address| address.to_string())
        .unwrap_or_default();
    CONFIG.save(deps.storage, &cfg)?;
    Ok(Response::new()
        .add_attribute("action", "cancel_ownership_transfer")
        .add_attribute("cancelled_owner", cancelled)
        .add_attribute("admin", info.sender))
}

fn parse_version(version: &str) -> Result<(u64, u64, u64), ContractError> {
    let clean = version.strip_prefix('v').unwrap_or(version);
    let parts: Vec<_> = clean.split('.').collect();
    if parts.len() != 3 {
        return Err(ContractError::InvalidVersion {
            version: version.into(),
        });
    }
    let parse = |part: &str| {
        part.parse::<u64>()
            .map_err(|_| ContractError::InvalidVersion {
                version: version.into(),
            })
    };
    Ok((parse(parts[0])?, parse(parts[1])?, parse(parts[2])?))
}

#[entry_point]
pub fn migrate(deps: DepsMut, _env: Env, _msg: MigrateMsg) -> Result<Response, ContractError> {
    let stored = get_contract_version(deps.storage)?;
    if stored.contract != NAME {
        return Err(StdError::generic_err("cannot migrate from a different contract").into());
    }
    if parse_version(&stored.version)? >= parse_version(VERSION)? {
        return Err(ContractError::NonIncreasingVersion);
    }
    let mut cfg = CONFIG.load(deps.storage)?;
    if cfg.post_cooldown_seconds == 0 {
        cfg.post_cooldown_seconds = POST_COOLDOWN_SECONDS
    }
    CONFIG.save(deps.storage, &cfg)?;
    set_contract_version(deps.storage, NAME, VERSION)?;
    Ok(Response::new()
        .add_attribute("action", "migrate")
        .add_attribute("from_version", stored.version)
        .add_attribute("to_version", VERSION))
}

#[entry_point]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Config {} => to_json_binary(&CONFIG.load(deps.storage)?),
        QueryMsg::Thread { thread_id } => to_json_binary(&THREADS.load(deps.storage, thread_id)?),
        QueryMsg::Threads {
            start_after,
            limit,
            descending,
        } => {
            let limit = limit.unwrap_or(30).min(MAX_LIMIT) as usize;
            let descending = descending.unwrap_or(true);
            let order = if descending {
                Order::Descending
            } else {
                Order::Ascending
            };
            let (min, max) = if descending {
                (None, start_after.map(Bound::exclusive))
            } else {
                (start_after.map(Bound::exclusive), None)
            };
            let rows = THREADS
                .range(deps.storage, min, max, order)
                .take(limit)
                .map(|row| row.map(|(_, value)| value))
                .collect::<StdResult<Vec<_>>>()?;
            to_json_binary(&rows)
        }
        QueryMsg::Comments {
            thread_id,
            start_after,
            limit,
            descending,
        } => {
            let limit = limit.unwrap_or(100).min(MAX_LIMIT) as usize;
            let descending = descending.unwrap_or(false);
            let order = if descending {
                Order::Descending
            } else {
                Order::Ascending
            };
            let (min, max) = if descending {
                (None, start_after.map(Bound::exclusive))
            } else {
                (start_after.map(Bound::exclusive), None)
            };
            let rows = COMMENTS
                .prefix(thread_id)
                .range(deps.storage, min, max, order)
                .take(limit)
                .map(|row| row.map(|(_, value)| value))
                .collect::<StdResult<Vec<_>>>()?;
            to_json_binary(&rows)
        }
        QueryMsg::CommentEligibility { address } => {
            let address = deps.api.addr_validate(&address)?;
            let cfg = CONFIG.load(deps.storage)?;
            let owner_exempt = address == cfg.owner;
            let balance = if owner_exempt {
                Uint128::zero()
            } else {
                query_stake_contract(deps, &cfg.stake_contract, &address, env.block.height)?
            };
            let stake_eligible = owner_exempt || balance >= cfg.minimum_stake;
            let is_banned = banned(deps, &address)?;
            let remaining = cooldown_remaining(deps, &cfg, &address, env.block.time.seconds())?;
            to_json_binary(&CommentEligibilityResponse {
                address: address.into(),
                staked: balance,
                minimum_stake: cfg.minimum_stake,
                owner_exempt,
                stake_eligible,
                banned: is_banned,
                paused: cfg.paused,
                cooldown_remaining_seconds: remaining,
                can_post: stake_eligible && !is_banned && !cfg.paused && remaining == 0,
            })
        }
        QueryMsg::Moderator { address } => {
            let address = deps.api.addr_validate(&address)?;
            let cfg = CONFIG.load(deps.storage)?;
            to_json_binary(&ModeratorResponse {
                address: address.to_string(),
                moderator: moderator(deps, &cfg, &address)?,
            })
        }
        QueryMsg::Moderators { start_after, limit } => {
            let limit = limit.unwrap_or(30).min(MAX_LIMIT) as usize;
            let start = start_after
                .map(|address| deps.api.addr_validate(&address))
                .transpose()?;
            let rows = MODERATORS
                .range(
                    deps.storage,
                    start.as_ref().map(Bound::exclusive),
                    None,
                    Order::Ascending,
                )
                .take(limit)
                .filter_map(|row| match row {
                    Ok((address, true)) => Some(Ok(address.to_string())),
                    Ok((_, false)) => None,
                    Err(error) => Some(Err(error)),
                })
                .collect::<StdResult<Vec<_>>>()?;
            to_json_binary(&rows)
        }
        QueryMsg::BanStatus { address } => {
            let address = deps.api.addr_validate(&address)?;
            to_json_binary(&BanStatusResponse {
                address: address.to_string(),
                record: BANS.may_load(deps.storage, &address)?,
            })
        }
    }
}

#[cfg(test)]
#[path = "tests.rs"]
mod tests;
