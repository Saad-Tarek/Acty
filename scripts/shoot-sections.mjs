import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:3000";
const width = Number(process.env.W || 1440);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1200);

// scroll through to trigger any lazy images
for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 800) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(120);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);

const blocks = await page.$$("body > div > section, body > nav, body > footer, section, footer");
// De-duplicate by bounding boxes of top-level landmarks
const handles = await page.$$("section, footer");
let i = 0;
for (const h of handles) {
  i++;
  try {
    await h.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await h.screenshot({ path: `.shots/sec-${String(i).padStart(2, "0")}.png` });
  } catch (e) {
    console.log(`skip ${i}: ${e.message}`);
  }
}
console.log(`captured ${i} sections at ${width}px`);
await browser.close();
