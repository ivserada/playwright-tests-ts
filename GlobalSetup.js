// globalSetup: выполняется один раз ДО всех тестов, вне тестового контекста.
// Здесь нет TestInfo, поэтому нет и `expect` — только «сырой» браузер
// и throw-гард через finally.

const { chromium } = require("@playwright/test");

const BASE_URL = "https://the-internet.herokuapp.com/login";
const USERNAME = "tomsmith";
const PASSWORD = "SuperSecretPassword!";
const STORAGE_STATE_FILE = "storageState.json";

module.exports = async () => {
  const browser = await chromium.launch();

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    // 1. Открыть форму входа the-internet.
    await page.goto(BASE_URL);

    // 2. Заполнить поля и нажать Login.
    await page.fill("#username", USERNAME);
    await page.fill("#password", PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    // 3. Успех = редирект на защищённую страницу /secure.
    await page.waitForURL("**/secure");

    // 4. Сохранить сессию (cookies + localStorage) для переиспользования в тестах.
    await context.storageState({ path: STORAGE_STATE_FILE });
    console.log(`globalSetup: logged in as ${USERNAME}, storage → ${STORAGE_STATE_FILE}`);
  } finally {
    // Корректно закрыть браузер даже при ошибке логина.
    await browser.close();
  }
};
