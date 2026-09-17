use crate::{
    error::ContractError,
    msg::{AccessResponse, ExecuteMsg, InstantiateMsg, QueryMsg, StakedBalanceQuery, StakedBalanceAtHeight, StakedBalanceResponse, VotingPowerAtHeightQuery, VotingPowerAtHeight, VotingPowerResponse},
    state::{Config, DiscussionComment, Proposal, ProposalStatus, Revision, COMMENTS, CONFIG, NEXT_COMMENT_ID, NEXT_PROPOSAL_ID, PROPOSALS, REVISIONS},
};
use cosmwasm_std::{entry_point, to_json_binary, Addr, Binary, Deps, DepsMut, Env, MessageInfo, Order, Response, StdResult, Uint128, WasmQuery, QueryRequest};
use cw2::set_contract_version;
use cw_storage_plus::Bound;

const NAME: &str = "crates.io:neta-governance";
const VERSION: &str = env!("CARGO_PKG_VERSION");
const MAX_LIMIT: u32 = 100;

#[entry_point]
pub fn instantiate(deps: DepsMut, _env: Env, info: MessageInfo, msg: InstantiateMsg) -> Result<Response, ContractError> {
    no_funds(&info)?;
    let config = Config { owner: deps.api.addr_validate(&msg.owner)?, dao_voting_contract: deps.api.addr_validate(&msg.dao_voting_contract)?, stake_contract: deps.api.addr_validate(&msg.stake_contract)?, comment_threshold: msg.comment_threshold, paused: true };
    CONFIG.save(deps.storage, &config)?;
    NEXT_PROPOSAL_ID.save(deps.storage, &1)?;
    set_contract_version(deps.storage, NAME, VERSION)?;
    Ok(Response::new().add_attribute("action", "instantiate").add_attribute("paused", "true"))
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> Result<Response, ContractError> {
    no_funds(&info)?;
    match msg {
        ExecuteMsg::PublishDraft { title, summary, body, actions_json } => publish(deps, env, info, title, summary, body, actions_json),
        ExecuteMsg::PublishRevision { proposal_id, summary, body, actions_json, change_note } => revise(deps, env, info, proposal_id, summary, body, actions_json, change_note),
        ExecuteMsg::AddComment { proposal_id, body } => comment(deps, env, info, proposal_id, body),
        ExecuteMsg::FinalizeAndSubmit { proposal_id } => finalize(deps, info, proposal_id),
        ExecuteMsg::SetStatus { proposal_id, status, dao_proposal_id } => set_status(deps, info, proposal_id, status, dao_proposal_id),
        ExecuteMsg::SetPaused { paused } => set_paused(deps, info, paused),
    }
}

fn no_funds(info: &MessageInfo) -> Result<(), ContractError> { if info.funds.is_empty() { Ok(()) } else { Err(ContractError::FundsNotAccepted) } }
fn checked(text: String, field: &str, min: usize, max: usize) -> Result<String, ContractError> { let value=text.trim().to_string(); let len=value.chars().count(); if len<min||len>max { Err(ContractError::InvalidLength{field:field.into(),min,max}) } else { Ok(value) } }
fn config_open(deps: Deps) -> Result<Config, ContractError> { let c=CONFIG.load(deps.storage)?; if c.paused { Err(ContractError::Paused) } else { Ok(c) } }
fn power(deps: Deps, config: &Config, address: &Addr) -> StdResult<Uint128> { let r: VotingPowerResponse=deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart{contract_addr:config.dao_voting_contract.to_string(),msg:to_json_binary(&VotingPowerAtHeightQuery{voting_power_at_height:VotingPowerAtHeight{address:address.to_string(),height:None}})?}))?; Ok(r.power) }
fn stake(deps: Deps, config: &Config, address: &Addr) -> StdResult<Uint128> { let r: StakedBalanceResponse=deps.querier.query(&QueryRequest::Wasm(WasmQuery::Smart{contract_addr:config.stake_contract.to_string(),msg:to_json_binary(&StakedBalanceQuery{staked_balance_at_height:StakedBalanceAtHeight{address:address.to_string(),height:None}})?}))?; Ok(r.balance) }
fn require_member(deps: Deps, config: &Config, address: &Addr) -> Result<(), ContractError> { if power(deps,config,address).unwrap_or_default().is_zero(){Err(ContractError::VotingPowerRequired)}else{Ok(())} }

fn publish(deps: DepsMut, env: Env, info: MessageInfo, title:String, summary:String, body:String, actions_json:String) -> Result<Response, ContractError> {
    let c=config_open(deps.as_ref())?; require_member(deps.as_ref(),&c,&info.sender)?;
    let id=NEXT_PROPOSAL_ID.load(deps.storage)?; NEXT_PROPOSAL_ID.save(deps.storage,&id.checked_add(1).ok_or(ContractError::CounterOverflow)?)?;
    let p=Proposal{id,author:info.sender.clone(),title:checked(title,"title",3,120)?,status:ProposalStatus::Discussion,current_revision:1,dao_proposal_id:None,created_height:env.block.height,created_time:env.block.time.seconds()};
    let r=Revision{proposal_id:id,revision:1,author:info.sender,summary:checked(summary,"summary",1,500)?,body:checked(body,"body",1,20_000)?,actions_json:checked(actions_json,"actions_json",2,20_000)?,change_note:"Initial published draft".into(),created_height:env.block.height,created_time:env.block.time.seconds()};
    PROPOSALS.save(deps.storage,id,&p)?; REVISIONS.save(deps.storage,(id,1),&r)?; NEXT_COMMENT_ID.save(deps.storage,id,&1)?;
    Ok(Response::new().add_attribute("action","publish_draft").add_attribute("proposal_id",id.to_string()))
}
#[allow(clippy::too_many_arguments)]
fn revise(deps:DepsMut,env:Env,info:MessageInfo,id:u64,summary:String,body:String,actions_json:String,change_note:String)->Result<Response,ContractError>{let c=config_open(deps.as_ref())?;require_member(deps.as_ref(),&c,&info.sender)?;let mut p=PROPOSALS.load(deps.storage,id)?;if p.status!=ProposalStatus::Discussion{return Err(ContractError::NotInDiscussion)}p.current_revision=p.current_revision.checked_add(1).ok_or(ContractError::CounterOverflow)?;let r=Revision{proposal_id:id,revision:p.current_revision,author:info.sender,summary:checked(summary,"summary",1,500)?,body:checked(body,"body",1,20_000)?,actions_json:checked(actions_json,"actions_json",2,20_000)?,change_note:checked(change_note,"change_note",1,500)?,created_height:env.block.height,created_time:env.block.time.seconds()};PROPOSALS.save(deps.storage,id,&p)?;REVISIONS.save(deps.storage,(id,p.current_revision),&r)?;Ok(Response::new().add_attribute("action","publish_revision").add_attribute("proposal_id",id.to_string()).add_attribute("revision",p.current_revision.to_string()))}
fn comment(deps:DepsMut,env:Env,info:MessageInfo,id:u64,body:String)->Result<Response,ContractError>{let c=config_open(deps.as_ref())?;let p=PROPOSALS.load(deps.storage,id)?;if p.status!=ProposalStatus::Discussion{return Err(ContractError::NotInDiscussion)}let verified=stake(deps.as_ref(),&c,&info.sender).unwrap_or_default();if verified<=c.comment_threshold{return Err(ContractError::CommentThresholdNotMet)}let cid=NEXT_COMMENT_ID.load(deps.storage,id)?;NEXT_COMMENT_ID.save(deps.storage,id,&cid.checked_add(1).ok_or(ContractError::CounterOverflow)?)?;COMMENTS.save(deps.storage,(id,cid),&DiscussionComment{id:cid,proposal_id:id,author:info.sender,body:checked(body,"comment",1,2_000)?,verified_stake:verified,created_height:env.block.height,created_time:env.block.time.seconds()})?;Ok(Response::new().add_attribute("action","add_comment").add_attribute("proposal_id",id.to_string()))}
fn finalize(deps:DepsMut,info:MessageInfo,id:u64)->Result<Response,ContractError>{let c=config_open(deps.as_ref())?;require_member(deps.as_ref(),&c,&info.sender)?;let mut p=PROPOSALS.load(deps.storage,id)?;if p.status!=ProposalStatus::Discussion{return Err(ContractError::NotInDiscussion)}p.status=ProposalStatus::Voting;PROPOSALS.save(deps.storage,id,&p)?;Ok(Response::new().add_attribute("action","finalize_and_submit").add_attribute("proposal_id",id.to_string()).add_attribute("status","voting"))}
fn set_status(deps:DepsMut,info:MessageInfo,id:u64,status:ProposalStatus,dao_proposal_id:Option<u64>)->Result<Response,ContractError>{let c=CONFIG.load(deps.storage)?;if info.sender!=c.owner{return Err(ContractError::Unauthorized)}let mut p=PROPOSALS.load(deps.storage,id)?;p.status=status; p.dao_proposal_id=dao_proposal_id;PROPOSALS.save(deps.storage,id,&p)?;Ok(Response::new().add_attribute("action","set_status").add_attribute("proposal_id",id.to_string()))}
fn set_paused(deps:DepsMut,info:MessageInfo,paused:bool)->Result<Response,ContractError>{CONFIG.update(deps.storage,|mut c|->Result<_,ContractError>{if info.sender!=c.owner{return Err(ContractError::Unauthorized)}c.paused=paused;Ok(c)})?;Ok(Response::new().add_attribute("action","set_paused").add_attribute("paused",paused.to_string()))}

#[entry_point]
pub fn query(deps:Deps,_env:Env,msg:QueryMsg)->StdResult<Binary>{match msg{QueryMsg::Config{}=>to_json_binary(&CONFIG.load(deps.storage)?),QueryMsg::Proposal{proposal_id}=>to_json_binary(&PROPOSALS.load(deps.storage,proposal_id)?),QueryMsg::Proposals{start_after,limit}=>{let rows=PROPOSALS.range(deps.storage,start_after.map(Bound::exclusive),None,Order::Ascending).take(limit.unwrap_or(20).min(MAX_LIMIT)as usize).map(|x|x.map(|(_,v)|v)).collect::<StdResult<Vec<_>>>()?;to_json_binary(&rows)},QueryMsg::Revisions{proposal_id}=>{let rows=REVISIONS.prefix(proposal_id).range(deps.storage,None,None,Order::Ascending).map(|x|x.map(|(_,v)|v)).collect::<StdResult<Vec<_>>>()?;to_json_binary(&rows)},QueryMsg::Comments{proposal_id,start_after,limit}=>{let rows=COMMENTS.prefix(proposal_id).range(deps.storage,start_after.map(Bound::exclusive),None,Order::Ascending).take(limit.unwrap_or(50).min(MAX_LIMIT)as usize).map(|x|x.map(|(_,v)|v)).collect::<StdResult<Vec<_>>>()?;to_json_binary(&rows)},QueryMsg::Access{address}=>{let c=CONFIG.load(deps.storage)?;let a=deps.api.addr_validate(&address)?;let voting_power=power(deps,&c,&a).unwrap_or_default();let staked_neta=stake(deps,&c,&a).unwrap_or_default();to_json_binary(&AccessResponse{address,voting_power,staked_neta,can_publish:!c.paused&&!voting_power.is_zero(),can_comment:!c.paused&&staked_neta>c.comment_threshold,paused:c.paused})}}}
