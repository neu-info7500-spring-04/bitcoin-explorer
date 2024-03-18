import { test, expect } from '@playwright/test';

test('Display the last block and dynamically update time in the correct format', async ({ page }) => {
  await page.goto('/');
  const lastBlockHeight = await page.textContent('[data-testid="blockHeight"]');
  expect(lastBlockHeight).not.toBeNull();
  expect(lastBlockHeight!.length).toBeGreaterThanOrEqual(6);
  expect(lastBlockHeight).toMatch(/^\d+(\s\d+)*$/);

  const timerElement = await page.waitForSelector('[data-testid="timer"]');
  expect(await timerElement.isVisible()).toBe(true);

  const initialTimerValue = await page.textContent('[data-testid="timer"]');
  await page.waitForTimeout(2000); 
  const updatedTimerValue = await page.textContent('[data-testid="timer"]');
  expect(initialTimerValue).not.toBe(updatedTimerValue);
});

// Write your test case below: