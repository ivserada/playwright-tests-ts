// ДЗ 21: тег @problem (Playwright tags, запуск: npx playwright test --grep "@problem").
// Проверяет, что у problem_user корзина пустая на старте (главная страница).

import { test, expect } from "@playwright/test";

test.describe("Корзина problem_user", () => {
  test("PROBLEM-002. У problem_user корзина пустая на старте", { tag: "@problem" }, async ({ page }) => {
    // 1. Открыть главную страницу (каталог) в сохранённой сессии problem_user.
    await page.goto("/inventory.html");
    await expect(page).toHaveURL(/inventory\.html$/);

    // 2. Кнопка корзины в шапке отображается,
    //    и её доступное имя говорит о том, что корзина пуста ("Cart, empty").
    const cartButton = page.getByRole("button", { name: "Cart, empty" });
    await expect(cartButton).toBeVisible();
    await expect(cartButton).toHaveAccessibleName("Cart, empty");
  });
});
