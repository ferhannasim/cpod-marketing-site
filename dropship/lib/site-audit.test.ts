import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { STATIC_ROUTES } from "./routes";
import { footerColumns, isGroup, primaryNav } from "./nav";
import { getAllSizeCharts } from "./size-charts";
import { redirectList } from "./redirects";

function pageFileExists(route: string): boolean {
  const rel = route === "/" ? "" : route.slice(1);
  const candidates = [
    path.join(process.cwd(), "app", rel, "page.tsx"),
    path.join(process.cwd(), "app", "(marketing)", rel, "page.tsx"),
  ];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

const allNavLinks = [
  ...primaryNav.flatMap((entry) => (isGroup(entry) ? entry.links : [entry])),
  ...footerColumns.flatMap((column) => column.links),
];

describe("site audit", () => {
  it("matches the migration inventory: 28 static routes and 47 size charts", () => {
    expect(STATIC_ROUTES).toHaveLength(28);
    expect(getAllSizeCharts()).toHaveLength(47);
  });

  it("every static route has a page file on disk", () => {
    for (const route of STATIC_ROUTES) {
      expect(pageFileExists(route), `missing page for ${route}`).toBe(true);
    }
  });

  it("no orphan routes: every route is linked from nav or footer (or is the homepage)", () => {
    const linked = new Set(["/", ...allNavLinks.map((link) => link.href)]);
    for (const route of STATIC_ROUTES) {
      expect(linked.has(route), `orphaned route ${route}`).toBe(true);
    }
  });

  it("every internal nav and footer href is a known static route", () => {
    const known = new Set(STATIC_ROUTES);
    for (const link of allNavLinks) {
      if (link.external) continue;
      expect(known.has(link.href), `nav link to unknown route ${link.href}`).toBe(true);
    }
  });

  it("every static redirect destination is a known route", () => {
    const known = new Set(STATIC_ROUTES);
    for (const redirect of redirectList) {
      if (!redirect.destination.includes(":")) {
        expect(known.has(redirect.destination), redirect.destination).toBe(true);
      }
    }
  });
});
