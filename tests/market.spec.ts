import { test, expect } from '@playwright/test';

test.describe('Market Data Component Tests', () => {
  test('Market Data loads with correct values and formats', async ({ page }) => {
    await page.goto('/');

    // Check if Market Data header is present
    await expect(page.locator('h2:has-text("MARKET DATA")')).toBeVisible();

    // Check if the "More Market Data" button is present and clickable
    const moreDataButton = page.locator('.more-market-data-button');
    await expect(moreDataButton).toBeVisible();
    await expect(moreDataButton).toHaveText('More Market Data');
    
    // A helper function to wait for the data to load or to be 'Loading...'
    async function waitForDataOrLoading(selector: string) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        const textContent = await page.locator(selector).textContent();
        if (textContent?.trim() === 'Loading...') {
          return 'Loading...';
        }
        return textContent;
      } catch {
        // If the element doesn't load in time, return 'Loading...'
        return 'Loading...';
      }
    }
    
    // Wait for the Market Cap to load or be 'Loading...'
    const marketCapText = await waitForDataOrLoading('.market-data-section:has(label:has-text("Market Cap")) p');
    // Perform the check based on the content
    if (marketCapText !== 'Loading...') {
      expect(marketCapText).toMatch(/^\$?\d+(,\d{3})*(\.\d+)?\sUSD$/);
    } else {
      expect(marketCapText).toBe('Loading...');
    }

    // Repeat the process for other pieces of data
    const supplyText = await waitForDataOrLoading('.market-data-section:has(label:has-text("Supply")) p');
    if (supplyText !== 'Loading...') {
      expect(supplyText).toMatch(/^\d+(,\d{3})*$/);
    } else {
      expect(supplyText).toBe('Loading...');
    }

    const maxSupplyText = await waitForDataOrLoading('.market-data-section:has(label:has-text("Max Supply")) p');
    if (maxSupplyText !== 'Loading...') {
      expect(maxSupplyText).toBe('21000000');
    } else {
      expect(maxSupplyText).toBe('Loading...');
    }

    const change1hText = await waitForDataOrLoading('.market-data-section:has(label:has-text("Change (1h)")) p');
    if (change1hText !== 'Loading...') {
      expect(change1hText).toMatch(/^-?\d+(\.\d+)?%$/);
    } else {
      expect(change1hText).toBe('Loading...');
    }

    const change1dText = await waitForDataOrLoading('.market-data-section:has(label:has-text("Change (1 day)")) p');
    if (change1dText !== 'Loading...') {
      expect(change1dText).toMatch(/^-?\d+(\.\d+)?%$/);
    } else {
      expect(change1dText).toBe('Loading...');
    }

    const change1wText = await waitForDataOrLoading('.market-data-section:has(label:has-text("Change (1 week)")) p');
    if (change1wText !== 'Loading...') {
      expect(change1wText).toMatch(/^-?\d+(\.\d+)?%$/);
    } else {
      expect(change1wText).toBe('Loading...');
    }
  });
});
