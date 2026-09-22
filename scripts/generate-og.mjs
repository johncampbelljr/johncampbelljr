import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
const font = (
  await readFile(
    'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  )
).toString('base64');
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(
  `<style>@font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font})}*{box-sizing:border-box}body{margin:0;background:#f5f3ed;color:#252923;font-family:Manrope;padding:60px 70px}header{font-size:18px;letter-spacing:2px;border-bottom:1px solid #cdd1c2;padding-bottom:28px}small{display:block;font:12px monospace;letter-spacing:2px;color:#ae461f;margin-top:44px}h1{font-size:65px;line-height:1.12;font-weight:550;letter-spacing:-3px;max-width:1050px;margin:24px 0}h1 span{color:#ae461f}footer{position:absolute;bottom:45px;font:12px monospace;letter-spacing:2px;color:#64675f}</style><header>JOHN T. CAMPBELL JR.</header><small>SOFTWARE, SYSTEMS & THE WORK AHEAD</small><h1>Exploring how we<br/><span>build and secure software</span><br/>in an agentic-first SDLC.</h1><footer>JOHNCAMPBELLJR.COM</footer>`,
);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og-image.png' });
await browser.close();
