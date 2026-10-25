// Each document loads only the behavior its page needs. Navigation uses native links.
const page = document.body.dataset.page;
if (page === 'search') {
  const {initSearch} = await import('./search-page.js');
  initSearch();
} else if (page === 'result') {
  const {initResult} = await import('./result-page.js');
  initResult();
} else if (page === 'leaderboard') {
  const {initLeaderboard} = await import('./leaderboard-page.js');
  initLeaderboard();
}
