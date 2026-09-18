const { BasePage } = require('./BasePage');

class OrangeHrmNavigation extends BasePage {
  constructor(page) {
    super(page);
    this.pimLink = page.getByRole('link', { name: 'PIM', exact: true });
    this.adminLink = page.getByRole('link', { name: 'Admin', exact: true });
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
  }

  async openPim() {
    await this.pimLink.click();
  }

  async openAdmin() {
    await this.adminLink.click();
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutLink.click();
  }
}

module.exports = { OrangeHrmNavigation };