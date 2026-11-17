import { LOCALES, Localized } from '../app/core/i18n/locale';
import { FAQ } from './faq';
import { HERO, WHY } from './intro';
import { MY_CASE } from './my-case';
import { ROLES } from './roles';
import { SHELL } from './site';
import { LAST_VERIFIED, SOURCES } from './sources';
import { STEPS } from './steps';

const CONTENT: Record<string, Localized<unknown>> = {
  SHELL,
  HERO,
  WHY,
  STEPS,
  ROLES,
  MY_CASE,
  FAQ,
  SOURCES,
};

/** Every string in a value, with its path. */
function strings(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => strings(item, `${path}.${key}`));
  }
  return [];
}

describe.each(Object.entries(CONTENT))('%s', (_, content) => {
  it('has no empty or padded strings in any language', () => {
    for (const locale of LOCALES) {
      for (const [path, text] of strings(content[locale])) {
        expect(text.trim(), `${locale}${path}`).toBe(text);
        expect(text, `${locale}${path}`).not.toBe('');
      }
    }
  });

  it('has the same shape in every language', () => {
    const shape = (locale: (typeof LOCALES)[number]) =>
      strings(content[locale]).map(([path]) => path);
    expect(shape('fr-CA')).toEqual(shape('en'));
  });
});

describe('French text', () => {
  it('uses a non-breaking space before colons, never a plain space', () => {
    for (const content of Object.values(CONTENT)) {
      for (const [path, text] of strings(content['fr-CA'])) {
        expect(text, path).not.toMatch(/ :/);
      }
    }
  });
});

describe('sources', () => {
  it('are https links with a publisher', () => {
    for (const locale of LOCALES) {
      for (const link of SOURCES[locale].links) {
        expect(new URL(link.href).protocol).toBe('https:');
        expect(['ESDC', 'EDSC', 'MIFI', 'IRCC']).toContain(link.publisher);
      }
    }
  });

  it('have a valid last-verified date', () => {
    expect(LAST_VERIFIED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(new Date(LAST_VERIFIED).toISOString().startsWith(LAST_VERIFIED)).toBe(true);
  });
});
