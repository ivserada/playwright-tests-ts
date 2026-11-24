// spec: specs/herokuapp.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Загрузка файлов', () => {
  test('HEROKUAPP-005. Загрузка файла на сайт', async ({ page }) => {
    // 1. Открыть страницу /upload.
    await page.goto('https://the-internet.herokuapp.com/upload');

    // 2. Загрузить файл через input[type="file"].
    await page.locator('#file-upload').setInputFiles('test-data/test-upload.txt');

    // 3. Нажать кнопку Upload.
    await page.locator('#file-submit').click();

    // 4. Проверить что отобразилось сообщение об успешной загрузке.
    await expect(page.locator('h3')).toContainText('File Uploaded!');
  });
});
