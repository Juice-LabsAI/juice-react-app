import puppeteer from 'puppeteer-core';
const OUT = '/home/claude/juice-react-app/.page-pipeline/runs/2026-07-16-integrated-campaigns/screenshots/iter-2';
const FS = '/@fs/home/claude/juice-react-app/node_modules/@fontsource';
const FONT_CSS = `@import url('${FS}/rethink-sans/400.css');@import url('${FS}/rethink-sans/500.css');@import url('${FS}/rethink-sans/600.css');@import url('${FS}/rethink-sans/700.css');@import url('${FS}/rethink-sans/800.css');@import url('${FS}/space-grotesk/400.css');@import url('${FS}/space-grotesk/500.css');@import url('${FS}/space-grotesk/700.css');`;
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: false, args: ['--no-sandbox', '--force-device-scale-factor=1'] });
for (const bp of [{ n: 'mobile', w: 375, h: 812 }, { n: 'desktop', w: 1440, h: 900 }]) {
  const page = await browser.newPage();
  await page.setViewport({ width: bp.w, height: bp.h });
  await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: FONT_CSS });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const step = Math.floor(window.innerHeight * 0.55);
    for (let y = 0; y <= document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 300)); }
  });
  // scroll the Spread band into view and shoot it
  await page.evaluate(() => { document.querySelectorAll('main section')[5].scrollIntoView({ block: 'start' }); window.scrollBy(0, -60); });
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: `${OUT}/${bp.n}-spread.png` });
  await page.close();
}
await browser.close();
console.log('done');
