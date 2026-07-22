import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";

it("renders nav links and the install CTA", () => {
  render(<Header />);
  expect(screen.getAllByRole("link", { name: "How it Works" }).length).toBeGreaterThan(0);
  const cta = screen.getAllByRole("link", { name: "Install Now on Shopify" })[0];
  expect(cta).toHaveAttribute("href", "https://apps.shopify.com/custy");
  expect(cta).toHaveAttribute("target", "_blank");
});

it("renders a Blog link", () => {
  render(<Header />);
  const blogLink = screen.getAllByRole("link", { name: "Blog" })[0];
  expect(blogLink).toHaveAttribute("href", "/blog");
});

it("renders a Live Demo link", () => {
  render(<Header />);
  const demoLink = screen.getAllByRole("link", { name: "Live Demo" })[0];
  expect(demoLink).toHaveAttribute("href", "/live-demo");
});

it("has a mobile menu toggle", () => {
  render(<Header />);
  expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
});
