const { BasePage } = require('./BasePage');

class BankingLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.managerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
    this.customerLoginButton = page.getByRole('button', { name: 'Customer Login' });
    this.customerSelect = page.locator('#userSelect');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  }

  async loginAsManager() {
    await this.managerLoginButton.click();
  }

  async loginAsCustomer(customerName) {
    await this.customerLoginButton.click();
    await this.customerSelect.selectOption({ label: customerName });
    await this.loginButton.click();
  }
}

module.exports = { BankingLoginPage };