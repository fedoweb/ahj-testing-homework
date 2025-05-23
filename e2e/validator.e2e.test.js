const { expect } = require('@jest/globals');
const puppeteer = require('puppeteer');

describe('E2E Test', () => {
  let browser;
  let page;

  beforeAll(async () => {

    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  it('should show success message for valid card number', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.$('.form_control');
    const button = await page.$('.form_button');

    await input.type('6011894285604249240');
    await button.click();

    await page.waitForSelector('.form_message');
    const message = await page.$eval('.form_message', el => el.textContent);

    expect(message).toBe('Card number is valid');

    const color = await page.$eval('.form_message', el => 
      getComputedStyle(el).color
    );
    expect(color).toBe('rgb(96, 188, 96)');
  }, 10000);

  it('should show success message for valid card number with spaces', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.$('.form_control');
    const button = await page.$('.form_button');

    await input.type('6440 0000 0000 0005');
    await button.click();

    await page.waitForSelector('.form_message');
    const message = await page.$eval('.form_message', el => el.textContent);

    expect(message).toBe('Card number is valid');
  }, 10000);

  it('should show success message for valid card number with dashes', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.$('.form_control');
    const button = await page.$('.form_button');

    await input.type('4539-9906-3781-8133');
    await button.click();

    await page.waitForSelector('.form_message');
    const message = await page.$eval('.form_message', el => el.textContent);

    expect(message).toBe('Card number is valid');
  }, 10000);

  it('should show error message for invalid card number', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.$('.form_control');
    const button = await page.$('.form_button');

    await input.type('0343 7369 3644 1223 123456789');
    await button.click();

    await page.waitForSelector('.form_message');
    const message = await page.$eval('.form_message', el => el.textContent);

    expect(message).toBe('Invalid card number');

    const color = await page.$eval('.form_message', el => getComputedStyle(el).color);
    expect(color).toBe('rgb(255, 0, 0)');
  }, 15000);

  it('should show error message for empty card number', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.$('.form_control');
    const button = await page.$('.form_button');

    await input.type('');
    await button.click();

    await page.waitForSelector('.form_message');
    const message = await page.$eval('.form_message', el => el.textContent);

    expect(message).toBe('Invalid card number');
  }, 15000);

  afterAll(async () => {
    await browser.close();

  });
});