import { RichSection } from "@/components/sections/rich-section";
import { DemoShowcase } from "@/components/sections/demo-showcase";
import { MediaWithContent } from "@/components/sections/media-with-content";
import { BlogTeasers } from "@/components/sections/blog-teasers";
import { home } from "@/content/home";
import { posts } from "@/content/posts";

export default function HomePage() {
  return (
    <main>
      <RichSection block={home.intro} scheme="bg-scheme1-bg" imagePosition="left" headingLevel="h1" />
      <DemoShowcase demo={home.demo} />
      <MediaWithContent media={home.media} />
      <BlogTeasers heading="Custy Blog" posts={posts} />
      <RichSection block={home.closing} scheme="bg-scheme3-bg" imagePosition="right" />
    </main>
  );
}
