const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

const validUser = {
  username: 'standard_user',
  password: 'secret_sauce',
};

const negativeUsers = {
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performance: { username: 'performance_glitch_user', password: 'secret_sauce' },
};

const productName = 'Sauce Labs Backpack';

async function givenUserIsOnSauceDemoPage(page) {
  await page.goto('https://www.saucedemo.com/');
}

async function whenUserLogsIn(page, username, password) {
  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);
  return loginPage;
}

async function whenUserAddsProductToCart(page, product) {
  const productsPage = new ProductsPage(page);
  await productsPage.addProduct(product);
  await productsPage.openCart();
  return productsPage;
}

async function whenUserCompletesCheckout(page, firstName, lastName, postalCode) {
  const cartPage = new CartPage(page);
  await cartPage.checkout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillCustomerInfo(firstName, lastName, postalCode);
  await checkoutPage.continueCheckout();
  await checkoutPage.finishOrder();

  return checkoutPage;
}

async function thenCartContainsProduct(page, product) {
  const cartPage = new CartPage(page);
  await expect(cartPage.item(product)).toHaveCount(1);
  await expect(cartPage.item(product).locator('[data-test="inventory-item-name"]')).toHaveText(product);
}

test.describe('SauceDemo BDD purchase flow', () => {
  test.beforeEach(async ({ page }) => {
    await givenUserIsOnSauceDemoPage(page);
  });

  test('success: valid user can login and complete the order', async ({ page }) => {
    await whenUserLogsIn(page, validUser.username, validUser.password);

    await expect(page.locator('.title')).toHaveText('Products');

    await whenUserAddsProductToCart(page, productName);
    await thenCartContainsProduct(page, productName);

    await whenUserCompletesCheckout(page, 'John', 'Doe', '560001');

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('negative: locked out user cannot log in', async ({ page }) => {
    await whenUserLogsIn(page, negativeUsers.lockedOut.username, negativeUsers.lockedOut.password);

    const errorText = await page.locator('[data-test="error"]').textContent();
    expect(errorText).toContain('locked out');
  });

  test('negative: problem user can log in and reaches product catalog', async ({ page }) => {
    await whenUserLogsIn(page, negativeUsers.problem.username, negativeUsers.problem.password);

    await expect(page.locator('.title')).toHaveText('Products');
    await whenUserAddsProductToCart(page, productName);
    await thenCartContainsProduct(page, productName);
  });
});
