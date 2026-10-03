import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/market.js', ['market.js', 'text/javascript; charset=utf-8']],
  ['/trading.js', ['trading.js', 'text/javascript; charset=utf-8']],
  ['/information.js', ['information.js', 'text/javascript; charset=utf-8']],
  ['/style.css', ['style.css', 'text/css; charset=utf-8']],
].map(([path, [file, type]]) => [path, { type, body: readFileSync(new URL(file, import.meta.url)) }]));

export function createBaselineServer() {
  return createServer((request, response) => {
    const asset = assets.get(request.url);
    if (!asset) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': asset.type });
    response.end(asset.body);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  createBaselineServer().listen(4173, '127.0.0.1', () => {
    console.log('Stock Incremental / E0-X1 / CP3: http://127.0.0.1:4173');
  });
}
