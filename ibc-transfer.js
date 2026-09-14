(()=>{
  const $=selector=>document.querySelector(selector);
  if(!$("#ibc-review"))return;
  const NETA="juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr",ICS20="juno1v4887y83d6g28puzvt8cl0f3cdhd3y6y9mpysnsp3k8krdm7l6jqgm0rkn";
  const CHAINS={
    juno:{id:"juno-1",name:"JUNO",prefix:"juno",gas:"0.075ujuno",rpc:["https://juno-rpc.kleomedes.network","https://juno-rpc.polkachu.com"],lcd:["https://juno-api.polkachu.com","https://juno-api.lavenderfive.com"]},
    osmosis:{id:"osmosis-1",name:"OSMOSIS",prefix:"osmo",gas:"0.025uosmo",rpc:["https://osmosis-rpc.polkachu.com","https://osmosis-rpc.publicnode.com:443"],lcd:["https://osmosis-api.polkachu.com","https://osmosis-rest.publicnode.com"]},
    terra:{id:"phoenix-1",name:"TERRA",prefix:"terra",gas:"0.15uluna",rpc:["https://terra-rpc.polkachu.com"],lcd:["https://terra-rest.publicnode.com","https://terra-api.polkachu.com"]},
  };
  const DENOMS={
    juno:{JUNO:"ujuno",OSMO:"ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518",LUNA:"ibc/107D152BB3176FAEBF4C2A84C5FFDEEA7C7CB4FE1BBDAB710F1FD25BCD055CBF",NETA:NETA},
    osmosis:{JUNO:"ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED",OSMO:"uosmo",LUNA:"ibc/785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",NETA:"ibc/297C64CC42B5A8D8F82FE2EBE208A6FE8F94B86037FA28C4529A23701C228F7A"},
    terra:{JUNO:"ibc/4CD525F166D32B0132C095F353F4C6F033B0FF5C49141470D1EFDA1D63303D04",OSMO:"ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B",LUNA:"uluna",NETA:"ibc/24EDDB84AD007CD83BD8D2DCCFF5FB71F93912AB143411AD870F2FE7DBE658FB"},
  };
  const ORIGIN={JUNO:"juno",OSMO:"osmosis",LUNA:"terra",NETA:"juno"};
  const CHANNEL={"juno:osmosis":"channel-0","osmosis:juno":"channel-42","osmosis:terra":"channel-251","terra:osmosis":"channel-1"};
  const NETA_CHANNEL={"juno:osmosis":"channel-47","osmosis:juno":"channel-169"};
  const MEMO="netareborn.com/map-of-neta:ibc:v1";
  let accounts={},balanceRaw=0n,prepared=null,busy=false,balanceRequest=0;
  function routeOptions(from){return Object.keys(CHAINS).filter(to=>to!==from&&Boolean(CHANNEL[`${from}:${to}`]))}
  function assetOptions(from,to){return Object.keys(ORIGIN).filter(symbol=>ORIGIN[symbol]===from||ORIGIN[symbol]===to)}
  function rawAmount(value){const normalized=value.trim().replace(",", ".");if(!/^(?:0|[1-9]\d*)(?:\.\d{0,6})?$/.test(normalized))return null;const [whole,fraction=""]=normalized.split(".");return BigInt(whole)*1000000n+BigInt((fraction+"000000").slice(0,6))}
  function display(raw){const whole=raw/1000000n,fraction=String(raw%1000000n).padStart(6,"0").replace(/0+$/,"");return fraction?`${whole}.${fraction}`:String(whole)}
  function isAllowedRoute(from,to,symbol){return from!==to&&(ORIGIN[symbol]===from||ORIGIN[symbol]===to)}
  function setStatus(text,error=false){const node=$("#ibc-status");node.textContent=text;node.classList.toggle("error",error)}
  function selectedRoute(){return [$("#ibc-from").value,$("#ibc-to").value].filter(Boolean)}
  function connectedAndAllowed(){return selectedRoute().every(chain=>Boolean(accounts[chain]))}
  async function getJson(url,timeoutMs=8000){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);try{const response=await fetch(url,{cache:"no-store",signal:controller.signal});if(!response.ok)throw new Error(`HTTP ${response.status}`);return await response.json()}finally{clearTimeout(timer)}}
  async function readBalance(){
    const request=++balanceRequest,from=$("#ibc-from").value,symbol=$("#ibc-asset").value,address=accounts[from];balanceRaw=0n;
    if(!address){$("#ibc-balance").textContent="BALANCE —";return}
    const cfg=CHAINS[from],denom=DENOMS[from][symbol];$("#ibc-balance").textContent=`BALANCE LOADING… ${symbol}`;
    for(const lcd of cfg.lcd){try{
      let amount;
      if(from==="juno"&&symbol==="NETA"){
        const query=btoa(JSON.stringify({balance:{address}})).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
        amount=(await getJson(`${lcd}/cosmwasm/wasm/v1/contract/${NETA}/smart/${query}`)).data.balance;
      }else amount=(await getJson(`${lcd}/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${encodeURIComponent(denom)}`)).balance?.amount||"0";
      if(request!==balanceRequest)return;balanceRaw=BigInt(amount);$("#ibc-balance").textContent=`BALANCE ${display(balanceRaw)} ${symbol}`;return;
    }catch(error){continue}}
    $("#ibc-balance").textContent=`BALANCE UNAVAILABLE · ${symbol}`;throw new Error("BALANCE QUERY FAILED");
  }
  function render(){
    const from=$("#ibc-from").value,previousTo=$("#ibc-to").value,targets=routeOptions(from);$("#ibc-to").replaceChildren(...targets.map(chain=>{const option=document.createElement("option");option.value=chain;option.textContent=CHAINS[chain].name;return option}));const to=targets.includes(previousTo)?previousTo:targets[0];$("#ibc-to").value=to
    const allowed=assetOptions(from,to),previous=$("#ibc-asset").value;$("#ibc-asset").replaceChildren(...allowed.map(symbol=>{const option=document.createElement("option");option.value=symbol;option.textContent=symbol;return option}));if(allowed.includes(previous))$("#ibc-asset").value=previous;
    const symbol=$("#ibc-asset").value,channel=symbol==="NETA"?NETA_CHANNEL[`${from}:${to}`]:CHANNEL[`${from}:${to}`];
    $("#ibc-symbol").textContent=symbol;$("#ibc-route-label").textContent=`${CHAINS[from].name} → ${CHAINS[to].name}`;$("#ibc-channel").textContent=`${channel||"NO DIRECT"} · ${symbol}`;$("#ibc-destination").textContent=accounts[to]||"CONNECT KEPLR";
    const access=$("#ibc-access"),ok=connectedAndAllowed();access.textContent=ok?"WALLET READY":"CONNECT WALLET";access.className=`ibc-access ${ok?"allowed":""}`;
    const amount=rawAmount($("#ibc-amount").value),valid=ok&&amount!==null&&amount>0n&&amount<=balanceRaw&&Boolean(channel)&&isAllowedRoute(from,to,symbol);$("#ibc-review").disabled=!valid;
    if(!ok)setStatus("CONNECT YOUR KEPLR WALLET TO CONTINUE.");
    else if(!amount||amount<=0n)setStatus("ENTER AN AMOUNT TO BUILD THE TRANSFER.");else if(amount>balanceRaw)setStatus("AMOUNT EXCEEDS THE LIVE WALLET BALANCE.",true);else setStatus("ROUTE AND BALANCE READY FOR REVIEW.");
    readBalance().then(renderValidity).catch(error=>setStatus(error.message,true));
  }
  function renderValidity(){const amount=rawAmount($("#ibc-amount").value),ok=connectedAndAllowed();$("#ibc-review").disabled=!(ok&&amount&&amount>0n&&amount<=balanceRaw);if(!ok)return;if(amount===null||amount<=0n)setStatus("ENTER AN AMOUNT TO BUILD THE TRANSFER.");else if(amount>balanceRaw)setStatus("AMOUNT EXCEEDS THE LIVE WALLET BALANCE.",true);else setStatus("ROUTE AND BALANCE READY FOR REVIEW.")}
  async function loadAccounts(){
    if(!window.keplr)return;
    const found={...accounts};
    for(const key of selectedRoute()){const cfg=CHAINS[key];await window.keplr.enable(cfg.id);const signer=window.keplr.getOfflineSigner(cfg.id),account=(await signer.getAccounts())[0];if(!account?.address.startsWith(cfg.prefix+"1"))throw new Error(`INVALID ${cfg.name} ACCOUNT`);found[key]=account.address}
    accounts=found;render();
  }
  function packetEvent(result){const event=(result.events||[]).find(item=>item.type==="send_packet");if(!event)return null;const attributes=Object.fromEntries((event.attributes||[]).map(item=>[item.key,item.value]));return{sequence:attributes.packet_sequence||null,source_channel:attributes.packet_src_channel||null,destination_channel:attributes.packet_dst_channel||null}}
  function preview(){
    const from=$("#ibc-from").value,to=$("#ibc-to").value,symbol=$("#ibc-asset").value,amount=rawAmount($("#ibc-amount").value),channel=symbol==="NETA"?NETA_CHANNEL[`${from}:${to}`]:CHANNEL[`${from}:${to}`];
    prepared={from,to,symbol,amount,channel,sender:accounts[from],receiver:accounts[to],denom:DENOMS[from][symbol]};
    const data={network:CHAINS[from].id,sender:prepared.sender,receiver:prepared.receiver,direction:`${CHAINS[from].name} -> ${CHAINS[to].name}`,asset:symbol,amount:display(amount),source_channel:channel,source_denom:prepared.denom,memo:MEMO,signing_enabled:true,public_access:true};
    $("#ibc-preview").textContent=JSON.stringify(data,null,2);$("#ibc-modal-state").textContent="READY FOR FINAL LIVE REVALIDATION";$("#ibc-modal-state").className="ibc-modal-state";$("#ibc-sign").hidden=false;$("#ibc-explorer").hidden=true;$("#ibc-modal-note").textContent="The route, wallet identity, balance and channel will be checked again before Keplr opens.";$("#ibc-modal").hidden=false;
  }
  async function sign(){
    if(busy)return;busy=true;$("#ibc-sign").disabled=true;$("#ibc-modal-state").textContent="REVALIDATING ROUTE + BALANCE…";
    let client;
    try{
      await loadAccounts();if(!connectedAndAllowed())throw new Error("WALLET CONNECTION INCOMPLETE");await readBalance();
      const current=rawAmount($("#ibc-amount").value),from=$("#ibc-from").value,to=$("#ibc-to").value,symbol=$("#ibc-asset").value,channel=symbol==="NETA"?NETA_CHANNEL[`${from}:${to}`]:CHANNEL[`${from}:${to}`];if(!prepared||current!==prepared.amount||from!==prepared.from||to!==prepared.to||symbol!==prepared.symbol||channel!==prepared.channel||prepared.sender!==accounts[from]||prepared.receiver!==accounts[to])throw new Error("TRANSFER PARAMETERS CHANGED — REVIEW AGAIN");if(current>balanceRaw)throw new Error("INSUFFICIENT LIVE BALANCE");
      const cfg=CHAINS[prepared.from],signer=window.keplr.getOfflineSigner(cfg.id),connection=await window.NetaIbcSigning.connect(cfg.rpc,signer,cfg.gas);client=connection.client;
      const timeout=BigInt(Date.now()+15*60*1000)*1000000n;let message;
      if(prepared.from==="juno"&&prepared.symbol==="NETA"){
        const hook=btoa(JSON.stringify({channel:prepared.channel,remote_address:prepared.receiver,timeout:900}));
        message=window.NetaIbcSigning.executeMessage(prepared.sender,NETA,{send:{contract:ICS20,amount:String(prepared.amount),msg:hook}});
      }else message=window.NetaIbcSigning.transferMessage(prepared.sender,prepared.receiver,prepared.channel,prepared.denom,String(prepared.amount),timeout);
      const gas=await window.NetaIbcSigning.simulate(client,prepared.sender,message,MEMO);if(!Number.isFinite(gas)||gas<=0||gas>900000)throw new Error("UNSAFE GAS SIMULATION");
      $("#ibc-modal-state").textContent="WAITING FOR KEPLR APPROVAL…";const result=await window.NetaIbcSigning.broadcast(client,prepared.sender,message,2.0,MEMO);if(result.code!==0)throw new Error(`TRANSACTION FAILED WITH CODE ${result.code}${result.rawLog?` // ${result.rawLog}`:""}${result.transactionHash?` // TX ${result.transactionHash}`:""}`);
      const packet=packetEvent(result),submitted=Boolean(packet);$("#ibc-modal-state").textContent=submitted?"SOURCE TRANSACTION CONFIRMED · PACKET SUBMITTED":"SOURCE TRANSACTION CONFIRMED · PACKET EVENT NOT VERIFIED";$("#ibc-modal-state").className="ibc-modal-state success";$("#ibc-preview").textContent=JSON.stringify({transaction_hash:result.transactionHash,height:result.height,source_chain:cfg.name,destination_chain:CHAINS[prepared.to].name,ibc_packet_submitted:submitted,packet_sequence:packet?.sequence||null,packet_source_channel:packet?.source_channel||null,packet_destination_channel:packet?.destination_channel||null,destination_receipt_verified:false},null,2);const explorer=$("#ibc-explorer"),base=prepared.from==="juno"?"https://atomscan.com/juno/transactions/":prepared.from==="osmosis"?"https://www.mintscan.io/osmosis/tx/":"https://www.mintscan.io/terra/tx/";explorer.href=base+encodeURIComponent(result.transactionHash);explorer.hidden=false;$("#ibc-modal-note").textContent=submitted?"The source transaction emitted an IBC packet. Delivery remains asynchronous until acknowledgement and destination balance are verified.":"The source transaction is included, but no send_packet event was found. Verify the transaction before assuming IBC delivery.";$("#ibc-sign").hidden=true;await readBalance();renderValidity();
    }catch(error){$("#ibc-modal-state").textContent=error instanceof Error?error.message:String(error);$("#ibc-modal-state").className="ibc-modal-state error"}finally{try{client?.disconnect()}catch{}busy=false;$("#ibc-sign").disabled=false}
  }
  function routeChanged(){render();if(window.NETA_WALLET_STATE)loadAccounts().catch(error=>setStatus(error.message,true))}
  $("#ibc-from").addEventListener("change",routeChanged);$("#ibc-to").addEventListener("change",routeChanged);$("#ibc-asset").addEventListener("change",()=>{readBalance().then(renderValidity).catch(error=>setStatus(error.message,true));render()});$("#ibc-amount").addEventListener("input",renderValidity);$("#ibc-max").addEventListener("click",()=>{const from=$("#ibc-from").value,symbol=$("#ibc-asset").value,reserve={JUNO:200000n,OSMO:100000n,LUNA:200000n};const available=ORIGIN[symbol]===from&&symbol!=="NETA"?balanceRaw-(reserve[symbol]||0n):balanceRaw;$("#ibc-amount").value=display(available>0n?available:0n);renderValidity()});
  $("#ibc-reverse").addEventListener("click",()=>{const from=$("#ibc-from").value;$("#ibc-from").value=$("#ibc-to").value;$("#ibc-to").value=from;render()});$("#ibc-review").addEventListener("click",preview);$("#ibc-sign").addEventListener("click",sign);$("#ibc-close").addEventListener("click",()=>{$("#ibc-modal").hidden=true});
  addEventListener("neta:wallet-connected",()=>loadAccounts().catch(error=>setStatus(error.message,true)));addEventListener("neta:wallet-disconnected",()=>{accounts={};balanceRaw=0n;render()});
  render();if(window.NETA_WALLET_STATE)loadAccounts().catch(error=>setStatus(error.message,true));
})();
