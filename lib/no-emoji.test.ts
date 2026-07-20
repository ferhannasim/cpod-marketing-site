import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOTS = ["content/pages", "content/faqs", "components", "app"];
const ALLOWED = new Set(["©", "®", "™"]);
const EMOJI = /\p{Extended_Pictographic}/gu;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(mdx|tsx|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

describe("no emoji in rendered copy", () => {
  it("finds zero pictographic characters outside the allowlist", () => {
    const offenders: string[] = [];
    for (const root of ROOTS) {
      for (const file of walk(path.join(process.cwd(), root))) {
        const text = fs.readFileSync(file, "utf8");
        for (const match of text.match(EMOJI) ?? []) {
          if (!ALLOWED.has(match)) offenders.push(`${file}: ${match}`);
        }
      }
    }
    expect(offenders, offenders.join("\n")).toHaveLength(0);
  });
});
