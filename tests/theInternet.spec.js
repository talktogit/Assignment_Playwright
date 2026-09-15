const { test, expect } = require('@playwright/test');
const { TheInternetPage } = require('../pages/TheInternetPage');

test.describe('The Internet isolated challenges', () => {
  let internetPage;

  test.beforeEach(async ({ page }) => {
    internetPage = new TheInternetPage(page);
    await internetPage.open();
  });

  test('user can load dynamic content and drag an item', async ({ page }) => {
    await internetPage.open('/dynamic_loading/1');
    await internetPage.loadDynamicContent();
    await expect(internetPage.dynamicResult).toHaveText('Hello World!');

    await internetPage.open('/drag_and_drop');
    await internetPage.dragAndDrop();
    await expect(internetPage.dragTarget).toHaveText('A');
  });

  test('user can upload and download a file', async ({ page }) => {
    await internetPage.open('/upload');
    await internetPage.uploadFile({
      name: 'playwright-upload.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Playwright upload test'),
    });
    await expect(internetPage.uploadedFiles).toHaveText('playwright-upload.txt');

    await internetPage.open('/download');
    const download = await internetPage.downloadFirstFile();
    expect(await download.suggestedFilename()).toBeTruthy();
  });

  test('user can handle JavaScript alerts and prompt', async ({ page }) => {
    await internetPage.open('/javascript_alerts');
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });
    await internetPage.triggerAlert();
    await expect(internetPage.alertResult).toHaveText('You successfully clicked an alert');

    page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
    await internetPage.triggerConfirm();
    await expect(internetPage.alertResult).toHaveText('You clicked: Cancel');

    page.once('dialog', async dialog => {
      await dialog.accept('Playwright');
    });
    await internetPage.triggerPrompt();
    await expect(internetPage.alertResult).toHaveText('You entered: Playwright');
  });

  test('user can interact with hover, infinite scroll, shadow DOM, and A/B test', async ({ page }) => {
    await internetPage.open('/hovers');
    await internetPage.hoverOver(0);
    await expect(page.locator('.figcaption').first()).toBeVisible();

    await internetPage.open('/infinite_scroll');
    const initialParagraphs = page.locator('.jscroll-added');
    await internetPage.scrollToBottom();
    await expect(initialParagraphs).toHaveCount(1);

    await internetPage.open('/shadowdom');
    await expect(internetPage.shadowContent()).toContainText('some text');

    await internetPage.open('/abtest');
    await expect(internetPage.abTestHeading).toContainText(/A\/B Test/);
  });
});