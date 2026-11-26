// spec: глобальная авторизация (globalSetup → storageState.json)

import { test, expect } from "@playwright/test";

// Сессию из globalSetup подхватываем только в этом спеке —
// остальные тесты проекта идут в logged-out состоянии.
test.use({ storageState: "storageState.json" });

test.describe("Авторизация", () => {
  test("LOGIN-001. Пользователь уже авторизован при открытии защищённой страницы", async ({
    page,
  }) => {
    await page.goto("/secure");
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
    await expect(page.getByRole("heading", { name: "Secure Area", exact: true })).toBeVisible();
  });
});
