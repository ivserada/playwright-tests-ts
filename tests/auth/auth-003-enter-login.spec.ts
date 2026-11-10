// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Позитивные сценарии', () => {
  test('AUTH-003. Отправка валидной формы клавишей Enter', async ({ page }) => {
    const password = page.locator('[data-test="password"]');

    // 1. Открыть форму входа и ввести standard_user / secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await password.fill('secret_sauce');

    // 2. Оставить фокус в Password и нажать Enter.
    await expect(password).toBeFocused();
    await password.press('Enter');

    // 3. Проверить успешную авторизацию и доступ к каталогу.
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
  });
});
