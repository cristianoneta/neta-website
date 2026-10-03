import {journalBroadcast} from "./broadcast-journal.mjs";
import {toUtf8} from "@cosmjs/encoding";
import {GasPrice} from "@cosmjs/stargate";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";

export async function connect(rpc,signer,gasPrice="0.2ujunox"){
  return SigningCosmWasmClient.connectWithSigner(rpc,signer,{
    gasPrice:GasPrice.fromString(gasPrice),
  });
}

export async function upload(client,sender,wasm,memo){
  return client.upload(sender,wasm,"auto",memo);
}

export async function instantiate(client,sender,codeId,message,label){
  return client.instantiate(sender,codeId,message,label,"auto",{admin:sender});
}

export async function execute(client,sender,contract,message,memo){
  return journalBroadcast(client,sender,[{typeUrl:"/cosmwasm.wasm.v1.MsgExecuteContract",value:{sender,contract,msg:toUtf8(JSON.stringify(message)),funds:[]}}],"auto",memo);
}

export async function query(client,contract,message){
  return client.queryContractSmart(contract,message);
}
