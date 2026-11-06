import {formatBirthday, searchDigits, scorePrediction} from './search.js';
import {loadDigits} from './data.js';
import {$, reduced, session, leaderboard} from './ui.js';

export function initSearch() {
  const form = $('scan-form');
  let digits = '', busy = false, frame = 0, finishScan = null;
  const draft = session.getDraft();
  for (const field of ['nickname', 'year', 'month', 'day']) $(field).value = draft[field];
  form.querySelector(`[name="mode"][value="${draft.mode}"]`).checked = true;
  if (draft.prediction) form.querySelector(`[name="prediction"][value="${draft.prediction}"]`).checked = true;

  function currentDraft() {
    const values = new FormData(form);
    return {nickname: $('nickname').value, year: $('year').value, month: $('month').value, day: $('day').value, mode: values.get('mode'), prediction: values.get('prediction') ?? ''};
  }
  function updatePreview() {
    const draft = currentDraft();
    $('mode-help').textContent = draft.mode === 'MMDD' ? '4 digits: month + day.' : '8 digits; less likely to be found.';
    try { $('sequence').textContent = formatBirthday(Number(draft.year), Number(draft.month), Number(draft.day), draft.mode); }
    catch { $('sequence').textContent = draft.mode === 'MMDD' ? '— — — —' : '— — — — — — — —'; }
    try { session.saveDraft(draft); } catch { /* A clear error appears before scanning if session storage is blocked. */ }
  }
  function setBusy(value) {
    busy = value;
    for (const control of form.elements) control.disabled = value;
    $('scan-button').disabled = value || !digits;
    $('entry-panel').hidden = value;
    $('terminal').classList.toggle('scanning', value);
    $('scan-state').hidden = !value;
    $('terminal-idle').hidden = value;
    $('scanner-hub').hidden = !value;
    $('terminal').classList.remove('scan-locked');
    document.querySelector('.workspace').classList.toggle('scan-workspace', value);
    document.querySelector('.journey-progress').children[0].toggleAttribute('aria-current', !value);
    document.querySelector('.journey-progress').children[1].toggleAttribute('aria-current', value);
    document.querySelector('.journey-progress').children[value ? 1 : 0].setAttribute('aria-current', 'step');
  }
  async function loadData() {
    $('data-status').textContent = 'LOADING VERIFIED π DATA…';
    $('scan-button').disabled = true;
    $('retry-data').hidden = true;
    try {
      digits = await loadDigits();
      $('data-status').textContent = '1,000,000 DIGITS · INTEGRITY VERIFIED';
      $('digit-stream').textContent = digits.slice(0,720);
      $('scan-button').disabled = busy;
      $('form-error').textContent = '';
    } catch {
      digits = '';
      $('data-status').textContent = 'π DATA UNAVAILABLE';
      $('form-error').textContent = 'We couldn’t load and verify the π data. Check your connection, then retry. Open this site through its local server or an HTTPS host.';
      $('retry-data').hidden = false;
    }
  }
  form.addEventListener('input', updatePreview);
  form.addEventListener('change', updatePreview);
  $('retry-data').onclick = loadData;
  $('skip-scan').onclick = () => finishScan?.();
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (busy || !digits) return;
    $('form-error').textContent = '';
    const draft = currentDraft();
    draft.nickname = draft.nickname.trim();
    if (!draft.nickname || draft.nickname.length > 24) {
      $('form-error').textContent = 'Enter a nickname of 1–24 characters.';
      $('nickname').focus();
      return;
    }
    let sequence;
    try { sequence = formatBirthday(Number(draft.year), Number(draft.month), Number(draft.day), draft.mode); }
    catch {
      $('form-error').textContent = 'Enter a real birthday, including a valid year, month, and day.';
      $('month').focus();
      return;
    }
    if (!draft.prediction) {
      $('form-error').textContent = 'Choose a prediction before starting your scan.';
      form.querySelector('[name="prediction"]').focus();
      return;
    }
    // Verify cross-page state can be kept before starting. Birthday data never enters the URL.
    try { session.saveDraft(draft); }
    catch {
      $('form-error').textContent = 'This browser is blocking session storage. Allow site storage to carry your discovery securely between pages, then try again.';
      return;
    }
    const result = searchDigits(digits, sequence);
    const discovery = {id: crypto.randomUUID(), timestamp: Date.now(), saved: false, draft};
    $('scanner-target').textContent = sequence;
    $('scanner-caption').textContent = 'Target sequence';
    $('scanner-phase').textContent = '01 / 03';
    // One fixed, verified passage: movement never swaps random chunks per frame.
    $('digit-stream').textContent = digits.slice(0,2400);
    setBusy(true);
    $('scan-label').textContent = 'INITIALIZING SEARCH…';
    $('scan-progress').style.transform = 'scaleX(0)';
    $('scan-label').tabIndex = -1;
    $('scan-label').focus({preventScroll: true});
    $('terminal').scrollIntoView({behavior: reduced.matches ? 'instant' : 'smooth', block: 'center'});
    const start = performance.now();
    let previousPhase = -1;
    let finished = false;
    finishScan = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      finishScan = null;
      try { session.saveDiscovery(discovery); }
      catch {
        setBusy(false);
        $('form-error').textContent = 'Your discovery could not be carried to the result page. Allow session storage, then try again.';
        $('scan-button').focus();
        return;
      }
      const entry = {id: discovery.id, timestamp: discovery.timestamp, nickname: draft.nickname, mode: draft.mode, prediction: draft.prediction, position: result.position, score: scorePrediction(result.position, draft.prediction)};
      try { leaderboard.saveEntry(entry); discovery.saved = true; session.saveDiscovery(discovery); } catch { /* Results still work if leaderboard storage is unavailable. */ }
      window.location.assign('./result.html');
    };
    function tick(now) {
      const elapsed = now-start, progress = Math.min(1,elapsed/4000);
      $('scan-progress').style.transform = `scaleX(${progress})`;
      const phase = progress < .22 ? 0 : progress < .78 ? 1 : 2;
      if (phase !== previousPhase) {
        previousPhase = phase;
        $('scan-label').textContent = ['INITIALIZING SEARCH…','EXPLORING π…',result.position === null ? 'SEARCH COMPLETE' : 'SEQUENCE LOCATED'][phase];
        $('scanner-phase').textContent = `${String(phase+1).padStart(2,'0')} / 03`;
        if (phase === 2) {
          $('terminal').classList.add('scan-locked');
          $('scanner-caption').textContent = result.position === null ? 'Not in this million' : `Position #${result.position.toLocaleString('en-US')}`;
        }
      }
      if (progress >= 1) finishScan();
      else frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  });
  window.addEventListener('pagehide', () => cancelAnimationFrame(frame));
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    finishScan = null;
    setBusy(false);
    $('digit-stream').style.transform = '';
    $('digit-stream').textContent = digits.slice(0,720);
  });
  updatePreview();
  loadData();
}
