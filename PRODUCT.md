# π Finder
<!-- impeccable:product-schema 1 -->
## Platform
web
## Stack
Static HTML5, CSS3, vanilla JavaScript, as requested. GitHub Pages compatible.
## Users
School mathematics club participants and organizers.
## Product Purpose
Find the first occurrence of a birthday in one million verified decimal digits of π and reward a prediction of its location.
## Capabilities and Constraints
Required nickname, real date, MMDD or YYYYMMDD sequence, three prediction ranges, four-second skippable scan, contextual results, local-only leaderboard. Never store full birthdays in leaderboard records. Birthday form drafts and the latest discovery may persist only in sessionStorage in the current tab, to support the multi-page flow; never in URLs. No backend. π Signs are fictional personality readings and lucky numbers mapped to the verified digit immediately following the first birthday match; no sign is invented when that digit is unavailable. Accessible, responsive, reduced-motion support.
## Brand Commitments
π FINDER — Find Yourself in Infinity. Dark navy, electric cyan, restrained purple, futuristic scientific exhibit, readable sans-serif and monospaced digits.
## Product Principles
Correctness before spectacle. Honest dataset limits. Private by default. Maintainable modules.
## Evidence on Hand
Full user brief. Dataset to be sourced and validated before delivery.

## Navigation
Four static documents: Home (`index.html`) invites entry; Search (`search.html`) collects coordinates and prediction, then plays the scan; Result (`result.html`) reveals the verified discovery; Leaderboard (`leaderboard.html`) is independently accessible. Native links and browser history work without server routing.

## π Signs
Ten authored signs cover decimal digits 0–9. Result offers a reveal action and an expandable catalog. Fictional interpretations are explicitly for fun, with no effect on prediction scores or leaderboard storage. The sign is recomputed from the verified dataset after refresh.
