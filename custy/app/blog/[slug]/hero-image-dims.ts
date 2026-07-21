// Post images aren't part of the Post registry's `image: string` contract, so real
// intrinsic dimensions (measured with `sips -g pixelWidth -g pixelHeight`) live here,
// scoped to the one place that renders a non-cropped hero <Image>. Kept in its own
// module (rather than exported from page.tsx) because Next.js's page-export
// validation rejects arbitrary named exports from a route's page.tsx.
//
// page.test.tsx asserts every registry post has an entry here — without that check,
// a future post added to the registry without a matching entry would silently
// render no hero image at all (see the `{dims && ...}` guard in page.tsx).
export const heroImageDims: Record<string, { width: number; height: number }> = {
  "7-ways-product-customization-increases-your-shopify-store-revenue": { width: 1279, height: 853 },
  "how-to-start-a-print-on-demand-business-with-shopify-step-by-step-guide": { width: 1848, height: 970 },
  "why-product-customization-is-the-future-of-ecommerce-in-2026": { width: 1280, height: 853 },
};
