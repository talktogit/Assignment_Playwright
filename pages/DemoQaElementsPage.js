const { BasePage } = require('./BasePage');

class DemoQaElementsPage extends BasePage {
  constructor(page) {
    super(page);
    this.userNameInput = page.locator('#userName');
    this.userEmailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');
    this.output = page.locator('#output');
    this.homeCheckbox = page.locator('label[for="tree-node-home"]');
    this.checkboxResult = page.locator('#result');
    this.yesRadio = page.locator('label[for="yesRadio"]');
    this.radioResult = page.locator('.text-success');
    this.addRecordButton = page.locator('#addNewRecordButton');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.ageInput = page.locator('#age');
    this.emailInput = page.locator('#userEmail');
    this.salaryInput = page.locator('#salary');
    this.departmentInput = page.locator('#department');
    this.tableSubmitButton = page.locator('#submit');
    this.tableRows = page.locator('.rt-tbody .rt-tr-group');
  }

  async openTextBox() {
    await this.page.goto('https://demoqa.com/text-box');
  }

  async submitTextBox(details) {
    await this.userNameInput.fill(details.name);
    await this.userEmailInput.fill(details.email);
    await this.currentAddressInput.fill(details.currentAddress);
    await this.permanentAddressInput.fill(details.permanentAddress);
    await this.submitButton.click();
  }

  async openCheckboxes() {
    await this.page.goto('https://demoqa.com/checkbox');
  }

  async selectHomeCheckbox() {
    await this.homeCheckbox.click();
  }

  async openRadioButtons() {
    await this.page.goto('https://demoqa.com/radio-button');
  }

  async selectYesRadio() {
    await this.yesRadio.click();
  }

  async openWebTables() {
    await this.page.goto('https://demoqa.com/webtables');
  }

  async addTableRecord(record) {
    await this.addRecordButton.click();
    await this.firstNameInput.fill(record.firstName);
    await this.lastNameInput.fill(record.lastName);
    await this.ageInput.fill(record.age);
    await this.emailInput.fill(record.email);
    await this.salaryInput.fill(record.salary);
    await this.departmentInput.fill(record.department);
    await this.tableSubmitButton.click();
  }
}

module.exports = { DemoQaElementsPage };