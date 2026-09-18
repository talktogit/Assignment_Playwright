const { test, expect } = require('@playwright/test');
const { DropdownsPracticePage } = require('../pages/DropdownsPracticePage');
const { RahulLoginPage } = require('../pages/RahulLoginPage');

test.describe('Rahul Shetty Academy success flows', () => {
  let dropdownsPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    dropdownsPage = new DropdownsPracticePage(page);
    loginPage = new RahulLoginPage(page);
  });

  test('user can select a route and search for a flight', async () => {
    await dropdownsPage.open();
    await dropdownsPage.selectRoundTrip();
    await dropdownsPage.selectRoute('Bengaluru (BLR)', 'Chennai (MAA)');
    await dropdownsPage.selectDepartureDate('09/20');
    await dropdownsPage.addAdultPassenger();
    await dropdownsPage.search();

    await expect(dropdownsPage.searchResults).toBeVisible();
  });

  test('valid user can log in successfully', async () => {
    await loginPage.open();
    await loginPage.login('rahulshettyacademy', 'learning');

    await expect(loginPage.page).toHaveURL(/angularpractice\/shop/);
    await expect(loginPage.shopTitle).toBeVisible();
    await expect(loginPage.productCards).toHaveCount(4);
  });
});