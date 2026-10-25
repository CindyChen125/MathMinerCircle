# π FINDER — Find Yourself in Infinity

A static, responsive birthday discovery exhibit for Math Miner Circle. Four pages share vanilla HTML, CSS and JavaScript; no build step, account or backend.

## Run locally

With Python 3 installed, run from this folder:

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. Alternatively, `npm start` runs the same server. Do not double-click index.html: browser module and fetch restrictions require HTTP. A modern browser is required; HTTPS or localhost enables the Web Crypto integrity check. Google Fonts enhances typography when online, with local sans-serif/monospace fallbacks when offline.

## Tests

With Node.js 20 or newer (no npm install needed):

```sh
npm test
npm run verify-data
```

Tests also cover tab-session draft restoration, result refresh without duplicate records, absent/malformed state, invalid discovery dates, and stripping untrusted derived results. Core tests cover one-based indexing, first occurrences, leading zeros, both date formats, Gregorian leap years, each prediction boundary, bounded context, absent sequences, persistent and malformed storage, deterministic ranking, private field exclusion, storage errors, and real dataset integrity/tampering.

## Pages and navigation

- `index.html` — welcome page with an **Enter the explorer** button and a short introduction.
- `search.html` — nickname, birthday, mode and prediction in one form; scanning temporarily fills the workspace before navigating to the result.
- `result.html` — dedicated discovery report, real position/context, prediction points and onward links.
- `leaderboard.html` — independently accessible device-local rankings. A `mode` query parameter selects a leaderboard tab; no personal data enters URLs.

All navigation uses ordinary relative links and separate HTML documents. Browser Back/Forward, direct links and GitHub Pages subpaths work without redirects or a client router. Entered details are restored when returning to Search. Refreshing Result recomputes the discovery against verified π data and does **not** save another leaderboard entry. A result opened without a completed scan in the current tab offers a link to begin instead of inventing a result.

## How it works

1. Enter a nickname (1–24 nonblank characters) and valid Gregorian birthday.
2. Pick MMDD or YYYYMMDD; both preserve leading zeros.
3. Predict first 100,000, 100,001–500,000, or beyond 500,000 / not found.
4. Watch a four-second skippable discovery animation using actual π digits. Progress is explicitly a presentation effect, not a measurement of computation. Reduced-motion disables moving digits and reveal effects.
5. See the first occurrence, up to 15 neighboring digits on either side, and 100 points for a correct prediction (otherwise zero). Absent sequences have no fabricated position or context.
6. Compare device-local leaderboard entries, separated by search mode and ranked by points then submission time. Unique ID breaks exact timestamp ties. Organizer reset uses a confirmation dialog and clears both modes.

The search reads only decimal digits: the first digit after `3.` is position 1. The millionth position is included, but a match must fit completely in the file. No claim is made that all digit sequences occur somewhere in π; this remains unproven. Full-date sequences are much less likely to appear in this finite window. The result model exposes `nextDigit`, used by π Signs as described below.

## π Signs

After a successful match, Result offers **Reveal my π Sign**. The digit immediately **after the first complete birthday match** selects one of ten authored fictional personalities (0–9), each with traits, a short reading and a fixed lucky number. These interpretations are clearly labeled as just for fun, not scientific personality tests or predictions.

Example: `0208` first appears at position 6,140; its last digit is at 6,143 and the next digit, at 6,144, is `2`. This selects **The Connector**, with lucky number **23**. The sidebar explains the exact digit and position so the selection is reproducible.

There is no assigned sign for an absent sequence or a match ending at the millionth digit, because no verified following digit is available. A **Meet all 10 π Signs** disclosure still allows browsing the fictional catalog. Revealing or browsing signs does not change prediction points, add leaderboard records, or store extra personal data.

Definitions live in `js/pi-signs.js`; edit the names, descriptions and lucky numbers there. `js/pi-sign-view.js` renders the reveal and catalog. Tests cover all ten selectors, zero, deterministic first-match selection, absent sequences, boundary matches and malformed selectors.

## Dataset and reproducible integrity

Source: David G. Andersen’s [Pi Search digit dataset](https://www.angio.net/pi/digits.html), downloaded from:
https://www.angio.net/pi/digits/pi1000000.txt

Downloaded 20 October 2026. The source contains `3.` followed by 1,000,000 decimal digits. Only the leading `3.` and any whitespace are removed. `assets/pi-million.txt` is exactly 1,000,000 ASCII bytes, no newline, beginning:

```text
14159265358979323846264338327950288419716939937510
```

SHA-256 of the normalized local file:

```text
7806ee47461b49ef1f578e14461b2c83c09c6d7a9a914275da1d71e9cbbf7069
```

`assets/pi-manifest.json` records source, length, prefix and checksum. Both browser load and automated verification check length, digits-only format, known prefix, and the pinned checksum. A failure blocks scanning and offers retry. To reproduce, download the linked original, remove its initial `3.` and whitespace, and compare `shasum -a 256 assets/pi-million.txt` with the normalized download. Do not substitute generated or unverified data.

## Project structure

- `index.html`, `search.html`, `result.html`, `leaderboard.html` — separate semantic page documents.
- `style.css` — responsive cybertech visual system, focus and reduced-motion styles.
- `js/app.js` — small page-specific initializer.
- `js/search-page.js` — form validation, draft restore and scan animation.
- `js/result-page.js` — verified result recomputation and report rendering.
- `js/leaderboard-page.js` — ranking tabs and confirmed reset.
- `js/data.js` — shared verified dataset loader.
- `js/ui.js` — shared UI helpers and storage adapters.
- `js/session.js` — validated tab-session drafts and last discovery.
- `js/pi-signs.js`, `js/pi-sign-view.js` — fictional digit-to-sign definitions and the reveal/catalog UI.
- `js/search.js` — date validation, sequence formatting, search, scoring, integrity.
- `js/storage.js` — replaceable `saveEntry`, `getEntries`, `clearEntries` service.
- `assets/` — local π data and integrity manifest.
- `tests/core.test.js`, `tests/session.test.js`, `tests/pi-signs.test.js` — Node automated tests for search, scoring, privacy, storage and page state.
- `scripts/verify-data.js` — standalone dataset validation.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json` — product and design documentation. Local review captures are excluded by `.gitignore`.

## Storage and privacy

`localStorage` key: `pi-finder.leaderboard.v1`. Records contain only ID, nickname, mode, prediction category, position/null, score, and timestamp. Date components and search sequences are excluded by an explicit allowlist. Nicknames render as text, never HTML. Date inputs and the latest completed scan stay in `sessionStorage` for the current tab session, so they can move between documents and survive refresh. The separate keys are `pi-finder.draft.v1` and `pi-finder.discovery.v1`. They are not written to `localStorage` or URLs. The Result page derives positions from verified digits rather than trusting serialized positions or scores. If session storage is blocked, Search explains how to enable it before starting the scan. There is no application backend, analytics, or birthday transmission. Google Fonts makes ordinary external font requests; remove the CSS import to use only fallback fonts.

Local records are specific to this browser and origin. Anyone with access to the browser can clear or edit them; this is not authenticated organizer access or a tamper-resistant competition. If storage is blocked or full, results still work and a warning explains why the entry was not saved. Malformed records are ignored.

A future backend can replace `createStorage()` with an implementation exposing the same methods, while adapting callers to asynchronous operations if needed. No Supabase connection or credentials are configured.

## GitHub Pages deployment

This repository includes `.github/workflows/deploy-pages.yml`, which publishes through **GitHub Actions**.

1. Open the repository’s **Settings → Pages** and set **Source → GitHub Actions**. There is no branch/folder selection in this mode.
2. Commit and push the workflow to `main` (`git push`).
3. Open **Actions → Deploy website to GitHub Pages** and watch the run. If the workflow was already pushed before enabling Pages, use **Run workflow → main** to start it again.
4. After both jobs succeed, open the URL shown in the deployment environment. For this repository the expected URL is https://cindychen125.github.io/MathMinerCircle/.

Each future push to `main` redeploys automatically. The workflow runs the automated tests and dataset integrity check before uploading only the four HTML pages, stylesheet, JavaScript modules, and assets. Documentation, tests, Git history and local review files are excluded from the published website. No custom secrets, dependency installation or framework build are needed.

If GitHub requests deployment approval, review the pending **github-pages** environment in the Actions run. If setup reports that Pages is unavailable, check **Settings → Pages → Source → GitHub Actions**, then rerun the workflow.

All application asset paths are relative, so repository subpaths work. Other static hosts can publish the same HTML, CSS, `js/` and `assets/` files. Avoid renaming the data asset without updating its fetch path.

## Browser checks

Verify Home → Search → Result → Leaderboard navigation, browser Back/Forward, restored form inputs, result refresh without duplicate entries, direct result links without state, birthday validation, both modes, prediction requirement, four-second animation and skip, correct/incorrect predictions, absent sequences, retry on failed data loads, local persistence, mode tabs and reset cancellation. Check narrow/mobile widths, keyboard-only controls and reduced motion. Core mathematical/storage behavior is covered automatically; visual and browser-specific behavior needs browser QA.
