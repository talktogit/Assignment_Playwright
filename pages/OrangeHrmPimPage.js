const { BasePage } = require('./BasePage');

class OrangeHrmPimPage extends BasePage {
  constructor(page) {
    super(page);
    this.addEmployeeButton = page.getByRole('button', { name: 'Add'});
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input.oxd-input').nth(3);
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.employeeRows = page.locator('.oxd-table-card');
    this.employeeListHeading = page.getByRole('heading', { name: 'Employee Information' });
  }

  async addEmployee(firstName, lastName, employeeId = `PW${Date.now()}`) {
    await this.addEmployeeButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(employeeId);
    await this.saveButton.click();
  }

  async searchEmployee(employeeName) {
    await this.employeeNameInput.fill(employeeName);
    await this.searchButton.click();
  }

  employeeRow(employeeName) {
    return this.employeeRows.filter({ hasText: employeeName });
  }
}

module.exports = { OrangeHrmPimPage };