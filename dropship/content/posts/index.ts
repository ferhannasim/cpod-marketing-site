import DtfVsDtgBody from "./dtf-vs-dtg-vs-sublimation-which-print-method-fits-your-products.mdx";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  Body: React.ComponentType;
};

const allPosts: Post[] = [
  {
    slug: "dtf-vs-dtg-vs-sublimation-which-print-method-fits-your-products",
    title: "DTF vs DTG vs Sublimation: Which Print Method Fits Your Products?",
    description:
      "The print method decides which fabrics you can sell, how prints feel, and how long they last. Here's how to choose.",
    date: "2026-07-29",
    Body: DtfVsDtgBody,
  },
];

export const posts: Post[] = [...allPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
