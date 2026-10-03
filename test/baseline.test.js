import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createBaselineServer } from '../src/server.js';

test('baseline server loads and serves the identifiable project', async (context) => {
  const server = createBaselineServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  context.after(() => new Promise((resolve) => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(url);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  const body = await response.text();
  assert.match(body, /<title>Stock Incremental \/ E0-X1 \/ CP3<\/title>/);
  assert.match(body, /<script type="module" src="\/app.js"><\/script>/);
  for (const [path, type] of [['/app.js', 'text/javascript'], ['/market.js', 'text/javascript'],
    ['/trading.js', 'text/javascript'], ['/information.js', 'text/javascript'], ['/style.css', 'text/css']]) {
    const asset = await fetch(`${url}${path}`);
    assert.equal(asset.status, 200);
    assert.ok(asset.headers.get('content-type').startsWith(type));
    assert.ok((await asset.text()).length > 0);
  }
  const missing = await fetch(`${url}/missing`);
  assert.equal(missing.status, 404);
});

test('failed assertion produces a nonzero verification exit status', () => {
  const failure = spawnSync(process.execPath, ['--input-type=module', '-e',
    "import assert from 'node:assert/strict'; assert.equal(1, 2);"], { encoding: 'utf8' });
  assert.equal(failure.error, undefined);
  assert.equal(failure.status, 1);
  assert.match(failure.stderr, /AssertionError/);
});
