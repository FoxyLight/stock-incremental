# E0-X1 v0.1.1 Core Causal Spine Re-Audit

## SPBT framing

Project: Stock Incremental  
Phase: EXPLORE  
Artifact under audit: E0-X1 Market Rules v0.1.1  
Audit type: Core Causal Spine Re-Audit  
Implementation: NOT AUTHORIZED pending audit result and human approval

## Frozen causal spine

economic variables → company-specific revenue/cost effects → profit → expected/reference valuation → price convergence + bounded noise

## Audit questions

1. Can players form a prediction from causes?
2. Can different companies be rationally preferred under different conditions?
3. Can reasonable players disagree without one simply being wrong?
4. Do fundamentals ultimately matter more than noise?
5. Can new evidence give the player a genuine reason to revise a previous decision?

## Representative condition matrix

| Company | Strong Demand + Low Costs | Strong Demand + High Costs | Weak Demand + Low Costs | Weak Demand + High Costs |
|---|---:|---:|---:|---:|
| Northstar | +1.00 | 0 | +0.25 | -0.75 |
| Hearthline | +1.25 | +0.75 | -0.75 | -1.25 |
| BrightFizz | +1.75 | -0.25 | +0.25 | -1.75 |
| Kestrel | +0.50 | 0 | +0.125 | -0.375 |
| Lantern | +1.50 | 0 | 0 | -1.50 |

## Question 1 — Prediction from causes

Result: PASS

The rules support useful directional predictions without exposing exact coefficients or future outcomes.

Examples:
- Strong Demand + Low Cost Pressure strongly favors BrightFizz.
- Strong Demand + High Cost Pressure favors Hearthline while BrightFizz can deteriorate.
- Weak Demand + Low Cost Pressure does not automatically make every company unattractive.

Exact future price remains uncertain because of:
- economy transitions
- hidden current Profit
- daily price noise
- unresolved Lantern event

## Question 2 — Conditional company preference

Result: PASS

Different economic states make different companies rationally attractive.

No company dominates every state.

Consumer Demand alone does not determine the answer.

Cost Pressure can materially reverse relative preference, especially for BrightFizz.

Kestrel is defensive without becoming universally best.

## Question 3 — Reasonable disagreement

Result: PASS

The corrected magnitudes support multiple defensible theses.

Examples:
- BrightFizz versus Hearthline under Strong Demand + Low Costs
- Kestrel versus cash under Weak Demand + High Costs
- Lantern versus Hearthline when Lantern's product event remains unresolved

The explicit Expected Reference Price rule also creates a distinction between:
- best company
- best investment at today's price

## Question 4 — Fundamentals versus noise

Result: PASS

Strong fundamental movements dominate bounded ±2% noise over the session.

Small fundamental edges can be temporarily obscured, which is desirable.

The previous negative-reference-price failure is removed through the $5 valuation floor.

The relationship among:
- 0.25 fundamental scaling
- 50% expectation recognition
- 50% daily convergence
- 75% earnings convergence
- ±2% noise

remains a candidate calibration rather than production balance, but no mathematical failure requiring another correction was demonstrated.

## Question 5 — Revision from new evidence

Result: PASS

The information schedule creates clear reasons to:
- sell
- reduce
- switch
- increase
- deliberately continue holding

Examples:
- BrightFizz becomes less attractive when High Cost Pressure is revealed.
- Lantern can become less attractive after Weak product reception.
- Kestrel's thesis can be reinforced by earnings and recurring-revenue information.
- changing macro conditions can turn a previously rational Hearthline position into one worth reconsidering.

## Cross-audit result

No new contradiction rose to the level of a rule failure.

Intentional tensions remain:
- legibility versus uncertainty
- fundamentals versus noise
- company quality versus investment price
- defensive stability versus upside

These are considered healthy enough to test.

## Remaining rule failures

None demonstrated by this re-audit.

The previously identified failures are resolved at the paper-rule level:
- excessive fundamental magnitude
- negative Reference Prices
- redundant Kestrel trait
- undefined Expected Reference Price

## What still requires human playtesting

Paper analysis cannot establish:
- whether players understand the causal relationships
- whether interpreting them is enjoyable
- whether information pacing works
- whether price noise feels fair
- whether earnings are satisfying
- whether players naturally revise positions
- whether the 12-day session feels right
- whether players want another session

## Final audit results

| Audit question | Result |
|---|---|
| Can players form a prediction from causes? | PASS |
| Can different companies be rationally preferred under different conditions? | PASS |
| Can reasonable players disagree without one simply being wrong? | PASS |
| Do fundamentals ultimately matter more than noise? | PASS |
| Can new evidence give the player a genuine reason to revise a previous decision? | PASS |

## Overall result

PASS — causal spine is coherent enough for bounded implementation planning.

No remaining rule failure requiring another correction pass was demonstrated.

This does not establish that the game is fun or production-balanced.

Human play remains the required evidence source for those questions.
