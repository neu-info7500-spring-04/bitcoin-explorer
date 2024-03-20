import { test, expect } from '@playwright/test';

test('Table is present on the page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('data-testid=blockList');
    await expect(page.locator('data-testid=blockList')).toBeVisible();
});



test('Table headers are loaded properly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('[data-testid="blockList"] thead');

    
    const expectedHeaders = ['Height', 'Time', 'Tx count', 'Size(KB)', 'Fees(BTC)'];

    
    const headerElements = page.locator('[data-testid="blockList"] thead th');

    await expect(headerElements).toHaveCount(expectedHeaders.length);

  
    for (let i = 0; i < expectedHeaders.length; i++) {
        
        await expect(headerElements.nth(i)).toHaveText(expectedHeaders[i]);
    }
});
