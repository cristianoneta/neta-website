use crate::error::ContractError;
use crate::msg::{
    ExecuteMsg, InstantiateMsg, QueryMsg, StakedBalanceAtHeightResponse,
    VotingPowerAtHeightResponse,
};
use crate::state::{BALANCES, OWNER};
use cosmwasm_std::{
    entry_point, to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
    Uint128,
};
use cw2::set_contract_version;

const NAME: &str = "crates.io:neta-socials-stake-mock";
const VERSION: &str = env!("CARGO_PKG_VERSION");

fn reject_funds(info: &MessageInfo) -> Result<(), ContractError> {
    if info.funds.is_empty() {
        Ok(())
    } else {
        Err(ContractError::FundsNotAccepted)
    }
}

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    reject_funds(&info)?;
    if env.block.chain_id != "uni-7" {
        return Err(ContractError::WrongChain);
    }
    let owner = deps.api.addr_validate(&msg.owner)?;
    OWNER.save(deps.storage, &owner)?;
    for entry in msg.balances {
        let address = deps.api.addr_validate(&entry.address)?;
        BALANCES.save(deps.storage, &address, &entry.balance)?;
    }
    set_contract_version(deps.storage, NAME, VERSION)?;
    Ok(Response::new()
        .add_attribute("action", "instantiate_test_stake_mock")
        .add_attribute("owner", owner))
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    reject_funds(&info)?;
    if info.sender != OWNER.load(deps.storage)? {
        return Err(ContractError::Unauthorized);
    }
    match msg {
        ExecuteMsg::SetBalance { address, balance } => {
            let address = deps.api.addr_validate(&address)?;
            BALANCES.save(deps.storage, &address, &balance)?;
            Ok(Response::new()
                .add_attribute("action", "set_test_balance")
                .add_attribute("address", address)
                .add_attribute("balance", balance))
        }
    }
}

#[entry_point]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::StakedBalanceAtHeight { address, height } => {
            let address = deps.api.addr_validate(&address)?;
            let height = height.unwrap_or(env.block.height).min(env.block.height);
            let balance = BALANCES
                .may_load(deps.storage, &address)?
                .unwrap_or_else(Uint128::zero);
            to_json_binary(&StakedBalanceAtHeightResponse { balance, height })
        }
        QueryMsg::VotingPowerAtHeight { address, height } => {
            let address = deps.api.addr_validate(&address)?;
            let height = height.unwrap_or(env.block.height).min(env.block.height);
            let power = BALANCES
                .may_load(deps.storage, &address)?
                .unwrap_or_else(Uint128::zero);
            to_json_binary(&VotingPowerAtHeightResponse { power, height })
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::msg::StakeBalance;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coin, from_json};

    fn uni_env() -> Env {
        let mut env = mock_env();
        env.block.chain_id = "uni-7".into();
        env
    }

    #[test]
    fn owner_controls_balances_and_funds_are_rejected() {
        let mut deps = mock_dependencies();
        instantiate(
            deps.as_mut(),
            uni_env(),
            mock_info("owner", &[]),
            InstantiateMsg {
                owner: "owner".into(),
                balances: vec![StakeBalance {
                    address: "member".into(),
                    balance: Uint128::new(10_000_000),
                }],
            },
        )
        .unwrap();
        let response: StakedBalanceAtHeightResponse = from_json(
            query(
                deps.as_ref(),
                mock_env(),
                QueryMsg::StakedBalanceAtHeight {
                    address: "member".into(),
                    height: None,
                },
            )
            .unwrap(),
        )
        .unwrap();
        assert_eq!(response.balance, Uint128::new(10_000_000));
        assert_eq!(
            execute(
                deps.as_mut(),
                mock_env(),
                mock_info("other", &[]),
                ExecuteMsg::SetBalance {
                    address: "member".into(),
                    balance: Uint128::zero(),
                },
            )
            .unwrap_err(),
            ContractError::Unauthorized
        );
        assert_eq!(
            execute(
                deps.as_mut(),
                mock_env(),
                mock_info("owner", &[coin(1, "ujunox")]),
                ExecuteMsg::SetBalance {
                    address: "member".into(),
                    balance: Uint128::zero(),
                },
            )
            .unwrap_err(),
            ContractError::FundsNotAccepted
        );
    }

    #[test]
    fn instantiate_rejects_non_uni_7_chains() {
        let mut deps = mock_dependencies();
        assert_eq!(
            instantiate(
                deps.as_mut(),
                mock_env(),
                mock_info("owner", &[]),
                InstantiateMsg {
                    owner: "owner".into(),
                    balances: vec![],
                },
            )
            .unwrap_err(),
            ContractError::WrongChain
        );
    }
}
