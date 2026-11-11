import { spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { randomBytes } from "node:crypto";

// Замени префикс на свой, чтобы отличать отчёты этого проекта.
const prefix = "ivan-pw";
const reportDir = "playwright-report";

// Пример: 20261111-150500-a1b2c3 (время UTC).
const timestamp = new Date().toISOString().replace(/[-:]/g, "").replace("T", "-").slice(0, 15);

const suffix = randomBytes(3).toString("hex");
const domain = `${prefix}-${timestamp}-${suffix}.surge.sh`;
const reportUrl = `https://${domain}`;

function run(command) {
  const result = spawnSync(command, {
    shell: true,
    stdio: "inherit",
    env: process.env,
  });

  if (result.error) console.error(result.error);
  return result.status ?? 1;
}

// Не публикуем отчёт от предыдущего запуска.
rmSync(reportDir, { recursive: true, force: true });

const testExitCode = run("npx playwright test");

let deployExitCode = 1;

if (existsSync(`${reportDir}/index.html`)) {
  deployExitCode = run(`npx surge ./${reportDir} ${domain}`);

  if (deployExitCode === 0) {
    console.log(`\nОтчёт: ${reportUrl}`);
    console.log(`Удаление: npx surge ${domain} teardown\n`);
  }
} else {
  console.error("HTML-репорт не создан — публикация пропущена.");
}

process.exitCode = testExitCode || deployExitCode;
