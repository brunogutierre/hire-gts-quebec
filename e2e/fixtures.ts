import AxeBuilder from '@axe-core/playwright';
import { expect, test as base, type Page } from '@playwright/test';

export { expect };

interface Options {
  /** Console messages a test expects, such as the 404 of a missing page. */
  readonly expectedConsole: readonly RegExp[];
}

/**
 * Every test fails on console errors or warnings (Angular reports hydration mismatches as
 * warnings) and on uncaught exceptions in the page.
 */
export const test = base.extend<Options & { consoleProblems: string[] }>({
  expectedConsole: [[], { option: true }],
  consoleProblems: [
    async ({ page, expectedConsole }, use) => {
      const problems: string[] = [];
      page.on('console', (message) => {
        const text = `${message.type()}: ${message.text()}`;
        const expected = expectedConsole.some((pattern) => pattern.test(text));
        if (['error', 'warning'].includes(message.type()) && !expected) problems.push(text);
      });
      page.on('pageerror', (error) => problems.push(`uncaught: ${error.message}`));
      await use(problems);
      expect(problems, 'console errors and warnings').toEqual([]);
    },
    { auto: true },
  ],
});

/** axe violations of the page for WCAG 2.2 AA rules, one line each. */
export async function axeViolations(page: Page): Promise<string[]> {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  return violations.map(
    ({ id, nodes }) => `${id}: ${nodes.map((node) => node.target.join(' ')).join(' | ')}`,
  );
}

/** How far the page is wider than the window: 0 when nothing sticks out sideways. */
export function horizontalOverflow(page: Page): Promise<number> {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

/** The page in each language, as served under the project path. */
export const PAGES = [
  { path: '/hire-gts-quebec/', lang: 'en' },
  { path: '/hire-gts-quebec/fr/', lang: 'fr-CA' },
] as const;
