const { test, expect } = require('@playwright/test');
const { TutorialsPointFormPage } = require('../pages/TutorialsPointFormPage');
const { TutorialsPointResultPage } = require('../pages/TutorialsPointResultPage');

test.describe('Tutorialspoint practice form', () => {
  let formPage;
  let resultPage;

  test.beforeEach(async ({ page }) => {
    formPage = new TutorialsPointFormPage(page);
    resultPage = new TutorialsPointResultPage(page);
    await formPage.open();
  });

  test('user can submit the form and see the confirmation result', async () => {
    const formData = {
      firstName: 'Playwright',
      lastName: 'Tester',
      email: 'playwright@example.com',
      mobile: '9876543210',
      address: '123 Automation Street',
    };

    await formPage.submitForm(formData);
    await resultPage.waitForResult();

    await expect(resultPage.resultContains(formData.firstName)).toBeVisible();
    await expect(resultPage.resultContains(formData.lastName)).toBeVisible();
    await expect(resultPage.resultContains(formData.email)).toBeVisible();
  });
});