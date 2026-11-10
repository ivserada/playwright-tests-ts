// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Негативные сценарии и валидация', () => {
  test('AUTH-005. Пустой пароль при заполненном имени пользователя', async ({ page }) => {
    // 1. Открыть форму и ввести только standard_user.
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await expect(page.locator('[data-test="password"]')).toBeEmpty();

    // 2. Нажать Login.
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    // 3. Проверить отказ авторизации и обязательность пароля.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('alert')).toContainText('Password is required');
    await expect(page.getByRole('textbox', { name: 'Username' })).toHaveValue('standard_user');
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Open Menu' })).toHaveCount(0);
  });
});
