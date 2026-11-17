#!/usr/bin/env node
// Serves the built site the way GitHub Pages serves this project site, for the end-to-end tests:
// - the site is mounted at /hire-gts-quebec/; anything else on the origin is a plain 404;
// - a folder is served at its path with a trailing slash; without it, a 301 adds the slash;
// - a missing path under the project gets the project's 404.html with status 404.
//
// Usage: node scripts/serve-dist.mjs <site-dir> <port>

import { readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const MOUNT = '/hire-gts-quebec/';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

const stat = (path) => {
  try {
    return statSync(path);
  } catch {
    return undefined;
  }
};

export function serveSite(siteDir) {
  return createServer((request, response) => {
    const path = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    if (`${path}/` === MOUNT) {
      response.writeHead(301, { location: MOUNT }).end();
      return;
    }
    if (!path.startsWith(MOUNT)) {
      response.writeHead(404, { 'content-type': TYPES['.txt'] }).end('Not this site');
      return;
    }
    let file = join(siteDir, normalize(path.slice(MOUNT.length)));
    if (stat(file)?.isDirectory()) {
      if (!path.endsWith('/')) {
        response.writeHead(301, { location: `${path}/` }).end();
        return;
      }
      file = join(file, 'index.html');
    }
    if (!file.startsWith(siteDir) || !stat(file)?.isFile()) {
      response.writeHead(404, { 'content-type': TYPES['.html'] });
      response.end(readFileSync(join(siteDir, '404.html')));
      return;
    }
    response.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    response.end(readFileSync(file));
  });
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  const [siteDir, port] = process.argv.slice(2);
  if (!siteDir || !port) {
    console.error('Usage: node scripts/serve-dist.mjs <site-dir> <port>');
    process.exitCode = 2;
  } else {
    serveSite(resolve(siteDir)).listen(Number(port), '127.0.0.1', () => {
      console.log(`Serving ${siteDir} on http://127.0.0.1:${port}${MOUNT}`);
    });
  }
}
