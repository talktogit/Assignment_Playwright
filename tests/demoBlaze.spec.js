const { test, expect } = require('@playwright/test');
const { DemoBlazePage } = require('../pages/DemoBlazePage');

const productName = 'Samsung galaxy s6';
const customer = {
  name: 'John Doe',
  country: 'India',
  city: 'Bengaluru',
  card: '4111111111111111',
  month: '09',
  year: '2026',
};

async function givenUserIsOnDemoBlaze(page) {
  const demoBlazePage = new DemoBlazePage(page);
  await demoBlazePage.open();
  return demoBlazePage;
}

async function whenUserAddsProductToCart(demoBlazePage, product) {
  await demoBlazePage.addProduct(product);
  await demoBlazePage.openCart();
}

async function whenUserPlacesOrder(demoBlazePage, orderCustomer) {
  await demoBlazePage.placeOrder(orderCustomer);
}

async function thenCartContainsProduct(demoBlazePage, product) {
  await expect(demoBlazePage.cartRows).toContainText(product);
}

test.describe('DemoBlaze BDD purchase flow', () => {
  let demoBlazePage;

  test.beforeEach(async ({ page }) => {
    demoBlazePage = await givenUserIsOnDemoBlaze(page);
  });

  test('user can add a listed product and place an order', async () => {
    await expect(demoBlazePage.product(productName)).toHaveCount(1);

    await whenUserAddsProductToCart(demoBlazePage, productName);
    await thenCartContainsProduct(demoBlazePage, productName);

    await whenUserPlacesOrder(demoBlazePage, customer);

    await expect(demoBlazePage.successMessage).toHaveText('Thank you for your purchase!');
  });
});