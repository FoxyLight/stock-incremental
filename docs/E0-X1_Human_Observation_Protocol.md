# E0-X1 lightweight human observation protocol

Status: PREPARED FOR CP4 HUMAN APPROVAL. No playtest has been conducted or interpreted.
Authority: E0-X1C implementation plan, Human observation protocol section.
Purpose: discover whether understanding and acting on the fictional market is
fun and engaging. Correctness and readability support a fair test; they are not
the experiment's outcome. No purchase strategy or return target is prescribed.

## Preparation

Use the approved desktop browser build. Record the eventual frozen implementation
SHA before testing; the current uncommitted CP4 candidate has no frozen SHA.
Record participant code, date, browser, prior prototype exposure and whether
the session is a first attempt or replay. Avoid collecting personal information.
Use brief local written notes. No telemetry, account, recording or analytics is required.

Run `node src/server.js` in the project root and open http://127.0.0.1:4173/.
Use Reset Experiment before each participant. Confirm Day 1, $100 cash,
zero holdings and five $20 prices. The browser uses seed 2026. Reset replays
the same market, so later attempts are learned replays, not independent scenarios.
Keep the seed consistent for initial comparisons. Do not disclose later events,
hidden coefficients, reference values or preferred companies to participants.

Suggested opening, read without extra strategy guidance:

> This is a fictional market experiment lasting 12 days. You start with $100.
> Use the information on screen to decide whether to buy, sell or hold cash,
> then advance the day. There is no required trading strategy. Tell me what you
> are thinking when you make a decision or notice something surprising.

## During one complete session

Let the participant choose their own pace, investments and whether to hold cash.
Observe through Day 12. Do not prompt them toward an earnings thesis, reveal,
company comparison or trade. If thinking aloud stops, a neutral prompt is:
"What are you considering right now?" Record any prompt or assistance.
If asked about controls, offer only the minimum mechanical help and record it.
Do not correct their market theory during the session. Permit stopping at any time.

Use one note sheet with these columns:

| Day / moment | Observed action or exact words | Apparent reasoning, clearly marked as inference | Prompt / assistance / friction |
| --- | --- | --- | --- |
| | | | |

Record the plan's required observations when they arise:

- First investment reasoning, or the reason for staying in cash.
- First explicit market hypothesis.
- First meaningful change of mind and its trigger.
- Information repeatedly checked or used in company comparisons.
- Confusion and interaction friction, including unnoticed reveals.
- Anticipation, curiosity, surprise and dead time.
- Portfolio revision and any emergent simple strategy.

Record both spontaneous behavior and stated explanations. Do not turn an
observer's interpretation into a participant quote. At Days 4, 7, 8 and 12,
note what the participant notices without drawing attention to those events.
Profit alone does not establish comprehension or engagement; losses do not
establish their absence.

If a crash, broken control, missing reveal or unreadable report prevents normal
play, record the day, symptom, assistance and whether the session could continue.
Treat that session as affected by a prototype barrier, not clean evidence about fun.
Preserve partial notes without forcing a completion. No live behavior changes
should be made between participants without separately recording a new build.

## Post-session questions

Ask after the final result, using the plan's wording:

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

Record answers without defending the design. For the last question, distinguish
a stated yes from a spontaneous replay request. Do not pressure a replay.
If a replay is separately permitted, reset to Day 1 and label it as a same-seed
replay with prior knowledge. Do not mix replay observations with first attempts.

## Evidence boundary

Collect observations about comprehension, thesis formation, company comparison,
information use, revision, anticipation, curiosity, surprise, friction and replay
desire. Keep observed facts, participant statements and hypotheses separate.
No result is available yet. CP4 approval is a readiness decision only.
Human playtest execution, interpretation and any post-E0 expansion remain subject
to separate user authorization. No automatic PASS threshold for fun is invented.
