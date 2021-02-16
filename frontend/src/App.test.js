
const puppeteer = require('puppeteer');


describe('Title Display Widget App', () => {
  test('Title loads correctly', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.app-title');

    const html = await page.$eval('.app-title', e => e.innerHTML);
    expect(html).toBe('Call Log App');

    browser.close();
  }, 16000);
});


