// spec: specs/herokuapp.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('JavaScript alerts', () => {
  test('HEROKUAPP-006. Обработка JS confirm диалога', async ({ page }) => {
    // 1. Открыть страницу /javascript_alerts.
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // 2. Зарегистрировать обработчик диалога до клика.
    page.on('dialog', (dialog) => {
      expect(dialog.type()).toBe('confirm');
      dialog.accept();
    });

    // 3. Кликнуть кнопку «Click for JS Confirm».
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    // 4. Проверить что результат содержит «You pressed: Ok».
    const resultParagraph = page.locator('p').last();
    await expect(resultParagraph).toContainText('You clicked: Ok');
  });
});
