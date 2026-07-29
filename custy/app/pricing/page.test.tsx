import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingPage, { metadata } from "./page";

describe("Pricing page", () => {
  it("renders the live page's h1 verbatim", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Simple Pricing for Growing Custom Product Stores",
      }),
    ).toBeInTheDocument();
  });

  it("renders all four plan names as headings", () => {
    render(<PricingPage />);
    expect(screen.getByRole("heading", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Starter" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Growth" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pro" })).toBeInTheDocument();
  });

  it("renders per-plan features", () => {
    render(<PricingPage />);
    expect(screen.getByText("5 custom products")).toBeInTheDocument();
    expect(screen.getByText("50 custom orders per month")).toBeInTheDocument();
    expect(screen.getByText("DTG and DTF print method support")).toBeInTheDocument();
    expect(screen.getByText("White label option")).toBeInTheDocument();
  });

  it("shows the Growth plan as the featured/most-popular plan", () => {
    render(<PricingPage />);
    // Sentence-case text, uppercased via CSS on the badge pill.
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });

  it("renders the pricing note pill and bottom disclaimer", () => {
    render(<PricingPage />);
    expect(
      screen.getByText("No setup fee • Cancel anytime • 30-day free trial on paid plans"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/All prices are billed in USD/),
    ).toBeInTheDocument();
  });

  it("renders the trust band's plan guarantees before the FAQ", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { name: "Plan guarantees" }),
    ).toBeInTheDocument();
    expect(screen.getByText("30-day free trial on paid plans")).toBeInTheDocument();
  });

  it("renders the plan comparison table between the plans grid and the FAQ", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { name: "Compare plans in detail" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Pro" })).toBeInTheDocument();
  });

  it("renders the FAQ section", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { name: "Frequently Asked Questions" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Does every plan include a free trial?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "How does billing work?" }),
    ).toBeInTheDocument();
  });

  it("links every plan CTA out to the Shopify app listing, not a commerce page", () => {
    render(<PricingPage />);
    const ctaLinks = screen.getAllByRole("link", {
      name: /get started free|start free trial/i,
    });
    expect(ctaLinks).toHaveLength(4);
    for (const link of ctaLinks) {
      expect(link).toHaveAttribute("href", "https://apps.shopify.com/custy");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("has Pricing metadata", () => {
    expect(metadata.title).toBe("Pricing");
    expect(metadata.description).toMatch(/plan that fits your business/i);
  });
});
