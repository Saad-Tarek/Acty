import { chromium } from "playwright";
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = join(process.cwd(), "out");
const PORT = 4182;
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
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

await page.goto(`${base}/event?slug=asa-no-run`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const h1 = await page.locator("h1").first().innerText().catch(() => "");
console.log("event detail h1:", h1);
await page.screenshot({ path: ".shots/p5-event.png" });

await page.goto(`${base}/membership`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.screenshot({ path: ".shots/p5-membership.png", fullPage: true });

await browser.close();
server.close();
console.log("done");
