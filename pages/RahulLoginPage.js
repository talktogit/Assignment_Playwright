const { BasePage } = require('./BasePage');

class RahulLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('#signInBtn');
    this.shopTitle = page.getByText('Shop Name', { exact: true });
    this.productCards = page.locator('.card');
    this.errorMessage = page.locator('.alert-danger');
  }

  async open() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractice/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

module.exports = { RahulLoginPage };