import { chromium } from "playwright";

const base = process.env.URL || "http://localhost:3000";
const routes = [
  { name: "home", path: "/" },
  { name: "events", path: "/events" },
  { name: "event-detail", path: "/events/detail" },
  { name: "community", path: "/community" },
  { name: "signin", path: "/signin" },
  { name: "signup", path: "/signup" },
];
const viewports = [
  { tag: "d", width: 1440, height: 900 },
  { tag: "m", width: 390, height: 844 },
];

const browser = await chromium.launch();
for (const r of routes) {
  for (const v of viewports) {
    const page = await browser.newPage({
      viewport: { width: v.width, height: v.height },
    });
    await page.goto(base + encodeURI(r.path), {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    await page.waitForTimeout(900);
    // scroll to trigger lazy images
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 700) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(80);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `.shots/page-${r.name}-${v.tag}.png`, fullPage: true });
    await page.close();
  }
  console.log("shot", r.name);
}
await browser.close();
console.log("done");
