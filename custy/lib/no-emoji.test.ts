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
// design elements, not site copy. Token-scoped: only the `icon: "<value>"` substring
// is stripped before scanning, so an emoji smuggled into a sibling `title`/`text` on
// the same object-literal line (e.g. `{ icon: "🎨", title: ..., text: ... }`) is still
// caught.
const ICON_FIELD_VALUE = /icon:\s*(["'])[^"']*\1/g;
// Component/page tests assert that a decorative icon glyph (already exempt above at
// its `icon:` source) reaches the DOM, e.g. `screen.getByText("🎨")`. Only that
// assertion-call substring is stripped before scanning — any other emoji elsewhere on
// the same line, or anywhere else in the test file, is still caught.
const ICON_ASSERTION = /(?:get|query|getAll|queryAll|find|findAll)ByText\((['"])\p{Extended_Pictographic}\1\)/gu;

function walk(rootDir: string, currentDir: string, exts: string[], out: string[] = []): string[] {
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const full = path.join(currentDir, entry.name);
    const rel = path.relative(rootDir, full);
    if (rel === "raw" || rel.startsWith(`raw${path.sep}`)) continue;
    if (entry.isDirectory()) walk(rootDir, full, exts, out);
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
          const scrubbed = line.replace(ICON_FIELD_VALUE, "").replace(ICON_ASSERTION, "");
          for (const match of scrubbed.match(EMOJI) ?? []) {
            if (!ALLOWED.has(match)) offenders.push(`${file}: ${match}`);
          }
        }
      }
    }
    expect(offenders, offenders.join("\n")).toHaveLength(0);
  });
});
