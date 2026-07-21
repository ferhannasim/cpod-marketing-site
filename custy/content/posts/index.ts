import SevenWaysBody from "./7-ways-product-customization-increases-your-shopify-store-revenue.mdx";
import HowToStartBody from "./how-to-start-a-print-on-demand-business-with-shopify-step-by-step-guide.mdx";
import WhyCustomizationBody from "./why-product-customization-is-the-future-of-ecommerce-in-2026.mdx";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  image: string; // /images/blog/<slug>.jpg
  Body: React.ComponentType;
};

// Metadata transcribed from content/raw/posts/*.md frontmatter (title/date/image);
// `description` is authored as each post's first sentence. All three posts share the
// same scraped publish date (2026-04-17), so the array below is written in the live
// site's display order (content/raw/home.html featured-blog-posts section) and the
// date-descending sort is a stable no-op that preserves it.
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
];

export const posts: Post[] = [...allPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
