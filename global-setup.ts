// ДЗ 21: setup-тест проекта "setup-problem".
// Логинит problem_user на SauceDemo и сохраняет сессию (cookies)
// в problem-user-state.json для переиспользования проектом "problem-tests".

import { test, expect } from "@playwright/test";

const BASE_URL = "https://www.saucedemo.com/v1";
const USERNAME = "problem_user";
const PASSWORD = "secret_sauce";
const STORAGE_STATE_FILE = "problem-user-state.json";

test("SETUP-001. Логин problem_user и сохранение сессии", async ({ page, context }) => {
  // 1. Открыть сайт SauceDemo (v1).
  await page.goto(BASE_URL);

  // 2. Заполнить форму входа и нажать Login.
  await page.getByRole("textbox", { name: "Username" }).fill(USERNAME);
  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.getByRole("button", { name: "Login", exact: true }).click();

  // 3. Успех = переход на каталог /inventory.html.
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");

  // 4. Сохранить сессию (cookies + localStorage) для project "problem-tests".
  await context.storageState({ path: STORAGE_STATE_FILE });
  console.log(`setup-problem: logged in as ${USERNAME}, storage → ${STORAGE_STATE_FILE}`);
});
