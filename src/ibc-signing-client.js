import {SigningStargateClient,GasPrice} from "@cosmjs/stargate";
import {Registry} from "@cosmjs/proto-signing";
import {MsgTransfer} from "cosmjs-types/ibc/applications/transfer/v1/tx";
import {MsgExecuteContract} from "cosmjs-types/cosmwasm/wasm/v1/tx";
import {toUtf8} from "@cosmjs/encoding";

const registry=new Registry([
  ["/ibc.applications.transfer.v1.MsgTransfer",MsgTransfer],
  ["/cosmwasm.wasm.v1.MsgExecuteContract",MsgExecuteContract],
]);

export async function connect(endpoints,signer,gasPrice){
  const errors=[];
  for(const endpoint of endpoints){
    try{return{client:await SigningStargateClient.connectWithSigner(endpoint,signer,{registry,gasPrice:GasPrice.fromString(gasPrice)}),endpoint}}
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
