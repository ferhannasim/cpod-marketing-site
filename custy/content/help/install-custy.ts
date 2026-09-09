import type { HelpArticle } from "./types";
import { APP_URL, SUPPORT_EMAIL } from "@/lib/site";

export const installCusty: HelpArticle = {
  slug: "install-custy",
  categorySlug: "getting-started",
  subCategorySlug: "installations",
  title: "How to Install Custy?",
  description:
    "Add Custy to your Shopify store in simple clicks. No coding needed.",
  summary: "Add Custy to Shopify with a few clicks. You do not need to write any code.",
  readMinutes: 2,
  updatedOn: "8 September 2026",
  lead: [
    "Adding Custy is like installing an app on your phone. You click a few buttons. You do not need to write any code.",
    "After this guide, Custy will be on your store. Next you will turn on a button so shoppers can see it. We will show you that later.",
  ],
  sections: [
    {
      id: "step-by-step-heading",
      title: "Follow these steps in order",
      paragraphs: [
        "Use the store where you sell your products. If you have more than one store, double-check the name at the top before you start. You will not break your store by installing an app.",
      ],
    },
    {
      id: "step-1",
      title: "Step 1: Open Shopify",
      paragraphs: [
        "Open your web browser. Go to Shopify and sign in, the same way you always do. Make sure you are looking at the right store.",
      ],
    },
    {
      id: "step-2",
      title: "Step 2: Click Apps",
      paragraphs: [
        "On the left side of the screen, look for the word Apps. Click it. The picture below shows where it is.",
      ],
      figure: {
        src: "/images/help/install-shopify-apps-nav.png",
        alt: "Shopify Admin left menu with Apps pointed out",
        caption: "Click Apps on the left side of Shopify.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Apps",
            body: "Click Apps here. This is where you find and add apps.",
          },
        ],
      },
    },
    {
      id: "step-3",
      title: "Step 3: Find Custy",
      paragraphs: [
        "In the search box, type Custy. Click the Custy app when you see it. You can also open it from this link: apps.shopify.com/custy.",
      ],
      figure: {
        src: "/images/help/install-apps-search.png",
        alt: "Search results showing the Custy app",
        caption: "Type Custy, then click the Custy app.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Search",
            body: "Type the word Custy in the search box.",
          },
          {
            n: 2,
            title: "Custy",
            body: "Click the official Custy app in the list.",
          },
        ],
      },
      links: [{ label: "Open Custy on the Shopify App Store", href: APP_URL }],
    },
    {
      id: "step-4",
      title: "Step 4: Click Install",
      paragraphs: [
        "You will see a page about Custy. Find the button that says Install. Click it.",
      ],
      figure: {
        src: "/images/help/install-app-store.png",
        alt: "Custy page in the Shopify App Store with Install pointed out",
        caption: "Click Install on the Custy page.",
        width: 1408,
        height: 830,
        markers: [
          {
            n: 1,
            title: "Install",
            body: "Click Install to add Custy to your store.",
          },
        ],
      },
    },
    {
      id: "step-5",
      title: "Step 5: Read what Shopify asks you to allow",
      paragraphs: [
        "Shopify will show a list of things Custy needs to work (like products and orders). This is normal for every app. Read it if you want. You are not giving away your store — you are letting Custy help with custom products.",
      ],
    },
    {
      id: "step-6",
      title: "Step 6: Click Install again to finish",
      paragraphs: [
        "Click Install one more time on that screen. Shopify will open Custy for you. You did it.",
      ],
      figure: {
        src: "/images/help/install-permissions.png",
        alt: "Shopify permission screen with Install pointed out",
        caption: "Click Install again to finish adding Custy.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "What Custy can use",
            body: "This list is what Custy needs to work with your products and orders.",
          },
          {
            n: 2,
            title: "Install",
            body: "Click Install to finish.",
          },
        ],
      },
      note: {
        title: "What Custy sets up for you",
        body: "Custy makes a design page for shoppers and connects a few settings in the background. You do not need to do that by hand. If the design page ever goes missing, open Settings in Custy and click Sync Shopify Resources.",
      },
    },
    {
      id: "step-7",
      title: "Step 7: Pick a plan",
      paragraphs: [
        "Custy will usually open a page of plans. Pick one so you can keep going. Click Start Free for the free plan. Or on Starter or Pro, click Start free trial or Subscribe. If Shopify asks you to approve a charge, click to approve it.",
      ],
      figure: {
        src: "/images/help/install-plans-gate.png",
        alt: "Custy plans screen with Free, Starter, and Pro",
        caption: "Pick Free, or start a free trial on Starter or Pro.",
        width: 1903,
        height: 933,
        markers: [
          {
            n: 1,
            title: "Monthly or Annual",
            body: "Choose how often you want to be billed. Annual shows Save 20%.",
          },
          {
            n: 2,
            title: "Free",
            body: "Click Start Free if you want the free plan. There is no trial on Free.",
          },
          {
            n: 3,
            title: "Starter or Pro",
            body: "Click Start free trial (one time per store) or Subscribe.",
          },
        ],
      },
    },
    {
      id: "congratulations",
      title: "You are done with install",
      paragraphs: [
        "Custy is on your store. Nice work. Next: start the free trial if you want a paid plan, turn Custy on in your theme, then set up your first product so shoppers can design.",
      ],
      links: [
        {
          label: "How to Start Your 30-Day Free Trial of Custy?",
          href: "/help/getting-started/installations/free-trial",
        },
        {
          label: "How to Embed Custy on Your Store?",
          href: "/help/getting-started/app-activation/embed-custy",
        },
        {
          label: "Setting Up Your First Product",
          href: "/help/products/custom-products/first-product",
        },
      ],
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "The 30-day free trial on Starter or Pro lets you try everything before you pay. You can cancel or change plans later. See the free trial guide if you want that path.",
        ],
        link: {
          label: "Start from the Custy App Store listing",
          href: APP_URL,
        },
      },
    },
    {
      id: "supported-browsers",
      title: "Which browser to use",
      paragraphs: [
        "Use a normal, up-to-date browser such as Chrome, Safari, Firefox, or Edge. Setting things up is easiest on a computer. Shoppers can design on a phone or a computer.",
        `If something looks wrong, email ${SUPPORT_EMAIL} or use Contact in this Help Centre. We are happy to help.`,
      ],
      links: [{ label: "Contact support", href: "/about#contact" }],
    },
  ],
};
