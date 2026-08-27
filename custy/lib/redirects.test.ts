import { describe, expect, it } from "vitest";
import { redirectList } from "./redirects";

describe("redirects", () => {
  const dest = (source: string) =>
    redirectList.find((r) => r.source === source)?.destination;

  it("redirects every old page slug to its new destination", () => {
    expect(dest("/pages/features")).toBe("/#features");
    expect(dest("/pages/pricing")).toBe("/#pricing");
    expect(dest("/pages/how-it-works")).toBe("/#how-it-works");
    expect(dest("/pages/about-us")).toBe("/about");
    expect(dest("/about-us")).toBe("/about");
    expect(dest("/pages/support")).toBe("/#contact");
    expect(dest("/pages/contact")).toBe("/#contact");
    expect(dest("/pages/custydesignlab")).toBe("/#features");
  });

  it("folds standalone marketing pages onto homepage sections", () => {
    expect(dest("/features")).toBe("/#features");
    expect(dest("/pricing")).toBe("/#pricing");
    expect(dest("/how-it-works")).toBe("/#how-it-works");
    expect(dest("/contact")).toBe("/#contact");
    expect(dest("/support")).toBe("/#contact");
    expect(dest("/design-lab")).toBe("/#features");
    expect(dest("/use-cases")).toBe("/#how-it-works");
    expect(dest("/dropshipping")).toBe("/");
  });

  it("redirects policies and blog paths", () => {
    expect(dest("/policies/privacy-policy")).toBe("/policies/privacy");
    expect(dest("/policies/terms-of-service")).toBe("/policies/terms");
    expect(dest("/policies/contact-information")).toBe("/#contact");
    expect(dest("/blogs/custy-blog")).toBe("/blog");
    expect(dest("/blogs/custy-blog/:slug")).toBe("/blog/:slug");
  });

  it("sends commerce trees away and products to the app listing", () => {
    expect(dest("/products/:path*")).toBe("https://apps.shopify.com/custy");
    expect(dest("/collections/:path*")).toBe("/");
    expect(dest("/cart")).toBe("/");
    expect(dest("/search")).toBe("/");
  });

  it("every redirect is permanent", () => {
    expect(redirectList.every((r) => r.permanent === true)).toBe(true);
  });
});
