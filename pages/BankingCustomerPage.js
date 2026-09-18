const { BasePage } = require('./BasePage');

class BankingCustomerPage extends BasePage {
  constructor(page) {
    super(page);
    this.accountSelect = page.locator('#accountSelect');
    this.depositTab = page.getByRole('button', { name: 'Deposit' });
    this.withdrawTab = page.getByRole('button', { name: 'Withdrawl' });
    this.transactionsTab = page.getByRole('button', { name: 'Transactions' });
    this.amountInput = page.locator('input[ng-model="amount"]');
    this.depositButton = page.getByRole('button', { name: 'Deposit' }).last();
    this.withdrawButton = page.getByRole('button', { name: 'Withdraw' });
    this.balance = page.locator('.borderM strong').nth(1);
    this.transactionRows = page.locator('table.table tbody tr');
  }

  async selectAccount(accountNumber) {
    await this.accountSelect.selectOption({ label: accountNumber });
  }

  async deposit(amount) {
    await this.depositTab.click();
    await this.amountInput.fill(String(amount));
    await this.depositButton.click();
  }

  async withdraw(amount) {
    await this.withdrawTab.click();
    await this.amountInput.fill(String(amount));
    await this.withdrawButton.click();
  }

  async openTransactions() {
    await this.transactionsTab.click();
  }
}

module.exports = { BankingCustomerPage };