# CP0 - Authority and Experimental Baseline

Project: Stock Incremental. Phase: SPBT EXPLORE. Experiment: E0-X1.
Current checkpoint: CP0. Date: 2026-10-03.
Status: READY FOR HUMAN APPROVAL, subject to the final freeze record.
PASS / CLOSED requires explicit human approval. CP1 remains NOT AUTHORIZED.

## Repository authority and freeze

Local repository authority: C:\Users\jneal\Documents\Projects\stock-incremental.
Repository name: stock-incremental. Integration and checked-out branch: main.
No remote exists or is required for CP0. No repository or commits existed before CP0.
The existing five authority documents were the complete initial project contents.

The baseline commit includes all authority documents, this report, root README,
package.json, .gitignore, src/index.html, src/server.js, and test/baseline.test.js.
No dependencies are installed. No generated artifacts belong in the repository.

The exact immutable baseline SHA and final clean-tree result are recorded after
commit in the accompanying CP0_Freeze_Record.md deliverable. This avoids embedding
a commit's own hash inside its contents. That record is authoritative for baseline
identity. Verify it against `git rev-parse HEAD` and `git status --porcelain=v1`.
Local HEAD must equal that frozen main baseline before any later work starts.

## Environment and entry points

- Runtime: Node.js v24.19.0, C:\Program Files\nodejs\node.exe.
- Git: 2.55.0.windows.3, C:\Program Files\Git\cmd\git.exe.
- Engine/framework: none. Plain HTML and built-in Node HTTP/test modules.
- Project entry point: src/server.js; launch document: src/index.html.
- Run: `node src/server.js`; browser: http://127.0.0.1:4173.
- Test: `node --test`.
- Equivalent package commands: `npm.cmd start`, `npm.cmd test`.
- CP1 prerequisites: the recorded Node runtime and an approved frozen baseline.
- No package installation, build step, external dependency, CI, or release workflow.

This is the minimum environment that proves startup and gives future isolated
simulation code an automated verification entry point. It adds no gameplay model.

## Documentation authority

- Rules: E0-X1_Market_Rules_v0.1.1.md.
- Audit evidence: E0-X1_Core_Causal_Spine_Re-Audit_PASS.md.
- Planning authority: E0-X1C_Experimental_Implementation_Plan.md.
- CP0 execution authority: CP0_Master_Execution_Prompt.md.
- Supplied authority map and boundary: docs/README.md.

The current instruction to execute CP0 authorizes only this checkpoint. Earlier
NOT AUTHORIZED statements remain historical records. They do not authorize CP1.
Authority documents are preserved without rewriting. No baseline authority
conflict was found. The supplied causal-spine PASS is paper-rule audit evidence,
not implementation evidence or human evidence of fun.

Prime design goal: E0-X1 exists to discover whether understanding and acting on a
fictional market is fun and engaging. Simulation correctness is necessary only
insofar as it supports meaningful, readable, and satisfying player decisions.
Do not optimize for mathematical sophistication, financial realism, or model
elegance at the expense of play. CP0 does not test fun.

## Verification evidence

Before freeze, `node --test` returned exit 0: 2 passed, 0 failed, 0 skipped.
One check starts the actual baseline server on a temporary loopback port, confirms
HTTP 200, HTML content type, project identity, and HTTP 404 for an unknown route.
The second runs an intentionally failed assertion in a child process and confirms
exit 1 with AssertionError. It verifies failure reporting without changing files.
No market-rule tests were added.

`node src/server.js` launched on 127.0.0.1:4173. The agent inspected the rendered
page in the Codex browser: title Stock Incremental / E0-X1 / CP0, heading Stock
Incremental, E0-X1 identification, CP0 identification, and no gameplay controls.
This is agent browser inspection, not user acceptance or experiential validation.

Final post-commit tests, whitespace check, branch/SHA equality, clean working-tree
status, authority content hashes, and tracked-file inventory are recorded in the
freeze record. A failed final check invalidates readiness until corrected.

Whitespace deviation: the full staged whitespace check flags 16 existing Markdown
hard-break lines in the supplied authority documents. Those intentional spaces
are preserved. The scoped check of all newly authored files passes. This is a
document-format exception, not a failed runtime or verification entry point.

## Scope protection and implementation boundary

CP0 contains no gameplay implementation. Inspection of the complete source and
test files found only an HTTP launch page, a local server, and baseline checks.
There is no market simulation, company data, economic-variable logic, trading,
portfolio logic, earnings, seeded market randomness, player-facing market UI,
progression, or speculative future architecture. CP1 has not begun.

Excluded: permanent progression, prestige, automation, staff, save/load, offline
progression, additional markets, companies, sectors, or economic variables,
dividends, bonds, options, leverage, short selling, liquidity simulation, order
books, bid/ask mechanics, transaction fees, acquisitions, company control,
institutional management, long-term economic simulation, production architecture,
generalized reusable frameworks, final visual design, final artwork, extensive
animation, analytics infrastructure, release infrastructure, and a full tutorial.
Trading, earnings, events, reset/session mechanics, charts, and gameplay UI are
also deferred beyond CP0 to their specified checkpoints.

## Next evidence and approval boundary

Current Next Evidence Source: verified repository/project baseline evidence
showing a reproducible, clean, correctly scoped implementation starting point.
After explicit CP0 PASS / CLOSED approval: CP1 automated evidence that the approved
market simulation rules are implemented correctly. Human fun/engagement evidence
comes later, after experimental readiness.

No further implementation is currently authorized. The next eligible work is
CP1 - Market Simulation Core only, using the frozen baseline and rules v0.1.1.
Do not begin CP2. No unresolved baseline issue is known before final freeze checks.

Required human decision:

> Approve CP0 - Authority and Experimental Baseline as PASS / CLOSED. Authorize
> only CP1 - Market Simulation Core using the frozen CP0 baseline and E0-X1
> Market Rules v0.1.1. Do not begin CP2.

## Exact local verification commands

```powershell
Set-Location 'C:\Users\jneal\Documents\Projects\stock-incremental'
git branch --show-current
git rev-parse HEAD
git status --porcelain=v1
node --version
node --test
node src/server.js
```

Compare SHA to the freeze record. Status should be empty. Open
http://127.0.0.1:4173 and confirm the identified CP0 page and absence of gameplay.
Stop the server with Ctrl+C. These steps reproduce the agent's completed checks;
they are not additional technical gates required before requesting approval.
