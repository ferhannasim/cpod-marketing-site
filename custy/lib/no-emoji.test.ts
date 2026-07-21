import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Adapted from ../dropship/lib/no-emoji.test.ts for custy's source layout. Each root
// carries its own extension set per the task-16 brief (content ships .mdx + .ts data
// files; components/app are .tsx only) and content/raw/ — the untouched scrape
// record — is excluded entirely.
const ROOTS: { dir: string; exts: string[] }[] = [
  { dir: "content", exts: ["mdx", "ts"] },
  { dir: "components", exts: ["tsx"] },
  { dir: "app", exts: ["tsx"] },
];
const ALLOWED = new Set(["©", "®", "™"]);
const EMOJI = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}]/gu;
// Controller ruling (Task 10): content/{features,how-it-works,about}.ts port the live
// landers' 58px gradient icon tiles as emoji glyphs in `icon:` fields — decorative
// design elements, not site copy. Lines matching `icon:` are exempt from the scan;
// everything else (prose, headings, alt text, etc.) must stay emoji-free.
const ICON_FIELD = /icon:/;

function walk(rootDir: string, currentDir: string, exts: string[], out: string[] = []): string[] {
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const full = path.join(currentDir, entry.name);
    const rel = path.relative(rootDir, full);
    if (rel === "raw" || rel.startsWith(`raw${path.sep}`)) continue;
    if (entry.isDirectory()) walk(rootDir, full, exts, out);
    // *.test.ts(x) are verification code, never rendered copy — some assert that a
    // decorative icon glyph (already exempt at its `icon:` source) reaches the DOM,
    // e.g. `screen.getByText("🎨")`. Excluded here rather than pattern-matched.
    else if (/\.test\.tsx?$/.test(entry.name)) continue;
    else if (exts.some((ext) => entry.name.endsWith(`.${ext}`))) out.push(full);
  }
  return out;
}

describe("no emoji in rendered copy", () => {
  it("finds zero pictographic characters outside the allowlist (icon: fields exempt)", () => {
    const offenders: string[] = [];
    for (const { dir, exts } of ROOTS) {
      const rootDir = path.join(process.cwd(), dir);
      if (!fs.existsSync(rootDir)) continue;
      for (const file of walk(rootDir, rootDir, exts)) {
        const lines = fs.readFileSync(file, "utf8").split("\n");
        for (const line of lines) {
          if (ICON_FIELD.test(line)) continue;
          for (const match of line.match(EMOJI) ?? []) {
            if (!ALLOWED.has(match)) offenders.push(`${file}: ${match}`);
          }
        }
      }
    }
    expect(offenders, offenders.join("\n")).toHaveLength(0);
  });
});
