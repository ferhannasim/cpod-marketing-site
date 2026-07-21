import { describe, expect, it } from "vitest";
import { redirectList } from "./redirects";
import { STATIC_ROUTES } from "./routes";

const sources = redirectList.map((r) => r.source);

describe("redirectList", () => {
  it("covers every migrated /pages/* slug", () => {
    for (const source of [
      "/pages/how-it-works",
      "/pages/about-us",
      "/pages/contact",
      "/pages/frequently-asked-questions-faqs",
      "/pages/dtf-faq",
      "/pages/sublimation-faq",
      "/pages/faq-print-on-your-own-item",
      "/pages/delivery-speed",
      "/pages/free-shipping-on-orders-over-100",
      "/pages/billing-information",
      "/pages/start-your-ecommerce-brand-without-tech-or-high-costs",
      "/pages/launch-a-fully-automated-ecommerce-brand-no-tech-needed",
      "/pages/sublimation-printing-notice",
      "/pages/measuring",
      "/pages/size-chart-:handle",
      "/pages/check-order-status",
      "/pages/custydesignlab",
    ]) {
      expect(sources).toContain(source);
    }
  });
  it("covers the emoji slugs in raw and percent-encoded forms", () => {
    expect(sources).toContain("/pages/⚠️-important-printing-notice");
    expect(sources).toContain("/pages/%E2%9A%A0%EF%B8%8F-important-printing-notice");
    expect(sources).toContain("/pages/🎨-artwork-mockup-approval");
    expect(sources).toContain("/pages/%F0%9F%8E%A8-artwork-mockup-approval");
  });
  it("covers old policy URLs and dropped commerce trees", () => {
    for (const source of [
      "/policies/privacy-policy",
      "/policies/terms-of-service",
      "/policies/refund-policy",
      "/policies/shipping-policy",
      "/products/:path*",
      "/collections/:path*",
      "/cart",
      "/account/:path*",
      "/blogs/:path*",
    ]) {
      expect(sources).toContain(source);
    }
  });
  it("is all-301 and every static destination exists", () => {
    for (const redirect of redirectList) {
      expect(redirect.permanent).toBe(true);
      if (!redirect.destination.includes(":")) {
        expect(STATIC_ROUTES).toContain(redirect.destination);
      }
    }
  });
});
