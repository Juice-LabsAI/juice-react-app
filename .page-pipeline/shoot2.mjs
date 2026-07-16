import puppeteer from 'puppeteer-core';
const OUT = '/home/claude/juice-react-app/.page-pipeline/runs/2026-07-16-integrated-campaigns/screenshots/iter-2';
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: 'new', args: ['--no-sandbox'] });
const msgs = [];
const page = await browser.newPage();
page.on('console', m => { if (m.type() !== 'log') msgs.push(`${m.type()}: ${m.text()}`); });
page.on('pageerror', e => msgs.push(`PAGEERROR: ${e.message}`));

// mobile nav open
await page.setViewport({ width: 375, height: 812 });
await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1000));
await page.click('button[aria-label="Open menu"]');
await new Promise(r => setTimeout(r, 700));
await page.screenshot({ path: `${OUT}/mobile-nav-open.png` });

// baseline: does /d2c show the same footer-can scrollWidth excess?
const p2 = await browser.newPage();
await p2.setViewport({ width: 375, height: 812 });
await p2.goto('http://localhost:5173/d2c', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 800));
const base = await p2.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, bodyOverflowX: getComputedStyle(document.body).overflowX }));
console.log('d2c baseline:', JSON.stringify(base));
console.log('CONSOLE (errors/warnings):', msgs.length ? msgs.join('\n') : 'none');
await browser.close();
