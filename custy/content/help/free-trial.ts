import type { HelpArticle } from "./types";

export const freeTrial: HelpArticle = {
  slug: "free-trial",
  categorySlug: "getting-started",
  subCategorySlug: "installations",
  title: "How to Start Your 30-Day Free Trial of Custy?",
  description:
    "Start the once-per-store 30-day free trial on Starter or Pro and try paid features before Shopify charges you.",
  summary: "Start a 30-day trial on Starter or Pro in a few clicks from Plans.",
  readMinutes: 1,
  updatedOn: "8 September 2026",
  lead: [
    "Use the 30-day free trial to try Starter or Pro before you pay. During the trial you can create customizable products, set print areas and pricing, and see how Custy fits your store.",
    "The trial is available once per store, on paid plans only. Free has no trial — you can start Free anytime without a credit-card trial flow.",
  ],
  sections: [
    {
      id: "how-to-start",
      title: "Start the trial in three steps",
      paragraphs: [
        "Do this right after install, or open Plans from the Custy navigation anytime before you have used the trial.",
      ],
      actions: [
        "Open Plans in the Custy left navigation (or land there after install).",
        "Choose Monthly or Annual. Annual is marketed as Save 20%.",
        "On Starter or Pro, select Start free trial, then approve the Shopify charge screen.",
      ],
      figure: {
        src: "/images/help/install-plans-gate.png",
        alt: "Custy Plans page showing Free, Starter, and Pro with Start free trial",
        caption: "Select Start free trial on Starter or Pro, then confirm in Shopify.",
        width: 1903,
        height: 933,
        markers: [
          {
            n: 1,
            title: "Monthly / Annual",
            body: "Pick the billing cycle you want after the trial ends.",
          },
          {
            n: 2,
            title: "Free",
            body: "Start Free if you do not need a trial. Free has no 30-day trial.",
          },
          {
            n: 3,
            title: "Start free trial",
            body: "On Starter or Pro. If the trial was already used, this CTA becomes Subscribe.",
          },
        ],
      },
      callout: {
        variant: "important",
        title: "Note",
        paragraphs: [
          "When the 30-day trial ends, Shopify charges the plan you selected unless you change plan or cancel first. While the trial is active, Settings can show Trial · N days left.",
        ],
      },
    },
    {
      id: "plans-on-trial",
      title: "Which plans include the trial?",
      paragraphs: [
        "Only Starter and Pro include the 30-day free trial. You get the features of the plan you pick for those 30 days.",
      ],
      highlights: [
        "Starter — $22.99 / month (or $220.70 / year). 100 custom products, 300 orders per month, 25 GB storage, up to 6 print sides, quantity discounts, inventory control.",
        "Pro — $72.99 / month (or $700.70 / year). Unlimited products, orders, and storage on published limits, unlimited print sides, plus Pro-only tools such as location pricing and white label.",
      ],
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "Not ready for a paid trial? Choose Free first ($0, 5 custom products, 20 orders per month, 1 print side). You can upgrade and start the trial later if you have not used it yet.",
        ],
        link: {
          label: "Compare all plans",
          href: "/help/getting-started/installations/upgrade-your-plan",
        },
      },
    },
    {
      id: "after-trial-starts",
      title: "After the trial starts",
      paragraphs: [
        "Finish storefront setup, then configure a product so you can test the full path before the trial ends.",
      ],
      links: [
        {
          label: "How to Embed Custy on Your Store?",
          href: "/help/getting-started/app-activation/embed-custy",
        },
        {
          label: "Setting Up Your First Product",
          href: "/help/getting-started/product-setup/first-product",
        },
        {
          label: "Upgrade Your Plan",
          href: "/help/getting-started/installations/upgrade-your-plan",
        },
      ],
    },
  ],
};
