import { test, expect } from "@playwright/test";

test("fruits list is replaced with vegetables", async ({ page }) => {
  await page.route("**/api/v1/fruits", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { name: "Carrot", id: 1 },
        { name: "Potato", id: 2 },
        { name: "Cucumber", id: 3 },
        { name: "Broccoli", id: 4 },
      ]),
    })
  );

  await page.goto("https://demo.playwright.dev/api-mocking/");

  const items = page.locator("li");
  await expect(items).toHaveCount(4);
  await expect(items.nth(0)).toHaveText("Carrot");
  await expect(items.nth(1)).toHaveText("Potato");
  await expect(items.nth(2)).toHaveText("Cucumber");
  await expect(items.nth(3)).toHaveText("Broccoli");
});

test("api returns 404 and the list is not rendered", async ({ page }) => {
  await page.route("**/api/v1/fruits", (route) =>
    route.fulfill({
      status: 404,
      contentType: "text/plain",
      body: "Not Found",
    })
  );

  await page.goto("https://demo.playwright.dev/api-mocking/");

  await expect(page.getByText("Loading...")).toBeVisible();
  await expect(page.locator("li")).toHaveCount(0);
});

