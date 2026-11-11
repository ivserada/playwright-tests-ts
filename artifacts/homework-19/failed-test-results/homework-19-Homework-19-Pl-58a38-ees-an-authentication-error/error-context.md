# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homework-19.spec.ts >> Homework 19: Playwright reporting >> locked out user sees an authentication error
- Location: tests/homework-19.spec.ts:26:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[data-test="error"]')
Expected substring: "Username and password do not match"
Received string:    "Epic sadface: Sorry, this user has been locked out."
Timeout: 5000ms

Call log:
  - Expect "toContainText" locator('[data-test="error"]') with timeout 5000ms
  - waiting for locator('[data-test="error"]')
    14 × locator resolved to <h3 role="alert" data-test="error">…</h3>
       - unexpected value "Epic sadface: Sorry, this user has been locked out."

```

```yaml
- alert:
  - button "Dismiss error"
  - text: "Epic sadface: Sorry, this user has been locked out."
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Homework 19: Playwright reporting", () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto("https://www.saucedemo.com/");
  6  |   });
  7  | 
  8  |   test("login page matches the screenshot", async ({ page }) => {
  9  |     await expect(page).toHaveTitle("Swag Labs");
  10 |     await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
  11 |     await expect(page.locator('[data-test="password"]')).toBeEmpty();
  12 |     await expect(page).toHaveScreenshot("login-page.png");
  13 |   });
  14 | 
  15 |   test("standard user can log in and see the inventory", async ({ page }) => {
  16 |     await page.locator('[data-test="username"]').fill("standard_user");
  17 |     await page.locator('[data-test="password"]').fill("secret_sauce");
  18 |     await page.locator('[data-test="login-button"]').click();
  19 | 
  20 |     await expect(page).toHaveURL(/\/inventory\.html$/);
  21 |     await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  22 |     await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  23 |     await expect(page).toHaveScreenshot("inventory-page.png", { fullPage: true });
  24 |   });
  25 | 
  26 |   test("locked out user sees an authentication error", async ({ page }) => {
  27 |     await page.locator('[data-test="username"]').fill("locked_out_user");
  28 |     await page.locator('[data-test="password"]').fill("secret_sauce");
  29 |     await page.locator('[data-test="login-button"]').click();
  30 | 
  31 |     await expect(page).toHaveURL("https://www.saucedemo.com/");
> 32 |     await expect(page.locator('[data-test="error"]')).toContainText(
     |                                                       ^ Error: expect(locator).toContainText(expected) failed
  33 |       "Username and password do not match",
  34 |     );
  35 |     await expect(page.locator('[data-test="inventory-list"]')).toHaveCount(0);
  36 |   });
  37 | });
  38 | 
```