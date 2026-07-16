import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: 'new', args: ['--no-sandbox', '--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 600));
const rule = await page.evaluate(() => {
  const out = [];
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    const walk = (rs) => { for (const r of rs) { if (r.cssRules) walk(r.cssRules); else if (r.selectorText && r.selectorText.includes('scale-')) out.push(`${r.parentRule?.conditionText ? '@'+r.parentRule.conditionText+' ' : ''}${r.selectorText} { ${r.style.cssText} }`); } };
    walk(rules);
  }
  return out.filter(s => s.includes('1.03')).slice(0, 4);
});
console.log('RULES:', rule.join('\n') || 'none found');
const btn = await page.$('main button');
const box = await btn.boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await new Promise(r => setTimeout(r, 450));
console.log(await page.evaluate(() => {
  const b = document.querySelector('main button');
  const cs = getComputedStyle(b);
  return `matches=${b.matches(':hover')} scale=${cs.scale} translate=${cs.translate} transform=${cs.transform} anyHover=${matchMedia('(any-hover: hover)').matches}`;
}));
await browser.close();
