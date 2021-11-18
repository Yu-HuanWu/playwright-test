const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  // YOUR CODE STARTS

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto("https://www.netflix.com");
  await page.click(".authLinks.redButton");
  await page.type('.hybrid-login-form .nfEmailPhoneControls .nfTextField', 'an_invalid_wolf_email');
  await page.type('.hybrid-login-form .nfPasswordControls .nfTextField', 'password')
  await page.keyboard.press('Enter', {delay: 2000});
  try {
    await page.waitForSelector('.ui-message-contents', { timeout: 5000 });
    const content = await page.textContent('.ui-message-contents');
    console.log(content);
    console.log("Test successful: cannot sign in with an invalid email/password combination")
  } catch {
    console.log('Test failed or the email/password combination was unintentionally valid');
  }
    // YOUR CODE ENDS
})();
