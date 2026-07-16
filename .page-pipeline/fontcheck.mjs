import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
const failed = [];
page.on('requestfailed', r => failed.push(`${r.failure()?.errorText} ${r.url().slice(0,90)}`));
await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));
const fonts = await page.evaluate(() => {
  const fams = ['Rethink Sans', 'Space Grotesk', 'Anton'];
  return fams.map(f => `${f}: ${document.fonts.check(`16px "${f}"`)}`);
});
console.log(fonts.join('\n'));
console.log('FAILED REQUESTS:', failed.length ? failed.join('\n') : 'none');
await browser.close();
