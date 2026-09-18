const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
  }

  item(productName) {
    return this.cartItems.filter({ hasText: productName });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
