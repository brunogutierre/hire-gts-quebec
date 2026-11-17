import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CURRENT_LOCALE, localeUrl, toLocale } from './locale';

describe('toLocale', () => {
  it('matches exact tags case-insensitively', () => {
    expect(toLocale('fr-CA')).toBe('fr-CA');
    expect(toLocale('fr-ca')).toBe('fr-CA');
    expect(toLocale('en')).toBe('en');
  });

  it('falls back to the same language, then to the source locale', () => {
    expect(toLocale('fr')).toBe('fr-CA');
    expect(toLocale('fr-FR')).toBe('fr-CA');
    expect(toLocale('en-US')).toBe('en');
    expect(toLocale('pt-BR')).toBe('en');
  });
});

describe('localeUrl', () => {
  it('keeps every locale under the project path', () => {
    expect(localeUrl('en')).toBe('https://brunogutierre.github.io/hire-gts-quebec/');
    expect(localeUrl('fr-CA')).toBe('https://brunogutierre.github.io/hire-gts-quebec/fr/');
  });
});

describe('CURRENT_LOCALE', () => {
  it('derives the site locale from LOCALE_ID', () => {
    TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: 'fr-CA' }] });
    expect(TestBed.inject(CURRENT_LOCALE)).toBe('fr-CA');
  });

  it('maps the default en-US LOCALE_ID to en', () => {
    expect(TestBed.inject(CURRENT_LOCALE)).toBe('en');
  });
});
