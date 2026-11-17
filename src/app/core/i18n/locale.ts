import { inject, InjectionToken, LOCALE_ID } from '@angular/core';

/**
 * Languages the site is published in. Each one is a separate build (`@angular/localize`), and the
 * first one is the source locale, served at the site root.
 */
export const LOCALES = ['en', 'fr-CA'] as const;
export type Locale = (typeof LOCALES)[number];

/** One value per language: forgetting a translation is a compile error. */
export type Localized<T> = Readonly<Record<Locale, T>>;

export const SOURCE_LOCALE: Locale = 'en';

/**
 * Public address of the site. It is a GitHub Pages project site, so it shares the origin with
 * the owner's personal site and must never use a path outside this prefix.
 */
export const SITE_URL = 'https://brunogutierre.github.io/hire-gts-quebec/';

export interface LocaleInfo {
  /** Path of the locale build under the site URL; matches its `subPath` in angular.json. */
  readonly path: string;
  /** Name of the language in that language, for the language switcher. */
  readonly name: string;
  readonly short: string;
  /** Open Graph locale (`language_TERRITORY`). */
  readonly og: string;
}

export const LOCALE_INFO: Localized<LocaleInfo> = {
  en: { path: '', name: 'English', short: 'EN', og: 'en_CA' },
  'fr-CA': { path: 'fr/', name: 'Français', short: 'FR', og: 'fr_CA' },
};

const language = (tag: string) => tag.toLowerCase().split('-')[0];

/**
 * Matches a BCP 47 tag (`LOCALE_ID`) to a site locale: exact tag first, then the same language
 * (`fr-FR` → `fr-CA`, `en-US` → `en`). Falls back to the source locale.
 */
export function toLocale(tag: string): Locale {
  return (
    LOCALES.find((locale) => locale.toLowerCase() === tag.toLowerCase()) ??
    LOCALES.find((locale) => language(locale) === language(tag)) ??
    SOURCE_LOCALE
  );
}

/** Absolute URL of the page in a locale, with the trailing slash GitHub Pages redirects to. */
export function localeUrl(locale: Locale): string {
  return SITE_URL + LOCALE_INFO[locale].path;
}

/** Locale of the running build; every locale build has its own `LOCALE_ID`. */
export const CURRENT_LOCALE = new InjectionToken<Locale>('CURRENT_LOCALE', {
  providedIn: 'root',
  factory: () => toLocale(inject(LOCALE_ID)),
});
