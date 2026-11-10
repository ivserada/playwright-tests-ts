// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Защита страниц и жизненный цикл сессии', () => {
  test('AUTH-012. Обновление защищённой страницы после успешного входа', async ({ page }) => {
    // 1. Открыть форму и войти как standard_user / secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // 2. Обновить защищённую страницу.
    await page.reload();

    // 3. Проверить рекомендованное в плане сохранение сессии и доступ к Products.
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
    await expect(page.getByRole('form', { name: 'Login' })).toHaveCount(0);
  });
});
