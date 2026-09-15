const { BasePage } = require('./BasePage');

class DemoBlazePage extends BasePage {
  constructor(page) {
    super(page);
    this.productCards = page.locator('#tbodyid .card');
    this.cartLink = page.locator('#cartur');
    this.cartRows = page.locator('#tbodyid tr.success');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.nameInput = page.locator('#name');
    this.countryInput = page.locator('#country');
    this.cityInput = page.locator('#city');
    this.cardInput = page.locator('#card');
    this.monthInput = page.locator('#month');
    this.yearInput = page.locator('#year');
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
    this.successMessage = page.locator('.sweet-alert h2');
  }

  async open() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  product(productName) {
    return this.productCards.filter({ hasText: productName });
  }

  async addProduct(productName) {
    await this.product(productName).locator('a').click();
    await this.page.once('dialog', dialog => dialog.accept());
    await this.page.getByRole('link', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async placeOrder(customer) {
    await this.placeOrderButton.click();
    await this.nameInput.fill(customer.name);
    await this.countryInput.fill(customer.country);
    await this.cityInput.fill(customer.city);
    await this.cardInput.fill(customer.card);
    await this.monthInput.fill(customer.month);
    await this.yearInput.fill(customer.year);
    await this.purchaseButton.click();
  }
}

module.exports = { DemoBlazePage };