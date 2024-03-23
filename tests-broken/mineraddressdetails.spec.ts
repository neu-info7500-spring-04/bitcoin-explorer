import { test, expect } from '@playwright/test';

test.describe('Address Details Tests', () => {
  test('should display address details correctly', async ({ page }) => {
    const baseURL = 'http://localhost:3000/minerdetails/addressdetails';
    const testAddress = 'bc1qxhmdufsvnuaaaer4ynz88fspdsxq2h9e9cetdj';
    const fromDate = '2023-01-01';
    const tillDate = '2023-01-07';
    const query = `?address=${testAddress}&from=${fromDate}&till=${tillDate}`;
    const fullURL = baseURL + query;
    await page.goto(fullURL);
    await page.waitForSelector('table', { state: 'visible' });
    await expect(page.locator('table >> tbody >> tr')).toHaveCount(7);
    await expect(page.locator('table >> tbody >> tr >> td:has-text("Total Received (BTC)") + td')).toHaveText(/.+/); 


  });
});