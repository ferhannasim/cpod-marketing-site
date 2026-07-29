import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { posts } from "@/content/posts";
import BlogIndexPage from "./page";

describe("blog", () => {
  it("registry is date-descending with unique slugs", () => {
    expect(posts).toHaveLength(4);
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    const dates = posts.map((p) => p.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
  it("index lists every post with a link", () => {
    render(<BlogIndexPage />);
    for (const post of posts) {
      expect(screen.getByRole("link", { name: new RegExp(post.title.slice(0, 30)) })).toHaveAttribute(
        "href",
        `/blog/${post.slug}`,
      );
    }
  });
});
