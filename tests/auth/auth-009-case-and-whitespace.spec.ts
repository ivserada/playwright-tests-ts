// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Негативные сценарии и валидация', () => {
  test('AUTH-009. Регистр символов и пробелы по краям учётных данных', async ({ browser }) => {
    const credentials = [
      { username: 'Standard_user', password: 'secret_sauce' },
      { username: 'standard_user', password: 'Secret_sauce' },
      { username: ' standard_user', password: 'secret_sauce' },
      { username: 'standard_user ', password: 'secret_sauce' },
    ];

    for (const credential of credentials) {
      // 1. Создать новую сессию для каждой вариации учётных данных.
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        // 2. Ввести значения без нормализации и отправить форму.
        await page.goto('https://www.saucedemo.com/');
        await page.getByRole('textbox', { name: 'Username' }).fill(credential.username);
        await page.locator('[data-test="password"]').fill(credential.password);
        await page.getByRole('button', { name: 'Login', exact: true }).click();

        // 3. Зафиксировать наблюдаемый отказ: это не подтверждение неуточнённой политики регистра и пробелов.
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.getByRole('alert')).toContainText('Username and password do not match any user in this service');
        await expect(page.locator('[data-test="title"]')).toHaveCount(0);
        await expect(page.getByRole('button', { name: 'Open Menu' })).toHaveCount(0);
      } finally {
        await context.close();
      }
    }
  });
});
