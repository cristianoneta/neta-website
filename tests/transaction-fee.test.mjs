import assert from 'node:assert/strict';
import test from 'node:test';
import {fixedFee} from '../src/transaction-fee.mjs';
test('approved gas estimate produces an exact explicit fee with one adjustment',()=>{
 assert.deepEqual(fixedFee(150000,1.4,'0.075ujuno',500000),{gas:'210000',amount:[{denom:'ujuno',amount:'15750'}]});
 assert.deepEqual(fixedFee(1,1.4,'0.025uosmo',900000),{gas:'2',amount:[{denom:'uosmo',amount:'1'}]});
});
test('invalid estimates, excessive gas and unsafe adjustment fail closed',()=>{
 for(const gas of [0,-1,1.2,NaN,Infinity,500001])assert.throws(()=>fixedFee(gas,1.4,'0.075ujuno',500000));
 for(const adjustment of [0,.9,3.1,NaN,Infinity])assert.throws(()=>fixedFee(100,adjustment,'0.075ujuno',500000));
 assert.throws(()=>fixedFee(100,1.4,'0ujuno',500000));
});
