import { test, expect } from '@playwright/test';

test('has sidebar', async ({ page }) => {
  await page.goto('/alphabet');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(page.locator('nav.sidebar')).toHaveAttribute('role', 'complementary');
});

test('has alphabet buttons', async ({ page }) => {
  await page.goto('/alphabet');

  const alphabetButton = page.getByRole('button', { name: "a", exact: true });

  await alphabetButton.click();

  const receivedLetter = await alphabetButton.innerText();

  const expectedLetter = await page.locator('.hidden > div > div > div').first().innerText();

  // Expect an attribute "to be strictly equal" to the value.
  await expect(expectedLetter).toBe(receivedLetter);

  // Expect audio button to be present
  // await expect(page.locator('div:nth-child(4) > div:nth-child(2) > .pb-10 > .grid > [id^="audio-"]').first()).toBeVisible();
});
