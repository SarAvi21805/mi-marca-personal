import test from 'node:test';
import assert from 'node:assert/strict';
import {readSetting,saveSetting,registerVisit} from '../src/components/experience-state.js';

test('preferencias toleran bloqueo y el contador no se duplica por montaje',async()=>{
 const originalFetch=globalThis.fetch;
 const memory=()=>{const values=new Map();return {getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};};
 globalThis.localStorage=memory();globalThis.sessionStorage=memory();
 try {
  assert.equal(readSetting('unknown','fallback'),'fallback');
  saveSetting('paused',true);assert.equal(readSetting('paused',false),true);
  saveSetting('welcome',true,true);assert.equal(readSetting('welcome',false,true),true);
  assert.equal(readSetting('welcome',false),false);
  globalThis.localStorage={getItem(){throw new Error('blocked')},setItem(){throw new Error('blocked')}};
  assert.equal(readSetting('paused',false),false);assert.doesNotThrow(()=>saveSetting('paused',true));
  assert.equal(await registerVisit(''),null);
  let calls=0;
  globalThis.fetch=async(_url,options)=>{calls++;assert.ok(JSON.parse(options.body).sessionId);return {ok:true,json:async()=>({visitNumber:17})};};
  assert.deepEqual(await Promise.all([registerVisit('http://test/api'),registerVisit('http://test/api')]),[17,17]);
  assert.equal(calls,1);
 }finally{globalThis.fetch=originalFetch;delete globalThis.localStorage;delete globalThis.sessionStorage;}
});
