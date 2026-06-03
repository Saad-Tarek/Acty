import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500); // allow hydration

const input = page.locator("#newsletter-email");
const submit = page.getByRole("button", { name: /登録/ });
await input.scrollIntoViewIfNeeded();

// invalid
await input.fill("not-an-email");
await submit.click();
await page.waitForTimeout(500);
console.log("URL after invalid submit:", page.url());
console.log("ERROR STATE:", JSON.stringify(await page.locator("#newsletter-status").innerText()));
await page.screenshot({ path: ".shots/form-error.png" });

// valid
await input.fill("hello@example.com");
await submit.click();
await page.waitForTimeout(1500);
console.log("SUCCESS STATE:", JSON.stringify(await page.locator("#newsletter-status").innerText()));
await page.screenshot({ path: ".shots/form-success.png" });

await browser.close();
