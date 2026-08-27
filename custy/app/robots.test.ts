import { describe, expect, it } from "vitest";
import robots from "./robots";
import { noIndexPaths } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

describe("robots", () => {
  it("disallows folded pages and points at the sitemap", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules?.allow).toBe("/");
    expect(rules?.disallow).toEqual([...noIndexPaths]);
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
