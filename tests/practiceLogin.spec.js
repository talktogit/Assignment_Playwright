const { test, expect } = require('@playwright/test');
const { PracticeLoginPage } = require('../pages/PracticeLoginPage');

const validUser = {
  username: 'student',
  password: 'Password123',
};

test.describe('Practice Test Automation login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new PracticeLoginPage(page);
    await loginPage.open();
  });

  test('valid user reaches the success page', async () => {
    await loginPage.login(validUser.username, validUser.password);

    await expect(loginPage.page).toHaveURL(/logged-in-successfully/);
    await expect(loginPage.successHeading).toBeVisible();
  });

  test('invalid user sees a failure message', async () => {
    await loginPage.login('incorrectUser', 'incorrectPassword');

    await expect(loginPage.errorMessage).toContainText('Your username is invalid!');
    await expect(loginPage.page).toHaveURL(/practice-test-login/);
  });
});