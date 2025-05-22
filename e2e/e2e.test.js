const puppeteer = require('puppeteer');

describe('E2E Test', () => {
  let browser;
  let page;

  beforeAll(async () => {

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  it('should load page', async () => {
    await page.goto('http://localhost:9000');

  
    expect(true).toBe(true);
    // Дополнительные проверки...
  });

  afterAll(async () => {
    await browser.close();

  });
});