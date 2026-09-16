const { test, expect } = require('@playwright/test');
const { OrangeHrmLoginPage } = require('../pages/OrangeHrmLoginPage');
const { OrangeHrmNavigation } = require('../pages/OrangeHrmNavigation');
const { OrangeHrmPimPage } = require('../pages/OrangeHrmPimPage');

const adminUser = {
  username: 'Admin',
  password: 'admin123',
};

test.describe.serial('OrangeHRM admin workflow', () => {
  let loginPage;
  let navigation;
  let pimPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new OrangeHrmLoginPage(page);
    navigation = new OrangeHrmNavigation(page);
    pimPage = new OrangeHrmPimPage(page);
    await loginPage.open();
  });

  test('admin can add, search, and log out', async () => {
    const employee = {
      firstName: 'Playwright',
      lastName: `Employee${Date.now()}`,
    };

    await loginPage.login(adminUser.username, adminUser.password);
    await expect(loginPage.page).toHaveURL(/dashboard/);

    await navigation.openPim();
    await expect(pimPage.employeeListHeading).toBeVisible();
    await pimPage.addEmployee(employee.firstName, employee.lastName);
    await expect(loginPage.page).toHaveURL(/pim\/viewPersonalDetails/, { timeout: 20000 });

    await navigation.openPim();
    await pimPage.searchEmployee(`${employee.firstName} ${employee.lastName}`);
    await expect(pimPage.employeeRow(employee.firstName)).toContainText(employee.lastName, { timeout: 20000 });

    await navigation.logout();
    await expect(loginPage.page).toHaveURL(/auth\/login/);
    await expect(loginPage.usernameInput).toBeVisible();
  });
});