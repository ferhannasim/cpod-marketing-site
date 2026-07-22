type Redirect = { source: string; destination: string; permanent: true };

const to = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

export const redirectList: Redirect[] = [
  // migrated pages
  to("/pages/how-it-works", "/how-it-works"),
  to("/pages/about-us", "/about"),
  to("/pages/contact", "/contact"),
  to("/pages/frequently-asked-questions-faqs", "/faq"),
  to("/pages/dtf-faq", "/faq/dtf"),
  to("/pages/sublimation-faq", "/faq/sublimation"),
  to("/pages/faq-print-on-your-own-item", "/faq/print-on-your-own-item"),
  to("/pages/delivery-speed", "/delivery"),
  to("/pages/free-shipping-on-orders-over-100", "/delivery"),
  to("/pages/billing-information", "/billing"),
  to("/pages/start-your-ecommerce-brand-without-tech-or-high-costs", "/start-your-ecommerce-brand"),
  to("/pages/launch-a-fully-automated-ecommerce-brand-no-tech-needed", "/launch-automated-brand"),
  to("/pages/⚠️-important-printing-notice", "/printing-notice"),
  to("/pages/%E2%9A%A0%EF%B8%8F-important-printing-notice", "/printing-notice"),
  to("/pages/sublimation-printing-notice", "/sublimation-printing-notice"),
  to("/pages/🎨-artwork-mockup-approval", "/artwork-approval"),
  to("/pages/%F0%9F%8E%A8-artwork-mockup-approval", "/artwork-approval"),
  to("/pages/measuring", "/measuring"),
  to("/pages/size-chart-:handle", "/size-charts/:handle"),
  // migrated policies
  to("/policies/privacy-policy", "/policies/privacy"),
  to("/policies/terms-of-service", "/policies/terms"),
  to("/policies/refund-policy", "/policies/refund"),
  to("/policies/shipping-policy", "/policies/shipping"),
  // dropped pages with a sensible home
  to("/pages/check-order-status", "/contact"),
  to("/pages/custydesignlab", "/"),
  // dropped commerce trees
  to("/products/:path*", "/"),
  to("/collections/:path*", "/"),
  to("/cart", "/"),
  to("/account/:path*", "/"),
  to("/blogs/:path*", "/"),
];
