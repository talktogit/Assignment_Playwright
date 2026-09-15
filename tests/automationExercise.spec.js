const { test, expect } = require('@playwright/test');
const { AutomationExercisePage } = require('../pages/AutomationExercisePage');

function createTestUser() {
  return {
    name: 'Playwright User',
    email: `playwright_${Date.now()}_${Math.random().toString(36).slice(2)}@example.com`,
    password: 'Password123!',
  };
}

test.describe('Automation Exercise workflows', () => {
  let automationExercisePage;

  test.beforeEach(async ({ page }) => {
    automationExercisePage = new AutomationExercisePage(page);
    await automationExercisePage.open();
  });

  test('user can sign up, log out, and log back in', async () => {
    const testUser = createTestUser();
    await automationExercisePage.openLogin();
    await automationExercisePage.signUp(testUser.name, testUser.email, testUser.password);

    await expect(automationExercisePage.page).toHaveURL(/account_created/);
    await expect(automationExercisePage.loggedInUser).toContainText(testUser.name);

    await automationExercisePage.logoutLink.click();
    await automationExercisePage.login(testUser.email, testUser.password);
    await expect(automationExercisePage.loggedInUser).toContainText(testUser.name);
  });

  test('user can search for a product, add it to cart, and checkout', async () => {
    const testUser = createTestUser();
    await automationExercisePage.openLogin();
    await automationExercisePage.signUp(testUser.name, testUser.email, testUser.password);
    await automationExercisePage.openProducts();
    await automationExercisePage.searchProduct('blue top');
    await expect(automationExercisePage.product('Blue Top')).toHaveCount(1);

    await automationExercisePage.addProduct('Blue Top');
    await automationExercisePage.continueShoppingButton.click();
    await automationExercisePage.openCart();

    await expect(automationExercisePage.page.locator('#cart_info_table')).toContainText('Blue Top');
    await automationExercisePage.checkout({
      name: 'Playwright User',
      cardNumber: '4111111111111111',
      cvc: '123',
      expiryMonth: '09',
      expiryYear: '2026',
    });

    await expect(automationExercisePage.page.locator('[data-qa="order-placed"]')).toBeVisible();
  });

  test('user can subscribe from the home page', async () => {
    await automationExercisePage.subscribe(`subscriber_${Date.now()}@example.com`);
    await expect(automationExercisePage.subscriptionSuccess).toContainText('You have been successfully subscribed');
  });

  test('user can submit the contact us form', async () => {
    await automationExercisePage.contactUsLink.click();
    await automationExercisePage.submitContactForm({
      name: 'Playwright User',
      email: 'contact@example.com',
      subject: 'Test enquiry',
      message: 'This contact form was submitted by a Playwright test.',
    });

    await expect(automationExercisePage.contactSuccess).toContainText('Success! Your details have been submitted successfully');
  });
});