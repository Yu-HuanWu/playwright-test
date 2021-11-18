const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  // YOUR CODE STARTS

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto("https://ewetube.herokuapp.com/#/");
  await page.click('.login');
  await page.type('css=[placeholder="Username"]', 'random_invalid_url');
  await page.type('css=[placeholder="Password"]', 'password');
  // await page.keyboard.press('Enter', {delay: 2000});
  await page.click('.form-box button');
  try {
    await page.waitForSelector('.error', { timeout: 5000 });
    const content = await page.textContent('.error');
    console.log(content);
    console.log("Test successful: cannot sign in with an invalid username/password combination")
  } catch {
    console.log('Test failed or the username/password combination was unintentionally valid');
  }
    // YOUR CODE ENDS
})();
