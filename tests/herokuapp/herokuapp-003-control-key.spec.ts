// spec: specs/herokuapp.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Клавиши', () => {
  test('HEROKUAPP-003. Нажатие клавиши Control', async ({ page }) => {
    // 1. Открыть страницу /key_presses.
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    // 2. Сфокусировать на поле ввода и нажать клавишу Control.
    const textarea = page.getByRole('textbox');
    await textarea.click();
    await textarea.press('Control');

    // 3. Проверить что результат содержит «Control was pressed».
    const resultParagraph = page.locator('p').last();
    await expect(resultParagraph).toContainText('You entered: CONTROL');
  });
});
