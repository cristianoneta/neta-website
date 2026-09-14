import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {GasPrice} from "@cosmjs/stargate";
import {toUtf8} from "@cosmjs/encoding";

function executeMessage(sender,contract,message,funds=[]){
  return{
    typeUrl:"/cosmwasm.wasm.v1.MsgExecuteContract",
    value:{sender,contract,msg:toUtf8(JSON.stringify(message)),funds},
  };
}

function connectAttempt(endpoint,signer,gasPrice,timeoutMs){
  let settled=false;
  let timer;
  const attempt=SigningCosmWasmClient.connectWithSigner(endpoint,signer,{gasPrice:GasPrice.fromString(gasPrice)});
  return new Promise((resolve,reject)=>{
    timer=setTimeout(()=>{settled=true;reject(new Error(`CONNECTION TIMED OUT AFTER ${timeoutMs}MS`))},timeoutMs);
    attempt.then(client=>{
      if(settled){try{client.disconnect()}catch{}return}
      settled=true;clearTimeout(timer);resolve(client);
    },error=>{if(settled)return;settled=true;clearTimeout(timer);reject(error)});
  });
}

export async function connect(rpcEndpoints,signer,gasPrice,timeoutMs=8000){
  const errors=[];
  for(const endpoint of rpcEndpoints){
    try{return{client:await connectAttempt(endpoint,signer,gasPrice,timeoutMs),endpoint}}
    catch(error){errors.push(`${endpoint}: ${error instanceof Error?error.message:String(error)}`)}
  }
  throw new Error(`NO SIGNING RPC AVAILABLE // ${errors.join(" // ")}`);
}

export async function simulate(client,sender,contract,message,funds,memo){
  return client.simulate(sender,[executeMessage(sender,contract,message,funds)],memo);
}

export async function execute(client,sender,contract,message,funds,gasAdjustment,memo){
  return client.execute(sender,contract,message,gasAdjustment,memo,funds);
}
