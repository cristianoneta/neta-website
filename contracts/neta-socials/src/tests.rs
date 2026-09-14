use super::*;
use crate::msg::{BanStatusResponse, CommentEligibilityResponse, ModeratorResponse};
use crate::state::MODERATORS;
use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
use cosmwasm_std::{
    coin, from_json, ContractResult, Empty, OwnedDeps, SystemResult, Timestamp, WasmQuery,
};

const OWNER: &str = "juno1owner";
const AUTHOR: &str = "juno1author";
const OTHER: &str = "juno1other";
const MODERATOR: &str = "juno1moderator";
const STAKE: &str = "juno1stake";
const STAKE_TWO: &str = "juno1staketwo";

type TestDeps = OwnedDeps<
    cosmwasm_std::MemoryStorage,
    cosmwasm_std::testing::MockApi,
    cosmwasm_std::testing::MockQuerier,
    Empty,
>;

fn env_at(seconds: u64) -> Env {
    let mut env = mock_env();
    env.block.time = Timestamp::from_seconds(seconds);
    env
}

fn deployed(stake: Uint128) -> TestDeps {
    let mut deps = mock_dependencies();
    deps.querier.update_wasm(move |query| match query {
        WasmQuery::Smart { contract_addr, msg }
            if contract_addr == STAKE || contract_addr == STAKE_TWO =>
        {
            let request: StakedBalanceQuery = from_json(msg).unwrap();
            SystemResult::Ok(ContractResult::Ok(
                to_json_binary(&StakedBalanceResponse {
                    balance: stake,
                    height: request.staked_balance_at_height.height.unwrap(),
                })
                .unwrap(),
            ))
        }
        _ => SystemResult::Ok(ContractResult::Err("unexpected wasm query".into())),
    });
    instantiate(
        deps.as_mut(),
        env_at(1_000),
        mock_info(OWNER, &[]),
        InstantiateMsg {
            owner: OWNER.into(),
            stake_contract: STAKE.into(),
            minimum_stake: Uint128::new(10_000_000),
        },
    )
    .unwrap();
    deps
}

fn setup(stake: Uint128) -> TestDeps {
    let mut deps = deployed(stake);
    set_paused(deps.as_mut(), mock_info(OWNER, &[]), false).unwrap();
    deps
}

#[test]
fn instantiate_starts_paused() {
    let deps = deployed(Uint128::new(10_000_000));
    assert!(CONFIG.load(&deps.storage).unwrap().paused);
}

fn create(deps: DepsMut, env: Env, sender: &str) -> Result<Response, ContractError> {
    create_thread(
        deps,
        env,
        mock_info(sender, &[]),
        "A valid title".into(),
        "A valid body".into(),
    )
}

#[test]
fn instantiate_validates_stake_contract_and_rejects_funds() {
    let mut deps = mock_dependencies();
    let err = instantiate(
        deps.as_mut(),
        mock_env(),
        mock_info(OWNER, &[coin(1, "ujuno")]),
        InstantiateMsg {
            owner: OWNER.into(),
            stake_contract: STAKE.into(),
            minimum_stake: Uint128::new(10_000_000),
        },
    )
    .unwrap_err();
    assert_eq!(err, ContractError::FundsNotAccepted);
    let err = instantiate(
        deps.as_mut(),
        mock_env(),
        mock_info(OWNER, &[]),
        InstantiateMsg {
            owner: OWNER.into(),
            stake_contract: STAKE.into(),
            minimum_stake: Uint128::new(10_000_000),
        },
    )
    .unwrap_err();
    assert_eq!(err, ContractError::StakeQueryFailed);
}

#[test]
fn exact_active_stake_is_required_and_recorded() {
    let mut deps = setup(Uint128::new(10_000_000));
    create(deps.as_mut(), env_at(1_000), AUTHOR).unwrap();
    let thread = THREADS.load(&deps.storage, 1).unwrap();
    assert_eq!(thread.verified_stake_at_creation, Uint128::new(10_000_000));

    let mut low = setup(Uint128::new(9_999_999));
    assert_eq!(
        create(low.as_mut(), env_at(1_000), AUTHOR).unwrap_err(),
        ContractError::MinimumStakeNotMet
    );
}

#[test]
fn cooldown_applies_to_threads_and_comments() {
    let mut deps = setup(Uint128::new(10_000_000));
    create(deps.as_mut(), env_at(1_000), AUTHOR).unwrap();
    assert_eq!(
        add_comment(
            deps.as_mut(),
            env_at(1_029),
            mock_info(AUTHOR, &[]),
            1,
            "Too soon".into()
        )
        .unwrap_err(),
        ContractError::Cooldown {
            remaining_seconds: 1
        }
    );
    add_comment(
        deps.as_mut(),
        env_at(1_030),
        mock_info(AUTHOR, &[]),
        1,
        "Allowed".into(),
    )
    .unwrap();
}

#[test]
fn eligibility_matches_posting_rules() {
    let mut deps = setup(Uint128::new(10_000_000));
    let eligibility = |deps: Deps, time: u64, address: &str| -> CommentEligibilityResponse {
        from_json(
            query(
                deps,
                env_at(time),
                QueryMsg::CommentEligibility {
                    address: address.into(),
                },
            )
            .unwrap(),
        )
        .unwrap()
    };

    assert!(eligibility(deps.as_ref(), 1_000, AUTHOR).can_post);
    create(deps.as_mut(), env_at(1_000), AUTHOR).unwrap();
    let cooling_down = eligibility(deps.as_ref(), 1_001, AUTHOR);
    assert!(!cooling_down.can_post);
    assert_eq!(cooling_down.cooldown_remaining_seconds, 29);

    set_user_banned(
        deps.as_mut(),
        env_at(1_002),
        mock_info(OWNER, &[]),
        AUTHOR.into(),
        true,
        Some("spam".into()),
    )
    .unwrap();
    let banned_user = eligibility(deps.as_ref(), 1_030, AUTHOR);
    assert!(banned_user.stake_eligible);
    assert!(banned_user.banned);
    assert!(!banned_user.can_post);

    set_paused(deps.as_mut(), mock_info(OWNER, &[]), true).unwrap();
    let owner = eligibility(deps.as_ref(), 1_030, OWNER);
    assert!(owner.owner_exempt);
    assert!(owner.stake_eligible);
    assert!(owner.paused);
    assert!(!owner.can_post);
}

#[test]
fn owner_can_ban_and_unban_but_not_ban_self() {
    let mut deps = setup(Uint128::new(10_000_000));
    set_user_banned(
        deps.as_mut(),
        env_at(1_001),
        mock_info(OWNER, &[]),
        AUTHOR.into(),
        true,
        Some("spam".into()),
    )
    .unwrap();
    assert_eq!(
        create(deps.as_mut(), env_at(1_100), AUTHOR).unwrap_err(),
        ContractError::Banned
    );
    let response: BanStatusResponse = from_json(
        query(
            deps.as_ref(),
            env_at(1_100),
            QueryMsg::BanStatus {
                address: AUTHOR.into(),
            },
        )
        .unwrap(),
    )
    .unwrap();
    assert!(response.record.unwrap().banned);
    set_user_banned(
        deps.as_mut(),
        env_at(1_101),
        mock_info(OWNER, &[]),
        AUTHOR.into(),
        false,
        None,
    )
    .unwrap();
    create(deps.as_mut(), env_at(1_102), AUTHOR).unwrap();
    assert_eq!(
        set_user_banned(
            deps.as_mut(),
            env_at(1_103),
            mock_info(OWNER, &[]),
            OWNER.into(),
            true,
            Some("no".into())
        )
        .unwrap_err(),
        ContractError::ProtectedOwner
    );
}

#[test]
fn owner_manages_moderators_and_banning_revokes_role() {
    let mut deps = setup(Uint128::new(10_000_000));
    set_moderator(deps.as_mut(), mock_info(OWNER, &[]), MODERATOR.into(), true).unwrap();
    let response: ModeratorResponse = from_json(
        query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::Moderator {
                address: MODERATOR.into(),
            },
        )
        .unwrap(),
    )
    .unwrap();
    assert!(response.moderator);
    assert_eq!(
        set_moderator(deps.as_mut(), mock_info(OTHER, &[]), AUTHOR.into(), true).unwrap_err(),
        ContractError::Unauthorized
    );
    set_user_banned(
        deps.as_mut(),
        env_at(1_001),
        mock_info(OWNER, &[]),
        MODERATOR.into(),
        true,
        Some("abuse".into()),
    )
    .unwrap();
    assert!(!MODERATORS
        .may_load(&deps.storage, &Addr::unchecked(MODERATOR))
        .unwrap()
        .unwrap_or(false));
}

#[test]
fn moderators_hide_but_cannot_administer() {
    let mut deps = setup(Uint128::new(10_000_000));
    create(deps.as_mut(), env_at(1_000), AUTHOR).unwrap();
    add_comment(
        deps.as_mut(),
        env_at(1_000),
        mock_info(OTHER, &[]),
        1,
        "Comment".into(),
    )
    .unwrap();
    set_moderator(deps.as_mut(), mock_info(OWNER, &[]), MODERATOR.into(), true).unwrap();
    set_thread_hidden(
        deps.as_mut(),
        env_at(1_010),
        mock_info(MODERATOR, &[]),
        1,
        true,
        Some("spam".into()),
    )
    .unwrap();
    set_comment_hidden(
        deps.as_mut(),
        env_at(1_011),
        mock_info(MODERATOR, &[]),
        1,
        1,
        true,
        Some("spam".into()),
    )
    .unwrap();
    assert!(
        THREADS
            .load(&deps.storage, 1)
            .unwrap()
            .moderation
            .unwrap()
            .hidden
    );
    assert!(
        COMMENTS
            .load(&deps.storage, (1, 1))
            .unwrap()
            .moderation
            .unwrap()
            .hidden
    );
    assert_eq!(
        set_paused(deps.as_mut(), mock_info(MODERATOR, &[]), true).unwrap_err(),
        ContractError::Unauthorized
    );
    assert_eq!(
        set_thread_hidden(
            deps.as_mut(),
            env_at(1_012),
            mock_info(OTHER, &[]),
            1,
            true,
            Some("no".into())
        )
        .unwrap_err(),
        ContractError::Unauthorized
    );
}

#[test]
fn hiding_requires_a_reason_and_unhiding_clears_it() {
    let mut deps = setup(Uint128::new(10_000_000));
    create(deps.as_mut(), env_at(1_000), AUTHOR).unwrap();
    assert_eq!(
        set_thread_hidden(
            deps.as_mut(),
            env_at(1_010),
            mock_info(OWNER, &[]),
            1,
            true,
            None
        )
        .unwrap_err(),
        ContractError::ModerationReasonRequired
    );
    set_thread_hidden(
        deps.as_mut(),
        env_at(1_011),
        mock_info(OWNER, &[]),
        1,
        true,
        Some("spam".into()),
    )
    .unwrap();
    set_thread_hidden(
        deps.as_mut(),
        env_at(1_012),
        mock_info(OWNER, &[]),
        1,
        false,
        Some("ignored".into()),
    )
    .unwrap();
    let moderation = THREADS.load(&deps.storage, 1).unwrap().moderation.unwrap();
    assert!(!moderation.hidden);
    assert_eq!(moderation.reason, None);
}

#[test]
fn pause_blocks_all_posting_but_not_reads_or_moderation() {
    let mut deps = setup(Uint128::new(10_000_000));
    create(deps.as_mut(), env_at(1_000), AUTHOR).unwrap();
    set_paused(deps.as_mut(), mock_info(OWNER, &[]), true).unwrap();
    assert_eq!(
        create(deps.as_mut(), env_at(1_100), OWNER).unwrap_err(),
        ContractError::Paused
    );
    assert!(query(
        deps.as_ref(),
        env_at(1_100),
        QueryMsg::Thread { thread_id: 1 }
    )
    .is_ok());
    set_thread_hidden(
        deps.as_mut(),
        env_at(1_101),
        mock_info(OWNER, &[]),
        1,
        true,
        Some("review".into()),
    )
    .unwrap();
}

#[test]
fn ownership_transfer_requires_acceptance() {
    let mut deps = setup(Uint128::new(10_000_000));
    propose_owner(deps.as_mut(), mock_info(OWNER, &[]), OTHER.into()).unwrap();
    assert_eq!(
        accept_ownership(deps.as_mut(), mock_info(AUTHOR, &[])).unwrap_err(),
        ContractError::NotPendingOwner
    );
    accept_ownership(deps.as_mut(), mock_info(OTHER, &[])).unwrap();
    assert_eq!(
        CONFIG.load(&deps.storage).unwrap().owner,
        Addr::unchecked(OTHER)
    );
    assert_eq!(
        set_paused(deps.as_mut(), mock_info(OWNER, &[]), true).unwrap_err(),
        ContractError::Unauthorized
    );
    set_paused(deps.as_mut(), mock_info(OTHER, &[]), true).unwrap();
}

#[test]
fn banned_pending_owner_cannot_accept_ownership() {
    let mut deps = setup(Uint128::new(10_000_000));
    propose_owner(deps.as_mut(), mock_info(OWNER, &[]), OTHER.into()).unwrap();
    set_user_banned(
        deps.as_mut(),
        env_at(1_001),
        mock_info(OWNER, &[]),
        OTHER.into(),
        true,
        Some("blocked before transfer".into()),
    )
    .unwrap();

    assert_eq!(
        accept_ownership(deps.as_mut(), mock_info(OTHER, &[])).unwrap_err(),
        ContractError::Banned
    );
    let config = CONFIG.load(&deps.storage).unwrap();
    assert_eq!(config.owner, Addr::unchecked(OWNER));
    assert_eq!(config.pending_owner, Some(Addr::unchecked(OTHER)));
}

#[test]
fn stake_contract_change_requires_admin_and_compatible_query() {
    let mut deps = setup(Uint128::new(10_000_000));
    update_stake_contract(
        deps.as_mut(),
        env_at(1_000),
        mock_info(OWNER, &[]),
        STAKE_TWO.into(),
    )
    .unwrap();
    assert_eq!(
        CONFIG.load(&deps.storage).unwrap().stake_contract,
        Addr::unchecked(STAKE_TWO)
    );
    assert_eq!(
        update_stake_contract(
            deps.as_mut(),
            env_at(1_000),
            mock_info(OTHER, &[]),
            STAKE.into()
        )
        .unwrap_err(),
        ContractError::Unauthorized
    );
    assert_eq!(
        update_stake_contract(
            deps.as_mut(),
            env_at(1_000),
            mock_info(OWNER, &[]),
            "juno1broken".into()
        )
        .unwrap_err(),
        ContractError::StakeQueryFailed
    );
}

#[test]
fn control_and_direction_characters_are_rejected() {
    let mut deps = setup(Uint128::new(10_000_000));
    let error = create_thread(
        deps.as_mut(),
        env_at(1_000),
        mock_info(OWNER, &[]),
        "fake\u{202e}title".into(),
        "body".into(),
    )
    .unwrap_err();
    assert!(matches!(error, ContractError::InvalidCharacters { .. }));
}

#[test]
fn author_closes_but_only_owner_reopens() {
    let mut deps = setup(Uint128::new(10_000_000));
    create(deps.as_mut(), env_at(1_000), AUTHOR).unwrap();
    set_closed(deps.as_mut(), mock_info(AUTHOR, &[]), 1, true).unwrap();
    assert_eq!(
        set_closed(deps.as_mut(), mock_info(AUTHOR, &[]), 1, false).unwrap_err(),
        ContractError::Unauthorized
    );
    set_closed(deps.as_mut(), mock_info(OWNER, &[]), 1, false).unwrap();
}

#[test]
fn pagination_defaults_to_newest_threads_and_supports_comments() {
    let mut deps = setup(Uint128::new(10_000_000));
    create(deps.as_mut(), env_at(1_000), AUTHOR).unwrap();
    create(deps.as_mut(), env_at(1_030), AUTHOR).unwrap();
    let threads: Vec<Thread> = from_json(
        query(
            deps.as_ref(),
            env_at(1_100),
            QueryMsg::Threads {
                start_after: None,
                limit: Some(1),
                descending: None,
            },
        )
        .unwrap(),
    )
    .unwrap();
    assert_eq!(threads[0].id, 2);
    add_comment(
        deps.as_mut(),
        env_at(1_060),
        mock_info(AUTHOR, &[]),
        1,
        "One".into(),
    )
    .unwrap();
    add_comment(
        deps.as_mut(),
        env_at(1_090),
        mock_info(AUTHOR, &[]),
        1,
        "Two".into(),
    )
    .unwrap();
    let comments: Vec<Comment> = from_json(
        query(
            deps.as_ref(),
            env_at(1_100),
            QueryMsg::Comments {
                thread_id: 1,
                start_after: Some(1),
                limit: None,
                descending: Some(false),
            },
        )
        .unwrap(),
    )
    .unwrap();
    assert_eq!(comments[0].id, 2);
}

#[test]
fn migration_rejects_same_or_lower_versions() {
    let mut deps = setup(Uint128::new(10_000_000));
    assert_eq!(
        migrate(deps.as_mut(), mock_env(), MigrateMsg {}).unwrap_err(),
        ContractError::NonIncreasingVersion
    );
    set_contract_version(&mut deps.storage, NAME, "0.1.0").unwrap();
    migrate(deps.as_mut(), mock_env(), MigrateMsg {}).unwrap();
    assert_eq!(
        get_contract_version(&deps.storage).unwrap().version,
        VERSION
    );
}

#[test]
fn all_execute_messages_reject_attached_funds() {
    let mut deps = setup(Uint128::new(10_000_000));
    let error = execute(
        deps.as_mut(),
        mock_env(),
        mock_info(OWNER, &[coin(1, "ujuno")]),
        ExecuteMsg::SetPaused { paused: true },
    )
    .unwrap_err();
    assert_eq!(error, ContractError::FundsNotAccepted);
}
