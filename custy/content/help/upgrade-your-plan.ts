import type { HelpArticle } from "./types";
import { SUPPORT_EMAIL } from "@/lib/site";

export const upgradeYourPlan: HelpArticle = {
  slug: "upgrade-your-plan",
  categorySlug: "getting-started",
  subCategorySlug: "installations",
  title: "Upgrade Your Plan",
  description:
    "Open Manage plan from Settings, then upgrade to Starter or Pro, or downgrade to a lower tier, on Plans & Pricing.",
  summary:
    "Separate steps for upgrade and downgrade on Plans & Pricing, after opening Manage plan.",
  readMinutes: 3,
  updatedOn: "8 September 2026",
  lead: [
    "Use this guide when you already have a Custy plan and need different limits. Open Plans from Settings (Manage plan) or the left nav, then either upgrade to a higher tier or downgrade to a lower one.",
    "If you have not started a paid plan yet and only want the trial, follow How to Start Your 30-Day Free Trial of Custy instead.",
  ],
  leadLinks: [
    {
      label: "How to Start Your 30-Day Free Trial of Custy?",
      href: "/help/getting-started/installations/free-trial",
    },
  ],
  sections: [
    {
      id: "open-manage-plan",
      title: "Step 1: Open Manage plan from Settings",
      paragraphs: [
        "In Custy, open Settings. The Subscription card shows your current tier and status (for example Free plan or Pro plan with an Active badge). Select Manage plan to open Plans & Pricing.",
        "You can also open Plans directly from the Custy left navigation — both paths land on the same screen.",
      ],
      figure: {
        src: "/images/help/settings-subscription.png",
        alt: "Custy Settings page with Subscription card and Manage plan button",
        caption: "Settings → Subscription. Select Manage plan to change your package.",
        width: 1024,
        height: 354,
        markers: [
          {
            n: 1,
            title: "Settings",
            body: "Open Settings in the Custy navigation.",
          },
          {
            n: 2,
            title: "Current plan",
            body: "Subscription shows your tier and status (Active, Trial, or Cancelling).",
          },
          {
            n: 3,
            title: "Manage plan",
            body: "Opens Plans & Pricing so you can upgrade or downgrade.",
          },
        ],
      },
    },
    {
      id: "upgrade-plan",
      title: "Step 2: Upgrade to a higher plan",
      paragraphs: [
        "When you are on Free (or a lower paid tier), higher cards show Upgrade. Your current package shows a Current plan badge and has no change button on that card.",
        "The example below is a store on Free with Annual billing. Starter and Pro both show Upgrade. Select the tier you want, approve the Shopify charge, and that card becomes Current plan.",
      ],
      actions: [
        "Set Billing cycle to Monthly or Annual (Annual shows Save 20%).",
        "On Starter or Pro, select Upgrade.",
        "Approve the Shopify confirmation screen.",
      ],
      figure: {
        src: "/images/help/plans-upgrade.png",
        alt: "Custy Plans page on Annual billing while on Free, showing Upgrade on Starter and Pro",
        caption: "On Free (Current plan). Select Upgrade on Starter or Pro to move up.",
        width: 1024,
        height: 501,
        markers: [
          {
            n: 1,
            title: "Billing cycle",
            body: "Monthly or Annual. Annual shows Save 20% and yearly prices.",
          },
          {
            n: 2,
            title: "Current plan",
            body: "Free shows the Current plan badge when that is your active package.",
          },
          {
            n: 3,
            title: "Upgrade",
            body: "Starter and Pro show Upgrade when you are on a lower plan. Confirm in Shopify after you select one.",
          },
        ],
      },
    },
    {
      id: "downgrade-plan",
      title: "Step 3: Downgrade to a lower plan",
      paragraphs: [
        "When you are on Pro (or Starter), lower cards show Downgrade or Downgrade to Free. The active card still shows Current plan with no change button.",
        "The example below is a store on Pro with Annual billing. Free shows Downgrade to Free and Starter shows Downgrade. Confirm in Shopify after you choose.",
      ],
      actions: [
        "Set Billing cycle if you also want to change Monthly / Annual.",
        "On a lower tier, select Downgrade or Downgrade to Free.",
        "Approve the Shopify confirmation screen.",
      ],
      figure: {
        src: "/images/help/plans-downgrade.png",
        alt: "Custy Plans page on Annual billing while on Pro, showing Downgrade to Free and Downgrade",
        caption: "On Pro (Current plan). Use Downgrade or Downgrade to Free on lower tiers.",
        width: 1024,
        height: 551,
        markers: [
          {
            n: 1,
            title: "Billing cycle",
            body: "Monthly or Annual. Annual shows yearly prices for paid plans.",
          },
          {
            n: 2,
            title: "Downgrade actions",
            body: "Lower tiers show Downgrade to Free or Downgrade when you are on a higher plan.",
          },
          {
            n: 3,
            title: "Current plan",
            body: "Pro shows the Current plan badge and no change button on that card.",
          },
        ],
      },
    },
    {
      id: "cancel-subscription",
      title: "Step 4: Cancel subscription (optional)",
      paragraphs: [
        "At the bottom of Plans & Pricing, find Need to stop your plan? Select Cancel subscription when the button is enabled. If it stays disabled, reload the page so Custy can load your Shopify subscription id.",
        "Cancelling prorates credits for the unused portion of the current billing cycle. You keep access through the end of the paid period.",
      ],
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "If you cancelled by mistake, return to Plans and use Revert cancellation when Custy offers it, before the period ends.",
        ],
      },
    },
    {
      id: "monthly-plans",
      title: "Overview of monthly plans",
      paragraphs: [
        "Same feature sets whether you bill Monthly or Annual. Monthly list prices:",
      ],
      highlights: [
        "Free ($0 / month) — 5 custom products, 20 orders per month, 1 GB storage, max 1 print side, basic customization, email support. No trial.",
        "Starter ($22.99 / month) — 100 custom products, 300 orders per month, 25 GB storage, max 6 print sides, advanced design tools, inventory control, all printing methods.",
        "Pro ($72.99 / month) — Unlimited products, orders, and storage on published limits, unlimited print sides, advanced design tools, premium support, plus Pro-only tools such as location pricing and white label.",
      ],
    },
    {
      id: "yearly-plans",
      title: "Overview of annual plans",
      paragraphs: [
        "Toggle Annual on Plans & Pricing to see yearly totals. Limits match the monthly tier for that package. Free stays $0.",
      ],
      highlights: [
        "Starter — $220.70 / year (Save 20% versus monthly).",
        "Pro — $700.70 / year (Save 20% versus monthly).",
      ],
    },
    {
      id: "after-you-change",
      title: "After you change plans",
      paragraphs: [
        "Approve any Shopify charge or confirmation screen. Custy returns you to Plans with an updated Current plan badge. Settings → Subscription also refreshes. Watch dashboard usage cards so you stay inside the new limits.",
      ],
      callout: {
        variant: "important",
        title: "Payment issues",
        paragraphs: [
          "If payment fails, Custy may show that the subscription is paused. Pending approval appears when Shopify has not finished confirming the charge.",
        ],
      },
    },
    {
      id: "need-help",
      title: "Need help?",
      paragraphs: [
        `Questions about which package to pick? Email ${SUPPORT_EMAIL} or use Contact in this Help Centre.`,
      ],
      links: [
        { label: "Contact support", href: "/about#contact" },
        {
          label: "How to Install Custy?",
          href: "/help/getting-started/installations/install-custy",
        },
      ],
    },
  ],
};
