# E0-X1C — Experimental Implementation Plan

## SPBT framing

Project: Stock Incremental  
Phase: EXPLORE  
Current step: E0-X1C — Experimental Implementation Plan  
Rules authority: E0-X1 Market Rules v0.1.1  
Causal-spine status: PASS  
Next meaningful evidence source: Human play  
Implementation status: NOT AUTHORIZED

## Prime design goal

E0-X1 exists to discover whether understanding and acting on a fictional market is fun and engaging. Simulation correctness is necessary only insofar as it supports meaningful, readable, and satisfying player decisions. Do not optimize for mathematical sophistication, financial realism, or model elegance at the expense of play.

## Purpose

Create the smallest implementation plan capable of building a fair test of whether understanding and acting on the fictional market is fun.

This is not the full incremental game.

## Implementation principles

- one primary screen where practical
- information should arrive visibly
- decisions should be quick to execute
- experiment rhythm: observe → consider → act → advance → react
- player should never see hidden coefficients or exact expected values
- simulation correctness should be independently verifiable
- no speculative infrastructure

## Minimal player experience

Opening:
- Day 1 of 12
- $100 cash
- five companies
- current price
- recent price movement
- sector
- upcoming Day 4 earnings

Early session:
- staged information reveals
- player begins forming causal hypotheses

First earnings:
- Revenue, Costs, and Profit provide resolution

Mid-session:
- Cost Pressure, sensitivities, and Lantern event create reasons to revise

Late session:
- no new information categories
- player acts using learned model

End:
- final earnings
- final portfolio result
- reflection

## Minimal screen/UI structure

One primary market screen with:
- day / cash / portfolio / total value / next earnings
- economy indicators
- five company rows/cards
- selected-company detail
- compact event/information area
- Buy / Sell / quantity controls
- Advance Day

## Company presentation

Day 1:
- name
- sector
- price
- recent movement
- holdings

Day 2:
- business description

Day 4:
- reported Revenue, Costs, Profit

Day 6:
- qualitative sensitivities

No hidden coefficients.

## Trading interaction

- select company
- whole-share quantity control
- Buy
- Sell
- immediate cash/holding updates
- no ordinary confirmation dialogs
- 80% concentration cap enforced with clear feedback

No:
- order types
- bid/ask
- pending orders
- market depth
- fees
- shorting
- leverage

## Exact Advance Day execution order

1. lock trading
2. increment day
3. transition economic variables
4. update true company fundamentals
5. calculate Expected Profit
6. calculate Expected Reference Price
7. ordinary price convergence
8. bounded price noise
9. scheduled information unlocks
10. Lantern event handling where scheduled
11. earnings handling where scheduled
12. update portfolio values
13. present results
14. return control

Day 12 transitions directly to session results after final earnings.

## Earnings presentation

Focused earnings panel showing:
- prior Revenue / new Revenue
- prior Costs / new Costs
- prior Profit / new Profit
- resulting price reaction

No explicit "correct/incorrect" judgment.

## Information reveals

Reveal:
- descriptions
- Consumer Demand
- first earnings
- Cost Pressure
- qualitative sensitivities
- Lantern product event
- later earnings

Reveal evidence, not optimal interpretations.

## Price history

Use compact sparklines.

No candlesticks, volume, moving averages, technical indicators, zoom, or drawing tools.

## Minimum simulation state

Session:
- current_day
- starting_cash
- cash
- holdings_by_company
- current_total_value
- random_seed
- session_complete

Company definition:
- id
- name
- sector
- description
- initial_revenue
- initial_costs
- initial_profit
- demand_sensitivity
- cost_sensitivity
- trait_type

Company runtime:
- current_revenue
- current_costs
- current_profit
- last_reported_revenue
- last_reported_costs
- last_reported_profit
- current_price
- reference_price
- expected_profit
- expected_reference_price
- price_history
- information_visibility
- shares_owned

Lantern:
- product_event_result
- product_event_resolved
- event effect state

Economy:
- consumer_demand
- cost_pressure

Information flags:
- descriptions_visible
- consumer_demand_visible
- earnings_visible
- cost_pressure_visible
- sensitivities_visible
- lantern_event_visible

## Determinism/randomness

Use one seeded pseudo-random source per session for:
- initial economy state
- daily economy transitions
- daily price noise
- Lantern event

Same seed should reproduce the same external market sequence.

## Reset

Reset restores:
- Day 1
- $100 cash
- zero holdings
- original fundamentals
- $20 prices
- starting information visibility
- starting economy
- Lantern unresolved
- session-complete false
- seed position as appropriate

## Automated verification

Market rules:
- Demand → Revenue
- Cost Pressure → Costs
- Northstar trait
- Kestrel trait
- Profit
- Lantern event
- valuation floor
- Expected Profit
- Expected Reference Price
- daily convergence
- allowed noise set
- earnings repricing

Timeline:
- correct day advancement
- earnings Days 4, 8, 12
- reveals on correct days
- Lantern Day 7
- session ends after Day 12

Trading:
- cash
- holdings
- valid buy/sell
- concentration cap
- portfolio value

Seed behavior:
- same seed reproduces same external sequence

Reset:
- reset matches fresh initialization for same seed

## Manual correctness verification

Confirm:
- all five companies readable
- company selection obvious
- buy/sell immediate
- cash and holdings update clearly
- concentration feedback understandable
- Advance Day cannot double-trigger
- daily movement visible
- reveals noticeable
- earnings readable
- Lantern event clearly associated
- Day 12 ends correctly
- reset works

## Experiential verification

Observe:
- comprehension
- thesis formation
- company comparison
- information use
- portfolio revision
- anticipation
- curiosity
- surprise
- interaction friction
- replay desire

## Session-end presentation

Show:
- Starting Value
- Final Portfolio Value
- Net Gain/Loss
- final holdings
- final prices

Avoid scoring/XP/ranks.

## Human observation protocol

Record:
- first investment reasoning
- first explicit market hypothesis
- first meaningful change of mind
- information repeatedly checked
- confusion
- anticipation
- surprises
- dead time
- emergent simple strategies

Post-session questions:
1. What were you trying to do with your portfolio?
2. What information mattered most?
3. Did you change your mind about a company?
4. Why?
5. Did you understand why a stock moved?
6. Did anything feel random or unfair?
7. What information did you ignore?
8. Was there a point where you did not know what to do?
9. What would you do differently next time?
10. Would you voluntarily play another session right now?

## Minimum visual/readability standard

The prototype should be deliberate and pleasant enough for a fair test:
- clear hierarchy
- readable typography
- consistent spacing
- obvious selection state
- visible price direction
- compact sparklines
- clear locked/unlocked information
- readable earnings
- restrained event reveals
- responsive controls
- no exposed debug values during normal play

Do not over-polish.

## Explicit non-goals

Excluded:
- permanent progression
- prestige
- automation
- staff
- save/load
- offline progression
- multiple markets
- extra companies
- extra sectors
- extra economic variables
- dividends
- bonds
- options
- leverage
- short selling
- liquidity simulation
- order books
- bid/ask mechanics
- transaction fees
- acquisitions
- company control
- institutional management
- long-term economy simulation
- production architecture
- generalized game framework
- final artwork
- full tutorial
- analytics infrastructure

## Checkpoint sequence

### CP0 — Authority and Experimental Baseline
Freeze exact rules authority, implementation boundary, repo baseline, and test/run entry points. No gameplay.

### CP1 — Market Simulation Core
Implement and verify economy state, company states, fundamental updates, pricing, seeded RNG, earnings, Lantern event, timeline, and reset.

### CP2 — Minimal Playable Trading Loop
Add primary market screen, company rows/cards, selected detail, cash/portfolio display, buy/sell, holdings, concentration cap, Advance Day, sparklines.

### CP3 — Information, Earnings, and Readability
Add staged reveals, economy indicators, qualitative sensitivities, earnings presentation, Lantern event presentation, readable feedback, final result panel.

### CP4 — Experimental Readiness Audit
No new gameplay. Run full regression, reset integrity, fixed-seed verification, manual 12-day run, readability review, observation-protocol preparation.

## Implementation-order risks

- do not judge fun from CP1 raw simulation
- UI must not duplicate or alter simulation logic
- stop polishing once prototype is clear and pleasant
- do not under-polish enough to poison the test
- do not let charts turn the experiment into technical-analysis gameplay
- do not make information reveals into recommendations
- do not expand technical scaffolding

## SPBT boundary

E0-X1C Experimental Implementation Plan is candidate complete and sufficiently bounded.

The next permitted step after human approval is CP0 — Authority and Experimental Baseline.

Implementation beyond CP0 remains NOT AUTHORIZED until CP0 is PASS / CLOSED.
