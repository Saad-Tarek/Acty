import { chromium } from "playwright";
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = join(process.cwd(), "out");
const PORT = 4178;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
};

const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p.endsWith("/")) p += "index.html";
    let file = normalize(join(ROOT, p));
    let body;
    try {
      body = await readFile(file);
    } catch {
      file = normalize(join(ROOT, p + ".html"));
      body = await readFile(file);
    }
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

await new Promise((r) => server.listen(PORT, r));
const base = `http://localhost:${PORT}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.screenshot({ path: ".shots/p0-home-top.png", clip: { x: 0, y: 0, width: 1440, height: 120 } });

await page.goto(`${base}/terms`, { waitUntil: "networkidle" });
await page.screenshot({ path: ".shots/p0-terms.png" });

await page.goto(`${base}/careers`, { waitUntil: "networkidle" });
await page.screenshot({ path: ".shots/p0-careers.png", fullPage: true });

// mobile logo
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.screenshot({ path: ".shots/p0-home-mobile-top.png", clip: { x: 0, y: 0, width: 390, height: 90 } });

console.log("done");
await browser.close();
server.close();
