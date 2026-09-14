import {SigningStargateClient,GasPrice} from "@cosmjs/stargate";
import {Registry} from "@cosmjs/proto-signing";
import {MsgTransfer} from "cosmjs-types/ibc/applications/transfer/v1/tx";
import {MsgExecuteContract} from "cosmjs-types/cosmwasm/wasm/v1/tx";
import {toUtf8} from "@cosmjs/encoding";

const registry=new Registry([
  ["/ibc.applications.transfer.v1.MsgTransfer",MsgTransfer],
  ["/cosmwasm.wasm.v1.MsgExecuteContract",MsgExecuteContract],
]);

async function connectWithTimeout(endpoint,signer,gasPrice,timeoutMs){
  let expired=false;
  let timer;
  const attempt=SigningStargateClient.connectWithSigner(endpoint,signer,{registry,gasPrice:GasPrice.fromString(gasPrice)}).then(client=>{
    if(expired){try{client.disconnect()}catch{};throw new Error(`RPC TIMEOUT AFTER ${timeoutMs}MS`)}
    return client;
  });
  const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{expired=true;reject(new Error(`RPC TIMEOUT AFTER ${timeoutMs}MS`))},timeoutMs)});
  try{return await Promise.race([attempt,timeout])}finally{clearTimeout(timer)}
}

export async function connect(endpoints,signer,gasPrice,timeoutMs=8000){
  const errors=[];
  for(const endpoint of endpoints){
    try{return{client:await connectWithTimeout(endpoint,signer,gasPrice,timeoutMs),endpoint}}
    catch(error){errors.push(`${endpoint}: ${error instanceof Error?error.message:String(error)}`)}
  }
  throw new Error(`NO SIGNING RPC AVAILABLE // ${errors.join(" // ")}`);
}

export function transferMessage(sender,receiver,channel,denom,amount,timeoutTimestamp){
  return{typeUrl:"/ibc.applications.transfer.v1.MsgTransfer",value:{sourcePort:"transfer",sourceChannel:channel,token:{denom,amount},sender,receiver,timeoutHeight:undefined,timeoutTimestamp:BigInt(timeoutTimestamp),memo:""}};
}

export function executeMessage(sender,contract,message){
  return{typeUrl:"/cosmwasm.wasm.v1.MsgExecuteContract",value:{sender,contract,msg:toUtf8(JSON.stringify(message)),funds:[]}};
}

export async function simulate(client,sender,message,memo){return client.simulate(sender,[message],memo)}
export async function broadcast(client,sender,message,gasAdjustment,memo){return client.signAndBroadcast(sender,[message],gasAdjustment,memo)}
