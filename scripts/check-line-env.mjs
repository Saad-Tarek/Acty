// Confirms NEXT_PUBLIC_LINE_CHANNEL_ID is set (channel IDs are public).
import { readFile } from "node:fs/promises";
const env = await readFile(new URL("../.env.local", import.meta.url), "utf8");
const line = env.split(/\r?\n/).find((l) => l.startsWith("NEXT_PUBLIC_LINE_CHANNEL_ID="));
const val = line ? line.split("=")[1].trim() : "";
console.log("LINE channel id set:", Boolean(val), val ? `(${val.length} chars, numeric: ${/^\d+$/.test(val)})` : "");
