const { test, expect } = require('@playwright/test');
const { BankingLoginPage } = require('../pages/BankingLoginPage');
const { BankingManagerPage } = require('../pages/BankingManagerPage');
const { BankingCustomerPage } = require('../pages/BankingCustomerPage');

test.describe('GlobalSQA Banking Project success flow', () => {
  let loginPage;
  let managerPage;
  let customerPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new BankingLoginPage(page);
    managerPage = new BankingManagerPage(page);
    customerPage = new BankingCustomerPage(page);
    await loginPage.open();
  });

  test('manager can add a customer, open an account, and customer can transact', async ({ page }) => {
    const customer = {
      name: `Playwright${Date.now()}`,
      lastName: 'Customer',
      postCode: '560001',
    };

    await loginPage.loginAsManager();
    await expect(page).toHaveURL(/manager/);

    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Customer added successfully');
      await dialog.accept();
    });
    await managerPage.addCustomer(customer.name, customer.lastName, customer.postCode);

    await managerPage.openCustomers();
    await expect(managerPage.customerRow(customer.name)).toContainText(customer.lastName);

    await loginPage.open();
    await loginPage.loginAsManager();

    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Account created successfully');
      await dialog.accept();
    });
    await managerPage.openAccount(`${customer.name} ${customer.lastName}`);

    await loginPage.open();
    await loginPage.loginAsCustomer(`${customer.name} ${customer.lastName}`);
    await expect(page).toHaveURL(/customer/);
    await customerPage.selectAccount(`${customer.name} ${customer.lastName}`);

    await customerPage.deposit(500);
    await expect(customerPage.balance).toHaveText('500');
    await customerPage.withdraw(100);
    await expect(customerPage.balance).toHaveText('400');

    await customerPage.openTransactions();
    await expect(customerPage.transactionRows).toHaveCount(2);
  });
});