import { chromium } from "playwright";
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = join(process.cwd(), "out");
const PORT = 4181;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".woff2": "font/woff2" };

const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p.endsWith("/")) p += "index.html";
    let file = normalize(join(ROOT, p));
    let body;
    try { body = await readFile(file); }
    catch { file += ".html"; body = await readFile(normalize(join(ROOT, p + ".html"))); }
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404); res.end("not found"); }
});

await new Promise((r) => server.listen(PORT, r));
const base = `http://localhost:${PORT}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: ".shots/i18n-home-ja.png" });

// Click the desktop EN toggle.
await page.getByRole("button", { name: "Switch language" }).first().click();
await page.waitForTimeout(500);
await page.screenshot({ path: ".shots/i18n-home-en.png" });
const lang = await page.evaluate(() => document.documentElement.lang);
const heroLead = await page.locator("p").first().innerText().catch(() => "");
console.log("html lang after toggle:", lang);

// Persistence: reload, should stay EN.
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(400);
const langAfter = await page.evaluate(() => document.documentElement.lang);
console.log("html lang after reload:", langAfter);

// Events page in EN.
await page.goto(`${base}/events`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: ".shots/i18n-events-en.png", fullPage: true });

await browser.close();
server.close();
console.log("done");
