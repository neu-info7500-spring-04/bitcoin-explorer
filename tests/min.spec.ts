import {expect, test} from "@playwright/test";

test('load page', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.goto('/');
});