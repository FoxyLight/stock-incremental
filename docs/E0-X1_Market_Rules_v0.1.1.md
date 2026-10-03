# E0-X1 Market Rules v0.1.1

## SPBT framing

Project: Stock Incremental  
Phase: EXPLORE  
Parent checkpoint: E0 — Core Market Interaction Discovery  
Current step: E0-X1B — Market Rules Correction  
Previous artifact: E0-X1 Market Rules v0.1  
Basis for revision: Core Causal Spine Audit v0.1  
Implementation: NOT AUTHORIZED

## Purpose of v0.1.1

Correct only the four demonstrated rule failures identified by the causal-spine audit:

1. fundamental changes were too large relative to starting Profit
2. the valuation formula could produce negative Reference Prices
3. Kestrel's distinctive trait was mechanically redundant
4. the between-earnings Expected Reference Price was incompletely defined

No other part of E0-X1 is redesigned.

## Unchanged experiment structure

The following remain unchanged from v0.1:

- exactly five companies
- exactly two sectors
- exactly two economic variables
- Consumer Demand states: Weak / Normal / Strong
- Cost Pressure states: Low / Normal / High
- 12 simulated trading days
- earnings on Days 4, 8, and 12
- staged information exposure
- buy / sell / hold / advance day
- whole shares
- 80% maximum concentration in one company
- no leverage
- no short selling
- no transaction fees
- $100 starting cash
- no starting holdings
- $20 starting share prices
- one Lantern Devices product event
- bounded ±2% daily market-price noise
- the causal structure: economic conditions → company performance → Profit → valuation → market price

The experiment's purpose remains: test whether understanding causal market relationships can produce meaningful investment decisions.

## Five companies

| Company | Sector | Starting Price | Revenue | Costs | Initial Profit | Demand Sensitivity | Cost Sensitivity |
|---|---|---:|---:|---:|---:|---:|---:|
| Northstar Foods | Consumer | $20 | 100 | 80 | 20 | 2 | 2 |
| Hearthline Retail | Consumer | $20 | 100 | 82 | 18 | 4 | 1 |
| BrightFizz Drinks | Consumer | $20 | 100 | 78 | 22 | 3 | 4 |
| Kestrel Systems | Technology | $20 | 100 | 76 | 24 | 1 | 1 |
| Lantern Devices | Technology | $20 | 100 | 79 | 21 | 3 | 3 |

Sensitivity values are internal experiment coefficients.

## Fundamental effect scaling

1 sensitivity point = 0.25 Revenue or Cost units per trading day.

Daily Revenue Change = Demand State × Demand Sensitivity × 0.25

Daily Cost Change = Cost Pressure State × Cost Sensitivity × 0.25

Demand states:
- Weak = -1
- Normal = 0
- Strong = +1

Cost Pressure states:
- Low = -1
- Normal = 0
- High = +1

Profit = Revenue - Costs

## Corrected condition matrix

Approximate deterministic daily Profit change:

| Company | Strong + Low | Strong + High | Weak + Low | Weak + High |
|---|---:|---:|---:|---:|
| Northstar | +1.00 | 0 | +0.25 | -0.75 |
| Hearthline | +1.25 | +0.75 | -0.75 | -1.25 |
| BrightFizz | +1.75 | -0.25 | +0.25 | -1.75 |
| Kestrel | +0.50 | 0 | +0.125 | -0.375 |
| Lantern | +1.50 | 0 | 0 | -1.50 |

## Company traits

### Northstar Foods — Defensive Demand
When Consumer Demand is Weak, Northstar suffers only half of its normal negative Demand effect.

### Hearthline Retail — High Demand Exposure
Its identity is expressed through its high Demand Sensitivity coefficient.

### BrightFizz Drinks — Input Exposure
Its identity is expressed through its high Cost Pressure sensitivity coefficient.

### Kestrel Systems — Recurring Revenue
When Consumer Demand is Weak, Kestrel suffers only half of its normal negative Demand effect.

### Lantern Devices — Product-Cycle Sensitivity
Lantern receives one scheduled company-specific product event during the session.

Event effect:
- Strong product reception: +1 Revenue
- Neutral product reception: 0
- Weak product reception: -1 Revenue

## Valuation floor

Valuation Profit = max(Current Profit, Initial Profit × 0.25)

Reference Price = $20 × Valuation Profit / Initial Profit

This produces a minimum Reference Price of $5.

## Between-earnings Expected Reference Price

Expected Profit = Last Reported Profit + 50% × (Current True Profit - Last Reported Profit)

Expected Valuation Profit = max(Expected Profit, Initial Profit × 0.25)

Expected Reference Price = $20 × Expected Valuation Profit / Initial Profit

At the end of each non-earnings trading day:

1. calculate Current True Profit
2. calculate Expected Profit
3. calculate Expected Reference Price
4. move Market Price 50% of the distance toward Expected Reference Price
5. apply bounded daily noise

Pre-noise Price = Current Market Price + 0.50 × (Expected Reference Price - Current Market Price)

Then apply one of:
- -2%
- -1%
- 0%
- +1%
- +2%

with equal probability.

## Earnings

Earnings occur on Days 4, 8, and 12.

Earnings reveal:
- Revenue
- Costs
- Profit
- change from previous reported state

At earnings:

Post-Earnings Price = Pre-Earnings Price + 0.75 × (Reference Price - Pre-Earnings Price)

Daily noise is not applied to this immediate earnings adjustment.

## Economic variables

### Consumer Demand
States:
- Weak = -1
- Normal = 0
- Strong = +1

Daily transition:
- 60% unchanged
- 20% one step upward
- 20% one step downward

Bounded at Weak and Strong.

### Cost Pressure
States:
- Low = -1
- Normal = 0
- High = +1

Daily transition:
- 60% unchanged
- 20% one step upward
- 20% one step downward

Bounded at Low and High.

## Information schedule

Opening:
- company names
- sectors
- prices
- recent three-day price movement
- starting cash
- earnings schedule

Day 2:
- company descriptions

Day 3:
- Consumer Demand

Day 4:
- first earnings

Day 5:
- Cost Pressure

Day 6:
- qualitative company sensitivities

Day 7:
- Lantern product event

Day 8:
- second earnings

Days 9–11:
- no new information categories

Day 12:
- final earnings and session resolution

## Player actions

Available:
- Buy
- Sell
- Hold
- Advance Day

Rules:
- whole shares only
- no leverage
- no short selling
- no transaction fees
- up to 80% of current portfolio value may be concentrated in one company
- cash may be held freely

## Starting state

Player:
- $100 cash
- no holdings

Companies:
- all begin at $20/share

Economy:
- Consumer Demand and Cost Pressure begin from the allowed state pool
- disallowed starting combinations:
  - Strong Demand + Low Cost Pressure
  - Weak Demand + High Cost Pressure

Those combinations may emerge later.

## Randomness boundaries

Deterministic:
- Demand affects Revenue
- Cost Pressure affects Costs
- traits modify effects consistently
- Profit = Revenue - Costs
- valuation follows defined formulas
- market recognizes 50% of hidden Profit movement between earnings
- earnings reveal true fundamentals
- earnings close 75% of the remaining valuation gap

Random:
- economy-state movement
- daily price noise
- Lantern product event

## SPBT status

E0-X1 Market Rules v0.1.1 is a candidate experiment specification that passed causal-spine re-audit.

Implementation remains NOT AUTHORIZED until the applicable implementation checkpoint is explicitly approved.
