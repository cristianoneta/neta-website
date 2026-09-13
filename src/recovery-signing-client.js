import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {GasPrice} from "@cosmjs/stargate";
import {toUtf8} from "@cosmjs/encoding";

function executeMessage(sender,contract,message){
  return{
    typeUrl:"/cosmwasm.wasm.v1.MsgExecuteContract",
    value:{sender,contract,msg:toUtf8(JSON.stringify(message)),funds:[]},
  };
}

export async function connect(rpcEndpoints,signer,gasPrice){
  const errors=[];
  for(const endpoint of rpcEndpoints){
    try{
      const client=await SigningCosmWasmClient.connectWithSigner(endpoint,signer,{gasPrice:GasPrice.fromString(gasPrice)});
      return{client,endpoint};
    }catch(error){errors.push(`${endpoint}: ${error.message}`);}
  }
  throw new Error(`NO SIGNING RPC AVAILABLE // ${errors.join(" // ")}`);
}

export async function simulate(client,sender,contract,message,memo){
  return client.simulate(sender,[executeMessage(sender,contract,message)],memo);
}

export async function execute(client,sender,contract,message,gasAdjustment,memo){
  return client.execute(sender,contract,message,gasAdjustment,memo,[]);
}
