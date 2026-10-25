import {$, node, labels, leaderboard} from './ui.js';

export function initLeaderboard() {
  let mode = new URLSearchParams(location.search).get('mode') === 'YYYYMMDD' ? 'YYYYMMDD' : 'MMDD';
  function render() {
    for (const tab of document.querySelectorAll('[data-mode]')) {
      const selected = tab.dataset.mode === mode;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
    $('board-content').setAttribute('aria-labelledby', mode === 'MMDD' ? 'tab-mmdd' : 'tab-full');
    const entries = leaderboard.getEntries(mode);
    const tbody = $('board-rows');
    tbody.replaceChildren();
    $('board-empty').hidden = entries.length > 0;
    entries.forEach((entry,index) => {
      const row = node('tr', undefined, index < 3 ? `rank-${index+1}` : '');
      [String(index+1).padStart(2,'0'), entry.nickname, labels[entry.prediction], entry.position === null ? 'Not found' : `#${entry.position.toLocaleString('en-US')}`, `${entry.score} pts`].forEach(value => row.append(node('td', value)));
      tbody.append(row);
    });
  }
  function selectMode(value) {
    mode = value;
    // Only the nonpersonal search mode enters the URL, so tabs survive refresh/back.
    const url = new URL(location.href);
    url.searchParams.set('mode', mode);
    history.replaceState(null, '', url);
    render();
  }
  for (const tab of document.querySelectorAll('[data-mode]')) {
    tab.onclick = () => selectMode(tab.dataset.mode);
    tab.onkeydown = event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      selectMode(event.key === 'Home' ? 'MMDD' : event.key === 'End' ? 'YYYYMMDD' : mode === 'MMDD' ? 'YYYYMMDD' : 'MMDD');
      document.querySelector(`[data-mode="${mode}"]`).focus();
    };
  }
  $('clear-board').onclick = () => $('clear-dialog').showModal();
  $('cancel-clear').onclick = () => $('clear-dialog').close();
  $('confirm-clear').onclick = () => {
    try { leaderboard.clearEntries(); $('storage-message').textContent = 'All entries cleared from this device.'; }
    catch { $('storage-message').textContent = 'Could not clear entries. Check your browser storage permissions.'; }
    $('clear-dialog').close();
    render();
  };
  window.addEventListener('storage', render);
  render();
}
