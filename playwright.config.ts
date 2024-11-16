import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }], // HTML report
    ["json", { outputFolder: "test-results", outputFile: "results.json" }], // JSON report
  ],
});
