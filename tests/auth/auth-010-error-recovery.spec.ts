// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Негативные сценарии и валидация', () => {
  test('AUTH-010. Закрытие ошибки и повторный вход с исправленными данными', async ({ page }) => {
    const username = page.getByRole('textbox', { name: 'Username' });
    const password = page.locator('[data-test="password"]');
    const login = page.getByRole('button', { name: 'Login', exact: true });

    // 1. Открыть форму и выполнить неудачную попытку unknown_user / wrong_password.
    await page.goto('https://www.saucedemo.com/');
    await username.fill('unknown_user');
    await password.fill('wrong_password');
    await login.click();
    await expect(page.getByRole('alert')).toContainText('Username and password do not match any user in this service');

    // 2. Закрыть сообщение об ошибке.
    await page.getByRole('button', { name: 'Dismiss error' }).click();
    await expect(page.getByRole('alert')).toHaveCount(0);

    // 3. Исправить данные на standard_user / secret_sauce и повторить вход.
    await username.fill('standard_user');
    await password.fill('secret_sauce');
    await login.click();

    // 4. Проверить успешный вход и отсутствие прежней ошибки.
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.getByRole('alert')).toHaveCount(0);
  });
});
