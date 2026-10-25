import {createStorage} from './storage.js';
import {createSession} from './session.js';
export const $ = id => document.getElementById(id);
export const labels = {near: 'First 100,000', middle: '100,001–500,000', far: 'Beyond 500,000 / not found'};
export const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const unavailable = {
  getItem() { return null; },
  setItem() { throw new Error('Browser storage unavailable.'); },
  removeItem() { throw new Error('Browser storage unavailable.'); }
};
function browserStorage(name) { try { return window[name]; } catch { return unavailable; } }
export const leaderboard = createStorage(browserStorage('localStorage'));
export const session = createSession(browserStorage('sessionStorage'));
export function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}
export function link(text, href, className = 'secondary-button') {
  const element = node('a', text, className);
  element.href = href;
  return element;
}
