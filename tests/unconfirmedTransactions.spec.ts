import { test, expect } from '@playwright/test';

test('UnconfirmedTransactions component is rendered', async ({ page }) => {
  // Navigate to the page where your React app is running
  await page.goto('http://localhost:3000');

  // Locate the element with the class 'transactions-header' and check if it has the expected text
  // const transactionsHeader = await page.locator('.transactions-header');
  // await expect(transactionsHeader).toHaveText('Unconfirmed Transactions', { timeout: 10000 }); // Increase timeout to 10 seconds if needed
});
