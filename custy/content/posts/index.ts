import SevenWaysBody from "./7-ways-product-customization-increases-your-shopify-store-revenue.mdx";
import HowToStartBody from "./how-to-start-a-print-on-demand-business-with-shopify-step-by-step-guide.mdx";
import WhyCustomizationBody from "./why-product-customization-is-the-future-of-ecommerce-in-2026.mdx";
import AovBody from "./how-product-personalization-lifts-average-order-value.mdx";
import PrintPricingBody from "./setting-up-print-pricing-by-color-count-and-size.mdx";
import MultiSideBody from "./a-merchants-guide-to-multi-side-printing.mdx";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  image?: string; // /images/blog/<slug>.jpg — omitted for posts authored without a hero image
  Body: React.ComponentType;
};

// Metadata transcribed from content/raw/posts/*.md frontmatter (title/date/image);
// `description` is authored as each post's first sentence. The three scraped posts
// share the same scraped publish date (2026-04-17), so their relative order below is
// written in the live site's display order (content/raw/home.html featured-blog-posts
// section) and the date-descending sort is a stable no-op that preserves it.
//
// Task 9 added three new posts, authored directly (no scrape source), each dated
// 2026-07-29 and registered without an `image` — the Post type's `image` field is
// optional specifically so posts can be added without commissioning hero art first.
// Being newer, they sort ahead of the three scraped posts.
const allPosts: Post[] = [
  {
    slug: "7-ways-product-customization-increases-your-shopify-store-revenue",
    title: "7 Ways Product Customization Increases Your Shopify Store Revenue",
    description: "Product customization isn’t just a feature — it’s a revenue engine.",
    date: "2026-04-17",
    image: "/images/blog/7-ways-product-customization-increases-your-shopify-store-revenue.jpg",
    Body: SevenWaysBody,
  },
  {
    slug: "how-to-start-a-print-on-demand-business-with-shopify-step-by-step-guide",
    title: "How to Start a Print-on-Demand Business with Shopify (Step-by-Step Guide)",
    description:
      "Starting a print-on-demand (POD) business is one of the easiest ways to enter eCommerce with low risk and high scalability.",
    date: "2026-04-17",
    image: "/images/blog/how-to-start-a-print-on-demand-business-with-shopify-step-by-step-guide.jpg",
    Body: HowToStartBody,
  },
  {
    slug: "why-product-customization-is-the-future-of-ecommerce-in-2026",
    title: "Why Product Customization is the Future of eCommerce in 2026",
    description:
      "The eCommerce industry is evolving rapidly, and one trend is dominating the future — product customization.",
    date: "2026-04-17",
    image: "/images/blog/why-product-customization-is-the-future-of-ecommerce-in-2026.jpg",
    Body: WhyCustomizationBody,
  },
  {
    slug: "how-product-personalization-lifts-average-order-value",
    title: "How Product Personalization Lifts Average Order Value",
    description:
      "When a shopper builds their own product, they stop comparing it to a shelf of interchangeable items — they're comparing it to nothing, because nobody else has one exactly like it.",
    date: "2026-07-29",
    Body: AovBody,
  },
  {
    slug: "setting-up-print-pricing-by-color-count-and-size",
    title: "Setting Up Print Pricing by Color Count and Size",
    description: "A single flat print price is easy to set up and easy to get wrong.",
    date: "2026-07-29",
    Body: PrintPricingBody,
  },
  {
    slug: "a-merchants-guide-to-multi-side-printing",
    title: "A Merchant's Guide to Multi-Side Printing",
    description:
      "Front-only printing is the default a lot of stores start with, and it's the first one worth outgrowing.",
    date: "2026-07-29",
    Body: MultiSideBody,
  },
];

export const posts: Post[] = [...allPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
