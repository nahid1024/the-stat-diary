import { test, expect } from '@playwright/test';

test('homepage renders and has main elements', async ({ page }) => {
  await page.goto('/');

  // Logo / site title
  await expect(page.getByText('The Stat Diary')).toBeVisible();

  // Search input (placeholder: "Search the blog")
  const search = page.getByPlaceholder('Search the blog');
  await expect(search).toBeVisible();

  // Try typing into search and triggering the search (debounced replace used in UI)
  await search.fill('data');
  // Submit the form by pressing Enter
  await search.press('Enter');

  // Expect navigation to search results (URL contains /search?query=)
  await expect(page).toHaveURL(/\/search\?query=/);
  await expect(page.getByText(/Results for/)).toBeVisible();

  // Back to home and verify cards section exists
  await page.goto('/');
  await expect(page.getByText('Read By Topic')).toBeVisible();
});
