const KEY='pi-finder.leaderboard.v1';
function clean(e) {
  if(!e||typeof e.id!=='string'||typeof e.nickname!=='string'||!e.nickname.trim()||e.nickname.length>24||!['MMDD','YYYYMMDD'].includes(e.mode)||!['near','middle','far'].includes(e.prediction)||![0,100].includes(e.score)||!Number.isFinite(e.timestamp)||!(e.position===null||(Number.isInteger(e.position)&&e.position>=1&&e.position<=1000000))) return null;
  return {id:e.id,nickname:e.nickname.trim(),mode:e.mode,prediction:e.prediction,position:e.position,score:e.score,timestamp:e.timestamp};
}
export function createStorage(storage) {
  return {
    getEntries(mode) {
      let entries;
      try { entries=JSON.parse(storage.getItem(KEY)??'[]'); } catch { entries=[]; }
      if(!Array.isArray(entries)) entries=[];
      return entries.map(clean).filter(e=>e&&(!mode||e.mode===mode)).sort((a,b)=>b.score-a.score||a.timestamp-b.timestamp||a.id.localeCompare(b.id));
    },
    saveEntry(entry) {
      const value=clean(entry); if(!value) throw new Error('This leaderboard entry is invalid.');
      const all=this.getEntries(); all.push(value); storage.setItem(KEY,JSON.stringify(all)); return value;
    },
    clearEntries() { storage.removeItem(KEY); }
  };
}
