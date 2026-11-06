# Playwright на JavaScript

Базовое окружение для автотестов на Playwright Test с Chromium.

## Команды

```bash
# Запустить все тесты
npm test

# Запустить тесты с отображением браузера
npm run test:headed

# Открыть интерактивный UI Playwright
npm run test:ui

# Запустить тесты в режиме отладки
npm run test:debug

# Открыть HTML-отчёт после прогона
npm run test:report
```

Тесты находятся в каталоге `tests`, настройки — в `playwright.config.js`.
Пример теста не требует подключения к интернету.

Для установки дополнительных браузеров выполните:

```bash
npx playwright install firefox webkit
```
