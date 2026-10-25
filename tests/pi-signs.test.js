import test from 'node:test';
import assert from 'node:assert/strict';
import {PI_SIGNS,getPiSign} from '../js/pi-signs.js';
import {searchDigits} from '../js/search.js';

test('ten distinct fictional signs cover digits 0 through 9, each with a reading and lucky number',()=>{
  assert.equal(PI_SIGNS.length,10);
  assert.deepEqual(PI_SIGNS.map(sign=>sign.digit),Array.from({length:10},(_,i)=>String(i)));
  assert.equal(new Set(PI_SIGNS.map(sign=>sign.name)).size,10);
  for(const sign of PI_SIGNS){assert.ok(sign.description.length>50);assert.ok(sign.trait);assert.ok(Number.isInteger(sign.luckyNumber)&&sign.luckyNumber>0);}
});
test('the following digit, not a birthday digit or match position, selects each sign',()=>{
  for(let digit=0;digit<10;digit++){
    const result=searchDigits(`990208${digit}777`,'0208');
    assert.equal(getPiSign(result),PI_SIGNS[digit]);
  }
});
test('zero is a valid sign digit and the first birthday occurrence controls the reading',()=>{
  assert.equal(getPiSign(searchDigits('0208002089','0208')).digit,'0');
});
test('not found, a boundary match and unverified or malformed digits never invent a sign',()=>{
  assert.equal(getPiSign(searchDigits('12345','0208')),null);
  assert.equal(getPiSign(searchDigits('990208','0208')),null);
  for(const value of [null,{}, {position:null,nextDigit:'2'}, {position:0,nextDigit:'2'},{position:1,nextDigit:2},{position:1,nextDigit:''},{position:1,nextDigit:'22'},{position:1,nextDigit:'x'}])assert.equal(getPiSign(value),null);
});
test('the same verified match always yields the same immutable reading',()=>{
  const result=searchDigits('1415926535','1415');
  assert.equal(getPiSign(result),getPiSign(result));
  assert.ok(Object.isFrozen(PI_SIGNS));
  assert.ok(Object.isFrozen(getPiSign(result)));
});
