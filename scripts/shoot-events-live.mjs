import { chromium } from "playwright";

const base = "https://acty.btechjapan.com";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

// Events list — wait for the Supabase fetch to render cards.
await page.goto(`${base}/events`, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
const cardCount = await page.locator("h3").count();
console.log("event headings on /events:", cardCount);
await page.screenshot({ path: ".shots/live-events.png", fullPage: true });

// One event detail (signed-out → should show "サインインして参加").
await page.goto(`${base}/events/sunrise-yoga`, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
const hasJoin = await page.getByText("サインインして参加").count();
console.log("signin-to-join button present:", hasJoin > 0);
await page.screenshot({ path: ".shots/live-event-detail.png", fullPage: true });

await browser.close();
