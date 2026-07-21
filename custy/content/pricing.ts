import type { Plan } from "@/components/lander";
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

// Transcribed verbatim from content/raw/pricing.html (custy-pricing-page). No
// <img> tags and no pictographic emoji anywhere on this page (confirmed with
// `grep -noP '[^\x00-\x7F]'` — the only non-ASCII characters are the curly
// apostrophes in "Custy's"/"Shopify's", the bullet separator in the note
// pill, and (after the Task 4 copy pass, below) a few em dashes in the
// tightened prose, all kept as ordinary punctuation), so there's nothing to
// strip or localize.
//
// The four `.custy-plan` cards map directly onto the Task 9 `Plan` type
// (name/price/period/yearly/description/features/trialNote/cta/featured).
// The header (h1 + lead + note pill), the bottom disclaimer, and the FAQ
// section have no equivalent in components/lander (they're plain centered
// text blocks and a Q&A grid, not a hero/section/card-grid shape), so they're
// assembled as minimal page-scoped JSX in app/pricing/page.tsx instead of
// being forced into an ill-fitting shared component.
//
// Inline <strong> emphasis inside the header lead ("21-day free trial") and
// the bottom disclaimer ("No hidden fees. No commission.") is flattened to
// plain text, per the established lead/text plain-string component contract.
//
// Task 4 professionalize pass: the header lead, bottom disclaimer, and FAQ
// answers were tightened (shorter, fixed a subject/verb slip in the lead,
// collapsed redundant sentences) — same claims, tighter wording, FAQ answers
// kept to ≤ 2 sentences. Plan names, prices, periods, and all 45 features are
// untouched and remain verbatim.
export const pricing = {
  header: {
    title: "Simple Pricing for Growing Custom Product Stores",
    lead: "Choose the plan that fits your business today and scales with you tomorrow. Every paid plan includes Custy’s Shopify product customizer, easy setup, and a 21-day free trial.",
    note: "No setup fee • Cancel anytime • 21-day free trial on paid plans",
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
        '"Powered by Custy" footer shown in editor',
      ],
      trialNote: "No trial needed",
      cta: { label: "Get Started Free", href: APP_URL },
    },
    {
      name: "Starter",
      price: "$12.99",
      period: "/ month",
      yearly: "or $124.70/year and save 20%",
      description:
        "A solid starting point for small Shopify stores that want to offer product customization without complexity.",
      features: [
        "0% commission",
        "10 custom products",
        "50 custom orders per month",
        "5 GB storage",
        "Up to 2 print sides",
        "Basic product customization",
        "Quantity discount support",
        "Email support",
      ],
      trialNote: "21-day free trial",
      cta: { label: "Start Free Trial", href: APP_URL },
    },
    {
      name: "Growth",
      price: "$39.99",
      period: "/ month",
      yearly: "or $383.90/year and save 20%",
      description:
        "Built for growing POD brands that need more products, more orders, more flexibility, and stronger support.",
      features: [
        "100 custom products",
        "300 custom orders per month",
        "25 GB storage",
        "Up to 6 print sides",
        "0% commission",
        "Basic product customization",
        "Quantity discount support",
        "Advanced design tools",
        "Inventory control",
        "Dynamic pricing support",
        "DTG and DTF print method support",
        "Product options support",
        "Priority support",
      ],
      trialNote: "21-day free trial",
      cta: { label: "Start Free Trial", href: APP_URL },
      featured: true,
    },
    {
      name: "Pro",
      price: "$79.99",
      period: "/ month",
      yearly: "or $767.90/year and save 20%",
      description:
        "The complete solution for serious custom product businesses that want unlimited scale and advanced capabilities.",
      features: [
        "Unlimited custom products",
        "Unlimited custom orders",
        "Unlimited storage",
        "Unlimited print sides",
        "0% commission",
        "Basic product customization",
        "Quantity discount support",
        "Advanced design tools",
        "Inventory control",
        "Full dynamic pricing engine",
        "Support for all print methods",
        "Product options support",
        "White label option",
        "Advanced automation tools",
        "Bulk order tools",
        "API-ready expansion support",
        "Premium support",
      ],
      trialNote: "21-day free trial",
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
          "Paid plans include a 21-day free trial so you can test Custy on your Shopify store before committing. The Free plan doesn’t require a trial.",
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
    ],
  } satisfies PricingFaq,
};
