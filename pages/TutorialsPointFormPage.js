const { BasePage } = require('./BasePage');

class TutorialsPointFormPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#email');
    this.mobileInput = page.locator('#mobile');
    this.addressInput = page.locator('#address');
    this.genderRadio = page.locator('input[name="gender"]').first();
    this.submitButton = page.locator('#submit, button[type="submit"], input[type="submit"]').first();
  }

  async open() {
    await this.page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
  }

  async submitForm(details) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.mobileInput.fill(details.mobile);
    await this.addressInput.fill(details.address);
    await this.genderRadio.check();
    await this.submitButton.click();
  }
}

module.exports = { TutorialsPointFormPage };