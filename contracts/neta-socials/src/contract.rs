use cosmwasm_std::{entry_point, to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Order, Response, StdError, StdResult, Uint128};
use cw2::{get_contract_version, set_contract_version};
use cw_storage_plus::Bound;
use crate::error::ContractError;
use crate::msg::{CommentEligibilityResponse, ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg, StakedBalanceAtHeight, StakedBalanceQuery, StakedBalanceResponse};
use crate::state::{Comment, Config, Thread, COMMENTS, CONFIG, NEXT_COMMENT_ID, NEXT_THREAD_ID, THREADS};

const NAME: &str = "crates.io:neta-socials";
const VERSION: &str = env!("CARGO_PKG_VERSION");
const MAX_LIMIT: u32 = 100;

fn validate_text(field: &str, value: &str, min: usize, max: usize) -> Result<String, ContractError> {
    let clean = value.trim();
    let count = clean.chars().count();
    if count < min || count > max {
        return Err(ContractError::InvalidLength { field: field.into(), min, max });
    }
    Ok(clean.to_string())
}

fn ensure_no_funds(info: &MessageInfo) -> Result<(), ContractError> {
    if info.funds.is_empty() { Ok(()) } else { Err(ContractError::FundsNotAccepted) }
}

fn staked(deps: Deps, cfg: &Config, address: &str, height: u64) -> StdResult<Uint128> {
    let response: StakedBalanceResponse = deps.querier.query_wasm_smart(
        cfg.stake_contract.clone(),
        &StakedBalanceQuery { staked_balance_at_height: StakedBalanceAtHeight { address: address.into(), height: Some(height) } },
    )?;
    Ok(response.balance)
}

#[entry_point]
pub fn instantiate(deps: DepsMut, _env: Env, _info: MessageInfo, msg: InstantiateMsg) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, NAME, VERSION)?;
    let cfg = Config {
        owner: deps.api.addr_validate(&msg.owner)?,
        stake_contract: deps.api.addr_validate(&msg.stake_contract)?,
        minimum_stake: msg.minimum_stake,
    };
    CONFIG.save(deps.storage, &cfg)?;
    NEXT_THREAD_ID.save(deps.storage, &1)?;
    Ok(Response::new().add_attribute("action", "instantiate").add_attribute("owner", cfg.owner))
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> Result<Response, ContractError> {
    ensure_no_funds(&info)?;
    match msg {
        ExecuteMsg::CreateThread { title, body } => create_thread(deps, env, info, title, body),
        ExecuteMsg::AddComment { thread_id, body } => add_comment(deps, env, info, thread_id, body),
        ExecuteMsg::SetThreadClosed { thread_id, closed } => set_closed(deps, info, thread_id, closed),
        ExecuteMsg::UpdateMinimumStake { minimum_stake } => update_minimum_stake(deps, info, minimum_stake),
    }
}

fn create_thread(deps: DepsMut, env: Env, info: MessageInfo, title: String, body: String) -> Result<Response, ContractError> {
    let cfg = CONFIG.load(deps.storage)?;
    if info.sender != cfg.owner && staked(deps.as_ref(), &cfg, info.sender.as_str(), env.block.height)? < cfg.minimum_stake {
        return Err(ContractError::MinimumStakeNotMet);
    }
    let id = NEXT_THREAD_ID.load(deps.storage)?;
    let thread = Thread { id, author: info.sender, title: validate_text("title", &title, 1, 120)?, body: validate_text("body", &body, 1, 5_000)?, created_height: env.block.height, created_time: env.block.time.seconds(), comment_count: 0, closed: false };
    THREADS.save(deps.storage, id, &thread)?;
    NEXT_THREAD_ID.save(deps.storage, &(id + 1))?;
    NEXT_COMMENT_ID.save(deps.storage, id, &1)?;
    Ok(Response::new().add_attribute("action", "create_thread").add_attribute("thread_id", id.to_string()))
}

fn add_comment(deps: DepsMut, env: Env, info: MessageInfo, thread_id: u64, body: String) -> Result<Response, ContractError> {
    let cfg = CONFIG.load(deps.storage)?;
    let mut thread = THREADS.load(deps.storage, thread_id)?;
    if thread.closed { return Err(ContractError::ThreadClosed); }
    if info.sender != cfg.owner && staked(deps.as_ref(), &cfg, info.sender.as_str(), env.block.height)? < cfg.minimum_stake {
        return Err(ContractError::MinimumStakeNotMet);
    }
    let id = NEXT_COMMENT_ID.load(deps.storage, thread_id)?;
    let comment = Comment { id, thread_id, author: info.sender, body: validate_text("comment", &body, 1, 1_000)?, created_height: env.block.height, created_time: env.block.time.seconds() };
    COMMENTS.save(deps.storage, (thread_id, id), &comment)?;
    NEXT_COMMENT_ID.save(deps.storage, thread_id, &(id + 1))?;
    thread.comment_count += 1;
    THREADS.save(deps.storage, thread_id, &thread)?;
    Ok(Response::new().add_attribute("action", "add_comment").add_attribute("thread_id", thread_id.to_string()).add_attribute("comment_id", id.to_string()))
}

fn set_closed(deps: DepsMut, info: MessageInfo, thread_id: u64, closed: bool) -> Result<Response, ContractError> {
    let cfg = CONFIG.load(deps.storage)?;
    THREADS.update(deps.storage, thread_id, |item| -> Result<_, ContractError> {
        let mut thread = item.ok_or_else(|| StdError::not_found("thread"))?;
        let may_close = closed && (info.sender == cfg.owner || info.sender == thread.author);
        let may_reopen = !closed && info.sender == cfg.owner;
        if !may_close && !may_reopen { return Err(ContractError::Unauthorized); }
        thread.closed = closed;
        Ok(thread)
    })?;
    Ok(Response::new().add_attribute("action", "set_thread_closed").add_attribute("thread_id", thread_id.to_string()).add_attribute("closed", closed.to_string()))
}

#[entry_point]
pub fn migrate(deps: DepsMut, _env: Env, _msg: MigrateMsg) -> Result<Response, ContractError> {
    let stored = get_contract_version(deps.storage)?;
    if stored.contract != NAME {
        return Err(StdError::generic_err("cannot migrate from a different contract").into());
    }
    set_contract_version(deps.storage, NAME, VERSION)?;
    Ok(Response::new().add_attribute("action", "migrate").add_attribute("from_version", stored.version).add_attribute("to_version", VERSION))
}

fn update_minimum_stake(deps: DepsMut, info: MessageInfo, minimum_stake: Uint128) -> Result<Response, ContractError> {
    CONFIG.update(deps.storage, |mut cfg| -> Result<_, ContractError> {
        if info.sender != cfg.owner { return Err(ContractError::Unauthorized); }
        cfg.minimum_stake = minimum_stake;
        Ok(cfg)
    })?;
    Ok(Response::new().add_attribute("action", "update_minimum_stake").add_attribute("minimum_stake", minimum_stake))
}

#[entry_point]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Config {} => to_json_binary(&CONFIG.load(deps.storage)?),
        QueryMsg::Thread { thread_id } => to_json_binary(&THREADS.load(deps.storage, thread_id)?),
        QueryMsg::Threads { start_after, limit } => {
            let limit = limit.unwrap_or(30).min(MAX_LIMIT) as usize;
            let rows = THREADS.range(deps.storage, start_after.map(Bound::exclusive), None, Order::Ascending).take(limit).map(|x| x.map(|(_, v)| v)).collect::<StdResult<Vec<_>>>()?;
            to_json_binary(&rows)
        },
        QueryMsg::Comments { thread_id, start_after, limit } => {
            let limit = limit.unwrap_or(100).min(MAX_LIMIT) as usize;
            let rows = COMMENTS.prefix(thread_id).range(deps.storage, start_after.map(Bound::exclusive), None, Order::Ascending).take(limit).map(|x| x.map(|(_, v)| v)).collect::<StdResult<Vec<_>>>()?;
            to_json_binary(&rows)
        },
        QueryMsg::CommentEligibility { address } => {
            let address = deps.api.addr_validate(&address)?;
            let cfg = CONFIG.load(deps.storage)?;
            let owner_exempt = address == cfg.owner;
            let balance = if owner_exempt { Uint128::zero() } else { staked(deps, &cfg, address.as_str(), env.block.height)? };
            to_json_binary(&CommentEligibilityResponse { address: address.into(), staked: balance, minimum_stake: cfg.minimum_stake, owner_exempt, eligible: owner_exempt || balance >= cfg.minimum_stake })
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::{coin, from_json, ContractResult, SystemResult, WasmQuery};
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use crate::state::Thread;

    const OWNER: &str = "juno1owner";
    const AUTHOR: &str = "juno1author";
    const OTHER: &str = "juno1other";
    const STAKE: &str = "juno1stake";

    fn setup(stake: Uint128) -> cosmwasm_std::OwnedDeps<cosmwasm_std::MemoryStorage, cosmwasm_std::testing::MockApi, cosmwasm_std::testing::MockQuerier> {
        let mut deps = mock_dependencies();
        deps.querier.update_wasm(move |query| match query {
            WasmQuery::Smart { contract_addr, msg } if contract_addr == STAKE => {
                let _: StakedBalanceQuery = from_json(msg).unwrap();
                SystemResult::Ok(ContractResult::Ok(to_json_binary(&StakedBalanceResponse { balance: stake, height: mock_env().block.height }).unwrap()))
            }
            _ => SystemResult::Ok(ContractResult::Err("unexpected wasm query".into())),
        });
        instantiate(deps.as_mut(), mock_env(), mock_info(OWNER, &[]), InstantiateMsg {
            owner: OWNER.into(), stake_contract: STAKE.into(), minimum_stake: Uint128::new(10_000_000),
        }).unwrap();
        deps
    }

    fn create(deps: DepsMut, sender: &str) -> Result<Response, ContractError> {
        create_thread(deps, mock_env(), mock_info(sender, &[]), "A valid title".into(), "A valid body".into())
    }

    #[test]
    fn owner_is_exempt_and_eligible_staker_can_post() {
        let mut deps = setup(Uint128::new(10_000_000));
        create(deps.as_mut(), OWNER).unwrap();
        create(deps.as_mut(), AUTHOR).unwrap();
        add_comment(deps.as_mut(), mock_env(), mock_info(AUTHOR, &[]), 1, "First".into()).unwrap();
        let thread: Thread = from_json(query(deps.as_ref(), mock_env(), QueryMsg::Thread { thread_id: 1 }).unwrap()).unwrap();
        assert_eq!(thread.comment_count, 1);
    }

    #[test]
    fn insufficient_stake_blocks_threads_and_comments() {
        let mut deps = setup(Uint128::new(9_999_999));
        assert_eq!(create(deps.as_mut(), AUTHOR).unwrap_err(), ContractError::MinimumStakeNotMet);
        create(deps.as_mut(), OWNER).unwrap();
        assert_eq!(add_comment(deps.as_mut(), mock_env(), mock_info(AUTHOR, &[]), 1, "No".into()).unwrap_err(), ContractError::MinimumStakeNotMet);
    }

    #[test]
    fn author_may_close_but_only_owner_may_reopen() {
        let mut deps = setup(Uint128::new(10_000_000));
        create(deps.as_mut(), AUTHOR).unwrap();
        set_closed(deps.as_mut(), mock_info(AUTHOR, &[]), 1, true).unwrap();
        assert_eq!(set_closed(deps.as_mut(), mock_info(AUTHOR, &[]), 1, false).unwrap_err(), ContractError::Unauthorized);
        set_closed(deps.as_mut(), mock_info(OWNER, &[]), 1, false).unwrap();
        assert_eq!(set_closed(deps.as_mut(), mock_info(OTHER, &[]), 1, true).unwrap_err(), ContractError::Unauthorized);
    }

    #[test]
    fn closed_threads_reject_comments_and_all_executes_reject_funds() {
        let mut deps = setup(Uint128::new(10_000_000));
        create(deps.as_mut(), AUTHOR).unwrap();
        set_closed(deps.as_mut(), mock_info(AUTHOR, &[]), 1, true).unwrap();
        assert_eq!(add_comment(deps.as_mut(), mock_env(), mock_info(AUTHOR, &[]), 1, "No".into()).unwrap_err(), ContractError::ThreadClosed);
        let err = execute(deps.as_mut(), mock_env(), mock_info(AUTHOR, &[coin(1, "ujuno")]), ExecuteMsg::CreateThread { title: "Paid".into(), body: "No funds".into() }).unwrap_err();
        assert_eq!(err, ContractError::FundsNotAccepted);
    }

    #[test]
    fn validates_lengths_and_owner_can_change_threshold() {
        let mut deps = setup(Uint128::new(10_000_000));
        let err = create_thread(deps.as_mut(), mock_env(), mock_info(OWNER, &[]), " ".into(), "body".into()).unwrap_err();
        assert!(matches!(err, ContractError::InvalidLength { .. }));
        update_minimum_stake(deps.as_mut(), mock_info(OWNER, &[]), Uint128::new(20_000_000)).unwrap();
        assert_eq!(CONFIG.load(&deps.storage).unwrap().minimum_stake, Uint128::new(20_000_000));
        assert_eq!(update_minimum_stake(deps.as_mut(), mock_info(AUTHOR, &[]), Uint128::zero()).unwrap_err(), ContractError::Unauthorized);
    }
}
