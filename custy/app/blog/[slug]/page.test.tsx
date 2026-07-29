import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PostPage, { generateMetadata, generateStaticParams } from "./page";
import { heroImageDims } from "./hero-image-dims";
import { posts } from "@/content/posts";

describe("Blog post page", () => {
  const post = posts[0];
  // Post.image is optional (Task 9): the three scraped posts keep a hero image, the
  // three authored-in-app posts register without one. Image-bearing assertions below
  // target an explicit imaged/image-less post rather than posts[0], since which post
  // sorts first depends on date and shouldn't flip these tests.
  const imagedPost = posts.find((p) => p.image);
  const imagelessPost = posts.find((p) => !p.image);
  if (!imagedPost || !imagelessPost) throw new Error("expected both an imaged and an image-less post in the registry");

  it("generates static params for every post", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual(posts.map((p) => ({ slug: p.slug })));
  });

  it("has a hero image dims entry with positive width/height for every post that has an image", () => {
    // Guards against a future imaged post being added to the registry without a
    // matching heroImageDims entry, which would silently drop its hero image ({dims
    // && ...} in page.tsx renders nothing rather than erroring). Image-less posts are
    // expected to have no entry — they render no hero image at all, by design.
    for (const p of posts.filter((p) => p.image)) {
      const dims = heroImageDims[p.slug];
      expect(dims, `missing heroImageDims entry for "${p.slug}"`).toBeDefined();
      expect(dims.width).toBeGreaterThan(0);
      expect(dims.height).toBeGreaterThan(0);
    }
    for (const p of posts.filter((p) => !p.image)) {
      expect(heroImageDims[p.slug], `unexpected heroImageDims entry for image-less post "${p.slug}"`).toBeUndefined();
    }
  });

  it("generates per-post metadata with title, description, and an OG image for an imaged post", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: imagedPost.slug }) });
    expect(metadata.title).toBe(imagedPost.title);
    expect(metadata.description).toBe(imagedPost.description);
    expect(metadata.openGraph?.images).toBeDefined();
  });

  it("generates per-post metadata without an OG image for an image-less post", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: imagelessPost.slug }) });
    expect(metadata.title).toBe(imagelessPost.title);
    expect(metadata.openGraph?.images).toBeUndefined();
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

  it("renders no hero image for a post registered without one", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: imagelessPost.slug }) }));
    expect(document.querySelector("img")).toBeNull();
  });

  it("renders Article JSON-LD with headline, datePublished, image, and Custy as author for an imaged post", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: imagedPost.slug }) }));
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const json = JSON.parse(script?.textContent ?? "{}");
    expect(json["@type"]).toBe("Article");
    expect(json.headline).toBe(imagedPost.title);
    expect(json.datePublished).toBe(imagedPost.date);
    expect(json.image).toContain(imagedPost.image);
    expect(json.author).toEqual({ "@type": "Organization", name: "Custy" });
  });

  it("renders Article JSON-LD without an image key for an image-less post", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: imagelessPost.slug }) }));
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const json = JSON.parse(script?.textContent ?? "{}");
    expect(json.headline).toBe(imagelessPost.title);
    expect(json.image).toBeUndefined();
    expect(json.author).toEqual({ "@type": "Organization", name: "Custy" });
  });

  it("calls notFound for an unknown slug", async () => {
    await expect(PostPage({ params: Promise.resolve({ slug: "does-not-exist" }) })).rejects.toThrow();
  });
});
