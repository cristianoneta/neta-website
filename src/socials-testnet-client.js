import {GasPrice} from "@cosmjs/stargate";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";

export async function connect(rpc,signer){
  return SigningCosmWasmClient.connectWithSigner(rpc,signer,{
    gasPrice:GasPrice.fromString("0.2ujunox"),
  });
}

export async function upload(client,sender,wasm,memo){
  return client.upload(sender,wasm,"auto",memo);
}

export async function instantiate(client,sender,codeId,message,label){
  return client.instantiate(sender,codeId,message,label,"auto",{admin:sender});
}

export async function execute(client,sender,contract,message,memo){
  return client.execute(sender,contract,message,"auto",memo);
}

export async function query(client,contract,message){
  return client.queryContractSmart(contract,message);
}
