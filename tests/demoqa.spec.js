const { test, expect } = require('@playwright/test');
const { DemoQaElementsPage } = require('../pages/DemoQaElementsPage');
const { DemoQaInteractionPage } = require('../pages/DemoQaInteractionPage');

test.describe('DemoQA component workflows', () => {
  let elementsPage;
  let interactionPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/');
    elementsPage = new DemoQaElementsPage(page);
    interactionPage = new DemoQaInteractionPage(page);
  });

  test('user can submit a text box, checkbox, and radio button', async ({ page }) => {
    await elementsPage.openTextBox();
    await elementsPage.submitTextBox({
      name: 'Playwright User',
      email: 'playwright@example.com',
      currentAddress: 'Current address',
      permanentAddress: 'Permanent address',
    });
    await expect(elementsPage.output).toContainText('Playwright User');
    await expect(elementsPage.output).toContainText('playwright@example.com');

    await elementsPage.openCheckboxes();
    await elementsPage.selectHomeCheckbox();
    await expect(elementsPage.checkboxResult).toContainText('home');

    await elementsPage.openRadioButtons();
    await elementsPage.selectYesRadio();
    await expect(elementsPage.radioResult).toHaveText('Yes');
    await expect(page).toHaveURL(/radio-button/);
  });

  test('user can add a record to web tables', async () => {
    await elementsPage.openWebTables();
    await elementsPage.addTableRecord({
      firstName: 'Playwright',
      lastName: 'Tester',
      age: '30',
      email: 'table@example.com',
      salary: '50000',
      department: 'QA',
    });

    await expect(elementsPage.tableRows).toContainText('table@example.com');
  });

  test('user can handle alerts and read content inside a frame', async ({ page }) => {
    await interactionPage.openAlerts();
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('You clicked a button');
      await dialog.accept();
    });
    await interactionPage.triggerAlert();

    page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
    await interactionPage.triggerConfirm();

    await interactionPage.openFrames();
    await expect(await interactionPage.frameHeading()).toHaveText('This is a sample page');
  });

  test('user can set a date, slider, and tab', async () => {
    await interactionPage.openDatePicker();
    await interactionPage.setDate('09/15/2026');
    await expect(interactionPage.dateInput).toHaveValue('09/15/2026');

    await interactionPage.openSlider();
    await interactionPage.setSlider(75);
    await expect(interactionPage.slider).toHaveValue('75');

    await interactionPage.openTabs();
    await interactionPage.selectOriginTab();
    await expect(interactionPage.tabContent).toBeVisible();
  });
});