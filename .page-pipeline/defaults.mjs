import puppeteer from 'puppeteer-core';
const OUT = '/home/claude/juice-react-app/.page-pipeline/runs/2026-07-16-integrated-campaigns/screenshots/iter-2';
const FS = '/@fs/home/claude/juice-react-app/node_modules/@fontsource';
const FONT_CSS = `@import url('${FS}/rethink-sans/400.css');@import url('${FS}/rethink-sans/500.css');@import url('${FS}/rethink-sans/600.css');@import url('${FS}/rethink-sans/700.css');@import url('${FS}/rethink-sans/800.css');@import url('${FS}/space-grotesk/300.css');@import url('${FS}/space-grotesk/400.css');@import url('${FS}/space-grotesk/500.css');@import url('${FS}/space-grotesk/700.css');@import url('${FS}/anton/400.css');@import url('${FS}/archivo-black/400.css');`;
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: false, args: ['--no-sandbox', '--force-device-scale-factor=1'] });
const msgs = [];
for (const bp of [{ n: 'mobile', w: 375, h: 812 }, { n: 'tablet', w: 768, h: 1024 }, { n: 'desktop', w: 1440, h: 900 }]) {
  const page = await browser.newPage();
  page.on('console', m => { if (['error','warning'].includes(m.type())) msgs.push(`[${bp.n}] ${m.type()}: ${m.text().slice(0,140)}`); });
  page.on('pageerror', e => msgs.push(`[${bp.n}] PAGEERROR: ${e.message}`));
  await page.setViewport({ width: bp.w, height: bp.h });
  await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.addStyleTag({ content: FONT_CSS });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 600));
  // slow scroll so every whileInView (once:true) reveal fires
  await page.evaluate(async () => {
    const step = Math.floor(window.innerHeight * 0.55);
    for (let y = 0; y <= document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 380)); }
    await new Promise(r => setTimeout(r, 800));
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 1000));
  // verify nothing is left at opacity 0
  const hidden = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('main h2, main h3, main section > div').forEach(el => {
      const cs = getComputedStyle(el);
      if (Number(cs.opacity) < 0.9 && el.getBoundingClientRect().height > 0) out.push(`${el.tagName} "${(el.textContent||'').trim().slice(0,40)}" opacity=${cs.opacity}`);
    });
    return out.slice(0, 8);
  });
  hidden.forEach(h => console.log(`STILL-HIDDEN[${bp.n}] ${h}`));
  await page.screenshot({ path: `${OUT}/${bp.n}-default.png`, fullPage: true });
  await page.close();
}
console.log('CONSOLE:', msgs.length ? [...new Set(msgs)].join('\n') : 'clean');
await browser.close();
