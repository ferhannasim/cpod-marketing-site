import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogIndexPage, { metadata } from "./page";
import { posts } from "@/content/posts";

describe("Blog index page", () => {
  it("has Custy Blog metadata", () => {
    expect(metadata.title).toBe("Custy Blog");
  });

  it("renders exactly 3 BlogPostCards", () => {
    render(<BlogIndexPage />);
    expect(posts).toHaveLength(3);
    expect(screen.getAllByTestId("blog-post-card")).toHaveLength(3);
  });

  it("links each card to /blog/<slug>", () => {
    render(<BlogIndexPage />);
    for (const post of posts) {
      // Match by function rather than building a RegExp from post titles, since
      // titles contain regex metacharacters (e.g. parentheses).
      const link = screen.getByRole("link", {
        name: (accessibleName) => accessibleName.includes(post.title),
      });
      expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
    }
  });

  it("renders each post's title and date", () => {
    render(<BlogIndexPage />);
    for (const post of posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    }
  });
});
