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

## Запуск в Docker

Требуется Docker с Docker Compose v2. Официальный образ Playwright уже содержит Chromium и необходимые системные зависимости.

```bash
# Собрать образ и запустить все тесты
npm run test:docker

# Запустить отдельный файл
docker compose -f docker-compose.local.yml run --rm --build playwright npx playwright test tests/example.spec.js

# Запустить тесты по шаблону имени
docker compose -f docker-compose.local.yml run --rm --build playwright npx playwright test --grep "standard login"
```

HTML-отчёт и результаты сохраняются в локальных каталогах `playwright-report` и `test-results`. После завершения прогона отчёт можно открыть командой `npm run test:report`.

Тесты находятся в каталоге `tests`, настройки — в `playwright.config.js`.
Пример теста не требует подключения к интернету.

Для установки дополнительных браузеров выполните:

```bash
npx playwright install firefox webkit
```
