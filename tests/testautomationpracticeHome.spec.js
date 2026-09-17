const { test, expect } = require('@playwright/test');

test('testautomationpractice home page loads and captures screenshot', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('body')).toBeVisible();
  await expect(page).toHaveTitle(/Automation Testing Practice/i);

  await page.screenshot({
    path: 'test-results/testautomationpractice-home.png',
    fullPage: true,
  });
});
