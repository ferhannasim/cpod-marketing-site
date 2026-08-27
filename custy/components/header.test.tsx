import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "./header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

it("renders scroll nav links and the free-trial CTA", () => {
  render(<Header />);
  expect(screen.getAllByRole("link", { name: "How it Works" })[0]).toHaveAttribute(
    "href",
    "/#how-it-works",
  );
  expect(screen.getAllByRole("link", { name: "Features" })[0]).toHaveAttribute("href", "/#features");
  expect(screen.getAllByRole("link", { name: "Live Demo" })[0]).toHaveAttribute("href", "/#live-demo");
  expect(screen.getAllByRole("link", { name: "Pricing" })[0]).toHaveAttribute("href", "/#pricing");
  expect(screen.getAllByRole("link", { name: "Contact" })[0]).toHaveAttribute("href", "/#contact");
  const cta = screen.getAllByRole("link", { name: "Start Free Trial" })[0];
  expect(cta).toHaveAttribute("href", "https://apps.shopify.com/custy");
  expect(cta).toHaveAttribute("target", "_blank");
});

it("does not put Blog in the top-level header", () => {
  render(<Header />);
  expect(screen.queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();
});

it("opens a Resources dropdown with the guide and FAQs", () => {
  render(<Header />);
  const resourcesButton = screen.getByRole("button", { name: "Resources" });

  expect(resourcesButton).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(resourcesButton);

  expect(resourcesButton).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("link", { name: /How to Use Custy/i })).toHaveAttribute(
    "href",
    "/resources",
  );
  expect(screen.getByRole("link", { name: /FAQs/i })).toHaveAttribute("href", "/faq");
  expect(screen.queryByRole("link", { name: /Blog/i })).not.toBeInTheDocument();

  fireEvent.keyDown(document, { key: "Escape" });
  expect(resourcesButton).toHaveAttribute("aria-expanded", "false");
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
