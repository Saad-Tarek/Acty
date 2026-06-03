import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site (no API routes / server actions) → export to /out
  // for static hosting on Cloudflare Pages.
  output: "export",
  outputFileTracingRoot: projectRoot,
  images: {
    // Plain <img> + remote Unsplash URLs; no next/image optimization needed.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
