import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
try {
  await page.emulateMediaFeatures([{ name: 'hover', value: 'hover' }, { name: 'any-hover', value: 'hover' }, { name: 'pointer', value: 'fine' }]);
  console.log('emulateMediaFeatures accepted');
} catch (e) {
  console.log('emulateMediaFeatures rejected:', e.message.slice(0, 120));
  const cdp = await page.createCDPSession();
  try {
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'hover', value: 'hover' }, { name: 'any-hover', value: 'hover' }, { name: 'pointer', value: 'fine' }] });
    console.log('raw CDP accepted');
  } catch (e2) { console.log('raw CDP rejected:', e2.message.slice(0, 120)); }
}
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 600));
console.log('mq:', await page.evaluate(() => `hover:${matchMedia('(hover: hover)').matches}`));
const b = await (await page.$('main button')).boundingBox();
await page.mouse.move(b.x + b.width/2, b.y + b.height/2);
await new Promise(r => setTimeout(r, 400));
console.log('btn:', await page.evaluate(() => { const cs = getComputedStyle(document.querySelector('main button')); return `scale=${cs.scale}`; }));
await browser.close();
