# Stock Incremental

Phase: SPBT EXPLORE. Experiment: E0-X1. Current checkpoint: CP0.

This baseline contains no gameplay. CP1 is NOT AUTHORIZED.

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
The current user instruction authorizes CP0 only.

## Environment choice

Plain HTML and Node's built-in local HTTP server and test runner are sufficient
for project startup and an independent future simulation test entry point.
No framework, external packages, build pipeline, CI, or release workflow is needed.
