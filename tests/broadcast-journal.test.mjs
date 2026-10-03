import test from 'node:test';
import assert from 'node:assert/strict';
import {journalBroadcast} from '../src/broadcast-journal.mjs';
import {AuthInfo} from 'cosmjs-types/cosmos/tx/v1beta1/tx';
const storage=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)};};
const locks={request:async (_k,_o,fn)=>fn({})};
function fixture() {
 let signs=0,broadcasts=0,tx=null;
 const client={getChainId:async()=>'juno-1',getTx:async()=>tx,sign:async()=>{signs++;return {bodyBytes:new Uint8Array([1]),authInfoBytes:AuthInfo.encode(AuthInfo.fromPartial({signerInfos:[{sequence:7n}]})).finish(),signatures:[new Uint8Array([2])]};},broadcastTx:async()=>{broadcasts++;throw Error('node accepted, reply lost');}};
 const options={storage:storage(),locks};
 return {client,options,counts:()=>({signs,broadcasts}),include:()=>{tx={code:0,height:1,hash:JSON.parse(options.storage.getItem('neta-pending-tx-v1:juno-1:juno1sender')).hash};}};
}
test('uncertain broadcast persists exact hash/sequence and prevents repeat signing after reload',async()=>{
 const f=fixture(); await assert.rejects(journalBroadcast(f.client,'juno1sender',[],{gas:'1',amount:[]},'test',f.options),/OUTCOME UNKNOWN/);
 const row=JSON.parse(f.options.storage.getItem('neta-pending-tx-v1:juno-1:juno1sender'));
 assert.equal(row.sequence,'7'); assert.match(row.hash,/^[A-F0-9]{64}$/);assert.ok(row.bytes);
 await assert.rejects(journalBroadcast(f.client,'juno1sender',[],{gas:'1',amount:[]},'test',f.options),/RETRY LOCKED/);
 assert.deepEqual(f.counts(),{signs:1,broadcasts:1});
 f.include(); await assert.rejects(journalBroadcast(f.client,'juno1sender',[],{gas:'1',amount:[]},'test',f.options),/PREVIOUS TRANSACTION INCLUDED/);
 assert.deepEqual(f.counts(),{signs:1,broadcasts:1});
});
test('unwritable journal and unavailable cross-tab lock never broadcast',async()=>{
 const f=fixture(); f.options.storage.setItem=()=>{throw Error('quota');};
 await assert.rejects(journalBroadcast(f.client,'juno1sender',[],{gas:'1',amount:[]},'test',f.options),/quota/);
 assert.deepEqual(f.counts(),{signs:0,broadcasts:0});
 f.options.locks={request:async(_k,_o,fn)=>fn(null)};
 await assert.rejects(journalBroadcast(f.client,'juno1sender',[],{gas:'1',amount:[]},'test',f.options),/ANOTHER TAB/);
});
test('signature rejection clears only the pre-broadcast intent',async()=>{
 const f=fixture();f.client.sign=async()=>{throw Error('user rejected');};
 await assert.rejects(journalBroadcast(f.client,'juno1sender',[],{gas:'1',amount:[]},'test',f.options),/user rejected/);
 assert.equal(f.options.storage.getItem('neta-pending-tx-v1:juno-1:juno1sender'),null);
 assert.equal(f.counts().broadcasts,0);
});
