// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Защита страниц и жизненный цикл сессии', () => {
  test('AUTH-013. Выход из системы и повторный прямой доступ к каталогу', async ({ page }) => {
    // 1. Войти как standard_user / secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // 2. Открыть меню и нажать Logout.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    const logout = page.getByRole('button', { name: 'Logout' });
    await expect(logout).toBeVisible();
    await logout.click();

    // 3. Проверить завершение сессии и возврат к форме входа.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);

    // 4. Повторно открыть каталог напрямую и проверить обязательность новой авторизации.
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('alert')).toContainText("You can only access '/inventory.html' when you are logged in.");
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);
  });
});
