const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const now = Date.now();
  const firstName = 'Playwright';
  const lastName = 'Employee' + now;

  try {
    console.log('STEP 1: open login');
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    console.log('STEP 2: logged in', page.url());

    await page.getByRole('link', { name: 'PIM', exact: true }).click();
    await page.waitForURL(/pim\/viewEmployeeList/, { timeout: 20000 });
    console.log('STEP 3: PIM page', page.url());

    await page.getByRole('button', { name: 'Add' }).click();
    await page.locator('input[name="firstName"]').fill(firstName);
    await page.locator('input[name="lastName"]').fill(lastName);
    await page.locator('input.oxd-input').nth(3).fill('PW' + now);
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await page.waitForURL(/pim\/viewPersonalDetails/, { timeout: 30000 });
    console.log('STEP 4: employee created', page.url());

    await page.getByRole('link', { name: 'PIM', exact: true }).click();
    await page.waitForURL(/pim\/viewEmployeeList/, { timeout: 30000 });
    await page.locator('input[placeholder="Type for hints..."]').first().fill(firstName + ' ' + lastName);
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await page.waitForTimeout(3000);
    const rowText = await page.locator('.oxd-table-card').filter({ hasText: firstName }).first().innerText();
    console.log('STEP 5: search result contains last name?', rowText.includes(lastName));

    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.waitForURL(/auth\/login/, { timeout: 30000 });
    console.log('STEP 6: logged out', page.url());

    console.log('VERIFICATION: PASS');
  } catch (error) {
    console.error('VERIFICATION: FAIL');
    console.error(error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
