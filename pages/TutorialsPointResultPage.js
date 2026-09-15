const { BasePage } = require('./BasePage');

class TutorialsPointResultPage extends BasePage {
  constructor(page) {
    super(page);
    this.resultSection = page.locator('body');
    this.confirmationMessage = page.getByText(/success|submitted|thank you/i).first();
  }

  async waitForResult() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  resultContains(value) {
    return this.resultSection.getByText(value, { exact: false });
  }
}

module.exports = { TutorialsPointResultPage };