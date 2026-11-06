const { test, expect } = require("@playwright/test");

test("runs a basic browser interaction", async ({ page }) => {
  await page.setContent(`
    <main>
      <h1>Playwright is ready</h1>
      <button onclick="this.textContent = 'Clicked'">Click me</button>
    </main>
  `);

  await expect(page.getByRole("heading")).toHaveText("Playwright is ready");

  const button = page.getByRole("button");
  await button.click();
  await expect(button).toHaveText("Clicked");
});
