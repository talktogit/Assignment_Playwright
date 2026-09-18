const { test, expect } = require('@playwright/test');
const { ShopPage } = require('../pages/ShopPage');

const productName = 'HTML5 Forms';

test.describe('Automation Practice shop', () => {
  let shopPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    await shopPage.open();
    if (await shopPage.isUnavailable()) {
      test.skip(true, 'The external WordPress practice shop is currently unavailable.');
    }
  });

  test('user can search for a product and add it to the cart', async ({ page }) => {
    await shopPage.searchProduct(productName);

    await expect(shopPage.product(productName)).toHaveCount(1);
    await expect(shopPage.product(productName)).toContainText(productName);

    await shopPage.addProduct(productName);
    await shopPage.openCart();

    await expect(page.locator('.cart_item')).toContainText(productName);
  });
});