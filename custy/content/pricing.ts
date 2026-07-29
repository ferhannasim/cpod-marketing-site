import type { CompareRow, Plan } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export type PricingHeader = {
  title: string;
  lead: string;
  note: string;
};

export type PricingFaqItem = {
  question: string;
  answer: string;
};

export type PricingFaq = {
  title: string;
  items: PricingFaqItem[];
};

// Originally transcribed verbatim from content/raw/pricing.html
// (custy-pricing-page); no <img> tags and no pictographic emoji anywhere on
// this page (confirmed with `grep -noP '[^\x00-\x7F]'` — the only non-ASCII
// characters are the curly apostrophes in "Custy's"/"Shopify's" and the
// bullet separator in the note pill, kept as ordinary punctuation), so
// there's nothing to strip or localize.
//
// 2026-07-29 pricing refresh: the client replaced the old 4-plan scheme
// (Free / Starter $12.99 / Growth $39.99 / Pro $79.99) with a new 3-plan
// scheme (Free / Starter $22.99 (featured) / Pro $72.99). The `plans` and
// `comparison` data below reflect the new scheme verbatim from the
// client-provided source of truth, plus three controller-approved
// assumptions baked in (flagged to the client separately): Pro is a superset
// of Starter (so Pro also carries Inventory Control); Starter keeps Email
// support (its list omits a support line; the old Starter plan had Email);
// both paid plans carry the 30-day trial. content/raw/pricing.html is left
// untouched (never edit or render it directly) and now reflects the prior
// scheme only.
//
// The three `.custy-plan`-shaped cards map directly onto the `Plan` type
// (name/price/period/yearly/description/features/trialNote/cta/featured).
// The header (h1 + lead + note pill), the bottom disclaimer, and the FAQ
// section have no equivalent in components/lander (they're plain centered
// text blocks and a Q&A grid, not a hero/section/card-grid shape), so they're
// assembled as minimal page-scoped JSX in app/pricing/page.tsx instead of
// being forced into an ill-fitting shared component.
//
// Inline <strong> emphasis inside the header lead ("30-day free trial") and
// the bottom disclaimer ("No hidden fees. No commission.") is flattened to
// plain text, per the established lead/text plain-string component contract.
// The header lead and note pill still read true for the 3-plan scheme (they
// don't name a plan count), so they're unchanged.
export const pricing = {
  header: {
    title: "Simple Pricing for Growing Custom Product Stores",
    lead: "Choose the plan that fits your business today and scales with you tomorrow. Every paid plan includes Custy’s Shopify product customizer, easy setup, and a 30-day free trial.",
    note: "No setup fee • Cancel anytime • 30-day free trial on paid plans",
  } satisfies PricingHeader,

  plans: [
    {
      name: "Free",
      price: "$0",
      period: "/ month",
      yearly: "Free forever • No credit card required",
      description:
        "A great starting point for testing Custy with limited usage before upgrading.",
      features: [
        "5 custom products",
        "20 custom orders per month",
        "1 GB storage",
        "Up to 1 print side",
        "Basic product customization",
        "Email support",
      ],
      trialNote: "No trial needed",
      cta: { label: "Get Started Free", href: APP_URL },
    },
    {
      name: "Starter",
      price: "$22.99",
      period: "/ month",
      yearly: "or $220.70/year and save 20%",
      description:
        "Built for growing Shopify stores that need more products, more orders, and stronger design and inventory tools.",
      features: [
        "100 custom products",
        "300 custom orders per month",
        "25 GB storage",
        "Up to 6 print sides",
        "Advanced design tools",
        "Inventory control",
        "All printing methods supported",
        "Email support",
      ],
      trialNote: "30-day free trial",
      cta: { label: "Start Free Trial", href: APP_URL },
      featured: true,
    },
    {
      name: "Pro",
      price: "$72.99",
      period: "/ month",
      yearly: "or $700.70/year and save 20%",
      description:
        "The complete solution for serious custom product businesses that want unlimited scale and advanced capabilities.",
      features: [
        "Unlimited custom products",
        "Unlimited custom orders",
        "Unlimited storage",
        "Unlimited print sides",
        "Advanced design tools",
        "Inventory control",
        "All printing methods supported",
        "Premium support",
      ],
      trialNote: "30-day free trial",
      cta: { label: "Start Free Trial", href: APP_URL },
    },
  ] satisfies Plan[],

  bottomNote:
    "All prices are billed in USD, charged every 30 days unless you choose annual billing. You can cancel anytime through Shopify — no hidden fees, no commission.",

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Does every plan include a free trial?",
        answer:
          "Paid plans include a 30-day free trial so you can test Custy on your Shopify store before committing. The Free plan doesn’t require a trial.",
      },
      {
        question: "Can I change my plan later?",
        answer: "Yes — you can upgrade or downgrade at any time as your business grows or your needs change.",
      },
      {
        question: "Do you charge any commission on orders?",
        answer:
          "No. Custy doesn’t charge commission on your sales — your monthly subscription covers the features included in your plan.",
      },
      {
        question: "How does billing work?",
        answer:
          "Billing runs through Shopify’s billing system, with charges added to your invoice based on your plan.",
      },
      {
        question: "What happens if I hit a plan limit?",
        answer:
          "The app shows an over-quota notice and locked features prompt an upgrade — nothing breaks, and upgrading lifts the limit immediately.",
      },
      {
        question: "How does annual billing work?",
        answer:
          "Every paid plan has an annual option that saves 20% versus paying monthly. Billing runs through Shopify either way.",
      },
      {
        question: "Can I use the free trial more than once?",
        answer:
          "The 30-day trial applies once per store. After it ends you can continue on a paid plan or drop to the Free plan.",
      },
    ],
  } satisfies PricingFaq,
};

// Detailed plan-comparison table for the pricing page, rendered below the
// plan cards via components/lander's PlanCompare. Every value below is
// derived directly from the client-provided 3-plan scheme in `plans` above
// (Free / Starter / Pro) — Free and Starter limits are finite (custom
// products, orders per month, storage, print sides per product); Pro is
// UNLIMITED across all four. Boolean feature flags (basic customization,
// advanced design tools, inventory control, all printing methods) map to
// "Included" (true) or "—" (false); Support maps to Email/Email/Premium.
// Rows naming features absent from the new scheme (quantity discounts,
// tiered pricing, location pricing, white label, API access, bulk order
// tools) were dropped — re-verify against `plans` above if either changes.
export const comparison: { plans: string[]; rows: CompareRow[] } = {
  plans: ["Free", "Starter", "Pro"],
  rows: [
    { label: "Custom products", values: ["5", "100", "Unlimited"] },
    { label: "Orders per month", values: ["20", "300", "Unlimited"] },
    { label: "Storage", values: ["1 GB", "25 GB", "Unlimited"] },
    { label: "Print sides per product", values: ["1", "6", "Unlimited"] },
    { label: "Basic customization", values: ["Included", "Included", "Included"] },
    { label: "Advanced design tools", values: ["—", "Included", "Included"] },
    { label: "Inventory control", values: ["—", "Included", "Included"] },
    { label: "All printing methods", values: ["—", "Included", "Included"] },
    { label: "Support", values: ["Email", "Email", "Premium"] },
  ],
};
