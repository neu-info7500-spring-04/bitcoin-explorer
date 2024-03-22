import { test, expect } from '@playwright/test';

test('BTC Current Price Test', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('data-testid=marketDataOpenPrice');
    await expect(page.locator('data-testid=marketDataOpenPrice')).toBeVisible();
});

test('BTC High Price Test', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('data-testid=marketDataHighPrice');
    await expect(page.locator('data-testid=marketDataHighPrice')).toBeVisible();
});

test('BTC Low Price Test', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('data-testid=marketDataLowPrice');
    await expect(page.locator('data-testid=marketDataLowPrice')).toBeVisible();
});

test('BTC Volume Test', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('data-testid=marketDataVolume');
    await expect(page.locator('data-testid=marketDataVolume')).toBeVisible();
});