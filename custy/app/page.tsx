import { Hero } from "@/components/sections/hero";
import { RichSection } from "@/components/sections/rich-section";
import { DemoShowcase } from "@/components/sections/demo-showcase";
import { MediaWithContent } from "@/components/sections/media-with-content";
import { BlogTeasers, type BlogTeaserPost } from "@/components/sections/blog-teasers";
import { home } from "@/content/home";

// replaced by content/posts/index.ts in blog task
const posts: BlogTeaserPost[] = [
  {
    slug: "7-ways-product-customization-increases-your-shopify-store-revenue",
    title: "7 Ways Product Customization Increases Your Shopify Store Revenue",
    image: {
      src: "/images/blog/7-ways-product-customization-increases-your-shopify-store-revenue.jpg",
      width: 1279,
      height: 853,
    },
  },
  {
    slug: "how-to-start-a-print-on-demand-business-with-shopify-step-by-step-guide",
    title: "How to Start a Print-on-Demand Business with Shopify (Step-by-Step Guide)",
    image: {
      src: "/images/blog/how-to-start-a-print-on-demand-business-with-shopify-step-by-step-guide.jpg",
      width: 1848,
      height: 970,
    },
  },
  {
    slug: "why-product-customization-is-the-future-of-ecommerce-in-2026",
    title: "Why Product Customization is the Future of eCommerce in 2026",
    image: {
      src: "/images/blog/why-product-customization-is-the-future-of-ecommerce-in-2026.jpg",
      width: 1280,
      height: 853,
    },
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero hero={home.hero} />
      <RichSection block={home.intro} scheme="bg-scheme1-bg" imagePosition="left" />
      <DemoShowcase demo={home.demo} />
      <MediaWithContent media={home.media} />
      <BlogTeasers heading="Custy Blog" posts={posts} />
      <RichSection block={home.closing} scheme="bg-scheme3-bg" imagePosition="right" />
    </main>
  );
}
