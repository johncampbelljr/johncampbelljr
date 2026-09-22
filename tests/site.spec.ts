import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
const paths = [
  '/',
  '/writing/',
  '/projects/',
  '/experience/',
  '/about/',
  '/writing/what-work-should-we-give-coding-agents/',
  '/projects/agentic-software-development-pipeline/',
];
for (const width of [1440, 390, 320]) {
  test(`pages are navigable, accessible, and fit at ${width}px`, async ({
    page,
    request,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('nav [aria-current="page"]')).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
      expect(
        await page.locator('link[rel="canonical"]').getAttribute('href'),
      ).toBe(`https://johncampbelljr.com${path}`);
    }
    await page.goto('/');
    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'Writing', exact: true })
      .click();
    await expect(page).toHaveURL(/\/writing\/$/);
    await page
      .getByRole('link', {
        name: /What Work Should We Actually Give Coding Agents/,
      })
      .click();
    await expect(page.getByText('A note in progress.')).toBeVisible();
    await page
      .locator('article')
      .getByRole('link', {
        name: 'Agentic Software Development Pipeline',
        exact: true,
      })
      .click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Agentic Software Development Pipeline',
    );
    for (const file of [
      '/rss.xml',
      '/sitemap-index.xml',
      '/robots.txt',
      '/og-image.png',
    ]) {
      expect((await request.get(file)).ok(), file).toBe(true);
    }
  });
}
test('all local links resolve and no scripts are shipped', async ({
  page,
  request,
}) => {
  const seen = new Set<string>();
  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator('script')).toHaveCount(0);
    for (const href of await page
      .locator('a[href]')
      .evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).href),
      )) {
      if (href.startsWith('http://127.0.0.1:4322') && !seen.has(href)) {
        seen.add(href);
        expect((await request.get(href)).status(), href).toBe(200);
      }
    }
  }
  await page.goto('/404.html');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'A loose end.',
  );
});

test('custom-domain file is included in the build', async () => {
  expect((await readFile('dist/CNAME', 'utf8')).trim()).toBe(
    'johncampbelljr.com',
  );
});
