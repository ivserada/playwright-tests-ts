// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Негативные сценарии и валидация', () => {
  test('AUTH-007. Недействительная пара логин и пароль', async ({ browser }) => {
    const credentials = [
      { username: 'unknown_user', password: 'secret_sauce' },
      { username: 'standard_user', password: 'wrong_password' },
    ];

    for (const credential of credentials) {
      // 1. Создать новую сессию для каждой недействительной пары.
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        // 2. Ввести учётные данные и нажать Login.
        await page.goto('https://www.saucedemo.com/');
        await page.getByRole('textbox', { name: 'Username' }).fill(credential.username);
        await page.locator('[data-test="password"]').fill(credential.password);
        await page.getByRole('button', { name: 'Login', exact: true }).click();

        // 3. Проверить общий отказ без раскрытия имени пользователя или пароля.
        const error = page.getByRole('alert');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(error).toContainText('Username and password do not match any user in this service');
        await expect(error).not.toContainText(credential.password);
        await expect(error).not.toContainText(credential.username);
        await expect(page.locator('[data-test="title"]')).toHaveCount(0);
        await expect(page.getByRole('button', { name: 'Open Menu' })).toHaveCount(0);
      } finally {
        await context.close();
      }
    }
  });
});
