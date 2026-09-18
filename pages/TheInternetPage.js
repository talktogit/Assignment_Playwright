const { BasePage } = require('./BasePage');

class TheInternetPage extends BasePage {
  constructor(page) {
    super(page);
    this.startButton = page.getByRole('button', { name: 'Start' });
    this.dynamicResult = page.locator('#finish h4');
    this.dragSource = page.locator('#column-a');
    this.dragTarget = page.locator('#column-b');
    this.uploadInput = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit');
    this.uploadedFiles = page.locator('#uploaded-files');
    this.downloadLinks = page.locator('#content a');
    this.alertButton = page.getByRole('button', { name: 'Click for JS Alert' });
    this.confirmButton = page.getByRole('button', { name: 'Click for JS Confirm' });
    this.promptButton = page.getByRole('button', { name: 'Click for JS Prompt' });
    this.alertResult = page.locator('#result');
    this.hoverFigures = page.locator('.figure');
    this.infiniteScrollPage = page.locator('body');
    this.shadowHost = page.locator('#shadow_host');
    this.abTestHeading = page.locator('h3');
  }

  async open(path = '/') {
    await this.page.goto(`https://the-internet.herokuapp.com${path}`);
  }

  async loadDynamicContent() {
    await this.startButton.click();
  }

  async dragAndDrop() {
    await this.dragSource.dragTo(this.dragTarget);
  }

  async uploadFile(file) {
    await this.uploadInput.setInputFiles(file);
    await this.uploadButton.click();
  }

  async downloadFirstFile() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadLinks.first().click();
    return downloadPromise;
  }

  async triggerAlert() {
    await this.alertButton.click();
  }

  async triggerConfirm() {
    await this.confirmButton.click();
  }

  async triggerPrompt() {
    await this.promptButton.click();
  }

  async hoverOver(index) {
    await this.hoverFigures.nth(index).hover();
  }

  async scrollToBottom() {
    await this.infiniteScrollPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  shadowContent() {
    return this.shadowHost.locator('#shadow_content');
  }
}

module.exports = { TheInternetPage };