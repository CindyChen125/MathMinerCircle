import {renderPiSign} from './pi-sign-view.js?v=4';
import {formatBirthday, searchDigits, scorePrediction} from './search.js';
import {loadDigits} from './data.js';
import {$, node, link, labels, session} from './ui.js';

export function initResult() {
  const discovery = session.getDiscovery();
  const box = $('result');
  if (!discovery) {
    $('result-title').textContent = 'No result yet.';
    $('data-status').textContent = 'NO SCAN IN THIS TAB';
    document.querySelector('.journey-progress').hidden = true;
    box.replaceChildren(node('h2', 'Start a search.'), node('p', 'Enter a birthday and prediction first.', 'result-copy'), link('START A DISCOVERY', './search.html', 'primary-button'));
    return;
  }
  async function render() {
    $('data-status').textContent = 'VERIFYING π DATA…';
    $('retry-data').hidden = true;
    $('result-error').textContent = '';
    try {
      const digits = await loadDigits();
      const draft = discovery.draft;
      const sequence = formatBirthday(Number(draft.year), Number(draft.month), Number(draft.day), draft.mode);
      const result = searchDigits(digits, sequence);
      const score = scorePrediction(result.position, draft.prediction);
      renderPiSign($('pi-sign'), result);
      document.querySelector('.report-orbit').hidden = true;
      $('data-status').textContent = 'INTEGRITY VERIFIED';
      box.replaceChildren();
      // Recompute against verified data on every load; never trust a stored position.
      $('result-title').textContent = result.position === null ? 'Not found — yet!' : 'Birthday found!';

      const position = node('p', result.position === null ? '' : `#${result.position.toLocaleString('en-US')}`, 'position');
      if (result.position !== null) position.append(node('small', 'POSITION IN π'));
      box.append(position);
      box.append(node('p', result.position === null ? 'Not found in the first 1,000,000 digits of π.' : `Positions count from the first decimal digit.`, 'result-copy'));
      if (result.position !== null) {
        const context = node('div', undefined, 'digit-context');
        context.setAttribute('aria-label', `Digits before: ${result.before || 'none'}. Matching sequence: ${result.match}. Digits after: ${result.after || 'none'}.`);
        context.append(node('span', result.before), node('mark', result.match), node('span', result.after));
        box.append(node('p', 'Matching digits', 'context-label'), context);
      }
      const verdict = node('div', undefined, 'prediction-verdict');
      verdict.append(node('span', score ? 'Correct prediction' : 'Incorrect prediction'), node('strong', `+${score} POINTS`));
      box.append(verdict, node('p', `Your prediction: ${labels[draft.prediction]}.`, 'field-help'));
      const actions = node('div', undefined, 'result-actions');
      actions.append(link('TRY ANOTHER BIRTHDAY', './search.html', 'primary-button'), link('VIEW LEADERBOARD', `./leaderboard.html?mode=${draft.mode}`));
      box.append(actions, node('p', discovery.saved ? 'Saved on this device.' : 'Result not saved. Check browser storage permissions.', 'saved-note'));
      box.classList.add('revealed');
    } catch {
      $('pi-sign').hidden = true;
      document.querySelector('.report-orbit').hidden = false;
      $('data-status').textContent = 'π DATA UNAVAILABLE';
      box.replaceChildren(node('h2', 'We need the verified digits first.'), node('p', 'Your discovery is safe in this tab. We’ll display it after the dataset passes its integrity check.', 'result-copy'));
      $('result-error').textContent = 'We couldn’t load and verify the π data. Check your connection, then retry.';
      $('retry-data').hidden = false;
    }
  }
  $('retry-data').onclick = render;
  render();
}
