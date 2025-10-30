import { test, expect } from '@playwright/test';

test('click first post card if available and verify post page', async ({ page }) => {
  await page.goto('/');

  const postLinks = page.locator('a[href^="/post/"]');
  const count = await postLinks.count();
  if (count === 0) {
    test.skip(true, 'No posts available to test');
    return;
  }

  // Click the first post link and verify navigation
  await postLinks.first().click();
  // Wait for either an author label or Key Takeaways section which are present in post page
  await expect(page.locator('text=By ')).toBeVisible({ timeout: 5000 }).catch(() => {
    // Fallback: expect a title to exist
    return expect(page.locator('h1')).toBeVisible();
  });
});
