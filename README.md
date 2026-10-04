# Stock Incremental

Phase: SPBT EXPLORE. Experiment: E0-X1. Current checkpoint: CP4.

CP0, CP1, CP2 and CP3 are PASS / CLOSED. CP4 experimental readiness adds the tracked Reset Experiment control and verifies the preserved experiment. CP4 human readiness review is PASS; integration and freeze are authorized. Human playtest interpretation and post-E0 expansion are not authorized.

## Run and verify

Prerequisite: Node.js 24.19.0. No external dependencies or install step.

From this directory in PowerShell:

```powershell
node src/server.js
```

Open http://127.0.0.1:4173. Stop with Ctrl+C.

```powershell
node --test
```

Equivalent package commands: `npm.cmd start` and `npm.cmd test`.

## Authority

See [authority map](docs/README.md) and [CP0 checkpoint](docs/CP0_Report.md).
The supplied authority documents are preserved as historical decisions.
The current user instruction authorizes CP4 integration and freeze only. See docs/CP0_Report.md for the earnings-day clarification, docs/CP1_Report.md and docs/CP2_Report.md for frozen authority, and docs/CP3_Report.md for current evidence and the human approval boundary. See docs/CP4_Report.md for readiness evidence and docs/E0-X1_Human_Observation_Protocol.md for the prepared protocol. Reset Experiment and the observation protocol have human readiness approval. The accompanying CP4_Freeze_Record.md deliverable records the frozen commit identity and verification.

## Environment choice

Plain HTML and Node's built-in local HTTP server and test runner are sufficient
for project startup and an independent future simulation test entry point.
No framework, external packages, build pipeline, CI, or release workflow is needed.
