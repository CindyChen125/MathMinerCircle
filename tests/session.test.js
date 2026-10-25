import test from 'node:test';
import assert from 'node:assert/strict';
import {createSession, cleanDiscovery} from '../js/session.js';
function memory() {
  const values = new Map();
  return {getItem: key => values.get(key) ?? null, setItem: (key,value) => values.set(key,value), removeItem: key => values.delete(key)};
}
const draft = {nickname:'Explorer',year:'2013',month:'2',day:'8',mode:'MMDD',prediction:'near'};
const discovery = {id:'scan-1',timestamp:123,saved:true,draft};
test('form drafts survive page navigation, including incomplete date inputs', () => {
  const storage = memory();
  createSession(storage).saveDraft({...draft,day:'',prediction:''});
  assert.deepEqual(createSession(storage).getDraft(), {...draft,day:'',prediction:''});
});
test('result survives refresh without writing another leaderboard record', () => {
  const storage = memory(), session = createSession(storage);
  session.saveDiscovery(discovery);
  assert.deepEqual(createSession(storage).getDiscovery(), discovery);
  assert.deepEqual(session.getDiscovery(), discovery);
  assert.equal(storage.getItem('pi-finder.leaderboard.v1'),null);
});
test('absent, blocked and malformed tab state has no fabricated discovery', () => {
  const storage = memory(), session = createSession(storage);
  assert.equal(session.getDiscovery(),null);
  for (const value of ['{invalid','null','{}','[]','false']) {
    storage.setItem('pi-finder.discovery.v1',value);
    assert.equal(session.getDiscovery(),null);
  }
  assert.equal(createSession({getItem(){throw Error('blocked')}}).getDiscovery(),null);
});
test('invalid dates and corrupt metadata are rejected before rendering a result', () => {
  for (const change of [{day:'30',month:'2'},{year:'10000'},{year:'0'},{mode:'other'},{prediction:''},{nickname:' '}]) {
    assert.equal(cleanDiscovery({...discovery,draft:{...draft,...change}}),null);
  }
  assert.equal(cleanDiscovery({...discovery,saved:'yes'}),null);
  assert.equal(cleanDiscovery({...discovery,timestamp:NaN}),null);
});
test('tab state strips untrusted derived positions and extra fields; write failures surface', () => {
  const storage=memory(),session=createSession(storage);
  session.saveDiscovery({...discovery,position:42,score:999,match:'fake',draft:{...draft,unexpected:'ignored'}});
  assert.deepEqual(session.getDiscovery(),discovery);
  const unavailable=createSession({setItem(){throw Error('blocked')}});
  assert.throws(()=>unavailable.saveDraft(draft),/blocked/);
  assert.throws(()=>unavailable.saveDiscovery(discovery),/blocked/);
});
