import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const page = readFileSync(new URL('./index.html', import.meta.url));

export function createBaselineServer() {
  return createServer((request, response) => {
    if (request.url !== '/') {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(page);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  createBaselineServer().listen(4173, '127.0.0.1', () => {
    console.log('Stock Incremental / E0-X1 / CP0: http://127.0.0.1:4173');
  });
}
