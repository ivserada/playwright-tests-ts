// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Позитивные сценарии', () => {
  test('AUTH-002. Успешный вход всех опубликованных незаблокированных пользователей', async ({ browser }) => {
    const usernames = [
      'standard_user',
      'problem_user',
      'performance_glitch_user',
      'error_user',
      'visual_user',
    ];

    for (const username of usernames) {
      // 1. Создать новую браузерную сессию для каждого пользователя.
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        // 2. Ввести опубликованные учётные данные и нажать Login.
        await page.goto('https://www.saucedemo.com/');
        await page.getByRole('textbox', { name: 'Username' }).fill(username);
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login', exact: true }).click();

        // 3. Проверить доступ к защищённому каталогу.
        await expect(page, `Вход пользователя ${username}`).toHaveURL(
          'https://www.saucedemo.com/inventory.html',
        );
        await expect(
          page.locator('[data-test="title"]'),
          `Заголовок каталога для ${username}`,
        ).toHaveText('Products', { timeout: 15000 });
        await expect(
          page.locator('[data-test="inventory-container"]'),
          `Содержимое каталога для ${username}`,
        ).toBeVisible();
      } finally {
        await context.close();
      }
    }
  });
});
