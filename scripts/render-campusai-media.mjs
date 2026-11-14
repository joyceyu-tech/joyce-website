/** Export CampusAI's four SVG designs as PNG images. No video is produced.
 * Requires Playwright and Chrome; NODE_MODULES_PATH and CHROME_PATH are optional.
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { createRequire } from 'node:module';

const root = path.resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); }
catch {
  if (!process.env.NODE_MODULES_PATH) throw new Error('Install playwright or set NODE_MODULES_PATH.');
  playwright = require(path.join(process.env.NODE_MODULES_PATH, 'playwright'));
}
const names = ['campusai-product-showcase', 'campusai-system-architecture', 'campusai-tool-calling-flow', 'campusai-notice-rag-flow'];
const server = http.createServer((req, res) => {
  const name = names.find(item => req.url === '/images/' + item + '.svg');
  if (!name) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', 'image/svg+xml');
  fs.createReadStream(path.join(root, 'images', name + '.svg')).pipe(res);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await playwright.chromium.launch({
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
  for (const name of names) {
    await page.goto('http://127.0.0.1:' + server.address().port + '/images/' + name + '.svg');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(root, 'images', name + '.png') });
    console.log('Rendered ' + name);
  }
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
