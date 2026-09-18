const { test, expect } = require('@playwright/test');
const { DemoblazePage } = require('../pages/DemoBlazePage');

const productName = 'Samsung galaxy s6';
const testUser = {
  username: `playwright_${Date.now()}`,
  password: 'Password123!',
};

test.describe('Demoblaze shopping flow', () => {
  let demoblazePage;

  test.beforeEach(async ({ page }) => {
    demoblazePage = new DemoblazePage(page);
    await demoblazePage.open();
  });

  test('user can view products, add one to cart, and place an order', async ({ page }) => {
    await expect(demoblazePage.productCards).toHaveCount(9);
    await demoblazePage.openProduct(productName);

    await expect(page.locator('.name')).toHaveText(productName);
    await demoblazePage.addCurrentProductToCart();
    await demoblazePage.openCart();

    await expect(page.locator('#tbodyid .success')).toContainText(productName);
    await demoblazePage.placeOrder({
      name: 'John Doe',
      country: 'India',
      city: 'Bengaluru',
      card: '4111111111111111',
      month: '09',
      year: '2026',
    });

    await expect(page.locator('.sweet-alert h2')).toHaveText('Thank you for your purchase!');
  });

  test('new user can sign up and log in', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Sign up successful');
      await dialog.accept();
    });
    await demoblazePage.signUp(testUser.username, testUser.password);

    await demoblazePage.login(testUser.username, testUser.password);
    await expect(demoblazePage.welcomeUser).toContainText(testUser.username);
  });
});