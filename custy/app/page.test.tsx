import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

it("renders hero, demo showcase, and blog teasers", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByText(/test our app on demo product/i)).toBeInTheDocument();
  expect(screen.getByText(/custy blog/i)).toBeInTheDocument();
});

it("demo product cards link to the app listing, not product pages", () => {
  render(<HomePage />);
  for (const link of screen.getAllByRole("link")) {
    expect(link.getAttribute("href")).not.toMatch(/^\/products/);
  }
});
