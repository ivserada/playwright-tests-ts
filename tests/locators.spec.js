import { test, expect } from "@playwright/test";

test("log in", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  await page.getByRole("textbox", { name: "username" }).fill("tomsmith");
  await page.getByRole("textbox", { name: "Password" }).fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
  await expect(page.getByRole("heading", { name: "Secure Area", exact: true })).toBeVisible();
});

test("iframe", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/iframe");
  const frame = page.frameLocator("#mce_0_ifr");
});
