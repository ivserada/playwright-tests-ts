import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testIgnore: ["tests/auth/**"],
  globalSetup: "./GlobalSetup.js",
  globalTeardown: "./GlobalTeardown.js",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 8,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    browserName: "chromium",
    headless: true,
    baseURL: "https://the-internet.herokuapp.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    // Существующие тесты (the-internet, herokuapp, login) — без изменений.
    {
      name: "default",
      testMatch: ["tests/**/*.spec.ts", "tests/**/*.spec.js"],
      testIgnore: ["tests/auth/**", "tests/problem/**"],
    },
    // ДЗ 21: setup-проект — логинит problem_user и сохраняет сессию.
    {
      name: "setup-problem",
      testDir: ".",
      testMatch: "global-setup.ts",
      use: { baseURL: "https://www.saucedemo.com" },
    },
    // ДЗ 21: тесты problem-tests в сохранённом состоянии problem_user.
    // Порядок важен: setup-problem (выше по списку) выполняется раньше и
    // создаёт problem-user-state.json (Playwright запускает проекты по порядку).
    {
      name: "problem-tests",
      testMatch: "tests/problem/**",
      use: {
        baseURL: "https://www.saucedemo.com",
        storageState: "problem-user-state.json",
      },
    },
  ],
});