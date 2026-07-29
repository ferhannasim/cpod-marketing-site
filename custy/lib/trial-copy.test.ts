// lib/trial-copy.test.ts
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The Custy app's plans.ts defines TRIAL_DAYS = 30. The scraped site copy said
// "21-day" — this guard keeps site copy aligned with the app.
const ROOTS = ["content", "app", "components"];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name === "raw" || entry.name === "node_modules") continue;
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|mdx)$/.test(entry.name) && !entry.name.endsWith(".test.ts")) out.push(full);
  }
  return out;
}

describe("trial-length copy", () => {
  it("never mentions the stale 21-day trial", () => {
    const offenders: string[] = [];
    for (const root of ROOTS) {
      for (const file of walk(path.join(process.cwd(), root))) {
        const text = fs.readFileSync(file, "utf8");
        if (/21[- ]day/i.test(text)) offenders.push(path.relative(process.cwd(), file));
      }
    }
    expect(offenders, offenders.join("\n")).toHaveLength(0);
  });
});
