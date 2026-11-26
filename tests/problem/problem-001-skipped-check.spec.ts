// ДЗ 21: временно отключённый тест (test.skip).
// Сессия problem_user подхватывается из problem-user-state.json на уровне проекта.

import { test, expect } from "@playwright/test";

// Временно отключён: ожидание уточнения поведения баннера для problem_user.
test.skip("PROBLEM-001. Проверка заголовка каталога для problem_user", async ({ page }) => {
  await page.goto("/inventory.html");
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
});
