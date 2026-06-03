import { chromium } from "playwright";

const url = process.env.URL || "https://acty.btechjapan.com/";
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1000);

// viewport meta?
const vp = await page.evaluate(() => {
  const m = document.querySelector('meta[name="viewport"]');
  return m ? m.getAttribute("content") : "MISSING";
});
console.log("viewport meta:", vp);

// horizontal overflow?
const metrics = await page.evaluate(() => ({
  innerWidth: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  bodyScrollWidth: document.body.scrollWidth,
}));
console.log("metrics:", JSON.stringify(metrics));

// find elements wider than viewport (overflow culprits)
const wide = await page.evaluate(() => {
  const vw = window.innerWidth;
  const out = [];
  document.querySelectorAll("*").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > vw + 1) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || "").toString().slice(0, 60),
        w: Math.round(r.width),
        left: Math.round(r.left),
      });
    }
  });
  return out.slice(0, 12);
});
console.log("WIDE ELEMENTS:", JSON.stringify(wide, null, 1));

await page.screenshot({ path: ".shots/diag-mobile-home.png", fullPage: true });

// open hamburger and the community dropdown
try {
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await page.waitForTimeout(600);
  await page.getByText("コミュニティ", { exact: true }).first().click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: ".shots/diag-mobile-menu.png" });
  console.log("menu+dropdown screenshot taken");
} catch (e) {
  console.log("menu interaction error:", e.message);
}

await browser.close();
