const { BasePage } = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productList = page.locator('.inventory_item');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
  }

  async addProduct(productName) {
    const productCard = this.productList.filter({ hasText: productName });
    await productCard.locator('button').click();
  }

  async openCart() {
    await this.cartButton.click();
  }
}

module.exports = { ProductsPage };
