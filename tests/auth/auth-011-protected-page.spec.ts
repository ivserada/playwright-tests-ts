// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Защита страниц и жизненный цикл сессии', () => {
  test('AUTH-011. Прямой переход на защищённую страницу без авторизации', async ({ page }) => {
    // 1. В новой сессии напрямую перейти на защищённую страницу.
    await page.goto('https://www.saucedemo.com/inventory.html');

    // 2. Проверить редирект к входу, сообщение об авторизации и отсутствие каталога.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('alert')).toContainText("You can only access '/inventory.html' when you are logged in.");
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Open Menu' })).toHaveCount(0);
  });
});
