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

  it("renders all seven step titles in document order", () => {
    render(<HowItWorksPage />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    const stepTitles = [
      "Install Custy on Your Shopify Store",
      "Set Up Your Products",
      "Configure Pricing Rules",
      "Let Customers Design in Real Time",
      "Receive Orders with Full Design Details",
      "Generate Print-Ready Files",
      "Fulfill and Grow",
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
      expect(link).toHaveAttribute("href", "/#pricing");
    }

    const installLink = screen.getByRole("link", { name: "Install on Shopify" });
    expect(installLink).toHaveAttribute("href", "https://apps.shopify.com/custy");
    expect(installLink).toHaveAttribute("target", "_blank");
    expect(installLink).toHaveAttribute("rel", "noopener noreferrer");

    const featuresLink = screen.getByRole("link", { name: "View Features" });
    expect(featuresLink).toHaveAttribute("href", "/#features");
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
