import { expect, PAGES, test } from './fixtures';

test('each language loads and hydrates without errors', { tag: '@smoke' }, async ({ page }) => {
  for (const { path, lang } of PAGES) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('region')).toHaveCount(6);
  }
});

test('the section links scroll to their section', { tag: '@smoke' }, async ({ page }) => {
  await page.goto('/hire-gts-quebec/');
  await page
    .getByRole('navigation', { name: 'Sections' })
    .getByRole('link', { name: 'FAQ' })
    .click();

  await expect(page).toHaveURL('/hire-gts-quebec/#faq');
  await expect(page.getByRole('heading', { name: 'Frequently asked questions' })).toBeInViewport();
});

test('the language links switch between the two builds', { tag: '@smoke' }, async ({ page }) => {
  await page.goto('/hire-gts-quebec/');
  await page
    .getByRole('navigation', { name: 'Languages' })
    .getByRole('link', { name: /Français/ })
    .click();

  await expect(page).toHaveURL('/hire-gts-quebec/fr/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-CA');
  await page
    .getByRole('navigation', { name: 'Langues' })
    .getByRole('link', { name: /English/ })
    .click();
  await expect(page).toHaveURL('/hire-gts-quebec/');
});

test('a FAQ answer opens with the keyboard', async ({ page }) => {
  await page.goto('/hire-gts-quebec/');
  const question = page.locator('#faq summary').first();
  const answer = page.locator('#faq details').first().locator('p');

  await expect(answer).toBeHidden();
  await question.focus();
  await page.keyboard.press('Enter');
  await expect(answer).toBeVisible();
});

test('the skip link moves focus to the content', async ({ page }) => {
  await page.goto('/hire-gts-quebec/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('every asset loads from under the project path', async ({ page }) => {
  const outside: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.host.startsWith('127.0.0.1') && !url.pathname.startsWith('/hire-gts-quebec/')) {
      outside.push(url.pathname);
    }
  });
  for (const { path } of PAGES) await page.goto(path, { waitUntil: 'networkidle' });
  expect(outside).toEqual([]);
});

test.describe('a missing page', () => {
  // the 404 page logs its own status
  test.use({ expectedConsole: [/status of 404 \(Not Found\)/] });

  test('gets the bilingual 404 page', async ({ page }) => {
    const response = await page.goto('/hire-gts-quebec/no-such-page/');
    expect(response?.status()).toBe(404);
    await page.getByRole('link', { name: /Embaucher un développeur/ }).click();
    await expect(page).toHaveURL('/hire-gts-quebec/fr/');
  });
});
