import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HowItWorksPage, { metadata } from "./page";

describe("How it Works page", () => {
  it("renders the live page's h1 verbatim", () => {
    render(<HowItWorksPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "From Product Setup to Print-Ready Orders, Custy Keeps It Simple",
      }),
    ).toBeInTheDocument();
  });

  it("renders all six step titles in document order", () => {
    render(<HowItWorksPage />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    // The first four mirror the getting-started flow in the marketing brief and
    // are re-used by the homepage teaser, so their order is load-bearing.
    const stepTitles = [
      "Install and Pick a Plan",
      "Sync Your Products",
      "Set Up a Customizable Product",
      "Add the Button to Your Theme",
      "Receive Orders with Full Design Details",
      "Download Print-Ready Artwork",
    ];
    const indices = stepTitles.map((title) => headings.indexOf(title));
    expect(indices.every((index) => index !== -1)).toBe(true);
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
  });

  it("renders the hero quick-card checklist", () => {
    render(<HowItWorksPage />);
    expect(screen.getByRole("heading", { name: "What happens with Custy" })).toBeInTheDocument();
    expect(
      screen.getByText("Install the app and connect it to your Shopify store"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Generate print-ready files for smoother fulfillment"),
    ).toBeInTheDocument();
  });

  it("renders the why-merchants-choose-custy card grid", () => {
    render(<HowItWorksPage />);
    expect(screen.getByRole("heading", { name: "Why Merchants Choose Custy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Real-Time Customization" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Multi-Side Design" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Print-Ready Order Data" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Better Customer Experience" })).toBeInTheDocument();
  });

  it("renders the decorative why-card icon tiles", () => {
    const { container } = render(<HowItWorksPage />);
    expect(container.querySelector('[data-icon="palette"]')).toBeInTheDocument();
    expect(container.querySelector('[data-icon="sparkles"]')).toBeInTheDocument();
  });

  it("links the hero and closing CTAs to the correct destinations", () => {
    render(<HowItWorksPage />);
    const trialLinks = screen.getAllByRole("link", { name: /start.*free trial/i });
    expect(trialLinks.length).toBeGreaterThan(0);
    for (const link of trialLinks) {
      expect(link).toHaveAttribute("href", "/pricing");
    }

    const installLink = screen.getByRole("link", { name: "Install on Shopify" });
    expect(installLink).toHaveAttribute("href", "https://apps.shopify.com/custy");
    expect(installLink).toHaveAttribute("target", "_blank");
    expect(installLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.queryByRole("link", { name: "View Features" })).not.toBeInTheDocument();
  });

  it("renders the closing CTA band", () => {
    render(<HowItWorksPage />);
    expect(screen.getByRole("heading", { name: "Start with Custy" })).toBeInTheDocument();
  });

  it("has How it Works metadata", () => {
    expect(metadata.title).toBe("How it Works");
    expect(metadata.description).toMatch(/personalized products/i);
  });
});
