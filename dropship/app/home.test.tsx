import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { SHOPIFY_APP_URL } from "@/lib/site";

describe("HomePage", () => {
  it("renders the rebuilt band sequence", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Your brand. Your platform. Our printers." }),
    ).toBeInTheDocument();
    for (const heading of [
      "How it works",
      "Sell without stock",
      "Simple economics, no subscription",
      "Four ways to print",
      "100+ blanks ready for your designs",
      "Fulfillment, your way",
      "What sellers say",
      "Launch your print-on-demand brand today",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: "Install the Shopify app" }).length).toBeGreaterThan(0);
  });

  it("renders the hero headline as the only h1", () => {
    render(<HomePage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Your brand. Your platform. Our printers.");
  });

  it("wires the app-install and how-it-works CTAs to their real targets", () => {
    render(<HomePage />);
    const appLinks = screen.getAllByRole("link", { name: "Install the Shopify app" });
    expect(appLinks.length).toBeGreaterThanOrEqual(2); // hero CTA + final CtaBand
    for (const link of appLinks) {
      expect(link).toHaveAttribute("href", SHOPIFY_APP_URL);
      expect(link).toHaveAttribute("target", "_blank");
    }
    expect(screen.getByRole("link", { name: "See how it works" })).toHaveAttribute("href", "/how-it-works");
  });

  it("renders the main band headings in document order", () => {
    render(<HomePage />);
    const expectedOrder = [
      "How it works",
      "Sell without stock",
      "Simple economics, no subscription",
      "Four ways to print",
      "100+ blanks ready for your designs",
      "Fulfillment, your way",
      "What sellers say",
      "Custy for your storefront",
      "See the platform in action",
      "Answers before you ask",
      "Launch your print-on-demand brand today",
    ];
    const allH2Texts = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    const actualOrder = allH2Texts.filter((text) => expectedOrder.includes(text ?? ""));
    expect(actualOrder).toEqual(expectedOrder);
  });
});
