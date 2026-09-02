import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "./header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

it("renders scroll nav links, Help Centre link, and the free-trial CTA", () => {
  render(<Header />);
  expect(screen.getAllByRole("link", { name: "How it Works" })[0]).toHaveAttribute(
    "href",
    "/#how-it-works",
  );
  expect(screen.getAllByRole("link", { name: "Features" })[0]).toHaveAttribute("href", "/#features");
  expect(screen.getAllByRole("link", { name: "Live Demo" })[0]).toHaveAttribute(
    "href",
    "/#live-demo",
  );
  expect(screen.getAllByRole("link", { name: "Pricing" })[0]).toHaveAttribute("href", "/#pricing");
  expect(screen.getAllByRole("link", { name: "Contact" })[0]).toHaveAttribute("href", "/#contact");
  expect(screen.getAllByRole("link", { name: "Help Centre" })[0]).toHaveAttribute(
    "href",
    "/help-centre",
  );
  expect(screen.queryByRole("button", { name: /Help/i })).not.toBeInTheDocument();
  const cta = screen.getAllByRole("link", { name: "Start Free Trial" })[0];
  expect(cta).toHaveAttribute("href", "https://apps.shopify.com/custy");
  expect(cta).toHaveAttribute("target", "_blank");
});

it("does not put Blog in the top-level header", () => {
  render(<Header />);
  expect(screen.queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();
});

it("highlights the nav link for the section just clicked", () => {
  render(<Header />);
  const pricing = screen.getAllByRole("link", { name: "Pricing" })[0];
  fireEvent.click(pricing);
  expect(pricing).toHaveAttribute("aria-current", "page");
  expect(screen.getAllByRole("link", { name: "Features" })[0]).not.toHaveAttribute(
    "aria-current",
  );
});

it("has a mobile menu toggle", () => {
  render(<Header />);
  expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
});
