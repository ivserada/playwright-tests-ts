// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Позитивные сценарии', () => {
  test('AUTH-001. Успешный вход standard_user по кнопке Login', async ({ page }) => {
    const username = page.getByRole('textbox', { name: 'Username' });
    const password = page.locator('[data-test="password"]');

    // 1. Открыть форму входа в новой сессии; поля Username и Password пусты.
    await page.goto('https://www.saucedemo.com/');
    await expect(username).toBeEmpty();
    await expect(password).toBeEmpty();

    // 2. Ввести standard_user и secret_sauce; пароль должен маскироваться.
    await username.fill('standard_user');
    await password.fill('secret_sauce');
    await expect(username).toHaveValue('standard_user');
    await expect(password).toHaveAttribute('type', 'password');

    // 3. Нажать Login.
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    // 4. Проверить переход в каталог и отсутствие формы входа и ошибки.
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await expect(page.getByRole('form', { name: 'Login' })).toHaveCount(0);
    await expect(page.locator('[data-test="error"]')).toHaveCount(0);
  });
});
