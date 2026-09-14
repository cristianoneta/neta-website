(()=>{
  const $=selector=>document.querySelector(selector);
  if(!$("#ibc-review"))return;
  const HOT_JUNO="juno1z3xcalwan92yqxu9d406tlft9yy94jy8s5et57";
  const NETA="juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr",ICS20="juno1v4887y83d6g28puzvt8cl0f3cdhd3y6y9mpysnsp3k8krdm7l6jqgm0rkn";
  const CHAINS={
    juno:{id:"juno-1",name:"JUNO",prefix:"juno",gas:"0.075ujuno",rpc:["https://juno-rpc.kleomedes.network","https://juno-rpc.polkachu.com"],lcd:["https://juno-api.polkachu.com","https://juno-api.lavenderfive.com"]},
    osmosis:{id:"osmosis-1",name:"OSMOSIS",prefix:"osmo",gas:"0.025uosmo",rpc:["https://osmosis-rpc.polkachu.com"],lcd:["https://osmosis-api.polkachu.com"]},
    terra:{id:"phoenix-1",name:"TERRA",prefix:"terra",gas:"0.15uluna",rpc:["https://terra-rpc.polkachu.com"],lcd:["https://terra-api.polkachu.com"]},
  };
  const DENOMS={
    juno:{JUNO:"ujuno",OSMO:"ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518",LUNA:"ibc/107D152BB3176FAEBF4C2A84C5FFDEEA7C7CB4FE1BBDAB710F1FD25BCD055CBF",NETA:NETA},
    osmosis:{JUNO:"ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED",OSMO:"uosmo",LUNA:"ibc/785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",NETA:"ibc/297C64CC42B5A8D8F82FE2EBE208A6FE8F94B86037FA28C4529A23701C228F7A"},
    terra:{JUNO:"ibc/4CD525F166D32B0132C095F353F4C6F033B0FF5C49141470D1EFDA1D63303D04",OSMO:"ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B",LUNA:"uluna",NETA:"ibc/24EDDB84AD007CD83BD8D2DCCFF5FB71F93912AB143411AD870F2FE7DBE658FB"},
  };
  const ORIGIN={JUNO:"juno",OSMO:"osmosis",LUNA:"terra",NETA:"juno"};
  const CHANNEL={"juno:osmosis":"channel-0","osmosis:juno":"channel-42","juno:terra":"channel-86","terra:juno":"channel-2","osmosis:terra":"channel-251","terra:osmosis":"channel-1"};
  const NETA_CHANNEL={"juno:osmosis":"channel-47","osmosis:juno":"channel-169","juno:terra":"channel-154","terra:juno":"channel-33"};
  const MEMO="netareborn.com/map-of-neta:ibc:v1";
  let accounts={},balanceRaw=0n,prepared=null,busy=false,balanceRequest=0;
  function assetOptions(from,to){return Object.keys(ORIGIN).filter(symbol=>ORIGIN[symbol]===from||ORIGIN[symbol]===to)}
  function rawAmount(value){const normalized=value.trim().replace(",", ".");if(!/^(?:0|[1-9]\d*)(?:\.\d{0,6})?$/.test(normalized))return null;const [whole,fraction=""]=normalized.split(".");return BigInt(whole)*1000000n+BigInt((fraction+"000000").slice(0,6))}
  function display(raw){const whole=raw/1000000n,fraction=String(raw%1000000n).padStart(6,"0").replace(/0+$/,"");return fraction?`${whole}.${fraction}`:String(whole)}
  function isAllowedRoute(from,to,symbol){return from!==to&&(ORIGIN[symbol]===from||ORIGIN[symbol]===to)}
  function setStatus(text,error=false){const node=$("#ibc-status");node.textContent=text;node.classList.toggle("error",error)}
  function connectedAndAllowed(){return accounts.juno===HOT_JUNO&&Object.keys(CHAINS).every(chain=>Boolean(accounts[chain]))}
  async function getJson(url){const response=await fetch(url,{cache:"no-store"});if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.json()}
  async function readBalance(){
    const request=++balanceRequest,from=$("#ibc-from").value,symbol=$("#ibc-asset").value,address=accounts[from];balanceRaw=0n;
    if(!address){$("#ibc-balance").textContent="BALANCE —";return}
    const cfg=CHAINS[from],denom=DENOMS[from][symbol];
    for(const lcd of cfg.lcd){try{
      let amount;
      if(from==="juno"&&symbol==="NETA"){
        const query=btoa(JSON.stringify({balance:{address}})).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
        amount=(await getJson(`${lcd}/cosmwasm/wasm/v1/contract/${NETA}/smart/${query}`)).data.amount;
      }else amount=(await getJson(`${lcd}/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${encodeURIComponent(denom)}`)).balance?.amount||"0";
      if(request!==balanceRequest)return;balanceRaw=BigInt(amount);$("#ibc-balance").textContent=`BALANCE ${display(balanceRaw)} ${symbol}`;return;
    }catch(error){continue}}
    throw new Error("BALANCE QUERY FAILED");
  }
  function render(){
    let from=$("#ibc-from").value,to=$("#ibc-to").value;if(from===to){to=Object.keys(CHAINS).find(chain=>chain!==from);$("#ibc-to").value=to}
    const allowed=assetOptions(from,to),previous=$("#ibc-asset").value;$("#ibc-asset").replaceChildren(...allowed.map(symbol=>{const option=document.createElement("option");option.value=symbol;option.textContent=symbol;return option}));if(allowed.includes(previous))$("#ibc-asset").value=previous;
    const symbol=$("#ibc-asset").value,channel=symbol==="NETA"?NETA_CHANNEL[`${from}:${to}`]:CHANNEL[`${from}:${to}`];
    $("#ibc-symbol").textContent=symbol;$("#ibc-route-label").textContent=`${CHAINS[from].name} → ${CHAINS[to].name}`;$("#ibc-channel").textContent=`${channel||"NO DIRECT"} · ${symbol}`;$("#ibc-destination").textContent=accounts[to]||"CONNECT KEPLR";
    const access=$("#ibc-access"),ok=connectedAndAllowed();access.textContent=ok?"HOTWALLET ALLOWED":Object.keys(accounts).length?"NOT ALLOWLISTED":"CONNECT WALLET";access.className=`ibc-access ${ok?"allowed":Object.keys(accounts).length?"denied":""}`;
    const amount=rawAmount($("#ibc-amount").value),valid=ok&&amount!==null&&amount>0n&&amount<=balanceRaw&&Boolean(channel)&&isAllowedRoute(from,to,symbol);$("#ibc-review").disabled=!valid;
    if(!ok)setStatus(Object.keys(accounts).length?"THIS ACCOUNT IS NOT ENABLED FOR THE CONTROLLED IBC PILOT.":"CONNECT THE ALLOWLISTED WALLET TO CONTINUE.",Boolean(Object.keys(accounts).length));
    else if(!amount||amount<=0n)setStatus("ENTER AN AMOUNT TO BUILD THE TRANSFER.");else if(amount>balanceRaw)setStatus("AMOUNT EXCEEDS THE LIVE WALLET BALANCE.",true);else setStatus("ROUTE AND BALANCE READY FOR REVIEW.");
    readBalance().then(renderValidity).catch(error=>setStatus(error.message,true));
  }
  function renderValidity(){const amount=rawAmount($("#ibc-amount").value),ok=connectedAndAllowed();$("#ibc-review").disabled=!(ok&&amount&&amount>0n&&amount<=balanceRaw);if(!ok)return;if(amount===null||amount<=0n)setStatus("ENTER AN AMOUNT TO BUILD THE TRANSFER.");else if(amount>balanceRaw)setStatus("AMOUNT EXCEEDS THE LIVE WALLET BALANCE.",true);else setStatus("ROUTE AND BALANCE READY FOR REVIEW.")}
  async function loadAccounts(){
    if(!window.keplr)return;
    const found={};
    for(const [key,cfg] of Object.entries(CHAINS)){await window.keplr.enable(cfg.id);const signer=window.keplr.getOfflineSigner(cfg.id),account=(await signer.getAccounts())[0];if(!account?.address.startsWith(cfg.prefix+"1"))throw new Error(`INVALID ${cfg.name} ACCOUNT`);found[key]=account.address}
    accounts=found;render();
  }
  function preview(){
    const from=$("#ibc-from").value,to=$("#ibc-to").value,symbol=$("#ibc-asset").value,amount=rawAmount($("#ibc-amount").value),channel=symbol==="NETA"?NETA_CHANNEL[`${from}:${to}`]:CHANNEL[`${from}:${to}`];
    prepared={from,to,symbol,amount,channel,sender:accounts[from],receiver:accounts[to],denom:DENOMS[from][symbol]};
    const data={network:CHAINS[from].id,sender:prepared.sender,receiver:prepared.receiver,direction:`${CHAINS[from].name} -> ${CHAINS[to].name}`,asset:symbol,amount:display(amount),source_channel:channel,source_denom:prepared.denom,memo:MEMO,signing_enabled:true,allowlisted_wallet:true};
    $("#ibc-preview").textContent=JSON.stringify(data,null,2);$("#ibc-modal-state").textContent="READY FOR FINAL LIVE REVALIDATION";$("#ibc-modal-state").className="ibc-modal-state";$("#ibc-sign").hidden=false;$("#ibc-explorer").hidden=true;$("#ibc-modal-note").textContent="The route, wallet identity, balance and channel will be checked again before Keplr opens.";$("#ibc-modal").hidden=false;
  }
  async function sign(){
    if(busy)return;busy=true;$("#ibc-sign").disabled=true;$("#ibc-modal-state").textContent="REVALIDATING ROUTE + BALANCE…";
    let client;
    try{
      await loadAccounts();if(!connectedAndAllowed())throw new Error("WALLET IS NOT ALLOWLISTED");await readBalance();
      const current=rawAmount($("#ibc-amount").value),from=$("#ibc-from").value,to=$("#ibc-to").value,symbol=$("#ibc-asset").value,channel=symbol==="NETA"?NETA_CHANNEL[`${from}:${to}`]:CHANNEL[`${from}:${to}`];if(!prepared||current!==prepared.amount||from!==prepared.from||to!==prepared.to||symbol!==prepared.symbol||channel!==prepared.channel||prepared.sender!==accounts[from]||prepared.receiver!==accounts[to])throw new Error("TRANSFER PARAMETERS CHANGED — REVIEW AGAIN");if(current>balanceRaw)throw new Error("INSUFFICIENT LIVE BALANCE");
      const cfg=CHAINS[prepared.from],signer=window.keplr.getOfflineSigner(cfg.id),connection=await window.NetaIbcSigning.connect(cfg.rpc,signer,cfg.gas);client=connection.client;
      const timeout=BigInt(Date.now()+15*60*1000)*1000000n;let message;
      if(prepared.from==="juno"&&prepared.symbol==="NETA"){
        const hook=btoa(JSON.stringify({channel:prepared.channel,remote_address:prepared.receiver,timeout:900}));
        message=window.NetaIbcSigning.executeMessage(prepared.sender,NETA,{send:{contract:ICS20,amount:String(prepared.amount),msg:hook}});
      }else message=window.NetaIbcSigning.transferMessage(prepared.sender,prepared.receiver,prepared.channel,prepared.denom,String(prepared.amount),timeout);
      const gas=await window.NetaIbcSigning.simulate(client,prepared.sender,message,MEMO);if(!Number.isFinite(gas)||gas<=0||gas>900000)throw new Error("UNSAFE GAS SIMULATION");
      $("#ibc-modal-state").textContent="WAITING FOR KEPLR APPROVAL…";const result=await window.NetaIbcSigning.broadcast(client,prepared.sender,message,1.35,MEMO);if(result.code!==0)throw new Error(`TRANSACTION FAILED WITH CODE ${result.code}`);
      $("#ibc-modal-state").textContent="SOURCE TRANSACTION CONFIRMED · PACKET SUBMITTED";$("#ibc-modal-state").className="ibc-modal-state success";$("#ibc-preview").textContent=JSON.stringify({transaction_hash:result.transactionHash,height:result.height,source_chain:cfg.name,destination_chain:CHAINS[prepared.to].name,ibc_packet_submitted:true,destination_receipt_verified:false},null,2);const explorer=$("#ibc-explorer"),base=prepared.from==="juno"?"https://atomscan.com/juno/transactions/":prepared.from==="osmosis"?"https://www.mintscan.io/osmosis/tx/":"https://www.mintscan.io/terra/tx/";explorer.href=base+encodeURIComponent(result.transactionHash);explorer.hidden=false;$("#ibc-modal-note").textContent="The source transaction is included. IBC delivery remains asynchronous until the packet acknowledgement and destination balance are verified.";$("#ibc-sign").hidden=true;await readBalance();renderValidity();
    }catch(error){$("#ibc-modal-state").textContent=error instanceof Error?error.message:String(error);$("#ibc-modal-state").className="ibc-modal-state error"}finally{try{client?.disconnect()}catch{}busy=false;$("#ibc-sign").disabled=false}
  }
  $("#ibc-from").addEventListener("change",render);$("#ibc-to").addEventListener("change",render);$("#ibc-asset").addEventListener("change",()=>{readBalance().then(renderValidity).catch(error=>setStatus(error.message,true));render()});$("#ibc-amount").addEventListener("input",renderValidity);$("#ibc-max").addEventListener("click",()=>{const from=$("#ibc-from").value,symbol=$("#ibc-asset").value,reserve={JUNO:200000n,OSMO:100000n,LUNA:200000n};const available=ORIGIN[symbol]===from&&symbol!=="NETA"?balanceRaw-(reserve[symbol]||0n):balanceRaw;$("#ibc-amount").value=display(available>0n?available:0n);renderValidity()});
  $("#ibc-reverse").addEventListener("click",()=>{const from=$("#ibc-from").value;$("#ibc-from").value=$("#ibc-to").value;$("#ibc-to").value=from;render()});$("#ibc-review").addEventListener("click",preview);$("#ibc-sign").addEventListener("click",sign);$("#ibc-close").addEventListener("click",()=>{$("#ibc-modal").hidden=true});
  addEventListener("neta:wallet-connected",()=>loadAccounts().catch(error=>setStatus(error.message,true)));addEventListener("neta:wallet-disconnected",()=>{accounts={};balanceRaw=0n;render()});
  render();if(window.NETA_WALLET_STATE)loadAccounts().catch(error=>setStatus(error.message,true));
})();
