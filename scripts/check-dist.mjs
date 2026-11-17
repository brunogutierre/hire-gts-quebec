#!/usr/bin/env node
// Checks the built site before it is published. The site is a GitHub Pages project site: the
// artifact is served at /hire-gts-quebec/ on an origin shared with the owner's personal site.
// - each language has its page, with the right lang, canonical URL and hreflang alternates;
// - /404.html exists (Pages serves it for any missing path under the project);
// - no file is a meta-refresh redirect stub (a known regression of i18n + prerendering);
// - every same-origin reference stays under the project path and resolves to a built file,
//   so nothing points at (or depends on) the personal site.
//
// Usage: node scripts/check-dist.mjs <site-dir>

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, posix, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ORIGIN = 'https://brunogutierre.github.io';
export const BASE_PATH = '/hire-gts-quebec/';

/** Folder of each language build (subPath in angular.json) and its lang. */
export const LOCALE_DIRS = { '': 'en', fr: 'fr-CA' };

/** Origin paths outside the project the page may link to: the owner's personal site. */
export const ALLOWED_OUTSIDE = ['/'];

const REFERENCE_TAG = /<(?:a|link|script|img|source)\b[^>]*>/gi;
const REFERENCE_ATTR = /\s(?:href|src)="([^"]*)"/gi;
const SRCSET_ATTR = /\ssrcset="([^"]*)"/gi;
const META_TAG = /<meta\b[^>]*>/gi;

const isFile = (file) => {
  try {
    return statSync(file).isFile();
  } catch {
    return false;
  }
};

function htmlFiles(dir, root = dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path, root);
    return entry.name.endsWith('.html') ? [relative(root, path).split(sep).join('/')] : [];
  });
}

/** Public URL of a language's page. */
export const pageUrl = (dir) => ORIGIN + BASE_PATH + (dir ? `${dir}/` : '');

/**
 * Classifies a reference found in a page: null when it is not on this origin (other sites,
 * mailto:, fragments), otherwise its path on the origin.
 * @param {string} reference value of href/src/content
 * @param {string} baseHref the page's <base href>
 */
export function originPath(reference, baseHref) {
  if (reference === '' || reference.startsWith('#') || /^(mailto|tel|data):/i.test(reference)) {
    return null;
  }
  const url = new URL(reference, ORIGIN + baseHref);
  return url.origin === ORIGIN ? decodeURIComponent(url.pathname) : null;
}

/** Built file served for a path under the project, if any. */
export function servedFile(siteDir, path) {
  const inside = path.slice(BASE_PATH.length);
  const file = join(siteDir, path.endsWith('/') ? `${inside}index.html` : inside);
  return isFile(file) ? file : undefined;
}

function references(html) {
  const found = [];
  for (const [tag] of html.matchAll(REFERENCE_TAG)) {
    for (const [, reference] of tag.matchAll(REFERENCE_ATTR)) found.push(reference);
    for (const [, set] of tag.matchAll(SRCSET_ATTR)) {
      found.push(...set.split(',').map((candidate) => candidate.trim().split(/\s+/)[0]));
    }
  }
  for (const [tag] of html.matchAll(META_TAG)) {
    const image = /\sproperty="og:(?:image|url)"/.test(tag) && /\scontent="([^"]*)"/.exec(tag);
    if (image) found.push(image[1]);
  }
  return found.filter(Boolean);
}

const links = (html, rel) =>
  [...html.matchAll(/<link\b[^>]*>/gi)]
    .map(([tag]) => tag)
    .filter((tag) => tag.includes(`rel="${rel}"`));

/** @returns {string[]} problems found; empty when the site is valid */
export function checkDist(siteDir) {
  const errors = [];
  if (!isFile(join(siteDir, '404.html'))) errors.push('missing 404.html at the site root');

  for (const [dir, lang] of Object.entries(LOCALE_DIRS)) {
    const file = posix.join(dir, 'index.html');
    if (!isFile(join(siteDir, file))) {
      errors.push(`missing ${file} (${lang})`);
      continue;
    }
    const html = readFileSync(join(siteDir, file), 'utf8');
    const htmlLang = /<html\b[^>]*\slang="([^"]*)"/i.exec(html)?.[1];
    if (htmlLang !== lang) errors.push(`${file}: lang is ${JSON.stringify(htmlLang)}, not ${lang}`);
    const canonical = links(html, 'canonical').map((tag) => /href="([^"]*)"/.exec(tag)?.[1]);
    if (canonical.length !== 1 || canonical[0] !== pageUrl(dir)) {
      errors.push(`${file}: canonical is ${JSON.stringify(canonical)}, not ${pageUrl(dir)}`);
    }
    const alternates = Object.fromEntries(
      links(html, 'alternate').map((tag) => [
        /hreflang="([^"]*)"/.exec(tag)?.[1],
        /href="([^"]*)"/.exec(tag)?.[1],
      ]),
    );
    const expected = {
      ...Object.fromEntries(Object.entries(LOCALE_DIRS).map(([d, l]) => [l, pageUrl(d)])),
      'x-default': pageUrl(''),
    };
    if (JSON.stringify(alternates) !== JSON.stringify(expected)) {
      errors.push(`${file}: hreflang alternates are ${JSON.stringify(alternates)}`);
    }
  }

  for (const file of htmlFiles(siteDir)) {
    const html = readFileSync(join(siteDir, file), 'utf8');
    if (/<meta\b[^>]*http-equiv="refresh"/i.test(html)) {
      errors.push(`${file}: meta refresh redirect stub`);
    }
    const baseHref =
      /<base\b[^>]*\shref="([^"]*)"/i.exec(html)?.[1] ?? BASE_PATH + posix.dirname(file) + '/';
    const outside = new Set();
    const missing = new Set();
    for (const reference of references(html)) {
      const path = originPath(reference, baseHref);
      if (path === null || ALLOWED_OUTSIDE.includes(path)) continue;
      if (!path.startsWith(BASE_PATH)) outside.add(path);
      else if (!servedFile(siteDir, path)) missing.add(path);
    }
    outside.forEach((path) =>
      errors.push(`${file}: ${path} leaves ${BASE_PATH} (the origin is shared)`),
    );
    missing.forEach((path) => errors.push(`${file}: broken reference ${path}`));
  }
  return errors;
}

function main(args) {
  const siteDir = args[0];
  if (!siteDir) {
    console.error('Usage: node scripts/check-dist.mjs <site-dir>');
    return 2;
  }
  const errors = checkDist(siteDir);
  if (errors.length > 0) {
    console.error(`dist check FAILED for ${siteDir} (${errors.length} problems):`);
    errors.forEach((error) => console.error(`  - ${error}`));
    return 1;
  }
  console.log(`dist check passed: ${htmlFiles(siteDir).length} HTML files in ${siteDir}`);
  return 0;
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  process.exitCode = main(process.argv.slice(2));
}
