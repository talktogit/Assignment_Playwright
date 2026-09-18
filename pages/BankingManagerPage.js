const { BasePage } = require('./BasePage');

class BankingManagerPage extends BasePage {
  constructor(page) {
    super(page);
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountTab = page.getByRole('button', { name: 'Open Account' });
    this.customersTab = page.getByRole('button', { name: 'Customers' });
    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postCodeInput = page.locator('input[ng-model="postCd"]');
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' }).last();
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async addCustomer(firstName, lastName, postCode) {
    await this.addCustomerTab.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
    await this.addCustomerButton.click();
  }

  async openAccount(customerName, currency = 'Dollar') {
    await this.openAccountTab.click();
    await this.customerSelect.selectOption({ label: customerName });
    await this.currencySelect.selectOption({ label: currency });
    await this.processButton.click();
  }

  async openCustomers() {
    await this.customersTab.click();
  }

  customerRow(customerName) {
    return this.page.locator('tbody tr').filter({ hasText: customerName });
  }
}

module.exports = { BankingManagerPage };