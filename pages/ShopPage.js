const { BasePage } = require('./BasePage');

class ShopPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator('input.search-field');
    this.searchButton = page.locator('button[type="submit"]');
    this.productCards = page.locator('ul.products li.product');
    this.cartLink = page.locator('a.cart-contents');
  }

  async open() {
    await this.page.goto('https://practice.automationtesting.in/shop/');
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  product(productName) {
    return this.productCards.filter({ hasText: productName });
  }

  async addProduct(productName) {
    await this.product(productName).locator('a.button').click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { ShopPage };