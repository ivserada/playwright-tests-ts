import { test, expect } from "@playwright/test";

test.describe("Homework 19: Playwright reporting", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test("login page matches the screenshot", async ({ page }) => {
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeEmpty();
    await expect(page).toHaveScreenshot("login-page.png");
  });

  test("standard user can log in and see the inventory", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page).toHaveScreenshot("inventory-page.png", { fullPage: true });
  });

  test("locked out user sees an authentication error", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("locked_out_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Username and password do not match",
    );
    await expect(page.locator('[data-test="inventory-list"]')).toHaveCount(0);
  });
});
