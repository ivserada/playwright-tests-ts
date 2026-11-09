// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Защита страниц и жизненный цикл сессии', () => {
  test('AUTH-014. Навигация назад после выхода из системы', async ({ page }) => {
    // 1. Войти как standard_user / secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // 2. Выйти через Open Menu и Logout.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // 3. Выполнить браузерную навигацию назад.
    await page.goBack();

    // 4. Проверить, что доступ и сессия не восстановились.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('alert')).toContainText("You can only access '/inventory.html' when you are logged in.");
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Open Menu' })).toHaveCount(0);
  });
});
