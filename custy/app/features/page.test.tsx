import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturesPage, { metadata } from "./page";
import { features } from "@/content/features";

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

  it("renders the first feature card's decorative icon tile", () => {
    const { container } = render(<FeaturesPage />);
    expect(container.querySelector('[data-icon="palette"]')).toBeInTheDocument();
  });

  it("renders the how-it-works steps and the perfect-for audience cards", () => {
    render(<FeaturesPage />);
    expect(screen.getByRole("heading", { name: "Install Custy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Get Print-Ready Orders" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "POD Businesses" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Growth-Focused Merchants" })).toBeInTheDocument();
  });

  it("renders the works-with-your-POD-workflow strip", () => {
    render(<FeaturesPage />);
    expect(
      screen.getByRole("heading", { name: features.workflowStrip.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: features.workflowStrip.items[0].title }),
    ).toBeInTheDocument();
  });

  it("links to the how-it-works page from the features-page steps", () => {
    render(<FeaturesPage />);
    expect(screen.getByRole("link", { name: "See how it works" })).toHaveAttribute(
      "href",
      "/#how-it-works",
    );
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

  it("renders the merchant-controls cards", () => {
    render(<FeaturesPage />);
    for (const card of [
      "Pricing by print method", "Quantity discounts", "Tiered & location pricing",
      "Inventory mode", "White label & API", "Bulk order tools",
    ]) {
      expect(screen.getByRole("heading", { name: card })).toBeInTheDocument();
    }
  });

  it("alternates section tone with no two adjacent top-level bands sharing a background", () => {
    const { container } = render(<FeaturesPage />);
    const main = container.querySelector("main");
    expect(main).not.toBeNull();

    // Walk every top-level band under <main> — the LanderSection elements
    // *and* the closing div that wraps the page-ending CtaBand — the same
    // way custy/app/home-bands.test.tsx walks the home page's bands.
    const bands = Array.from(main!.children) as HTMLElement[];
    expect(bands.length).toBeGreaterThan(1);

    const tones = bands.map((band, index) => {
      // The hero (always first) carries its own tinted wash, not a plain
      // bg-white/bg-lander-light tone class.
      if (index === 0) return "hero";
      if (band.classList.contains("bg-white")) return "white";
      if (band.classList.contains("bg-lander-light")) return "light";
      return "unknown";
    });

    expect(tones).not.toContain("unknown");
    for (let i = 1; i < tones.length; i++) {
      expect(tones[i]).not.toBe(tones[i - 1]);
    }
  });
});
