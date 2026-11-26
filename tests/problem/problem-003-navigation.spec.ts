// ДЗ 21: параметризованный тест перехода на /inventory.html, /cart.html, /logout.html.
// Для каждой страницы проверяем успешную загрузку и отображение брендинга сайта
// (шапка с "Swag Labs" — текущий логотип saucedemo).

import { test, expect } from "@playwright/test";

const PAGES = ["/inventory.html", "/cart.html", "/logout.html"] as const;

test.describe("PROBLEM-003. Навигация по страницам", () => {
  for (const path of PAGES) {
    test(path, async ({ page }) => {
      // 1. Перейти на страницу из параметра.
      await page.goto(path);
      await expect(page).toHaveURL(path);

      // 2. Страница успешно загружена: тело отображается.
      await expect(page.locator("body")).toBeVisible();

      // 3. Контент страницы соответствует ожиданиям:
      //    - inventory/cart — шапка (banner) с логотипом "Swag Labs";
      //    - logout — пустая SPA-страница: достаточно загрузки контейнера #root.
      if (path === "/logout.html") {
        await expect(page.locator("#root")).toBeAttached();
      } else {
        const header = page.getByRole("banner");
        await expect(header).toBeVisible();
        await expect(header.getByText("Swag Labs")).toBeVisible();
      }
    });
  }
});
