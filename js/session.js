import {formatBirthday} from './search.js';
const DRAFT_KEY = 'pi-finder.draft.v1';
const RESULT_KEY = 'pi-finder.discovery.v1';

// Only this tab's session holds birthday inputs. Nothing enters a URL or leaderboard record.
export function cleanDraft(value = {}) {
  if (!value || typeof value !== 'object') value = {};
  const short = (field, limit) => typeof value[field] === 'string' ? value[field].slice(0, limit) : '';
  return {
    nickname: short('nickname', 24),
    year: short('year', 12),
    month: short('month', 12),
    day: short('day', 12),
    mode: value.mode === 'YYYYMMDD' ? 'YYYYMMDD' : 'MMDD',
    prediction: ['near', 'middle', 'far'].includes(value.prediction) ? value.prediction : ''
  };
}

export function cleanDiscovery(value) {
  if (!value || typeof value.id !== 'string' || !value.id || !Number.isFinite(value.timestamp) || typeof value.saved !== 'boolean') return null;
  if (!value.draft || !['MMDD', 'YYYYMMDD'].includes(value.draft.mode)) return null;
  const draft = cleanDraft(value.draft);
  if (!draft.nickname.trim() || !draft.prediction) return null;
  try { formatBirthday(Number(draft.year), Number(draft.month), Number(draft.day), draft.mode); }
  catch { return null; }
  return {id: value.id, timestamp: value.timestamp, saved: value.saved, draft};
}

export function createSession(storage) {
  function read(key) {
    try { return JSON.parse(storage.getItem(key) ?? 'null'); }
    catch { return null; }
  }
  return {
    getDraft: () => cleanDraft(read(DRAFT_KEY)),
    saveDraft(value) { storage.setItem(DRAFT_KEY, JSON.stringify(cleanDraft(value))); },
    getDiscovery: () => cleanDiscovery(read(RESULT_KEY)),
    saveDiscovery(value) {
      const discovery = cleanDiscovery(value);
      if (!discovery) throw new Error('Invalid discovery.');
      storage.setItem(RESULT_KEY, JSON.stringify(discovery));
    }
  };
}
