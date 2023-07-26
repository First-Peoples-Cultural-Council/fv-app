import { test, expect } from '@playwright/test';

test('Should load flashcards route', async ({ page }) => {
  await page.goto('/flashcards');
  await page.waitForSelector('text=flashcards');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/First Voices/i);
});
