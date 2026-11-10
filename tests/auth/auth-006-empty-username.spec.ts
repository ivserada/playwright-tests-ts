// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Негативные сценарии и валидация', () => {
  test('AUTH-006. Пустое имя пользователя при заполненном пароле', async ({ page }) => {
    // 1. Открыть форму и ввести только secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 2. Нажать Login.
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    // 3. Проверить отказ авторизации и обязательность имени пользователя.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('alert')).toContainText('Username is required');
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Open Menu' })).toHaveCount(0);
  });
});
