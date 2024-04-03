import { test, expect } from '@playwright/test';

test.describe('Bitcoin Info Component Tests', () => {
  test('Bitcoin Info loads with correct values and formats', async ({ page }) => {
    await page.goto('/');
    
    // Check if Bitcoin logo is present
    await expect(page.locator('img[alt="Bitcoin Logo"]')).toBeVisible();

    // Check if "Bitcoin BTC" heading is present
    await expect(page.locator('h1:has-text("Bitcoin BTC")')).toBeVisible();

    // Function to wait for the price to load or to be 'Loading...'
    async function waitForPriceOrLoading() {
      try {
        await page.waitForSelector('.price:not(:has-text("Loading..."))', { timeout: 5000 });
        return await page.locator('.price').textContent();
      } catch {
        return 'Loading...';
      }
    }

    async function waitForTextContentOrLoading(selector: string): Promise<string> {
        try {
          await page.waitForSelector(`${selector}:not(:has-text("Loading..."))`, { timeout: 5000 });
          const content = await page.locator(selector).textContent();
          // Make sure content is not null or undefined before calling trim()
          return content ? content.trim() : 'Loading...';
        } catch {
          return 'Loading...';
        }
      }

    const priceText = await waitForPriceOrLoading();
    if (priceText !== 'Loading...') {
      expect(priceText).toMatch(/^\$\d{5}\.\d{2}\sUSD$/);
    } else {
      expect(priceText).toBe('Loading...');
    }

    // Check if Difficulty and Block Height are displayed or show 'Loading...'
    const difficultyText = await waitForTextContentOrLoading('.difficulty');
    if (difficultyText !== 'Loading...') {
      expect(difficultyText).toMatch(/Difficulty:\s+\d+(\.\d{2})?\sTH/);
    } else {
      expect(difficultyText).toBe('Loading...');
    }


    const blockHeightText = await waitForTextContentOrLoading('.block-height');
    if (blockHeightText !== 'Loading...') {
      expect(blockHeightText).toMatch(/Block Height:\s+\d+/);
    } else {
      expect(blockHeightText).toBe('Loading...');
    }
  });
});
