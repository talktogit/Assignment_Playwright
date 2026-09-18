const { BasePage } = require('./BasePage');

class DropdownsPracticePage extends BasePage {
  constructor(page) {
    super(page);
    this.roundTripRadio = page.locator('#ctl00_mainContent_rbtnl_Trip_1');
    this.originDropdown = page.locator('#ctl00_mainContent_ddl_originStation1');
    this.destinationDropdown = page.locator('#ctl00_mainContent_ddl_destinationStation1');
    this.departureDateInput = page.locator('#ctl00_mainContent_view_date1');
    this.passengerDropdown = page.locator('#divpaxinfo');
    this.adultIncrement = page.locator('#hrefIncAdt');
    this.doneButton = page.getByRole('button', { name: 'Done' });
    this.searchButton = page.locator('#ctl00_mainContent_btnSearch');
    this.searchResults = page.locator('#availability');
  }

  async open() {
    await this.page.goto('https://rahulshettyacademy.com/dropdownsPractice/');
  }

  async selectRoundTrip() {
    await this.roundTripRadio.check();
  }

  async selectRoute(origin, destination) {
    await this.originDropdown.selectOption({ label: origin });
    await this.destinationDropdown.selectOption({ label: destination });
  }

  async selectDepartureDate(date) {
    await this.departureDateInput.fill(date);
  }

  async addAdultPassenger() {
    await this.passengerDropdown.click();
    await this.adultIncrement.click();
    await this.doneButton.click();
  }

  async search() {
    await this.searchButton.click();
  }
}

module.exports = { DropdownsPracticePage };