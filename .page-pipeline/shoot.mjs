import puppeteer from 'puppeteer-core';

const OUT = '/home/claude/juice-react-app/.page-pipeline/runs/2026-07-16-integrated-campaigns/screenshots/iter-1';
const URL = 'http://localhost:5173/integrated-campaigns';
const FS = '/@fs/home/claude/juice-react-app/node_modules/@fontsource';
const FONT_CSS = `
@import url('${FS}/rethink-sans/400.css'); @import url('${FS}/rethink-sans/500.css');
@import url('${FS}/rethink-sans/600.css'); @import url('${FS}/rethink-sans/700.css');
@import url('${FS}/rethink-sans/800.css');
@import url('${FS}/space-grotesk/300.css'); @import url('${FS}/space-grotesk/400.css');
@import url('${FS}/space-grotesk/500.css'); @import url('${FS}/space-grotesk/700.css');
@import url('${FS}/anton/400.css'); @import url('${FS}/archivo-black/400.css');
@import url('${FS}/archivo/400.css'); @import url('${FS}/archivo/600.css');
`;

const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: 'new', args: ['--no-sandbox', '--force-device-scale-factor=1'] });
const msgs = [];

async function prep(page, w, h) {
  await page.setViewport({ width: w, height: h });
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.addStyleTag({ content: FONT_CSS });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 800));
}

for (const bp of [{ n: 'mobile', w: 375, h: 812 }, { n: 'tablet', w: 768, h: 1024 }, { n: 'desktop', w: 1440, h: 900 }]) {
  const page = await browser.newPage();
  page.on('console', m => { if (['error','warning'].includes(m.type())) msgs.push(`[${bp.n}] ${m.type()}: ${m.text().slice(0,160)}`); });
  page.on('pageerror', e => msgs.push(`[${bp.n}] PAGEERROR: ${e.message}`));
  await prep(page, bp.w, bp.h);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: `${OUT}/${bp.n}-default.png`, fullPage: true });

  // overflow scoped to the new page's own sections (exclude shared Nav/Footer)
  const overflow = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll('main *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width > 1 && (r.right > docW + 1 || r.left < -1) && !el.closest('.overflow-hidden,[class*="overflow-x-auto"]')) {
        bad.push(`${el.tagName} ${(el.className+'').slice(0,70)} L=${Math.round(r.left)} R=${Math.round(r.right)}`);
      }
    });
    return bad.slice(0, 10);
  });
  overflow.forEach(b => console.log(`OVERFLOW[${bp.n}] ${b}`));
  await page.close();
}

// interaction states (desktop)
const page = await browser.newPage();
page.on('pageerror', e => msgs.push(`[states] PAGEERROR: ${e.message}`));
await prep(page, 1440, 900);

async function hoverShot(selector, file) {
  const el = await page.$(selector);
  await el.scrollIntoView();
  const box = await el.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(r => setTimeout(r, 450));
  const probe = await page.evaluate(s => {
    const e = document.querySelector(s);
    const cs = getComputedStyle(e);
    return `matches(:hover)=${e.matches(':hover')} transform=${cs.transform} bg=${cs.backgroundColor}`;
  }, selector);
  console.log(`${file}: ${probe}`);
  await page.screenshot({ path: `${OUT}/${file}`, clip: { x: Math.max(0, box.x - 60), y: Math.max(0, box.y - 60), width: Math.min(600, 1440), height: 300 } });
}
await hoverShot('main button', 'desktop-cta-hover.png');
await hoverShot('a[href="https://app.juicelabs.ai"]', 'desktop-cta2-hover.png');

// waitlist popup
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 300));
await page.click('main button');
await new Promise(r => setTimeout(r, 900));
await page.screenshot({ path: `${OUT}/desktop-waitlist-open.png` });
await page.keyboard.press('Escape');

// mobile nav open
await page.setViewport({ width: 375, height: 812 });
await page.reload({ waitUntil: 'networkidle0' });
await page.addStyleTag({ content: FONT_CSS });
await new Promise(r => setTimeout(r, 800));
await page.click('button[aria-label="Open menu"]');
await new Promise(r => setTimeout(r, 700));
await page.screenshot({ path: `${OUT}/mobile-nav-open.png` });

console.log('CONSOLE:', msgs.length ? [...new Set(msgs)].join('\n') : 'clean');
await browser.close();
