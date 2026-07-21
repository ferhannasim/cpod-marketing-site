import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturesPage, { metadata } from "./page";

describe("Features page", () => {
  it("renders the live page's h1 verbatim", () => {
    render(<FeaturesPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Powerful Product Customization for Modern Shopify Stores",
      }),
    ).toBeInTheDocument();
  });

  it("renders the key-features card grid with real card titles", () => {
    render(<FeaturesPage />);
    expect(screen.getByRole("heading", { name: "Real-Time Product Customizer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Dynamic Pricing Engine" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Seamless Shopify Integration" })).toBeInTheDocument();
  });

  it("renders the how-it-works steps and the perfect-for audience cards", () => {
    render(<FeaturesPage />);
    expect(screen.getByRole("heading", { name: "Install Custy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Get Print-Ready Orders" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "POD Businesses" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Growth-Focused Merchants" })).toBeInTheDocument();
  });

  it("links out to the Shopify app listing, not to a commerce page", () => {
    render(<FeaturesPage />);
    const appLinks = screen.getAllByRole("link", { name: /free trial|install on shopify/i });
    expect(appLinks.length).toBeGreaterThan(0);
    for (const link of appLinks) {
      expect(link).toHaveAttribute("href", "https://apps.shopify.com/custy");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("has Features metadata", () => {
    expect(metadata.title).toBe("Features");
    expect(metadata.description).toMatch(/custy/i);
  });
});
