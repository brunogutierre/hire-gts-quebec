import { DOCUMENT, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';

function apply(locale: string) {
  TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: locale }] });
  TestBed.inject(SeoService).apply();
  return TestBed.inject(DOCUMENT);
}

const attr = (document: Document, selector: string, name: string) =>
  [...document.head.querySelectorAll(selector)].map((element) => element.getAttribute(name));

describe('SeoService', () => {
  afterEach(() => {
    document.head
      .querySelectorAll('link[rel="canonical"], link[hreflang], meta[property], meta[name]')
      .forEach((element) => element.remove());
  });

  it('writes the English title, canonical URL and language alternates', () => {
    const document = apply('en');

    expect(document.title).toContain('Hire a closed-permit developer');
    expect(attr(document, 'link[rel="canonical"]', 'href')).toEqual([
      'https://brunogutierre.github.io/hire-gts-quebec/',
    ]);
    expect(attr(document, 'link[hreflang]', 'hreflang')).toEqual(['en', 'fr-CA', 'x-default']);
    expect(attr(document, 'link[hreflang="fr-CA"]', 'href')).toEqual([
      'https://brunogutierre.github.io/hire-gts-quebec/fr/',
    ]);
  });

  it('points the French page to its own URL, locale and preview image', () => {
    const document = apply('fr-CA');

    expect(attr(document, 'link[rel="canonical"]', 'href')).toEqual([
      'https://brunogutierre.github.io/hire-gts-quebec/fr/',
    ]);
    expect(attr(document, 'meta[property="og:locale"]', 'content')).toEqual(['fr_CA']);
    expect(attr(document, 'meta[property="og:locale:alternate"]', 'content')).toEqual(['en_CA']);
    expect(attr(document, 'meta[property="og:image"]', 'content')).toEqual([
      'https://brunogutierre.github.io/hire-gts-quebec/og/fr-CA.jpg',
    ]);
  });

  it('does not duplicate tags when applied twice', () => {
    apply('en');
    const document = TestBed.inject(DOCUMENT);
    TestBed.inject(SeoService).apply();

    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('link[hreflang]')).toHaveLength(3);
  });
});
