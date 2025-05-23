const { expect } = require('@jest/globals');
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
  });

  it('should correctly identify Visa and hightlight it', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.$('.form_control');
    await input.type('4539-9906-3781-8133');

    const visa = await page.$('.visa');
    const visaStyle = await page.evaluate(el => {
      const cardItem = el.closest('.widget_card_item');
      return window.getComputedStyle(cardItem).getPropertyValue('filter');
    }, visa);

    expect(visaStyle).toBe('none');

    const mastercard = await page.$('.mastercard');
    const mastercardStyle = await page.evaluate(el => {
      const cardItem = el.closest('.widget_card_item');
      return window.getComputedStyle(cardItem).getPropertyValue('filter');
    }, mastercard);

    expect(mastercardStyle).toBe('grayscale(1)');
  });

  it('should correctly identify Mastercard and hightlight it', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.$('.form_control');
    await input.type('5432913036411255');

    const mastercard = await page.$('.mastercard');
    const mastercardStyle = await page.evaluate(el => {
      const cardItem = el.closest('.widget_card_item');
      return window.getComputedStyle(cardItem).getPropertyValue('filter');
    }, mastercard);

    expect(mastercardStyle).toBe('none');

    const visa = await page.$('.visa');
    const visaStyle = await page.evaluate(el => {
      const cardItem = el.closest('.widget_card_item');
      return window.getComputedStyle(cardItem).getPropertyValue('filter');
    }, visa);

    expect(visaStyle).toBe('grayscale(1)');
  });

  it('should correctly identify MIR and hightlight it', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.$('.form_control');
    await input.type('"2200 1234 5678 9012');

    const mir = await page.$('.mir');
    const mirdStyle = await page.evaluate(el => {
      const cardItem = el.closest('.widget_card_item');
      return window.getComputedStyle(cardItem).getPropertyValue('filter');
    }, mir);

    expect(mirdStyle).toBe('none');

    const jcb = await page.$('.jcb');
    const jcbStyle = await page.evaluate(el => {
      const cardItem = el.closest('.widget_card_item');
      return window.getComputedStyle(cardItem).getPropertyValue('filter');
    }, jcb);

    expect(jcbStyle).toBe('grayscale(1)');
  });

  it('should reset card style when input is cleaned', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.$('.form_control');
    await input.type('2200 1234 5678 9012');

    await input.click({clickCount: 3});
    await input.press('Backspace');

    const cardItems = await page.$$('.widget_card_item');

    for (const item of cardItems) {
      const style = await page.evaluate(el => {
        return window.getComputedStyle(el).getPropertyValue('filter');
      }, item);

       expect(style).toBe('none');
    }
  });

  afterAll(async () => {
    await browser.close();

  });
});