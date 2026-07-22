import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PostPage, { generateMetadata, generateStaticParams } from "./page";
import { heroImageDims } from "./hero-image-dims";
import { posts } from "@/content/posts";

describe("Blog post page", () => {
  const post = posts[0];

  it("generates static params for every post", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual(posts.map((p) => ({ slug: p.slug })));
  });

  it("has a hero image dims entry with positive width/height for every registry post", () => {
    // Guards against a future post being added to the registry without a matching
    // heroImageDims entry, which would silently drop its hero image ({dims && ...}
    // in page.tsx renders nothing rather than erroring).
    for (const p of posts) {
      const dims = heroImageDims[p.slug];
      expect(dims, `missing heroImageDims entry for "${p.slug}"`).toBeDefined();
      expect(dims.width).toBeGreaterThan(0);
      expect(dims.height).toBeGreaterThan(0);
    }
  });

  it("generates per-post metadata with title, description, and an OG image", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: post.slug }) });
    expect(metadata.title).toBe(post.title);
    expect(metadata.description).toBe(post.description);
    expect(metadata.openGraph?.images).toBeDefined();
  });

  it("renders the post title as an h1", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: post.slug }) }));
    expect(screen.getByRole("heading", { level: 1, name: post.title })).toBeInTheDocument();
  });

  it("renders a date line with a machine-readable datetime", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: post.slug }) }));
    const time = document.querySelector("time");
    expect(time).not.toBeNull();
    expect(time).toHaveAttribute("datetime", post.date);
  });

  it("renders Article JSON-LD with headline, datePublished, image, and Custy as author", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: post.slug }) }));
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const json = JSON.parse(script?.textContent ?? "{}");
    expect(json["@type"]).toBe("Article");
    expect(json.headline).toBe(post.title);
    expect(json.datePublished).toBe(post.date);
    expect(json.image).toContain(post.image);
    expect(json.author).toEqual({ "@type": "Organization", name: "Custy" });
  });

  it("calls notFound for an unknown slug", async () => {
    await expect(PostPage({ params: Promise.resolve({ slug: "does-not-exist" }) })).rejects.toThrow();
  });
});
