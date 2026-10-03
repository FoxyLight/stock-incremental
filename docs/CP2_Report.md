# CP2 - Minimal Playable Trading Loop

Project: Stock Incremental. Phase: SPBT EXPLORE. Experiment: E0-X1.
Date: 2026-10-03. Status: HUMAN REVIEW PASS; integration and freeze authorized.
Final frozen identity, verification, and readiness for PASS / CLOSED are recorded
in the accompanying CP2_Freeze_Record.md after committed-baseline verification.
CP3 remains NOT AUTHORIZED.

## Reviewed implementation and starting point

The sections below preserve the pre-integration evidence. The human approval
and integration authority appended at the end supersede pending-review and
uncommitted-state statements after a successful freeze.

Repository: FoxyLight/stock-incremental.
Root: C:\Users\jneal\Documents\Projects\stock-incremental.
Integration and checked-out branch: main.
Approved frozen CP1 baseline / current HEAD:
`b4038e151f1407306448ac7d880fce0703eb0982`.

CP1 was explicitly approved PASS / CLOSED by the user. CP2 began at this exact
SHA with a clean working tree. Only CP2 implementation and verification were
authorized. Rules authority remains E0-X1 Market Rules v0.1.1. Planning authority
remains E0-X1C with the recorded earnings-day clarification. Neither document
was rewritten. The frozen CP1 market.js and market.test.js remain unchanged.

## Implemented scope

- One primary market screen, exactly five selectable companies and two sectors.
- Selected-company detail: current price, shares, position value, concentration.
- Cash, invested value, and total portfolio value.
- Immediate whole-share buy/sell at the unrounded live market price, with no fees.
- Holdings synchronized in the session and company state.
- No leverage or short selling; invalid quantities and unavailable trades blocked.
- 80% concentration cap on purchases with visible feedback.
- Advance Day calls the frozen CP1 function and updates all market/portfolio values.
- Action lock and suppression of a double-click's second click.
- Compact price-history sparklines and recent movement, without invented prehistory.
- Day 12 completion closes trading and advancement; no final earnings/result panel.
- A small allowlist of static assets serves the browser modules and stylesheet.

No framework or new package was introduced. Runtime remains Node.js v24.19.0.
The browser imports the approved simulation; it does not duplicate market logic.
The existing startup tests were adapted to verify the CP2 document and its actual
asset responses. The original failure-exit check and all CP1 tests were retained.

## Explicit bounded choices

- The browser uses fixed seed 2026 for repeatable sessions. Reload starts fresh.
  No seed controls, reset UI, or save/load system was added.
- Cap enforcement applies to the target company when buying. Passive market
  changes may move a position above 80%; selling remains allowed. No forced sales.
- Cash affordability uses full precision. Cap equality allows only machine
  precision, not cent-sized tolerance. Displayed amounts use cents, with an
  explicit explanation that trades use full price precision.
- Recent movement compares up to three advances. Day 1 history is blank rather
  than fabricated. Sparklines show the available history from Day 1.
- Company information is restricted to market prices, sectors, and holdings.
  Business descriptions, economy indicators, qualitative sensitivities, earnings
  panels, Lantern presentation, and the final result panel remain deferred.
- Trading is locked during the 400 ms advancement guard and after Day 12.

## Automated verification

`node --test`: exit 0, 33 passed, 0 failed, 0 skipped.
The suite contains the 25 retained CP1/baseline checks and 8 new trading checks.

New checks cover immediate buy/sell, exact 80% acceptance and above-cap rejection,
live multi-company valuation, sale after cap drift, invalid quantities and company,
unowned sales, precise affordability, fractional market prices without rounding,
live revalidation, value conservation, holdings synchronization, market-sequence
independence from trading, completion lock, and existing core reset integrity.

The 12-day trading test compares every day's economy, random state, Lantern state,
earnings records, and company market state with an untraded same-seed session.

## Agent browser verification

Inspected the actual served app in the Codex browser. Verified:

- Opening: Day 1, $100 cash, $0 invested, $100 total, five $20 companies.
- Quantity 5 on Northstar: Buy disabled, explicit 80% feedback.
- Quantity 4: Buy succeeded, $20 cash, 4 shares, $80 position, 80% concentration.
- Quantity 1 after that purchase: another Northstar purchase blocked by cap.
- Sold 1 Northstar share: $40 cash, 3 shares, $60 position, 60% concentration.
- Selected Kestrel, bought 1 share: $20 cash, $80 invested, $100 total.
- Quantity 1.5: both trade actions disabled with a whole-share explanation.
- Double-click Advance Day: moved from Day 1 to Day 2 only; action lock visible.
- Live Day 2 Kestrel price exceeded remaining cash; Buy disabled correctly.
- Continued through Days 4 and 8 to Day 12; all prices and histories updated.
- Day 12: $20 cash, $62.66 invested, $82.66 total for 3 Northstar and 1 Kestrel.
  Buy, Sell, quantity, and Advance Day were disabled. The session ended normally.
- Inspected a full-page screenshot: five companies, selection, values, controls,
  and terminal message are readable at the default desktop viewport.
- After the final double-click guard change, restarted the server and verified
  fresh Day 1 initialization and the one-day result of a double-click again.

These are agent browser checks. They do not establish human comprehension, fun,
engagement, screen-reader output, mobile/device usability, or CP4 readiness.
No mobile viewport or physical-device validation is claimed.

## Scope protection and documentation

No CP3 work was added: no staged information presentation, earnings panel,
Lantern event presentation, final result panel, or reveal polish. No progression,
automation, save/load, extra companies/sectors/variables, production architecture,
or generalized framework work exists in this change set.

The current root README records CP2 scope. CP1_Report.md receives a historical
closure appendix with the user's PASS / CLOSED decision and frozen SHA.
This report records CP2 evidence and the human-approval boundary.

Implementation is a local uncommitted change set on the frozen CP1 HEAD. No CP2
integration, push, freeze, or human closure is claimed. Source/tests for CP1 and
the market authority documents retain their previous byte fingerprints.

## Next decision

No demonstrated CP2 correctness failure remains. Human review/approval is pending.
Next Evidence Source: the verified CP2 trading loop and its browser evidence for
human review. CP3 requires separate explicit authorization.

Approve CP2 - Minimal Playable Trading Loop as satisfying its scope, or identify
required changes. Do not begin CP3. Integration/freeze may follow only when authorized.

## Local commands

```powershell
Set-Location 'C:\Users\jneal\Documents\Projects\stock-incremental'
node --test
node src/server.js
```

Open http://127.0.0.1:4173. Stop an existing preview with Ctrl+C before starting
another server on port 4173. Reload to begin the same-seed session from Day 1.

## Accepted human review and integration authority - 2026-10-03

The user gave CP2 human review PASS and explicitly approved the current
implementation and evidence as satisfying the approved CP2 scope.

Human review confirmed:

- Cash, invested value, total portfolio value, and holdings are understandable.
- Company selection and whole-share buy/sell interactions are clear.
- The 80% concentration-cap behavior and feedback are understandable.
- Advance Day is clear and reliable.
- The 12-day session can be completed without interaction dead ends.
- Minimal price history is readable enough for this experiment checkpoint.

The user authorized only CP2 integration and freeze: commit unchanged verified
behavior, push main, record the immutable SHA, verify HEAD/main/origin-main/live
remote-main equality, rerun the complete automated suite at the commit, confirm
a clean tree, and record minimum authority/status documentation. No gameplay
change or CP3 work is authorized during the freeze.

Current Next Evidence Source: frozen commit identity, remote main agreement,
committed-baseline verification, and clean-tree evidence. These post-commit
observations and the exact SHA are recorded in CP2_Freeze_Record.md separately,
following the CP0/CP1 convention without a self-referential commit hash.

## Tracked requirement before CP4 experimental readiness

Player-accessible Reset Experiment remains REQUIRED before CP4 experimental
readiness. Its absence does not block CP2, because it was outside the explicitly
authorized CP2 scope. The existing CP1 reset core is preserved. Future authorized
work must expose that core to the player and verify fresh-session equivalence
before CP4 readiness can pass. This is a tracked requirement, not authorization
to implement it during integration or to begin CP3.

Pending design preference: the user wants a darker theme. The approved CP2 theme
is preserved during freeze. The preference awaits separately authorized work.

After successful freeze checks, report whether CP2 is ready to be marked
PASS / CLOSED. CP3 remains NOT AUTHORIZED regardless of technical verification.

## Darker-theme replacement candidate - 2026-10-03

The user explicitly declined to accept the existing light-theme freeze
c22e0a5072ae9dec492a0d3101ec5154265f4540 as the final CP2 baseline.
It remains a historical immutable commit. Only a CSS-only darker theme was
authorized for human visual/readability review before a replacement freeze.

Current status: darker-theme candidate READY FOR HUMAN REVIEW, not approved.
Only src/style.css changes presentation: dark colors, contrast, selected-row
accent, native input color scheme, and explicit readable disabled-control colors.
Layout, interaction structure, JavaScript, trading, portfolio calculations,
simulation, company data, timeline, and price-history behavior are unchanged.
No CP3 work, new UI system, animation, or styling infrastructure was added.

Full automated verification after the CSS change: node --test, exit 0,
33 tests passed, 0 failed, 0 skipped. Existing tests were unchanged.
Agent browser inspection covered opening values, selected state, focused input,
disabled controls, cap warning, Day 2 movement/sparklines, and success feedback.
Calculated key text contrast ratios range from 6.25:1 to 13.31:1. These checks
are not human visual approval or a full accessibility certification.

Required project changes are confined to src/style.css and this documentation
appendix. No staging, commit, push, or replacement freeze is authorized until
the user approves the darker theme. CP3 remains NOT AUTHORIZED.
Player-accessible Reset Experiment remains REQUIRED before CP4 readiness;
the existing reset core is preserved.

Next Evidence Source: human visual/readability review of the darker CP2 candidate.

## Darker-theme human approval and replacement freeze authority - 2026-10-03

The user gave the darker-theme CP2 visual/readability review PASS and accepted
the CSS-only candidate as the final CP2 presentation baseline.

Human review confirmed comfortable readable body/secondary text, distinct company
rows, clear selection, understandable buttons/inputs/disabled states, readable
price movement and values, noticeable warnings/feedback, visible sparklines,
no unnecessary visual complexity, and comfort for a complete 12-day session.

Only replacement CP2 integration/freeze is authorized: commit the approved theme
and minimum documentation, push main, record the immutable replacement SHA,
verify HEAD/main/origin-main/live-remote-main agreement, rerun all 33 tests at the
commit, and confirm a clean tree. No additional presentation or behavior changes
are authorized. The prior light-theme freeze remains historical and is replaced
as the final CP2 presentation baseline only after these checks pass.

The exact post-commit SHA and final verification are recorded in the separate
CP2_Dark_Freeze_Record.md deliverable, following the established freeze-record
convention. Earlier candidate/pending-approval statements above are history.

Player-accessible Reset Experiment remains REQUIRED before CP4 experimental
readiness. The existing reset core is unchanged. CP3 remains NOT AUTHORIZED.
After freeze verification, report whether CP2 is ready to be marked PASS / CLOSED.

## CP2 closure and CP3 authorization - 2026-10-03

The user explicitly approved CP2 PASS / CLOSED with final frozen baseline
`0b991db329afb1020073b597cad23180f3e6c986` on main in FoxyLight/stock-incremental.
The approved darker theme is authoritative. The user accepted the frozen evidence:
33 tests passed, exit 0, clean tree, HEAD/main/origin-main/live-remote-main agreement,
unchanged approved behavior, no CP3 work and no unresolved freeze issue.
The prior light-theme freeze and earlier authorization statements above are history.

Only CP3 - Information, Earnings, and Readability is now authorized. CP3 began
from the exact frozen CP2 commit. See CP3_Report.md for the uncommitted candidate,
verification and human approval boundary. CP4 remains NOT AUTHORIZED.
Player-accessible Reset Experiment remains REQUIRED before CP4 readiness.
