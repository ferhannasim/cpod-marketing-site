import type { HelpArticle } from "./types";

export const embedCusty: HelpArticle = {
  slug: "embed-custy",
  categorySlug: "getting-started",
  subCategorySlug: "app-activation",
  title: "How to Embed Custy on Your Store?",
  description:
    "Turn on two switches in your Shopify theme so shoppers see Customize It and can edit designs from the cart.",
  summary:
    "Turn on two theme switches so shoppers see Customize It and can open the design screen.",
  readMinutes: 3,
  lead: [
    "Your shoppers need a way to open the design screen. That takes two simple turns-on in your Shopify theme. Think of them like light switches. You turn them on and save. You are not rewriting your theme by hand.",
    "You need both. One lets people reopen a design from the cart. The other puts the Customize It button on the product page.",
  ],
  sections: [
    {
      id: "enable-embed",
      title: "Step 1: Turn on Custy cart editor",
      paragraphs: [
        "This switch lets a shopper open their design again from the cart. If it is off, Custy shows a banner that says Finish Custy storefront setup with a button Enable in theme.",
      ],
      actions: [
        "Click Enable in theme on the banner, or open your theme editor yourself and look under Apps.",
        "Find Custy cart editor and turn it on (like flipping a switch).",
        "Click Save in the theme editor.",
      ],
      figure: {
        src: "/images/help/install-theme-embed.png",
        alt: "Shopify theme editor with Custy cart editor pointed out",
        caption: "Turn on Custy cart editor, then click Save.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Custy cart editor",
            body: "This is the switch that helps cart links open Custy designs again.",
          },
          {
            n: 2,
            title: "On / Off",
            body: "Turn it on, then click Save.",
          },
        ],
      },
    },
    {
      id: "dashboard-banner",
      title: "If you see a reminder banner",
      paragraphs: [
        "If the switch is still off, the Custy home screen keeps showing Finish Custy storefront setup until you turn it on. That is a helpful reminder, not an error.",
      ],
      figure: {
        src: "/images/help/install-dashboard-banner.png",
        alt: "Custy banner asking you to finish storefront setup",
        caption: "Click Enable in theme when you see this banner.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Finish Custy storefront setup",
            body: "This banner means the cart editor switch is still off.",
          },
          {
            n: 2,
            title: "Enable in theme",
            body: "Click here to open the theme editor and turn the switch on.",
          },
        ],
      },
    },
    {
      id: "customize-button",
      title: "Step 2: Add the Customize It button",
      paragraphs: [
        "On your product page template, add the block called Custy Customize Button. Shoppers will see a button that says Customize It. You can change the words and colors later if you want.",
      ],
      actions: [
        "In the theme editor, open the product page template your shoppers use.",
        "Click Add block and choose Custy Customize Button.",
        "Put it where shoppers will notice it (near Add to cart is a good spot), then click Save.",
        "Optional: change the button text, colors, price chart, or hide Add to cart while people design.",
      ],
      figure: {
        src: "/images/help/install-customize-block.png",
        alt: "Theme editor showing the Custy Customize Button",
        caption: "Add the Customize It button to the product page, then save.",
        width: 1726,
        height: 911,
        markers: [
          {
            n: 1,
            title: "Custy Customize Button",
            body: "Add this block on the product page.",
          },
          {
            n: 2,
            title: "Customize It",
            body: "This is the button shoppers click. The default words are Customize It.",
          },
          {
            n: 3,
            title: "Button settings",
            body: "Change the words, colors, and extra options here if you want.",
          },
        ],
      },
    },
    {
      id: "confirm",
      title: "Step 3: Check your live store",
      paragraphs: [
        "After you have at least one custom product with Active on designer set to Yes, open that product on your live store. You should see Customize It. Click it. The design screen should open.",
      ],
      actions: [
        "Open the product on your store (or use View in store from Custy).",
        "Click Customize It and check that the right product opens.",
      ],
      figure: {
        src: "/images/help/storefront-customize-it.png",
        alt: "Product page with Customize It button",
        caption: "Shoppers click Customize It to open the design screen.",
        width: 1726,
        height: 911,
        markers: [
          {
            n: 1,
            title: "Customize It",
            body: "This button opens the design screen for that product.",
          },
        ],
      },
      note: {
        title: "If the design page is missing",
        body: "Open Settings in Custy and click Sync Shopify Resources. That rebuilds the design page for you. It is safe to click.",
      },
    },
  ],
};
