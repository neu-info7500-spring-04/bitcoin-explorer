import { test, expect } from '@playwright/test';

test.describe('Bitcoin Miner and Address details statistics tests', () => {

  // Tests for checking miner details statistics table
    test.use({slowMo:5000});
  test('should display bitcoin miner and address data correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/minerdetails');

    await page.waitForTimeout(5000);
    await page.waitForSelector('text=Address', { timeout: 10000 });
    await expect(page.locator('#minersStatisticsTable')).toBeVisible();
    await page.waitForSelector('#minersStatisticsTable tbody tr:first-child', { timeout: 10000 });

    const rowCount = await page.locator('#minersStatisticsTable tbody tr').count();
    const colCount = await page.locator('#minersStatisticsTable thead tr th').count();
    expect(rowCount).toBeGreaterThan(0); 
    expect(colCount).toBe(5); 


    // Tests for checking miner-address statistics table

    await expect(page.locator('#addressStatisticsTable')).toBeVisible();
    await page.waitForSelector('#addressStatisticsTable tbody tr:first-child', { timeout: 10000 });
    const addressRowCount = await page.locator('#addressStatisticsTable tbody tr').count();
    const addressColCount = await page.locator('#addressStatisticsTable thead tr th').count();
    expect(addressRowCount).toBeGreaterThan(0); 
    expect(addressColCount).toBe(7);


  });
});