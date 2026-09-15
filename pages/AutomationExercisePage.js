const { BasePage } = require('./BasePage');

class AutomationExercisePage extends BasePage {
  constructor(page) {
    super(page);
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
    this.loggedInUser = page.getByText(/Logged in as/);

    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');

    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productCards = page.locator('.product-image-wrapper');
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.proceedToCheckoutLink = page.getByText('Proceed To Checkout');
    this.placeOrderLink = page.getByText('Place Order');

    this.orderNameInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');

    this.subscriptionEmailInput = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('#success-subscribe');

    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
    this.contactNameInput = page.locator('[data-qa="name"]');
    this.contactEmailInput = page.locator('[data-qa="email"]');
    this.contactSubjectInput = page.locator('[data-qa="subject"]');
    this.contactMessageInput = page.locator('[data-qa="message"]');
    this.contactSubmitButton = page.locator('[data-qa="submit-button"]');
    this.contactSuccess = page.locator('.status.alert-success');
  }

  async open() {
    await this.page.goto('https://automationexercise.com/');
  }

  async openLogin() {
    await this.signupLoginLink.click();
  }

  async signUp(name, email, password) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
    await this.passwordInput.fill(password);
    await this.firstNameInput.fill('Playwright');
    await this.lastNameInput.fill('User');
    await this.addressInput.fill('123 Test Street');
    await this.countrySelect.selectOption({ label: 'India' });
    await this.stateInput.fill('Karnataka');
    await this.cityInput.fill('Bengaluru');
    await this.zipcodeInput.fill('560001');
    await this.mobileNumberInput.fill('9876543210');
    await this.createAccountButton.click();
  }

  async login(email, password) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async openProducts() {
    await this.productsLink.click();
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  product(productName) {
    return this.productCards.filter({ hasText: productName });
  }

  async addProduct(productName) {
    await this.product(productName).getByText('Add to cart').click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async checkout(order) {
    await this.proceedToCheckoutLink.click();
    await this.placeOrderLink.click();
    await this.orderNameInput.fill(order.name);
    await this.cardNumberInput.fill(order.cardNumber);
    await this.cvcInput.fill(order.cvc);
    await this.expiryMonthInput.fill(order.expiryMonth);
    await this.expiryYearInput.fill(order.expiryYear);
    await this.payButton.click();
  }

  async subscribe(email) {
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.click();
  }

  async submitContactForm(contact) {
    await this.contactNameInput.fill(contact.name);
    await this.contactEmailInput.fill(contact.email);
    await this.contactSubjectInput.fill(contact.subject);
    await this.contactMessageInput.fill(contact.message);
    await this.contactSubmitButton.click();
  }
}

module.exports = { AutomationExercisePage };