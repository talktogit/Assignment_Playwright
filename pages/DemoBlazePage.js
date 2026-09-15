const { BasePage } = require('./BasePage');

class DemoblazePage extends BasePage {
  constructor(page) {
    super(page);
    this.productCards = page.locator('#tbodyid .card');
    this.cartLink = page.locator('#cartur');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.nameInput = page.locator('#name');
    this.countryInput = page.locator('#country');
    this.cityInput = page.locator('#city');
    this.cardInput = page.locator('#card');
    this.monthInput = page.locator('#month');
    this.yearInput = page.locator('#year');
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
    this.signupLink = page.locator('#signin2');
    this.signupUsernameInput = page.locator('#sign-username');
    this.signupPasswordInput = page.locator('#sign-password');
    this.signupButton = page.getByRole('button', { name: 'Sign up' });
    this.loginLink = page.locator('#login2');
    this.loginUsernameInput = page.locator('#loginusername');
    this.loginPasswordInput = page.locator('#loginpassword');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.welcomeUser = page.locator('#nameofuser');
  }

  async open() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  product(productName) {
    return this.productCards.filter({ hasText: productName });
  }

  async openProduct(productName) {
    await this.product(productName).locator('.hrefch').click();
  }

  async addCurrentProductToCart() {
    await this.page.locator('a').filter({ hasText: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async placeOrder(order) {
    await this.placeOrderButton.click();
    await this.nameInput.fill(order.name);
    await this.countryInput.fill(order.country);
    await this.cityInput.fill(order.city);
    await this.cardInput.fill(order.card);
    await this.monthInput.fill(order.month);
    await this.yearInput.fill(order.year);
    await this.purchaseButton.click();
  }

  async signUp(username, password) {
    await this.signupLink.click();
    await this.signupUsernameInput.fill(username);
    await this.signupPasswordInput.fill(password);
    await this.signupButton.click();
  }

  async login(username, password) {
    await this.loginLink.click();
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { DemoblazePage };