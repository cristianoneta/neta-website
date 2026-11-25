import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {createHash, webcrypto} from 'node:crypto';
import test from 'node:test';

const source = await readFile(new URL('../public-data.js', import.meta.url), 'utf8');
const prefix = 'https://data.cosmoot.com/data/neta-website/';
const names = ['metadata.json','address_index.json','data/map/state.json','data/map/map-of-neta.json',
  'data/recovery/recovery-stats.json','data/recovery/recovery-events.json',
  'data/recovery/wynd-market.json','data/recovery/wynd-leaderboard.json'];
const metadata = {validation:{passed:true}, generated_at:'2026-11-25T12:00:00Z'};
const index = {schema_version:4,fields:['rank','juno_address','osmosis_address','total_neta'],rows:[[1,'juno1test','osmo1test',7]]};
const values = Object.fromEntries(names.map(name => [name, JSON.stringify(name==='metadata.json'?metadata:name==='address_index.json'?index:{source:'server'})]));
function harness(change = {}) {
  const calls = [];
  const manifest = {schema_version:1,generation:'generation-'+ 'a'.repeat(64),source_revision:'b'.repeat(40),published_at:new Date().toISOString(),
    files:Object.fromEntries(names.map(name=>[name,createHash('sha256').update(values[name]).digest('hex')]))};
  Object.assign(manifest,change.manifest);
  const window = {...change.window};
  const context = vm.createContext({window,Response,AbortSignal,crypto:webcrypto,Date,Set,Uint8Array,console,
    fetch:async (url,options) => {
      calls.push({url,options});
      if (url===prefix+'current/manifest.json') return new Response(JSON.stringify(manifest),{status:change.manifestStatus||200});
      if (url.startsWith(prefix)) {
        const name=url.slice((prefix+manifest.generation+'/').length);
        return new Response(change.tamper===name?'{}':values[name],{status:change.failed===name?503:200});
      }
      return new Response(JSON.stringify({source:'fallback'}));
    }});
  vm.runInContext(source,context);
  return {api:window.NETAPublicData,window,calls};
}

test('public JSON files are hash-bound to one immutable generation without credentials', async()=>{
  const h=harness();
  const responses=await h.api.fetchGroup(['data/recovery/wynd-market.json','data/recovery/wynd-leaderboard.json']);
  assert.deepEqual(await Promise.all(responses.map(r=>r.json())),[{source:'server'},{source:'server'}]);
  assert.equal(h.calls.filter(c=>c.url.includes('/current/')).length,1);
  assert.ok(h.calls.every(c=>c.options.credentials==='omit'&&c.options.redirect==='error'));
  assert.ok(h.calls.slice(1).every(c=>c.url.includes('/generation-'+ 'a'.repeat(64)+'/')));
});

test('one tampered or unavailable file makes the complete related group use saved files',async()=>{
  for(const change of [{tamper:'data/recovery/wynd-market.json'},{failed:'data/recovery/wynd-leaderboard.json'}]){
    const h=harness(change),responses=await h.api.fetchGroup(['data/recovery/wynd-market.json','data/recovery/wynd-leaderboard.json']);
    assert.deepEqual(await Promise.all(responses.map(r=>r.json())),[{source:'fallback'},{source:'fallback'}]);
  }
});

test('missing or hostile manifest never selects an arbitrary host/path or invents a timestamp',async()=>{
  for(const change of [{manifestStatus:404},{manifest:{generation:'../../evil'}},{manifest:{source_revision:'unknown'}},{manifest:{files:{}}}]){
    const h=harness(change),response=await h.api.fetch('data/map/map-of-neta.json');
    assert.deepEqual(await response.json(),{source:'fallback'});
    assert.equal(h.calls.length,2);
    assert.equal(h.calls[1].url,'data/map/map-of-neta.json');
  }
  await assert.rejects(harness().api.fetch('../anything'),/Unknown observation/);
});

test('ranking initializes both address aliases and metadata together once',async()=>{
  const h=harness();
  const a=await h.api.rankingReady(),b=await h.api.rankingReady();
  assert.equal(a,b);
  assert.equal(a.juno1test,a.osmo1test);
  assert.equal(a.juno1test.total_neta,7);
  assert.equal(h.window.NETA_METADATA.generated_at,metadata.generated_at);
  assert.equal(h.calls.length,3);
});

test('prior dated static ranking survives an unavailable server manifest',async()=>{
  const prior={juno1old:{total_neta:2}};
  const h=harness({manifestStatus:404,window:{NETA_METADATA:{generated_at:'2026-10-01T00:00:00Z'},NETA_ADDRESS_INDEX:prior}});
  assert.equal(await h.api.rankingReady(),prior);
  assert.equal(h.window.NETA_METADATA.generated_at,'2026-10-01T00:00:00Z');
  assert.equal(h.calls.length,1);
});
