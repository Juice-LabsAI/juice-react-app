import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 800));
console.log('hover-capable:', await page.evaluate(() => matchMedia('(hover: hover)').matches));
const btn = await page.$('main button');
const box = await btn.boundingBox();
await page.mouse.move(box.x + 10, box.y + 10);
await new Promise(r => setTimeout(r, 400));
console.log(await page.evaluate(() => {
  const b = document.querySelector('main button');
  const cs = getComputedStyle(b);
  return `btn scale=${cs.scale} transform=${cs.transform}`;
}));
const a = await page.$('a[href="https://app.juicelabs.ai"]');
const ab = await a.boundingBox();
await page.mouse.move(ab.x + 10, ab.y + 10);
await new Promise(r => setTimeout(r, 400));
console.log(await page.evaluate(() => {
  const e = document.querySelector('a[href="https://app.juicelabs.ai"]');
  return `link bg=${getComputedStyle(e).backgroundColor}`;
}));
await browser.close();
