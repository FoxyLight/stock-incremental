# CP4 - Experimental Readiness Audit

Project: Stock Incremental. Phase: SPBT EXPLORE. Experiment: E0-X1.
Candidate verification date: 2026-10-03. Human readiness approval: 2026-10-04.
Status: HUMAN READINESS REVIEW PASS; integration and freeze authorized.
Assessment: desktop-browser readiness accepted by the user, including the reset
control and lightweight observation protocol. No fun claim.

## Authority and implementation identity

Repository: FoxyLight/stock-incremental. Integration branch: main.
Root: C:\Users\jneal\Documents\Projects\stock-incremental.
Frozen CP3 starting baseline:
`cee27a04aa92ce893628e3295c1e4c3b2658994b`.
The user approved CP3 PASS / CLOSED and authorized only CP4 readiness work.
CP4 began at this exact commit with a clean working tree.
The CP4 candidate is intentionally uncommitted and is not a frozen baseline.

Rules authority remains E0-X1 Market Rules v0.1.1. Scope authority remains
E0-X1C and the recorded CP0 earnings-day clarification. The prime design goal
remains discovering whether understanding and acting on the market is engaging.

## Bounded implementation

Implemented only the tracked player-accessible Reset Experiment control.
It calls the unchanged resetSession core with the original seed. It restores
Day 1, $100 cash, zero holdings, original company fundamentals and prices,
information visibility, unresolved Lantern, initial economy and random state.
It also restores Northstar selection, quantity 1 and initial daily notices.
It clears the prior-day reference and displays explicit reset confirmation.
The button is disabled during the existing Advance Day action lock; the handler
also rejects a busy action or second click of a double-click.

The control is available during active play and after Day 12. Its note explains
that reset discards the session and repeats the same market sequence. The only
new styling is 12px top spacing using the existing dark secondary-button style.
All existing trading, simulation, information rendering and history behavior
remain unchanged. The tracked reset implementation requirement is now satisfied
in this candidate; final acceptance awaits CP4 human approval.

## Automated and fixed-seed evidence

`node --test` from the project root: exit 0; 41 passed, 0 failed, 0 skipped.
Existing tests are unchanged. Coverage includes full market/trading/presentation
regression, seeded reproduction, fresh/core reset equivalence and terminal state.
No duplicate tests, package, framework or test tooling was introduced.

An additional read-only comparison of recorded browser observations against the
unchanged core at seed 2026 passed for all 12 days: cash, holdings, every company
price and total portfolio value. Core reset after completion exactly matched
fresh initialization. Browser replay after reset matched all 12 market snapshots,
sparklines, indicators, published reports, Lantern outcome and daily notices,
despite a different portfolio. This verifies repeatability of the served candidate.

## Agent manual browser/readability evidence

Ran the desktop in-app browser at http://127.0.0.1:4173/. Checked:

- Opening values and hidden information categories.
- Five-share Northstar purchase blocked at the 80% cap; four shares accepted.
- Selling two shares updated cash/holdings immediately; Kestrel selection and
  purchase worked. A double-click advanced only from Day 1 to Day 2.
- Reset was disabled during advancement and active-session reset matched the
  fresh visible state, including selection, quantity, histories and hidden panels.
- A complete Day 1-12 run holding two Northstar shares: Day 2 descriptions,
  Day 3 Demand, Day 4 earnings, Day 5 Cost Pressure, Day 6 sensitivities,
  Day 7 strong Lantern reception, Day 8 earnings, no new categories Days 9-11,
  and final Day 12 earnings/results. Published comparisons stayed coherent.
- Final cash $60.00, invested $29.82, total/final value $89.82, net loss $10.18.
  Buy, Sell and Advance Day were disabled at completion.
- Completed-session reset matched fresh visible state; replay through all
  12 days reproduced the same market and ended with $100.00 for a cash-only run.
- All five company descriptions/sensitivity panels were inspected. No hidden
  coefficient or expected/reference valuation labels were displayed. Code review
  and existing tests confirm gated public presentation without recommendations.
- Final and reset screenshots show readable text, selection, sparklines,
  reports, feedback and the reset control in the preserved dark palette.
- No browser warning or error logs were captured.

These are agent operational checks, not independent human playtest evidence.
The user's CP3 full-session readability PASS remains accepted authority.
Human review of the new reset control remains pending. This readiness assessment
is limited to the inspected desktop browser; no mobile/device certification is claimed.

## Observation protocol

Prepared E0-X1_Human_Observation_Protocol.md from the plan's required observation
categories and all ten post-session questions. It records build identity, prior
exposure, neutral facilitation, prompts/assistance, first attempts versus same-seed
replays, and prototype barriers. No telemetry infrastructure is needed.
Readiness is separate from comprehension observations and fun/engagement findings.
Human playtest execution and interpretation have not begun.

## Scope protection and working tree

Frozen market.js, trading.js, information.js, all existing tests, rules and plan
are unchanged against the frozen CP3 commit. No market redesign, new companies,
variables, progression, automation, save/load, charts, advice, production
architecture, generalized framework or polish system was added.

Changes are confined to src/app.js, src/index.html, src/style.css, README.md,
docs/README.md, docs/CP3_Report.md, this report and the observation protocol.
Whitespace checks passed. No staging, commit, push or freeze has occurred.

## Decision and remaining boundary

No unresolved technical readiness blocker was found. CP4 is READY FOR HUMAN
APPROVAL, not PASS / CLOSED. Next Evidence Source: human review of the reset
control and the lightweight protocol/readiness evidence. After approval and any
separately authorized integration, a fair human playtest is the next experiment.
This audit does not establish that E0-X1 is fun. Do not begin playtest
interpretation or post-E0 expansion without separate authorization.

## Human readiness approval and integration/freeze authority - 2026-10-04

The user gave CP4 human readiness review PASS after manual review. They accepted
reset visibility and clarity, clean reset from active and completed sessions,
no stale portfolio/market/information/event/earnings/chart/result state, the dark
interface, prototype stability/comprehension and the lightweight neutral protocol.
They reported no known issue that would materially contaminate a negative playtest.
Desktop-browser readiness is accepted. Mobile/device validation is outside the
readiness claim and is not a blocker. This approval does not establish fun.

Only CP4 integration/freeze is authorized: commit the verified candidate without
behavior changes, push main, record its immutable SHA, verify all four main/HEAD
references, rerun all 41 tests at the commit and confirm a clean working tree.
The candidate/pending-review statements above are pre-integration history.
The tracked player-accessible reset requirement is accepted as implemented.

The exact post-commit identity and final verification are recorded in the separate
CP4_Freeze_Record.md deliverable, following the existing freeze-record convention.
The approved observation protocol is preserved byte-for-byte and frozen in the
same CP4 commit. Its prepared-candidate status text is historical; this approval
and the freeze record establish its accepted status without changing the protocol.

After successful checks, CP4 is ready to be marked PASS / CLOSED by the user.
No human playtest evidence is interpreted. Human playtest interpretation and
post-E0 expansion remain NOT AUTHORIZED. No post-E0 expansion work is present.
