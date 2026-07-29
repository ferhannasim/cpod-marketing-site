type Redirect = { source: string; destination: string; permanent: true };

const to = (source: string, destination: string): Redirect => ({
  source,
  destination,
  permanent: true,
});

export const redirectList: Redirect[] = [
  // migrated pages
  to("/pages/features", "/features"),
  to("/pages/pricing", "/pricing"),
  to("/pages/how-it-works", "/how-it-works"),
  to("/pages/about-us", "/about-us"),
  to("/pages/support", "/support"),
  to("/pages/contact", "/contact"),
  // migrated pages
  to("/pages/custydesignlab", "/design-lab"),
  // policies
  to("/policies/privacy-policy", "/policies/privacy"),
  to("/policies/terms-of-service", "/policies/terms"),
  to("/policies/contact-information", "/contact"),
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
