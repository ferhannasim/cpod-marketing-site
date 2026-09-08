import type { HelpArticle } from "./types";
import { APP_URL, SUPPORT_EMAIL } from "@/lib/site";

export const installCusty: HelpArticle = {
  slug: "install-custy",
  categorySlug: "getting-started",
  subCategorySlug: "installations",
  title: "How to Install Custy?",
  description:
    "Step-by-step guide to install Custy on Shopify: open Apps, find Custy, approve permissions, and choose a plan.",
  summary:
    "Install and synchronize Custy with your Shopify store — no theme coding required for the install itself.",
  readMinutes: 2,
  updatedOn: "8 September 2026",
  lead: [
    "Getting started with Custy is quick and easy. No manual coding skill is required to install and synchronize the app with your Shopify store.",
    "Custy automatically integrates with your Shopify store and works with vintage and Online Store 2.0 themes. After install, finish App Activation so Customize It appears on your product pages.",
  ],
  sections: [
    {
      id: "step-by-step-heading",
      title: "Step-by-step installation guide",
      paragraphs: [
        "Follow these steps in order. Use the store that will sell customizable products — installing on the wrong store means you will need to repeat the process.",
      ],
    },
    {
      id: "step-1",
      title: "Step 1: Log in to your Shopify Admin",
      paragraphs: [
        "Open your browser and sign in to the Shopify Admin for the store where you want Custy installed. Confirm you are in the correct store if you manage more than one.",
      ],
    },
    {
      id: "step-2",
      title: "Step 2: Open Apps from the left navigation",
      paragraphs: [
        "In Shopify Admin, select Apps from the left navigation menu, as shown in the image below.",
      ],
      figure: {
        src: "/images/help/install-shopify-apps-nav.png",
        alt: "Shopify Admin left navigation with the Apps item highlighted",
        caption: "Select Apps in the Shopify Admin left navigation.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Apps",
            body: "Open Apps to search the App Store or manage installed apps.",
          },
        ],
      },
    },
    {
      id: "step-3",
      title: "Step 3: Search for Custy",
      paragraphs: [
        "Type Custy in the Apps search bar and select the Custy app from the results. You can also open the official listing directly at apps.shopify.com/custy.",
      ],
      figure: {
        src: "/images/help/install-apps-search.png",
        alt: "Shopify Apps search showing Custy in the results",
        caption: "Search for Custy and open the official app from the results.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Search",
            body: "Type Custy in the Apps search field.",
          },
          {
            n: 2,
            title: "Custy result",
            body: "Select the official Custy app from the list.",
          },
        ],
      },
      links: [{ label: "Open Custy on the Shopify App Store", href: APP_URL }],
    },
    {
      id: "step-4",
      title: "Step 4: Select Install on the Shopify App Store page",
      paragraphs: [
        "You will be taken to the Shopify App Store listing for Custy. On this page, select the Install button.",
      ],
      figure: {
        src: "/images/help/install-app-store.png",
        alt: "Custy listing in the Shopify App Store with the Install button visible",
        caption: "On the Custy App Store page, select Install.",
        width: 1408,
        height: 830,
        markers: [
          {
            n: 1,
            title: "Install",
            body: "Select Install to begin connecting Custy to your store.",
          },
        ],
      },
    },
    {
      id: "step-5",
      title: "Step 5: Review permissions and privacy",
      paragraphs: [
        "Shopify shows the permissions Custy needs to work with your products, orders, theme, and related store data. Review the permission list and privacy details so you understand how Custy uses store information.",
      ],
    },
    {
      id: "step-6",
      title: "Step 6: Authorize the installation",
      paragraphs: [
        "To authorize the app and complete installation, select Install again on the permission screen. Shopify then opens Custy inside your Admin.",
      ],
      figure: {
        src: "/images/help/install-permissions.png",
        alt: "Shopify app permission approval screen for Custy with Install highlighted",
        caption: "Review permissions, then select Install to authorize Custy.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Permissions",
            body: "Read the scopes Custy requests for your store.",
          },
          {
            n: 2,
            title: "Install",
            body: "Confirm to finish installing Custy on this store.",
          },
        ],
      },
      note: {
        title: "What Custy creates on setup",
        body: "Custy creates or updates the Design Lab page at handle custydesignlab (/pages/custydesignlab) and registers the metafields it needs. If that page is missing later, open Settings and select Sync Shopify Resources.",
      },
    },
    {
      id: "step-7",
      title: "Step 7: Choose your subscription plan",
      paragraphs: [
        "After installation, Custy usually opens Plans. New stores often need an active plan before Products and other areas unlock. Select Start Free for the Free plan, or Start free trial / Subscribe on Starter or Pro, then approve the Shopify charge when prompted.",
      ],
      figure: {
        src: "/images/help/install-plans-gate.png",
        alt: "Custy Plans and Pricing screen after install with Free, Starter, and Pro",
        caption: "Choose Free, or start the 30-day trial on Starter or Pro.",
        width: 1903,
        height: 933,
        markers: [
          {
            n: 1,
            title: "Monthly / Annual",
            body: "Switch billing cycle. Annual shows Save 20%.",
          },
          {
            n: 2,
            title: "Free",
            body: "Start Free with no trial if you only need a small catalog.",
          },
          {
            n: 3,
            title: "Starter or Pro",
            body: "Start free trial (once per store) or Subscribe if the trial was already used.",
          },
        ],
      },
    },
    {
      id: "congratulations",
      title: "Congratulations",
      paragraphs: [
        "You successfully installed Custy on your Shopify store. Next, start the free trial if you chose a paid plan, embed Custy on your theme, then make your first product customizable so shoppers can open the Design Lab.",
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
          href: "/help/getting-started/product-setup/first-product",
        },
      ],
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "Try Custy’s 30-day free trial on Starter or Pro to test customization, print areas, and printing pricing in real time before you commit to a paid subscription.",
        ],
        link: {
          label: "Start from the Custy App Store listing",
          href: APP_URL,
        },
      },
    },
    {
      id: "supported-browsers",
      title: "Supported browsers",
      paragraphs: [
        "Custy is compatible with modern, up-to-date web browsers. Merchants typically configure the app on desktop for the best admin experience. Shoppers can design on desktop and mobile in the Design Lab.",
        `If you encounter any issues, contact support at ${SUPPORT_EMAIL} or use Contact on this Help Centre.`,
      ],
      links: [{ label: "Contact support", href: "/about#contact" }],
    },
  ],
};
