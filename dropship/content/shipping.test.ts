import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  FREE_SHIPPING_THRESHOLD,
  SECURE_SHIPPING_FEE,
  SHIPPING_CURRENCY,
  allShippingAmounts,
  money,
  shippingRates,
} from "./shipping";

describe("shipping figures", () => {
  it("quotes shipping in CAD, not USD", () => {
    expect(SHIPPING_CURRENCY).toBe("CAD");
  });

  it("holds the published threshold and secure-shipping fee", () => {
    expect(FREE_SHIPPING_THRESHOLD).toBe(199);
    expect(SECURE_SHIPPING_FEE).toBe(5.99);
  });

  it("holds the three provincial rate tiers covering all ten provinces", () => {
    expect(shippingRates.map((rate) => rate.amount)).toEqual([14.99, 19.99, 24.99]);
    const provinces = shippingRates.flatMap((rate) => rate.provinces);
    expect(provinces).toHaveLength(10);
    expect(new Set(provinces).size).toBe(10);
  });

  it("exposes every distinct amount for the MDX guard", () => {
    expect([...allShippingAmounts].sort((a, b) => a - b)).toEqual([
      5.99, 14.99, 19.99, 24.99, 199,
    ]);
  });
});

describe("money()", () => {
  it("drops decimals on whole amounts", () => {
    expect(money(199)).toBe("$199 CAD");
  });

  it("keeps two decimals on fractional amounts", () => {
    expect(money(14.99)).toBe("$14.99 CAD");
    expect(money(5.99)).toBe("$5.99 CAD");
  });
});

const PROSE_FILES = [
  "content/pages/policies/shipping.mdx",
  "content/pages/delivery.mdx",
];

describe("MDX prose currency labels", () => {
  const known = new Set(allShippingAmounts);

  for (const rel of PROSE_FILES) {
    it(`${rel}: every dollar figure is a known amount labelled CAD`, () => {
      const text = fs.readFileSync(path.join(process.cwd(), rel), "utf8");
      const offenders: string[] = [];

      for (const match of text.matchAll(/\$(\d+(?:\.\d+)?)(\s+CAD)?/g)) {
        const amount = Number(match[1]);
        if (!known.has(amount)) {
          offenders.push(`${match[0]} — not a value declared in content/shipping.ts`);
        } else if (!match[2]) {
          offenders.push(`${match[0]} — missing CAD label`);
        }
      }

      expect(offenders, offenders.join("\n")).toHaveLength(0);
    });
  }
});
