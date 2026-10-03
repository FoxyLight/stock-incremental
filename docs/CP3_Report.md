# CP3 - Information, Earnings, and Readability

Project: Stock Incremental. Phase: SPBT EXPLORE. Experiment: E0-X1.
Date: 2026-10-03. Status: HUMAN REVIEW PASS; integration and freeze authorized.
CP4 remains NOT AUTHORIZED. Final frozen identity and committed verification are
recorded in the accompanying CP3_Freeze_Record.md deliverable after freeze checks.

## Authority and starting point

Repository: FoxyLight/stock-incremental.
Root: C:\Users\jneal\Documents\Projects\stock-incremental.
Integration and checked-out branch: main.
Frozen CP2 starting baseline: `0b991db329afb1020073b597cad23180f3e6c986`.
CP2 was explicitly approved PASS / CLOSED. CP3 began from this exact commit
with a clean tree. Only CP3 implementation and verification were authorized.

Rules authority remains E0-X1 Market Rules v0.1.1. Scope authority remains
E0-X1C with the CP0 earnings-day clarification. These authoritative documents
and the frozen CP1 simulation and CP2 trading source are unchanged.

## Implemented presentation

- Day 2: business descriptions in selected-company detail.
- Day 3: Consumer Demand with its Revenue relationship.
- Days 4, 8, 12: latest published earnings, prior/new Revenue, Costs and Profit,
  report-to-report changes, and immediate earnings price response for all five companies.
- Day 5: Cost Pressure and the Revenue/Costs/Profit relationship.
- Day 6: qualitative Demand and Cost exposure plus company traits.
- Day 7: Lantern reception and its one-time retained Revenue effect.
- Days 9-11: existing information persists; no new information category.
- Day 12: starting value, final portfolio value and net gain/loss, with final
  prices/holdings in the existing market table and the final earnings report.
- Daily notices identify new reveals, visible economy changes, actual price
  directions, earnings publication and completion. A link locates the latest report.

Business descriptions are authored presentation copy, not added company rules.
Sensitivity coefficients are displayed only as Low, Moderate, High or Very high
(the existing coefficients 1, 2, 3 and 4 respectively). Numeric coefficients,
current hidden fundamentals, exact Expected Profit and reference valuations
are not displayed. Report values persist until the next published report.
Display rounding does not alter simulation or trading precision.

The approved CP2 dark palette, controls and sparklines are retained. CSS additions
cover only new information panels, reports, hidden sections and narrow-screen
layout. No animation, framework, package or new styling infrastructure was added.

## Automated evidence

Command: `node --test` from the project root. Node.js v24.19.0.
Result: exit 0; 41 tests passed, 0 failed, 0 skipped.
All original 33 tests pass. Frozen market and trading regression tests are unchanged.
The baseline server test now checks CP3 identity and the new information asset.
Eight new tests cover staged visibility, public economy labels, qualitative copy,
published report identity and isolation, all three Lantern receptions, daily notices,
and final values with real holdings. The initial new copy test falsely matched
the word "sells"; its word-boundary check was corrected before the passing run.

## Agent browser evidence

Inspected the running candidate at http://127.0.0.1:4173 in the in-app browser.
Started on Day 1, bought two Northstar shares and one Kestrel share, and advanced
through Day 12. Observed the scheduled reveals, Day 4 report against starting
results, persistent reports, Day 6 Kestrel and BrightFizz sensitivities, Day 7
strong Lantern reception, Day 8 report against Day 4, and final Day 12 report
against Day 8. Days 9-11 added no categories.

Final displayed cash: $40.00. Invested value: $47.75. Total/final value: $87.75.
Starting value: $100.00. Net gain/loss: -$12.25. Buy, Sell, quantity and Advance
Day were disabled at completion. Full-page Day 4, Day 8 and Day 12 screenshots
were inspected for legible reports, selected state, price history and dark contrast.

This is agent verification, not human readability approval or evidence of fun.
No CP4 readiness audit or human playtest has occurred.

## Scope and working-tree evidence

Comparison with the frozen CP2 SHA confirms no changes to src/market.js,
src/trading.js, test/market.test.js, test/trading.test.js, market rules or plan.
The app's trading handlers, Advance Day guard/timer and price-history calculation
are unchanged. A previous-day reference supports presentation feedback only.
No additional market data, rules, gameplay, recommendations, progression,
automation, saving, extra markets or production architecture was introduced.

Changes are confined to src/app.js, src/index.html, src/style.css, src/server.js,
new src/information.js, test/baseline.test.js, new test/information.test.js,
README.md, docs/README.md, docs/CP2_Report.md and this report.
Whitespace checks passed. The tree is intentionally modified and uncommitted.
No staging, commit, push or freeze occurred.

## Remaining boundary

Player-accessible Reset Experiment remains REQUIRED before CP4 experimental
readiness. Its existing core and regression coverage are preserved; a reset UI
has not been implemented in this CP3 presentation candidate. Completing that
tracked requirement needs explicit bounded authorization before CP4 readiness.

Next Evidence Source: human review of staged information, causal readability,
earnings, Lantern feedback and final results across a complete 12-day session.
Review the local preview; browser reload currently restores the fixed-seed
Day 1 prototype. This is not a substitute for the tracked Reset Experiment control.
CP3 awaits human approval. CP4 remains NOT AUTHORIZED.

## Human approval and integration/freeze authority - 2026-10-03

The user manually reviewed the full 12-day CP3 session and gave human review PASS.
They accepted staged reveals, Demand and Cost Pressure, business descriptions,
qualitative sensitivities, Revenue/Costs/Profit reports and price responses,
Lantern association and feedback, daily notices, final results and dark readability.
The user confirmed sufficient causal information for reasoning and no major
comprehension barrier. This approval does not establish fun or engagement.

Only CP3 integration/freeze is now authorized: commit the verified change set
without behavior changes, push main to origin, record its immutable SHA, verify
HEAD/main/origin-main/live-remote-main agreement, rerun all 41 tests from the
commit, and confirm a clean working tree. The pre-integration candidate and
pending-human-review statements above are historical evidence.

The exact post-commit SHA and completed checks are recorded in the separate
CP3_Freeze_Record.md deliverable, following the existing freeze-record convention.
This avoids a second documentation commit changing the identity being frozen.
No simulation, trading, presentation or test behavior changes are authorized
while freezing the approved candidate. No CP4 work is authorized or begun.

Player-accessible Reset Experiment remains outstanding and REQUIRED before CP4
experimental readiness. The reset core and tests are preserved. After successful
freeze checks, report whether CP3 is ready to be marked PASS / CLOSED; closure
and any later work require the user's explicit next instruction.
