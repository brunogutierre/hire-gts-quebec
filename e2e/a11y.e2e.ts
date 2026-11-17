import { axeViolations, expect, horizontalOverflow, PAGES, test } from './fixtures';

const MISSING = '/hire-gts-quebec/no-such-page/';

// The page in both languages, plus the 404 page, in the light and the dark color scheme.
for (const path of [...PAGES.map((page) => page.path), MISSING]) {
  test.describe(path, () => {
    // the 404 page logs its own status; nothing else may fail to load
    if (path === MISSING) test.use({ expectedConsole: [/status of 404 \(Not Found\)/] });

    test('passes axe and fits the window, in both schemes', async ({ page }) => {
      for (const colorScheme of ['light', 'dark'] as const) {
        await page.emulateMedia({ colorScheme });
        await page.goto(path);
        expect(await axeViolations(page), `axe, ${colorScheme}`).toEqual([]);
        expect(await horizontalOverflow(page), `overflow, ${colorScheme}`).toBe(0);
      }
    });
  });
}
