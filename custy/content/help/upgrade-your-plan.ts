import type { HelpArticle } from "./types";
import { SUPPORT_EMAIL } from "@/lib/site";

export const upgradeYourPlan: HelpArticle = {
  slug: "upgrade-your-plan",
  categorySlug: "getting-started",
  subCategorySlug: "installations",
  title: "Upgrade Your Plan",
  description:
    "Change to a bigger or smaller plan. Open Manage plan, then click Upgrade or Downgrade.",
  summary: "Move up or down between **Free**, **Starter**, and **Pro** with simple clicks.",
  readMinutes: 3,
  updatedOn: "8 September 2026",
  lead: [
    "Use this guide when you already have a plan and want a bigger one or a smaller one. You will open **Manage plan**, then click **Upgrade** or **Downgrade**. Changing plans does not delete your products.",
    "If you have not started a paid plan yet and only want the free trial, use the free trial guide instead.",
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
      title: "Step 1: Open Manage plan",
      paragraphs: [
        "In Custy, click **Settings** on the left. Find the box that says Subscription. It shows your current plan. Click **Manage plan**.",
        "You can also click **Plans** on the left menu. Both take you to the same place.",
      ],
      figure: {
        src: "/images/help/settings-subscription.png",
        alt: "Custy Settings with Subscription and Manage plan pointed out",
        caption: "In **Settings**, click **Manage plan**.",
        width: 1024,
        height: 354,
        markers: [
          {
            n: 1,
            title: "Settings",
            body: "Click **Settings** in the left menu.",
          },
          {
            n: 2,
            title: "Your plan",
            body: "This box shows which plan you are on right now.",
          },
          {
            n: 3,
            title: "Manage plan",
            body: "Click here to change your plan.",
          },
        ],
      },
    },
    {
      id: "upgrade-plan",
      title: "Step 2: Move to a bigger plan (Upgrade)",
      paragraphs: [
        "If you are on **Free** (or a smaller paid plan), the bigger plans show a button that says **Upgrade**. Your current plan says **Current plan** and has no change button.",
        "The picture below shows a store on **Free**. **Starter** and **Pro** both say **Upgrade**. Click the one you want. Then approve the Shopify screen.",
      ],
      actions: [
        "Choose **Monthly or Annual** (Annual says **Save 20%**).",
        "On **Starter** or **Pro**, click **Upgrade**.",
        "Approve the Shopify confirmation screen.",
      ],
      figure: {
        src: "/images/help/plans-upgrade.png",
        alt: "Plans page on Free with Upgrade on Starter and Pro",
        caption: "On **Free**. Click **Upgrade** on **Starter** or **Pro** to move up.",
        width: 1024,
        height: 501,
        markers: [
          {
            n: 1,
            title: "Monthly or Annual",
            body: "Pick how often you want to pay. Annual shows **Save 20%**.",
          },
          {
            n: 2,
            title: "Current plan",
            body: "This badge means this is the plan you have now.",
          },
          {
            n: 3,
            title: "Upgrade",
            body: "Click **Upgrade** on the plan you want. Then confirm in Shopify.",
          },
        ],
      },
    },
    {
      id: "downgrade-plan",
      title: "Step 3: Move to a smaller plan (Downgrade)",
      paragraphs: [
        "If you are on **Pro** (or **Starter**), the smaller plans show **Downgrade** or **Downgrade to Free**. Your current plan still says **Current plan**.",
        "The picture below shows a store on **Pro**. **Free** says **Downgrade to Free**. **Starter** says **Downgrade**. Click the one you want. Then confirm in Shopify.",
      ],
      actions: [
        "Change **Monthly or Annual** if you want to change that too.",
        "On a smaller plan, click **Downgrade** or **Downgrade to Free**.",
        "Approve the Shopify confirmation screen.",
      ],
      figure: {
        src: "/images/help/plans-downgrade.png",
        alt: "Plans page on Pro with Downgrade buttons",
        caption: "On **Pro**. Use **Downgrade** or **Downgrade to Free** on the smaller plans.",
        width: 1024,
        height: 551,
        markers: [
          {
            n: 1,
            title: "Monthly or Annual",
            body: "Pick how often you want to pay.",
          },
          {
            n: 2,
            title: "Downgrade",
            body: "Smaller plans show **Downgrade** or **Downgrade to Free**.",
          },
          {
            n: 3,
            title: "Current plan",
            body: "This is the plan you have now. It has no change button.",
          },
        ],
      },
    },
    {
      id: "cancel-subscription",
      title: "Step 4: Cancel your plan (only if you want to stop)",
      paragraphs: [
        "At the bottom of the **Plans** page, look for Need to stop your plan? Click Cancel subscription when the button is ready. If the button is grey and you cannot click it, refresh the page and try again.",
        "If you cancel, you keep using Custy until the end of the time you already paid for. Shopify may give you credit for unused days. Cancelling does not delete your store.",
      ],
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "Cancelled by mistake? Go back to **Plans**. If you see Revert cancellation, click it before the paid period ends.",
        ],
      },
    },
    {
      id: "monthly-plans",
      title: "What each monthly plan includes",
      paragraphs: [
        "Monthly and yearly plans have the same features. Here are the monthly prices:",
      ],
      highlights: [
        "**Free** ($0 per month): 5 custom products, 20 orders per month, 1 GB storage, 1 print side, basic tools, email support. No trial.",
        "**Starter** ($22.99 per month): 100 custom products, 300 orders per month, 25 GB storage, up to 6 print sides, more design tools, inventory tools, all printing methods.",
        "**Pro** ($72.99 per month): Unlimited products, orders, and storage on the published limits, unlimited print sides, premium support, plus **Pro** extras such as **location pricing** and **white label**.",
      ],
    },
    {
      id: "yearly-plans",
      title: "What each yearly plan costs",
      paragraphs: [
        "Click Annual on the **Plans** page to see yearly prices. The limits are the same as monthly. **Free** stays $0.",
      ],
      highlights: [
        "**Starter**: $220.70 per year (**Save 20%** compared with paying monthly).",
        "**Pro**: $700.70 per year (**Save 20%** compared with paying monthly).",
      ],
    },
    {
      id: "after-you-change",
      title: "After you change plans",
      paragraphs: [
        "Approve any Shopify screen that pops up. You will land back on **Plans** with a new **Current plan** badge. **Settings** will update too. Check the usage numbers on the dashboard so you stay inside your new limits.",
      ],
      callout: {
        variant: "important",
        title: "If payment has a problem",
        paragraphs: [
          "If a payment fails, Custy may say the subscription is paused. If you see Pending approval, wait for Shopify to finish confirming the charge, or try again.",
        ],
      },
    },
    {
      id: "need-help",
      title: "Need help picking a plan?",
      paragraphs: [
        `Email ${SUPPORT_EMAIL} or use Contact in this Help Centre. We will help you choose.`,
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
