import { test, expect } from '@playwright/test';

test('home page redirects to /alphabet', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/alphabet');
});

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/First Voices/i);
});

test('has header', async ({ page }) => {
  await page.goto('/');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(page.locator('header.main-header')).toHaveAttribute('role', 'banner');
});

test('has subheader', async ({ page }) => {
  await page.goto('/');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(page.locator('header.sub-header')).toHaveAttribute('role', 'banner');
});
