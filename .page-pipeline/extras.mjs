import puppeteer from 'puppeteer-core';
const OUT = '/home/claude/juice-react-app/.page-pipeline/runs/2026-07-16-integrated-campaigns/screenshots/iter-2';
const FS = '/@fs/home/claude/juice-react-app/node_modules/@fontsource';
const FONT_CSS = `@import url('${FS}/rethink-sans/400.css');@import url('${FS}/rethink-sans/500.css');@import url('${FS}/rethink-sans/700.css');@import url('${FS}/rethink-sans/800.css');@import url('${FS}/space-grotesk/400.css');@import url('${FS}/space-grotesk/500.css');@import url('${FS}/space-grotesk/700.css');@import url('${FS}/archivo-black/400.css');`;
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: false, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0' });
await page.addStyleTag({ content: FONT_CSS });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
// waitlist popup open
await page.click('main button');
await new Promise(r => setTimeout(r, 900));
await page.screenshot({ path: `${OUT}/desktop-waitlist-open.png` });
await page.keyboard.press('Escape');
await new Promise(r => setTimeout(r, 400));
// spread section closeup
await page.evaluate(() => new Promise(res => { const el = [...document.querySelectorAll('main section')][5]; const y = el.getBoundingClientRect().top + window.scrollY - 40; window.scrollTo({ top: y, behavior: 'instant' }); setTimeout(res, 300); }));
await page.evaluate(async () => { for (let i = 0; i < 3; i++) { window.scrollBy(0, 300); await new Promise(r => setTimeout(r, 250)); } window.scrollBy(0, -900); });
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: `${OUT}/desktop-spread.png` });
// mobile nav open
await page.setViewport({ width: 375, height: 812 });
await page.reload({ waitUntil: 'networkidle0' });
await page.addStyleTag({ content: FONT_CSS });
await new Promise(r => setTimeout(r, 800));
await page.click('button[aria-label="Open menu"]');
await new Promise(r => setTimeout(r, 700));
await page.screenshot({ path: `${OUT}/mobile-nav-open.png` });
// tablet hero viewport (fixed-header artifact workaround evidence)
await page.setViewport({ width: 768, height: 1024 });
await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0' });
await page.addStyleTag({ content: FONT_CSS });
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: `${OUT}/tablet-hero-viewport.png` });
console.log('extras done');
await browser.close();
