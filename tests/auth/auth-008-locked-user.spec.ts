// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Негативные сценарии и валидация', () => {
  test('AUTH-008. Вход заблокированного пользователя с правильным паролем', async ({ page }) => {
    // 1. Открыть форму и ввести locked_out_user / secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 2. Нажать Login.
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    // 3. Проверить отказ и сообщение о блокировке без раскрытия пароля.
    const error = page.getByRole('alert');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(error).toContainText('this user has been locked out');
    await expect(error).not.toContainText('secret_sauce');
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Open Menu' })).toHaveCount(0);
  });
});
