# Stock Incremental — Authoritative Handoff Package

This package contains the current authoritative artifacts for the next SPBT step.

## Authority map

1. `E0-X1_Market_Rules_v0.1.1.md`
   - Rules authority for the E0-X1 experiment.

2. `E0-X1_Core_Causal_Spine_Re-Audit_PASS.md`
   - Audit evidence establishing that the v0.1.1 causal spine is coherent enough for bounded implementation planning.

3. `E0-X1C_Experimental_Implementation_Plan.md`
   - Implementation-scope authority for the bounded E0-X1 experiment.

4. `CP0_Master_Execution_Prompt.md`
   - Execution prompt for CP0 — Authority and Experimental Baseline.

## Prime design goal

E0-X1 exists to discover whether understanding and acting on a fictional market is fun and engaging. Simulation correctness is necessary only insofar as it supports meaningful, readable, and satisfying player decisions. Do not optimize for mathematical sophistication, financial realism, or model elegance at the expense of play.

## Current boundary

Implementation beyond CP0 is not authorized until CP0 is verified and explicitly approved PASS / CLOSED.

## Current authorized checkpoint - 2026-10-03

The original handoff boundary above is historical. CP0, CP1 and CP2 are now
explicitly approved PASS / CLOSED. The frozen CP2 baseline is
`0b991db329afb1020073b597cad23180f3e6c986` on main in FoxyLight/stock-incremental.
CP3 - Information, Earnings, and Readability has human review PASS. Only its
integration and freeze are now authorized. See CP3_Report.md for reviewed evidence
and the accompanying CP3_Freeze_Record.md deliverable for final commit identity
and committed verification. CP4 remains NOT AUTHORIZED. Player-accessible Reset Experiment remains
required before CP4 experimental readiness. Frozen rules and plan are preserved.

## CP4 readiness authority - 2026-10-03

CP3 is explicitly approved PASS / CLOSED at
`cee27a04aa92ce893628e3295c1e4c3b2658994b` on main. Only CP4 readiness work
is authorized. See CP4_Report.md for the uncommitted reset implementation,
regression/readiness evidence and human approval boundary, and
E0-X1_Human_Observation_Protocol.md for the prepared observation protocol.
The reset requirement is implemented in this candidate; human acceptance is
pending. Human playtest interpretation and post-E0 expansion remain unauthorized.
Earlier authorization statements above are historical. Frozen rules remain unchanged.

## CP4 human readiness approval - 2026-10-04

The user accepted desktop-browser readiness, Reset Experiment and the lightweight
neutral observation protocol as human review PASS. Only CP4 integration/freeze is
authorized. See CP4_Report.md and the accompanying CP4_Freeze_Record.md deliverable
for accepted authority, frozen identity and committed verification. The approved
protocol is preserved unchanged. Mobile/device validation is outside this claim.
No fun/engagement conclusion follows. Human playtest interpretation and post-E0
expansion remain NOT AUTHORIZED pending explicit subsequent authority.
