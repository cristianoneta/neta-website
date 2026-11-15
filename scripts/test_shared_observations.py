"""Shared observations preserve exact chain identity, claim ownership and historical observation dates."""
import base64
from datetime import datetime, timezone
import json
from pathlib import Path
import unittest
from unittest.mock import patch

import update_neta_data as ranking
import update_wynd_recovery_market as market
import shared_observations as shared


class SharedTests(unittest.TestCase):
    def test_exact_stake_snapshot_queries_claims_only_at_same_height(self):
        now = datetime.now(timezone.utc)
        stamp = now.isoformat()
        addr = ranking.b32enc('juno',bytes(range(20)))
        value = dict(chain_id='juno-1',core=shared.CORE,voting_module=shared.VOTING,
                     staking_contract=ranking.DAO,token_contract=ranking.NETA,generated_at=stamp,height=77,
                     block_hash='A'*64,block_time=stamp,members_complete=True,members=[dict(address=addr,power_raw='14')], total_power_raw='14')
        def rest(bases,path,params=None,retries=3,height=None):
            if path.endswith('/blocks/77'):
                return {'block':{'header':dict(chain_id='juno-1',height='77',time=stamp)},'block_id':{'hash':'A'*64}},'lcd'
            self.assertEqual(height,77)
            self.assertTrue(path.endswith('/state'))
            prefix = bytes([0,6])+b'claims'
            self.assertEqual(base64.b64decode(params['pagination.key']),prefix)
            claims = [{'amount':'3','release_at':{'at_height':76}}, {'amount':'5','release_at':{'at_height':78}}]
            return {'models':[{'key':(prefix+addr.encode()).hex(),'value':base64.b64encode(json.dumps(claims).encode()).decode()}],
                    'pagination':{}},'lcd'
        with patch.object(shared,'fetch',return_value=value), patch.object(ranking,'req_json',side_effect=rest), patch.object(ranking,'smart_query',return_value=({'power':'14','height':77},'lcd')):
            state,(active,pending,mature,metadata)=ranking.stake_snapshot()
        self.assertEqual((state[0],active,pending,mature,metadata['active_stakes_source']), (77,{addr:14},{addr:5},{addr:3},'cosmoot'))
        with patch.dict(value,{'members':[value['members'][0]]*2}), self.assertRaises(ValueError):
            shared.stakes(value,ranking.NETA,ranking.DAO)
        with patch.dict(value,{'block_hash':'B'*64}),patch.object(ranking,'req_json',side_effect=rest),self.assertRaises(ValueError):
            ranking.juno_snapshot(observation=value)
        with patch.object(shared,'fetch',side_effect=OSError('offline')),patch.object(ranking,'juno_snapshot',return_value=state),patch.object(ranking,'scan_dao',return_value='local') as local:
            self.assertEqual(ranking.stake_snapshot(),(state,'local'))
            local.assert_called_once_with(state)

    def test_all_eight_pool_identities_and_original_observation_reach_market_output(self):
        registry = json.loads((Path(__file__).resolve().parents[1]/'data/recovery/wynd-pools.json').read_text())
        stamp = datetime.now(timezone.utc).isoformat()
        prices = {key.removeprefix('native:'):'1.00' for key in market.PRICE_ASSETS}
        pools = {}
        for p in registry['pools']:
            address = p['pair']['address']
            pools[address] = {'code_id':str(p['pair']['code_id']),
                'pair':{'contract_addr':address,'liquidity_token':p['lp_token']['address'],'staking_addr':p['stake']['address'],
                        'pair_type':{'xyk':{}},'fee_config':{'total_fee_bps':30},'asset_infos':[a['info'] for a in p['assets']]},
                'reserves':{'total_share':'100','assets':[{'info':a['info'],'amount':'1000000'} for a in p['assets']]}}
        feed=dict(schema_version=1,chain_id='juno-1',height=42,block_hash='A'*64,block_time=stamp,pools=pools,
                  prices_usd=prices,price_source='fixture',price_observed_at=stamp)
        with patch.object(shared,'fetch',return_value={'chain_id':'juno-1','height':42,'wynd_market':feed}),patch.object(market,'smart',side_effect=AssertionError('duplicate pool read')):
            result=market.shared_market(registry)
            self.assertEqual((result['updated_at'],result['height'],len(result['pools'])),(stamp,42,8))
            self.assertEqual({v['pool_value_usd'] for v in result['pools'].values()},{'2.000000'})
            first=next(iter(pools.values()))
            with patch.dict(first['pair'],{'liquidity_token':'other'}),self.assertRaises(ValueError):
                market.shared_market(registry)

if __name__ == '__main__':
    unittest.main()
