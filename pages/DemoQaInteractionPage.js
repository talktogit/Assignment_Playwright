const { BasePage } = require('./BasePage');

class DemoQaInteractionPage extends BasePage {
  constructor(page) {
    super(page);
    this.alertButton = page.locator('#alertButton');
    this.confirmButton = page.locator('#confirmButton');
    this.frame = page.locator('#frame');
    this.slider = page.locator('input[type="range"]');
    this.originTab = page.locator('#demo-tab-origin');
    this.tabContent = page.locator('#demo-tabpane-origin');
    this.dateInput = page.locator('#datePickerMonthYearInput');
  }

  async openAlerts() {
    await this.page.goto('https://demoqa.com/alerts');
  }

  async triggerAlert() {
    await this.alertButton.click();
  }

  async triggerConfirm() {
    await this.confirmButton.click();
  }

  async openFrames() {
    await this.page.goto('https://demoqa.com/frames');
  }

  async frameHeading() {
    return this.frame.contentFrame().locator('#sampleHeading');
  }

  async openDatePicker() {
    await this.page.goto('https://demoqa.com/date-picker');
  }

  async setDate(date) {
    await this.dateInput.fill(date);
    await this.dateInput.press('Enter');
  }

  async openSlider() {
    await this.page.goto('https://demoqa.com/slider');
  }

  async setSlider(value) {
    await this.slider.fill(String(value));
  }

  async openTabs() {
    await this.page.goto('https://demoqa.com/tabs');
  }

  async selectOriginTab() {
    await this.originTab.click();
  }
}

module.exports = { DemoQaInteractionPage };