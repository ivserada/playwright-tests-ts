// spec: specs/auth.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Представление формы и защита введённых данных', () => {
  test('AUTH-015. Маскирование пароля и отсутствие его раскрытия в ошибках', async ({ page }) => {
    const username = page.getByRole('textbox', { name: 'Username' });
    const password = page.locator('[data-test="password"]');
    const login = page.getByRole('button', { name: 'Login', exact: true });

    // 1. Ввести standard_user / wrong_password и проверить маскирование пароля.
    await page.goto('https://www.saucedemo.com/');
    await username.fill('standard_user');
    await password.fill('wrong_password');
    await expect(username).toHaveValue('standard_user');
    await expect(password).toHaveAttribute('type', 'password');
    await expect(login).toBeEnabled();

    // 2. Отправить неверный пароль и проверить ошибку без его раскрытия.
    await login.click();
    const error = page.getByRole('alert');
    await expect(error).toBeVisible();
    await expect(error).not.toContainText('wrong_password');
    await expect(page.locator('[data-test="title"]')).toHaveCount(0);

    // 3. Заменить пароль на secret_sauce и выполнить вход.
    await password.fill('secret_sauce');
    await expect(password).toHaveAttribute('type', 'password');
    await login.click();

    // 4. Проверить, что пароль не отображается на защищённой странице.
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('body')).not.toContainText('secret_sauce');
    await expect(page.locator('body')).not.toContainText('wrong_password');
  });
});
