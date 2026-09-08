type Redirect = { source: string; destination: string; permanent: true };

const to = (source: string, destination: string): Redirect => ({
  source,
  destination,
  permanent: true,
});

export const redirectList: Redirect[] = [
  // Shopify-era page slugs → homepage sections (or kept routes)
  to("/pages/features", "/#features"),
  to("/pages/pricing", "/#pricing"),
  to("/pages/how-it-works", "/#how-it-works"),
  to("/pages/about-us", "/about"),
  to("/about-us", "/about"),
  to("/pages/support", "/about#contact"),
  to("/pages/contact", "/about#contact"),
  to("/pages/custydesignlab", "/#features"),
  // folded marketing pages → homepage sections
  to("/features", "/#features"),
  to("/pricing", "/#pricing"),
  to("/how-it-works", "/#how-it-works"),
  to("/contact", "/about#contact"),
  to("/support", "/about#contact"),
  to("/design-lab", "/#features"),
  to("/use-cases", "/#how-it-works"),
  to("/dropshipping", "/"),
  // Help rename
  to("/resources", "/help"),
  to("/help-centre", "/help"),
  // Help Centre Getting Started restructure (InkyBay-style sub-categories)
  to("/help/getting-started/start-here", "/help/getting-started/overview"),
  to("/help/getting-started/installing-custy", "/help/getting-started/installations/install-custy"),
  to("/help/getting-started/billing-and-trial", "/help/getting-started/installations/upgrade-your-plan"),
  to(
    "/help/getting-started/installations/upgrade-your-package",
    "/help/getting-started/installations/upgrade-your-plan",
  ),
  to(
    "/help/getting-started/first-product",
    "/help/getting-started/product-setup/first-product",
  ),
  to(
    "/help/getting-started/print-areas-and-mark-areas",
    "/help/getting-started/product-setup/print-areas-and-mark-areas",
  ),
  to(
    "/help/getting-started/pricing-rules",
    "/help/getting-started/product-setup/pricing-rules",
  ),
  // policies
  to("/policies/privacy-policy", "/policies/privacy"),
  to("/policies/terms-of-service", "/policies/terms"),
  to("/policies/contact-information", "/about#contact"),
  // blog
  to("/blogs/custy-blog", "/blog"),
  to("/blogs/custy-blog/:slug", "/blog/:slug"),
  to("/blogs/:path*", "/blog"),
  // dropped commerce trees
  to("/products/:path*", "https://apps.shopify.com/custy"),
  to("/collections/:path*", "/"),
  to("/cart", "/"),
  to("/cart/:path*", "/"),
  to("/search", "/"),
  to("/account/:path*", "/"),
];
