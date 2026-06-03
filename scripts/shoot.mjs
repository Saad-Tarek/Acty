import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:3000";
const shots = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();
for (const s of shots) {
  const page = await browser.newPage({
    viewport: { width: s.width, height: s.height },
    deviceScaleFactor: 1,
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  // give fonts + lazy images a beat
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `.shots/${s.name}-full.png`, fullPage: true });
  await page.close();
  console.log(`shot ${s.name}`);
}
await browser.close();
console.log("done");
