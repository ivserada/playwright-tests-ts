import { test, expect } from "@playwright/test";

test("standard login success", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
});

test("purchase Sauce Labs Backpack", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  await page
    .locator('[data-test="inventory-item-name"]')
    .filter({ hasText: "Sauce Labs Backpack" })
    .click();
  await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
  await page.locator("#add-to-cart").click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill("Ivan");
  await page.locator('[data-test="lastName"]').fill("Ivanov");
  await page.locator('[data-test="postalCode"]').fill("123456");
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await expect(page.locator(".cart_quantity")).toHaveText("1");
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99");
  await expect(page.locator('[data-test="payment-info-value"]')).toHaveText("SauceCard #31337");
  await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText(
    "Free Pony Express Delivery!",
  );
  await expect(page.locator('[data-test="subtotal-label"]')).toHaveText("Item total: $29.99");
  await expect(page.locator('[data-test="tax-label"]')).toHaveText("Tax: $2.40");
  await expect(page.locator('[data-test="total-label"]')).toHaveText("Total: $32.39");

  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(page.locator('[data-test="complete-header"]')).toHaveText(
    /thank you for your order/i,
  );
});

test("codegen - sorting", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
  await page.locator('[data-test="product-sort-container"]').selectOption("hilo");
  await expect(page.locator('[data-test="inventory-list"]')).toContainText("$49.99");
});
