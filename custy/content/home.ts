import { APP_URL } from "@/lib/site";

export type ImageField = { src: string; width: number; height: number; alt?: string };

export type Cta = { label: string; href: string; external?: boolean };

export type RichBlock = {
  heading?: string;
  html: string;
  image?: ImageField;
  ctas?: Cta[];
};

export type DemoProduct = { title: string; image: ImageField };

// Homepage copy/images transcribed verbatim from templates/index.json (section order
// and settings) and content/raw/home.html (what's actually rendered). See
// .superpowers/sdd/task-8-report.md for the full copy-fidelity + image-source notes.
export const home = {
  // section_KdywkE ("Powerful Product Customization for Shopify POD Stores").
  // This is the first section on the live page: the Horizon "hero" section
  // (hero_jVaWmY) is disabled in index.json and renders nothing, and this section's
  // own heading is the first real content on the page. Rendered as the page's <h1>
  // (see rich-section.tsx) even though the live source styles it as an h3-look <p>.
  // CTA label had a leading party-popper emoji in the source; stripped per no-emoji rule.
  intro: {
    heading: "Powerful Product Customization for Shopify POD Stores",
    html: `<p>Custy is a next-generation Shopify product customizer built specifically for print-on-demand (POD) businesses. It allows your customers to design products in real-time with an intuitive and interactive design panel. From t-shirts and hoodies to caps and more, users can personalize every detail before placing an order.</p>
<p>The app supports multi-side customization, including front, back, left sleeve, and right sleeve, giving complete creative freedom. Custy also enables dynamic pricing based on selected design areas, printing methods, and product variations, helping you maximize revenue while staying flexible.</p>
<p>With support for DTG, DTF, and other modern printing methods, Custy automatically generates high-quality, print-ready files for production. This eliminates manual work and reduces errors in the fulfillment process.</p>
<p>Fully integrated with Shopify, Custy ensures a smooth workflow from customization to checkout. Orders include all design data, making it easy for you or your print partners to process instantly.</p>
<p>Whether you’re launching a new POD brand or scaling an existing store, Custy enhances customer experience, increases engagement, and significantly boosts conversion rates.</p>`,
    image: {
      src: "/images/content/custy_left_photo.jpg",
      width: 795,
      height: 857,
      alt: "",
    },
    ctas: [{ label: "Start Your 14-Day Free Trial of Custy", href: APP_URL, external: true }],
  } as RichBlock,

  // product_list_fa6P9H. Demo-only: no commerce, cards are static image+title tiles
  // linking out to the Shopify App Store listing, never to /products/*.
  // The live "View all" header button is never actually rendered (collection has
  // <= max_products), so it's dropped rather than invented.
  demo: {
    heading: "Test Our App on Demo Product",
    products: [
      {
        title: "T-shirt Midweight Cotton 8.8 oz",
        image: { src: "/images/content/dg-designer-b367e525159492171574826543310441065_17e7cfa9-1e86-4479-81f7-46adaf12015c.png", width: 800, height: 1000, alt: "T-shirt Midweight Cotton 8.8 oz" },
      },
      {
        title: "Female Hoodies 80/20 Cotton-Polyester",
        image: { src: "/images/content/Independent_Trading_Co._AFX64CRP_Blush_Front_High_Model_BP.png", width: 1000, height: 1250, alt: "Female Hoodies 80/20 Cotton-Polyester" },
      },
      {
        title: "Snapback Trucker Hats (5-panels)",
        image: { src: "/images/content/62954_f_fl.jpg", width: 1000, height: 1250, alt: "Snapback Trucker Hats (5-panels)" },
      },
      {
        title: "Hoodies 50/50 Cotton-Polyester 15 oz",
        image: { src: "/images/content/Adobe_Express_-_file_2.png", width: 1000, height: 1250, alt: "Hoodies 50/50 Cotton-Polyester 15 oz" },
      },
      {
        title: "Tote Bag Contrast Handles 12L",
        image: { src: "/images/content/82230_f_fl.jpg", width: 1000, height: 1250, alt: "Tote Bag Contrast Handles 12L" },
      },
      {
        title: "Aprons Mid Length With Pockets",
        image: { src: "/images/content/51035_f_fl_0f1f31a4-0869-454e-9927-b9c34a749aec.jpg", width: 1000, height: 1250, alt: "Aprons Mid Length With Pockets" },
      },
      {
        title: "Tote Bags Economical",
        image: { src: "/images/content/44944_f_fl_e9041462-6a33-43d5-9ab9-7dea34f025f7.jpg", width: 1000, height: 1250, alt: "Tote Bags Economical" },
      },
      {
        title: "Classic Dad Hats",
        image: { src: "/images/content/dg-designer-ebb71045159534965633453869811061435_ffcd6458-f04f-4dd7-a79e-d2d27e8ce821.png", width: 800, height: 1000, alt: "Classic Dad Hats" },
      },
      {
        title: "Apron Full Lengh No Pockets",
        image: { src: "/images/content/50998_f_fl_d48b09c3-5ec0-4936-9c78-34c39399ad95.jpg", width: 1000, height: 1250, alt: "Apron Full Lengh No Pockets" },
      },
      {
        title: "Zip-Up Hoodies 50/50 Cotton-Polyester",
        image: { src: "/images/content/18600-051-alt1__41601.1740439492.1280.1280.jpg", width: 1024, height: 1280, alt: "Zip-Up Hoodies 50/50 Cotton-Polyester" },
      },
      {
        title: "T-shirt 50/50 Cotton-Polyester 9.2 oz",
        image: { src: "/images/content/1200W-1104-Royal-0-8000RoyalModelFront3.jpg", width: 1200, height: 1800, alt: "T-shirt 50/50 Cotton-Polyester 9.2 oz" },
      },
      {
        title: "T-shirt Softstyle Cotton 7.5 oz",
        image: { src: "/images/content/64000-036-alt1__51340.1739878986.1280.1280.jpg", width: 1024, height: 1280, alt: "T-shirt Softstyle Cotton 7.5 oz" },
      },
    ] as DemoProduct[],
  },

  // media_with_content_C9HQTJ. Live block is image + stylized "The/Custy/App" jumbo
  // heading only — no separate body paragraph exists in the source, so text is empty.
  media: {
    heading: "The Custy App",
    text: "",
    image: {
      src: "/images/content/custy.png",
      width: 3000,
      height: 2964,
      alt: "",
    },
  },

  // section_VyHdx4 (closing paragraph + large Custy logo). Logo image reuses the
  // existing /images/logo.png asset (same file the header already ships, confirmed by
  // matching 3000x860 intrinsic size) rather than re-downloading a duplicate.
  closing: {
    html: `<p>Custy is a powerful Shopify product customizer app designed for print-on-demand (POD) businesses. It enables customers to create their own designs in real time across multiple product areas such as front, back, and sleeves. With support for dynamic pricing and printing methods like DTG and DTF, Custy helps merchants offer flexible and personalized products effortlessly. The app generates print-ready files and integrates seamlessly with Shopify, making order processing smooth and efficient. Whether you sell t-shirts, hoodies, or caps, Custy enhances customer experience and boosts conversion rates.</p>`,
    image: {
      src: "/images/logo.png",
      width: 3000,
      height: 860,
      alt: "Custy",
    },
  } as RichBlock,
};
