import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { demoProducts } from "./demo-products";

describe("demo products registry", () => {
  it("has five products with unique slugs, the apron first", () => {
    expect(demoProducts).toHaveLength(5);
    expect(new Set(demoProducts.map((p) => p.slug)).size).toBe(5);
    expect(demoProducts[0].slug).toBe("apron-full-length-no-pockets");
    expect(demoProducts[0].name).toBe("Apron Full Lengh No Pockets");
    expect(demoProducts.map((p) => p.slug)).toContain("mugs-11oz");
    expect(demoProducts.map((p) => p.slug)).toContain("business-cards-14pt");
  });

  it("points every product at the hosted editor", () => {
    for (const product of demoProducts) {
      expect(product.editorUrl).toMatch(
        /^https:\/\/product-editor-app-393012399860\.us-central1\.run\.app\/customize\/\d+$/,
      );
    }
  });

  it("has a real local image file with positive dimensions for every product", () => {
    for (const product of demoProducts) {
      expect(product.image.src).toMatch(/^\/images\/demo\//);
      expect(existsSync(join(__dirname, "..", "public", product.image.src))).toBe(true);
      expect(product.image.width).toBeGreaterThan(0);
      expect(product.image.height).toBeGreaterThan(0);
    }
  });
});
