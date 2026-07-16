import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/opt/pw-browsers/chromium', headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto('http://localhost:5173/integrated-campaigns', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 700));
console.log(await page.evaluate(() => [...document.querySelectorAll('main section')].map((s, i) => `${i}: ${(s.querySelector('h1,h2,h3')?.textContent || s.className).slice(0, 50)}`).join('\n')));
await browser.close();
