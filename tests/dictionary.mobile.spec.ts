import { test, expect } from '@playwright/test';

test('Should load mobile dictionary route', async ({ page }) => {
  await page.goto('/dictionary');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/First Voices/i);

  const wordsPhrasesBothToggle = await page.locator('.multi-switch').first();
  await expect(wordsPhrasesBothToggle).toHaveText('WORDSPHRASESBOTH');
});
