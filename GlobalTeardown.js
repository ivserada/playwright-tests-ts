// globalTeardown: выполняется один раз ПОСЛЕ всех тестов, вне тестового контекста.
// storageState.json — артефакт прогона (уже в .gitignore), после завершения его удаляем.

const fs = require("node:fs");

const STORAGE_STATE_FILE = "storageState.json";

module.exports = async () => {
  if (fs.existsSync(STORAGE_STATE_FILE)) {
    fs.rmSync(STORAGE_STATE_FILE);
    console.log(`globalTeardown: removed ${STORAGE_STATE_FILE}`);
  }
};