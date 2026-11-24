// spec: specs/herokuapp.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Drag & Drop', () => {
  test('HEROKUAPP-004. Перетаскивание блоков и проверка смены мест', async ({ page }) => {
    // 1. Открыть страницу /drag_and_drop.
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    // 2. Запомнить начальное содержимое обоих блоков.
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');
    const textA = (await columnA.textContent())?.trim();
    const textB = (await columnB.textContent())?.trim();

    // 3. Перетащить блок A на блок B.
    await columnA.dragTo(columnB);

    // 4. Проверить что блоки поменялись местами.
    await expect(columnA).toContainText(textB ?? 'B');
    await expect(columnB).toContainText(textA ?? 'A');
  });
});
