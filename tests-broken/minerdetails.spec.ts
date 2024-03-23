import { test, expect } from '@playwright/test';

test.describe('Bitcoin data viewer tests', () => {

    test.use({slowMo:5000});
  test('should display bitcoin data correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/minerdetails');


    await page.fill('input#fromDate', '2023-01-01'); 
    await page.fill('input#tillDate', '2023-01-07'); 
    await page.waitForTimeout(5000);
    await page.waitForSelector('text=Address', { timeout: 10000 });
    await expect(page.locator('table')).toBeVisible();
    await page.waitForSelector('table tbody tr:first-child', { timeout: 10000 });

    const rowCount = await page.locator('table tbody tr').count();
    console.log(`Number of rows in the table: ${rowCount}`);
    expect(rowCount).toBeGreaterThan(0); 


    await Promise.all([
      page.waitForNavigation(), 
      page.click('table tbody tr:nth-child(1) a'), 
    ]);

    expect(page.url()).toContain('minerdetails/addressdetails'); 
  });
});