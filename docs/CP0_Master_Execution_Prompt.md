# Stock Incremental — CP0 Master Execution Prompt

Using the current Stock Incremental SPBT EXPLORE state as authoritative, execute only:

## CP0 — Authority and Experimental Baseline

This is a bounded SPBT execution step.

Do not begin gameplay implementation.

Do not begin CP1.

Do not create or modify the market simulation.

Do not add UI, trading, earnings, events, progression, save systems, production architecture, or experimental gameplay.

## Prime design goal

Treat this as the highest-priority project principle:

> E0-X1 exists to discover whether understanding and acting on a fictional market is fun and engaging. Simulation correctness is necessary only insofar as it supports meaningful, readable, and satisfying player decisions. Do not optimize for mathematical sophistication, financial realism, or model elegance at the expense of play.

CP0 itself does not test fun.

Its purpose is to establish a clean, reproducible, tightly bounded implementation starting point so later playtest evidence can be trusted.

## Authoritative project state

Project phase:
SPBT EXPLORE

Current experiment:
E0-X1 — Five-Company Causal Market Experiment

Rules authority:
E0-X1 Market Rules v0.1.1

Planning authority:
E0-X1C — Experimental Implementation Plan

Causal-spine audit result:
PASS — causal spine is coherent enough for bounded implementation planning

Next meaningful evidence source:
Human play behavior after the prototype is experimentally ready.

## CP0 purpose

Establish the exact implementation baseline and project authority before any experiment code is written.

The core question for CP0 is:

> Do we know exactly what we are implementing, from what baseline, under what rules, with what exclusions, and how we will verify that starting point?

## CP0 required outcomes

By the end of CP0, establish and record:

1. exact repository authority
2. integration branch
3. exact baseline commit SHA
4. working-tree status
5. implementation environment
6. project/run entry point
7. test entry point
8. rules authority
9. implementation-plan authority
10. current SPBT checkpoint status
11. explicit non-goals
12. implementation boundary
13. next authorized work after CP0
14. verification evidence sufficient for human approval

Do not invent missing repository details.

If repository or environment information is not yet established, determine it directly from the actual project/repository state.

## Repository authority

Determine and report:
- repository name
- repository location / remote
- integration branch
- current checked-out branch
- HEAD commit SHA
- whether local HEAD matches intended integration baseline
- working-tree status
- whether untracked or modified files exist
- whether repository is clean enough to freeze

If no repository exists:
- establish the minimum repository required for E0-X1
- do not add gameplay implementation
- create only minimum baseline structure
- record resulting baseline commit

Do not create unnecessary CI, release workflows, branch structures, or generalized infrastructure.

## Documentation authority

Record:
- E0-X1 Market Rules v0.1.1
- E0-X1 Core Causal Spine Re-Audit — PASS
- E0-X1C Experimental Implementation Plan
- current Stock Incremental SPBT EXPLORE state
- prime fun-first design goal

Do not rewrite these documents except as necessary to record authority references.

## Implementation environment

Establish and record:
- engine/framework/runtime
- exact version if relevant
- executable/toolchain location if relevant
- project entry point
- command to launch/run
- command to run automated verification
- dependencies required before CP1

Prefer the simplest environment compatible with the experiment.

Do not introduce production infrastructure.

If technology has not been established, choose only the minimum necessary environment and explain why.

## Project baseline

Ensure project can reach a minimal baseline state containing only what is needed for:
- project validity
- startup/run behavior
- test entry point
- repository authority
- checkpoint documentation

A blank or near-blank project is acceptable.

No market gameplay should exist.

## Run entry point

Establish one clear command/action proving the project runs.

The baseline need only demonstrate that Stock Incremental experimental project launches successfully.

## Test entry point

Establish one minimal automated verification entry point capable of clear PASS/FAIL and a meaningful exit status where applicable.

Do not implement CP1 market-rule tests yet.

## Explicit non-goals

Out of scope:
- permanent progression
- prestige
- automation
- staff
- save/load
- offline progression
- additional markets
- additional companies
- additional sectors
- additional economic variables
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
- long-term economic simulation
- production architecture
- generalized reusable framework work
- final visual design
- final artwork
- extensive animation
- analytics infrastructure
- release infrastructure

Also explicitly state:

CP0 contains no gameplay implementation.

## Scope-protection check

Confirm CP0 has not introduced:
- market simulation logic
- company gameplay data beyond minimal placeholders
- economic-variable logic
- trading
- portfolio logic
- earnings
- seeded market randomness
- player-facing market UI
- progression systems
- speculative future architecture

If such work appears, remove/revert it unless strictly required for baseline validity.

## Verification

### Automated
At minimum verify:
- project structure valid
- project can load/run
- baseline test entry point executes
- baseline test passes
- failure path fails correctly where applicable

Do not add market-rule tests.

### Manual
Confirm:
- correct project launches
- no gameplay implementation present
- project clearly identifiable as Stock Incremental / E0-X1
- branch and SHA match recorded baseline
- working-tree state understood
- authority documents correctly referenced
- explicit non-goals recorded
- CP1 has not begun

## Baseline freeze

Once verification passes:
1. ensure intended baseline files are committed
2. ensure integration baseline is clean
3. capture exact immutable commit SHA
4. record SHA as authoritative starting baseline
5. record intentionally deferred/excluded items

Do not proceed to CP1.

## SPBT documentation

Update only minimum documentation needed to record CP0.

Capture:
- Project: Stock Incremental
- Phase: EXPLORE
- Current experiment: E0-X1
- Current checkpoint: CP0
- CP0 status
- authoritative baseline SHA
- integration branch
- implementation authority status
- Next Evidence Source

Record only actual decisions.

## Next Evidence Source

For CP0:
Verified repository/project baseline evidence showing that the implementation starting point is reproducible, clean, and correctly scoped.

After CP0 PASS/CLOSED:
CP1 automated evidence that the approved market simulation rules are implemented correctly.

Human fun/engagement evidence still comes later.

## CP0 PASS criteria

CP0 may pass only if:
- repository authority established
- integration branch established
- exact baseline SHA established
- working-tree state known and acceptable
- implementation environment established
- run entry point established and verified
- test entry point established and verified
- authoritative E0-X1 documents recorded
- explicit non-goals recorded
- no market gameplay implemented
- no production architecture added
- CP1 not begun
- baseline reproducible enough to begin bounded implementation
- human approval requested

## Failure / modify conditions

Do not mark PASS if:
- repository authority ambiguous
- baseline SHA unknown
- project does not run
- verification fails
- working-tree state unexplained
- authority documents conflict
- gameplay slipped into CP0
- scope expanded beyond E0-X1
- environment not reproducible

If one occurs:
- correct only the baseline problem
- reverify
- do not advance

## Required output

Provide:
1. CP0 SPBT framing
2. repository authority
3. integration branch
4. baseline commit SHA
5. working-tree status
6. implementation environment
7. run entry point
8. test entry point
9. authoritative documents
10. explicit non-goals
11. automated verification results
12. manual verification results
13. scope-protection audit
14. SPBT documentation updates
15. Next Evidence Source
16. CP0 status
17. unresolved baseline issue
18. exact human approval required

Also provide exact local commands for any manual verification required.

## Human approval boundary

Stop after CP0 verification.

Do not begin CP1.

If all CP0 criteria pass, end with:

CP0 — Authority and Experimental Baseline: READY FOR HUMAN APPROVAL

Then request:

> Approve CP0 — Authority and Experimental Baseline as PASS / CLOSED. Authorize only CP1 — Market Simulation Core using the frozen CP0 baseline and E0-X1 Market Rules v0.1.1. Do not begin CP2.

Until that approval is explicitly given:

CP1 remains NOT AUTHORIZED.

Do not proceed beyond CP0.
