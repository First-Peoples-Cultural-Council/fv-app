import { test, expect } from '@playwright/test';

test('Should load categories route', async ({ page }) => {
  await page.goto('/categories');
  await page.waitForSelector('text=Categories');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/First Voices/i);
});
