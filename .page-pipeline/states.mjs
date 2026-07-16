import puppeteer from 'puppeteer-core';
const OUT = '/home/claude/juice-react-app/.page-pipeline/runs/2026-07-16-integrated-campaigns/screenshots/iter-2';
const FS = '/@fs/home/claude/juice-react-app/node_modules/@fontsource';
const FONT_CSS = `@import url('${FS}/rethink-sans/500.css');@import url('${FS}/rethink-sans/800.css');@import url('${FS}/space-grotesk/400.css');@import url('${FS}/space-grotesk/500.css');@import url('${FS}/space-grotesk/700.css');@import url('${FS}/rethink-sans/400.css');@import url('${FS}/rethink-sans/600.css');@import url('${FS}/rethink-sans/700.css');@import url('${FS}/space-grotesk/300.css');`;
const browser = await puppeteer.launch({
  executablePath: '/opt/pw-browsers/chromium', headless: false,
  args: ['--no-sandbox', '--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0' });
await page.addStyleTag({ content: FONT_CSS });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 600));
console.log('hover-capable:', await page.evaluate(() => matchMedia('(hover: hover)').matches));

async function hoverShot(sel, file, probeProp) {
  const el = await page.$(sel);
  await el.scrollIntoView();
  const box = await el.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(r => setTimeout(r, 450));
  console.log(`${file}:`, await page.evaluate(([s, p]) => { const cs = getComputedStyle(document.querySelector(s)); return `${p}=${cs[p]}`; }, [sel, probeProp]));
  await page.screenshot({ path: `${OUT}/${file}`, clip: { x: Math.max(0, box.x - 80), y: Math.max(0, box.y - 80), width: 620, height: 300 } });
}
await hoverShot('main button', 'desktop-cta-hover.png', 'scale');
await hoverShot('a[href="https://app.juicelabs.ai"]', 'desktop-cta2-hover.png', 'backgroundColor');
await browser.close();
