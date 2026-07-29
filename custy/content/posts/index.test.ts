import { describe, expect, it } from "vitest";
import { posts } from "./index";

describe("posts registry", () => {
  it("registers six posts, newest first", () => {
    expect(posts).toHaveLength(6);
    const dates = posts.map((p) => p.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("gives every post a unique slug", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps the three scraped posts with an image, and registers the three new posts without one", () => {
    const withImage = posts.filter((p) => p.image);
    const withoutImage = posts.filter((p) => !p.image);
    expect(withImage).toHaveLength(3);
    expect(withoutImage).toHaveLength(3);
    expect(withoutImage.map((p) => p.slug).sort()).toEqual(
      [
        "a-merchants-guide-to-multi-side-printing",
        "how-product-personalization-lifts-average-order-value",
        "setting-up-print-pricing-by-color-count-and-size",
      ].sort(),
    );
  });
});
