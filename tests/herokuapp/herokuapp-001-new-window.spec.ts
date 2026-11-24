// spec: specs/herokuapp.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Окна', () => {
  test('HEROKUAPP-001. Открытие новой страницы по клику на ссылку', async ({ page, context }) => {
    // 1. Открыть страницу /windows.
    await page.goto('https://the-internet.herokuapp.com/windows');

    // 2. Кликнуть ссылку для открытия нового окна и перехватить новое окно.
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Click Here' }).click(),
    ]);

    // 3. Проверить что новое окно открылось с ожидаемым URL и заголовком.
    await expect(newPage).toHaveURL(/.*new.*/i);
    await expect(newPage.locator('h3')).toHaveText(/New Window/i);

    // 4. Закрыть новое окно.
    await newPage.close();
  });
});
