import { test, expect } from "@playwright/test";

test.describe("Bitcoin nodes distribution tests", () => {
  // Tests for checking miner details statistics table

  test("BTC node distribution map parent component loads", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("data-testid=nodeDistributionMain");
    await expect(
      page.locator("data-testid=nodeDistributionMain")
    ).toBeVisible();
  });

  test("BTC SVG map loads", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("data-testid=nodeDistributionMap");
    await expect(page.locator("data-testid=nodeDistributionMap")).toBeVisible();
  });
});
