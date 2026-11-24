// spec: specs/herokuapp.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Наведение мыши', () => {
  test('HEROKUAPP-002. Наведение на картинку и клик по ссылке', async ({ page }) => {
    // 1. Открыть страницу /hovers.
    await page.goto('https://the-internet.herokuapp.com/hovers');

    // 2. Навести на первую картинку.
    const figure = page.locator('.figure').first();
    await figure.hover();

    // 3. Проверить что ссылка появилась и стала кликабельной, затем кликнуть.
    const link = figure.locator('a');
    await expect(link).toBeVisible();
    await link.click();

    // 4. Проверить что навигация произошла на новую страницу.
    await expect(page).not.toHaveURL('https://the-internet.herokuapp.com/hovers');
  });
});
