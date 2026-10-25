import {readFile} from 'node:fs/promises';
import {validateDataset} from '../js/search.js';
const digits=await readFile(new URL('../assets/pi-million.txt',import.meta.url),'utf8');
const manifest=JSON.parse(await readFile(new URL('../assets/pi-manifest.json',import.meta.url),'utf8'));
await validateDataset(digits,manifest);
console.log(`Verified ${digits.length.toLocaleString('en-US')} decimal digits; prefix and SHA-256 match.`);
