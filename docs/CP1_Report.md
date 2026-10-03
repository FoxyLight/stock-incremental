# CP1 - Market Simulation Core

Project: Stock Incremental. Phase: SPBT EXPLORE. Experiment: E0-X1.
Date: 2026-10-03. Checkpoint: CP1.
Status: HUMAN REVIEW PASS; CP1 integration and freeze explicitly authorized.
Final freeze evidence and readiness for PASS / CLOSED are recorded in the
accompanying CP1_Freeze_Record.md after committed-state verification.
CP2 remains NOT AUTHORIZED.

## Pre-integration authority and implementation identity

This section records the reviewed working state before integration. It is
preserved as history; the integration authority below supersedes pending-review
and pending-commit statements.

Repository root: C:\Users\jneal\Documents\Projects\stock-incremental.
Origin: https://github.com/FoxyLight/stock-incremental.git.
Integration and checked-out branch: main.
Approved immutable CP0 baseline / current HEAD:
`f0f1fecc4477e76225ab463a517945af9a60737c`.

The user explicitly approved CP0 PASS / CLOSED and authorized only CP1.
Rules: E0-X1 Market Rules v0.1.1. Planning: E0-X1C Experimental Implementation Plan.
The user resolved earnings-day ordering as recorded in the post-freeze appendix
to CP0_Report.md. No market-rule revision or calibration change was made.

CP1 is a local uncommitted change set based directly on the frozen CP0 commit.
No staging, commit, push, or later-checkpoint authorization is claimed.
Working tree: README.md and docs/CP0_Report.md modified; src/market.js,
test/market.test.js, and docs/CP1_Report.md new. No unrelated work was present.

Tested implementation file fingerprints (SHA-256, working-copy bytes):

- src/market.js: `3A799401E98D45C293562259ACB19F3DDBAFDAC1C5EB80047F4D42864D8C6404`
- test/market.test.js: `68CEF0C389BFE19A9B4E481FBEFD9E4084765EC02A254199E3E2137D912ED69C`

Runtime remains Node.js v24.19.0. No external dependencies, build system,
framework, or additional infrastructure was introduced.

## Implemented behavior

- Exact five company definitions and two sectors from the rule table.
- Day 1 initialization: $100 cash, zero holdings, original fundamentals, $20 prices.
- The two bounded economic variables and 60/20/20 daily transitions.
- Demand-to-revenue and cost-pressure-to-cost effects at 0.25 units per sensitivity.
- Northstar and Kestrel weak-demand effects halved; true Profit = Revenue - Costs.
- True and expected reference valuation with the $5 reference floor.
- Non-earnings days: 50% expectation recognition, 50% price convergence,
  then one of the five equally probable multiplicative noise values.
- Earnings Days 4, 8, 12: update true fundamentals, produce earnings records,
  move price 75% toward true Reference Price, and update reported fundamentals.
  No ordinary convergence, no noise, and no noise draws occur on earnings days.
- One Day 7 Lantern event, after ordinary pricing, with -1/0/+1 revenue effect.
- Internal schedule flags only; no player-facing reveal or earnings presentation.
- One price-history point per day, with no invented pre-session history.
- End after final Day 12 earnings; further advancement throws without mutation.
- One session-seeded random stream and exact same-seed replay/reset.
- Cash/holdings remain inert placeholders. Totals use current prices, without trades.

Public core entry points: `createSession(seed)`, `advanceDay(session)`,
`resetSession(session)`. Advance returns a fresh state without mutating its input.
Reset creates the same state and subsequent sequence as fresh initialization.

## Explicit implementation choices

These choices fill unspecified details and do not revise frozen market rules:

- Uniform selection from the seven allowed initial economy pairs.
- Equal probabilities for weak, neutral, and strong Lantern reception.
- Lantern's revenue effect is applied once and retained in revenue, not reapplied daily.
- Initial last-reported fundamentals equal original company fundamentals.
- Mulberry32 seeded random generator; seed is an unsigned 32-bit integer, default 1.
- Random draw order: one initial economy draw; then demand, costs, company noise in
  rule-table order on non-earnings days, then Lantern's draw on Day 7.
- An outward economic transition at a bound keeps the state at that bound.
- Day 1 contains original state, followed by 11 advances through Day 12.
- Day 7 event changes true/expected valuation after that day's price is resolved,
  consistent with the plan's event ordering. It affects subsequent pricing.
- No intermediate monetary rounding. The $5 floor applies to Reference Price,
  not to noisy Market Price. True Profit may remain negative.
- Business descriptions and qualitative presentation copy remain deferred.

## Verification evidence

`node --test`: exit 0, 25 tests passed, 0 failed, 0 skipped.
This includes the original 2 CP0 baseline checks and 23 market-core tests.

Coverage includes all 20 authoritative condition-matrix cells, transition and
probability interval boundaries, allowed initial pairs, traits, valuation floor,
expected pricing, multiplicative noise, exact earnings-only price adjustment,
absence of earnings-day noise draws, update/draw order, report changes, timeline,
single event, all three Lantern outcomes, same-seed replay independent of holdings,
reset from changed and completed state, and rejection after session completion.

Direct core smoke run, seed 2026: Day 12 reached, session_complete true,
earnings days [4,8,12], Lantern strong reception with +1 revenue effect,
zero holdings and total value $100. This was a programmatic run inspected by
the agent. It is not a human playtest or evidence of fun.

Source and diff review: no buy/sell operation, concentration-cap implementation,
market UI, charts, save/load, progression, or production infrastructure.
src/server.js, src/index.html, and the original baseline tests are unchanged.
The baseline launch page is intentionally still the CP0 page.

Market rules SHA-256 remains:
`E4C9C72F30696039855CCF53521248D528ABFA1BCFFBA0B539F96C2809DAEC25`.
Implementation plan SHA-256 remains:
`E512F1A91630EC79E35B8D2A11C67A7B821FC91BB9F014473D82E155889C6097`.
The user-requested clarification is appended to CP0 authority documentation.

## Pre-integration boundary and next evidence

No demonstrated CP1 correctness failure remains. The unspecified probability and
event-timing choices above should remain visible during checkpoint review.
Automated verification does not close the checkpoint or authorize CP2.
No player interaction, readable gameplay, or human fun/engagement was evaluated.

Next action: review the CP1 evidence and explicitly decide CP1 closure.
Commit/push and CP2 work require separate authorization. CP2 has not begun.
After CP2 is authorized, its next evidence is a playable trading loop with the
required trading checks. Human play evidence remains later in the experiment.

## Reproduce verification

```powershell
Set-Location 'C:\Users\jneal\Documents\Projects\stock-incremental'
node --test
git diff --check
git status --short
```

The commands verify the current local implementation. They do not refer to a new
CP1 commit. Run `node src/server.js` only to launch the unchanged baseline page.

## Integration authority - 2026-10-03

The user gave CP1 human review PASS and approved the implementation and verification
evidence as satisfying CP1 scope. All explicitly documented implementation choices
above were accepted for E0-X1 CP1. This approval does not authorize CP2.

The user authorized only committing the unchanged verified CP1 behavior, pushing
main to origin, recording the immutable CP1 SHA, verifying remote main equals that
SHA, rerunning verification from the committed state, confirming a clean tree,
and updating minimum SPBT authority/status documentation.

Current Next Evidence Source: exact committed baseline identity, local/remote main
agreement, committed-state `node --test` results, and clean working-tree evidence.
These final observed results and the exact frozen SHA are recorded in the separate
CP1_Freeze_Record.md deliverable after commit. This follows the CP0 convention and
avoids attempting to put a commit's own hash in its contents.

No behavior change is authorized during integration. The accepted source/test
SHA-256 fingerprints above identify the implementation being committed.
CP2 remains NOT AUTHORIZED. Stop after freeze verification and report whether
CP1 is ready to be marked PASS / CLOSED. No later work is authorized by a pass.
