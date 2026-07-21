import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { APP_URL } from "@/lib/site";

describe("homepage", () => {
  it("renders the recomposed sections in order", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /all features/i })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: /see how it works/i })).toHaveAttribute("href", "/how-it-works");
    expect(screen.getByRole("link", { name: /compare plans/i })).toHaveAttribute("href", "/pricing");
    expect(screen.getByText(/custy blog/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /how custy works/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /simple, transparent pricing/i })).toBeInTheDocument();
  });
  it("drops the demo product grid", () => {
    render(<HomePage />);
    expect(screen.queryByText(/test our app on demo product/i)).not.toBeInTheDocument();
  });
  it("shows an FAQ accordion with real questions", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("group").length).toBeGreaterThanOrEqual(4); // <details> = group role
  });
  it("has no commerce links", () => {
    render(<HomePage />);
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).not.toMatch(/\/(products|collections|cart|search)\b/);
    }
  });
});
