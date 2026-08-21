import { SUPPORT_EMAIL } from "@/lib/site";

export type FaqItem = {
  question: string;
  answer: string;
  /** Optional pointer to the page that documents the answer in full. */
  link?: { label: string; href: string };
};

export type FaqGroup = {
  title: string;
  eyebrow: string;
  items: FaqItem[];
};

// Client-supplied FAQ copy (2026-08-21) for the standalone /faq page. Kept
// separate from content/pricing.ts's `pricing.faq`, which stays scoped to the
// seven billing questions the pricing page answers beside its plan table.
//
// One fill-in from the rest of the site: the trial answer uses the 30-day
// length already published on the pricing page (pricing.header.note, guarded
// by lib/trial-copy.test.ts). The support address comes from lib/site.ts's
// SUPPORT_EMAIL rather than being hardcoded.
export const faq = {
  hero: {
    title: "Frequently Asked Questions",
    lead: "Everything merchants ask before installing Custy — what it does, what shoppers can design, how plans and billing work, and who handles the printing.",
  },

  groups: [
    {
      eyebrow: "Basics",
      title: "Custy basics",
      items: [
        {
          question: "What is Custy?",
          answer:
            "Custy is the product customizer for your Shopify store. Shoppers design apparel and products in your store, then buy. You fulfill through Cheapest Print On Demand.",
        },
        {
          question: "How is Custy different from the Dropshipping app?",
          answer:
            'Custy is for customization: the "Customize" button, design editor, and custom orders. The Dropshipping app is for importing CPOD products, markup, and forwarding orders. Many stores use both.',
          link: { label: "Compare Custy and the Dropshipping app", href: "/dropshipping" },
        },
        {
          question: "Do my customers need to leave my store to design?",
          answer:
            "No. They design on your storefront. The design experience opens from your product page and stays in your shopping flow.",
        },
        {
          question: "What can customers customize?",
          answer:
            "They can add text, images, clipart, and designs on product sides you enable, then add the finished item to cart.",
        },
        {
          question: "Does Custy work with print-on-demand?",
          answer:
            "Yes. Custom orders go to Cheapest Print On Demand for printing and fulfillment when your store is set up for that.",
        },
      ],
    },
    {
      eyebrow: "Plans",
      title: "Plans and billing",
      items: [
        {
          question: "Is there a free plan?",
          answer:
            "Yes. Free includes a limited number of custom products, monthly orders, and storage, with basic customization. Paid plans unlock higher limits and more tools.",
          link: { label: "Compare plans", href: "/pricing" },
        },
        {
          question: "What are the paid plans?",
          answer:
            "Starter and Pro, billed monthly or annually through Shopify. Starter suits smaller stores. Pro is for higher volume and unlimited products and orders.",
        },
        {
          question: "Is there a free trial?",
          answer:
            "Paid plans include a 30-day free trial when you upgrade. Free has no trial.",
        },
        {
          question: "How do I get billed?",
          answer:
            "App plans are charged through Shopify Billing on your Shopify invoice. That is separate from product or print costs.",
        },
      ],
    },
    {
      eyebrow: "Setup",
      title: "Setup and usage",
      items: [
        {
          question: "Do I need technical skills to install it?",
          answer:
            "No. Install from the Shopify App Store, connect your store, set up products for customization, and publish.",
        },
        {
          question: "Can I use my own products?",
          answer:
            "Yes. You make products customizable in Custy and control sizes, colors, sides, and print options.",
        },
        {
          question: "Will it slow down my store?",
          answer:
            "No. It loads where needed on product pages and does not replace your whole theme.",
        },
        {
          question: "Can I change the Customize button?",
          answer:
            "Yes. You can adjust the button label and styling in settings so it matches your brand.",
        },
        {
          question: "What if a customer abandons a design?",
          answer:
            "Designs can be saved and returned to, depending on how the customer uses the flow. Completed purchases create the custom product and order as usual.",
        },
      ],
    },
    {
      eyebrow: "Fulfillment",
      title: "Fulfillment and support",
      items: [
        {
          question: "Who handles shipping and printing?",
          answer:
            "Cheapest Print On Demand handles production and shipping for fulfilled custom orders, based on your CPOD setup.",
        },
        {
          question: "Can I cancel anytime?",
          answer:
            "Yes. You can change or cancel your plan from the app / Shopify billing. Your store stays yours.",
        },
        {
          question: "Where do I get help?",
          answer: `Email ${SUPPORT_EMAIL} or use the support contact on our marketing site.`,
          link: { label: "Go to support", href: "/support" },
        },
      ],
    },
  ] satisfies FaqGroup[],
};

// Flat list in page order, so the homepage teaser and the FAQPage structured
// data both read from the same single source as the page itself.
export const faqItems: FaqItem[] = faq.groups.flatMap((group) => group.items);
