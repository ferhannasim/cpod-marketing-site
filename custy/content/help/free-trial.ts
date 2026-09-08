import type { HelpArticle } from "./types";

export const freeTrial: HelpArticle = {
  slug: "free-trial",
  categorySlug: "getting-started",
  subCategorySlug: "installations",
  title: "How to Start Your 30-Day Free Trial of Custy?",
  description:
    "Try Starter or Pro free for 30 days. Simple clicks. You can change your mind later.",
  summary: "Try Starter or Pro for 30 days with a few clicks on the Plans page.",
  readMinutes: 1,
  updatedOn: "8 September 2026",
  lead: [
    "A free trial means you can try the paid plans for 30 days before Shopify charges you. Use that time to set up a product and see if Custy fits your shop.",
    "You get one trial per store. Only Starter and Pro have a trial. The Free plan has no trial — you can use Free anytime without starting a trial.",
  ],
  sections: [
    {
      id: "how-to-start",
      title: "Start the trial in three steps",
      paragraphs: [
        "Do this right after install, or open Plans from the left menu in Custy anytime before you have used the trial.",
      ],
      actions: [
        "Open Plans in the left menu (or you may already be there after install).",
        "Choose Monthly or Annual. Annual says Save 20%.",
        "On Starter or Pro, click Start free trial. Then click to approve the Shopify screen that appears.",
      ],
      figure: {
        src: "/images/help/install-plans-gate.png",
        alt: "Custy Plans page with Start free trial on Starter and Pro",
        caption: "Click Start free trial on Starter or Pro, then confirm in Shopify.",
        width: 1903,
        height: 933,
        markers: [
          {
            n: 1,
            title: "Monthly or Annual",
            body: "Pick how you want to pay after the trial ends.",
          },
          {
            n: 2,
            title: "Free",
            body: "Click Start Free if you do not want a trial. Free has no 30-day trial.",
          },
          {
            n: 3,
            title: "Start free trial",
            body: "Click this on Starter or Pro. If you already used the trial, you will see Subscribe instead.",
          },
        ],
      },
      callout: {
        variant: "important",
        title: "Good to know",
        paragraphs: [
          "When the 30 days end, Shopify starts charging for the plan you picked — unless you change plan or cancel first. During the trial, Settings may say Trial and how many days are left. You are not locked in forever.",
        ],
      },
    },
    {
      id: "plans-on-trial",
      title: "Which plans have the trial?",
      paragraphs: [
        "Only Starter and Pro. For those 30 days you get the features of the plan you pick.",
      ],
      highlights: [
        "Starter — $22.99 per month (or $220.70 per year). Up to 100 custom products, 300 orders per month, 25 GB of storage, up to 6 print sides, quantity discounts, and inventory tools.",
        "Pro — $72.99 per month (or $700.70 per year). Unlimited products, orders, and storage on the published limits, unlimited print sides, plus extra Pro tools such as location pricing and white label.",
      ],
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "Not ready to try a paid plan? Click Start Free first ($0, 5 custom products, 20 orders per month, 1 print side). You can upgrade and start the trial later if you have not used it yet.",
        ],
        link: {
          label: "Compare all plans",
          href: "/help/getting-started/installations/upgrade-your-plan",
        },
      },
    },
    {
      id: "after-trial-starts",
      title: "What to do after the trial starts",
      paragraphs: [
        "Next, turn Custy on in your theme, then set up one product. That way you can try the full path before the 30 days end. Take your time.",
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
