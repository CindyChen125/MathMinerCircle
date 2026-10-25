export function validDate(year, month, day) {
  if (![year, month, day].every(Number.isInteger) || year < 1 || year > 9999 || month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return day <= [31,leap?29:28,31,30,31,30,31,31,30,31,30,31][month-1];
}
export function formatBirthday(year,month,day,mode) {
  if (!validDate(year,month,day) || !['MMDD','YYYYMMDD'].includes(mode)) throw new Error('Enter a valid birthday.');
  return (mode==='YYYYMMDD'?String(year).padStart(4,'0'):'')+String(month).padStart(2,'0')+String(day).padStart(2,'0');
}
export function searchDigits(digits,sequence) {
  if (!/^\d+$/.test(sequence)) throw new Error('The search sequence must contain digits.');
  const index=digits.indexOf(sequence);
  if(index<0) return {position:null,before:'',match:'',after:'',nextDigit:null};
  return {position:index+1,before:digits.slice(Math.max(0,index-15),index),match:sequence,after:digits.slice(index+sequence.length,index+sequence.length+15),nextDigit:digits[index+sequence.length]??null};
}
export function category(position) { return position===null||position>500000?'far':position>100000?'middle':'near'; }
export function scorePrediction(position,prediction) { return category(position)===prediction?100:0; }
export async function validateDataset(text,manifest) {
  if(text.length!==1000000||!/^\d+$/.test(text)||!text.startsWith('14159265358979323846264338327950288419716939937510')) throw new Error('π data failed validation.');
  if(manifest.digits!==1000000) throw new Error('π data manifest is invalid.');
  const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));
  const hex=Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('');
  const expected='7806ee47461b49ef1f578e14461b2c83c09c6d7a9a914275da1d71e9cbbf7069';
  if(hex!==expected||manifest.sha256!==expected) throw new Error('π data integrity check failed.');
  return text;
}
