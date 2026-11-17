import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, describe, it } from 'node:test';
import { checkDist, originPath } from './check-dist.mjs';

const dirs = [];
after(() => dirs.forEach((dir) => rmSync(dir, { recursive: true, force: true })));

const head = (lang, dir) => {
  const url = (d) => `https://brunogutierre.github.io/hire-gts-quebec/${d ? `${d}/` : ''}`;
  return `<html lang="${lang}"><head><base href="/hire-gts-quebec/${dir ? `${dir}/` : ''}">
<link rel="canonical" href="${url(dir)}">
<link rel="alternate" hreflang="en" href="${url('')}">
<link rel="alternate" hreflang="fr-CA" href="${url('fr')}">
<link rel="alternate" hreflang="x-default" href="${url('')}">
<link rel="stylesheet" href="styles.css"></head>`;
};

/** A valid site, with optional extra files or overrides: { 'path': 'content' | null }. */
function site(files = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'check-dist-'));
  dirs.push(dir);
  const all = {
    '404.html': '<html lang="en"></html>',
    'index.html':
      head('en', '') +
      '<a href="/hire-gts-quebec/fr/">FR</a><a href="#steps">s</a>' +
      '<a href="https://brunogutierre.github.io/">personal site</a>',
    'styles.css': '',
    'fr/index.html': head('fr-CA', 'fr') + '<a href="mailto:x@example.com">x</a>',
    'fr/styles.css': '',
    ...files,
  };
  for (const [path, content] of Object.entries(all)) {
    if (content === null) continue;
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), content);
  }
  return dir;
}

describe('checkDist', () => {
  it('passes a valid site', () => {
    assert.deepEqual(checkDist(site()), []);
  });

  it('reports a missing language page and 404 page, and the links to them', () => {
    const errors = checkDist(site({ 'fr/index.html': null, '404.html': null }));
    assert.deepEqual(errors, [
      'missing 404.html at the site root',
      'missing fr/index.html (fr-CA)',
      // the English page links to the French one, as a language link and an alternate
      'index.html: broken reference /hire-gts-quebec/fr/',
    ]);
  });

  it('reports a wrong lang and canonical URL', () => {
    const errors = checkDist(site({ 'fr/index.html': head('en', '') }));
    assert.ok(errors.some((error) => error.includes('lang is "en"')));
    assert.ok(errors.some((error) => error.includes('canonical')));
  });

  it('reports references that leave the project path', () => {
    const errors = checkDist(site({ 'extra.html': '<img src="/fonts/inter.woff2">' }));
    assert.deepEqual(errors, [
      'extra.html: /fonts/inter.woff2 leaves /hire-gts-quebec/ (the origin is shared)',
    ]);
  });

  it('reports broken references, srcset candidates included', () => {
    const errors = checkDist(
      site({
        'extra.html': '<img srcset="/hire-gts-quebec/a.webp 1x, /hire-gts-quebec/b.webp 2x">',
      }),
    );
    assert.equal(errors.length, 2);
  });

  it('reports meta refresh stubs', () => {
    const errors = checkDist(site({ 'old.html': '<meta http-equiv="refresh" content="0">' }));
    assert.deepEqual(errors, ['old.html: meta refresh redirect stub']);
  });
});

describe('originPath', () => {
  it('ignores other origins, fragments and mail links', () => {
    assert.equal(originPath('https://www.canada.ca/en.html', '/hire-gts-quebec/'), null);
    assert.equal(originPath('#faq', '/hire-gts-quebec/'), null);
    assert.equal(originPath('mailto:a@b.c', '/hire-gts-quebec/'), null);
  });

  it('resolves relative references against the base href', () => {
    assert.equal(
      originPath('favicon.svg', '/hire-gts-quebec/fr/'),
      '/hire-gts-quebec/fr/favicon.svg',
    );
    assert.equal(originPath('https://brunogutierre.github.io/', '/x/'), '/');
  });
});
