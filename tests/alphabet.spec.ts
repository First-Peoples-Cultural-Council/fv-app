import { test, expect } from '@playwright/test';

test('has sidebar', async ({ page }) => {
  await page.goto('/alphabet');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(page.locator('nav.sidebar')).toHaveAttribute('role', 'complementary');
});
