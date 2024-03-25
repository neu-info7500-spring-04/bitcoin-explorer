import {expect, test} from "@playwright/test";

test('load page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('main#main');
});