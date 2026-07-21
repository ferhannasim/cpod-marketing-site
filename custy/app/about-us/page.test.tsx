import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { APP_URL } from "@/lib/site";
import AboutUsPage, { metadata } from "./page";

describe("About Us page", () => {
  it("renders the live page's h1 verbatim", () => {
    render(<AboutUsPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Helping Shopify Merchants Create, Customize, and Sell Without Limits",
      }),
    ).toBeInTheDocument();
  });

  it("renders every section heading in document order", () => {
    render(<AboutUsPage />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    const sectionTitles = [
      "Our Vision",
      "What We Do",
      "Why Custy",
      "Built for Modern eCommerce",
      "Our Commitment",
      "Build Better Custom Product Experiences with Custy",
    ];
    const indices = sectionTitles.map((title) => headings.indexOf(title));
    expect(indices.every((index) => index !== -1)).toBe(true);
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
  });

  it("renders the hero quick-card checklist", () => {
    render(<AboutUsPage />);
    expect(screen.getByRole("heading", { name: "What defines Custy" })).toBeInTheDocument();
    expect(
      screen.getByText("Built specifically for Shopify merchants and POD workflows"),
    ).toBeInTheDocument();
  });

  it("renders the two-column prose card titles", () => {
    render(<AboutUsPage />);
    expect(screen.getByRole("heading", { name: "Personalization Is the Future" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Turning Products into Experiences" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "For Merchants at Every Stage" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Continuously Improving" })).toBeInTheDocument();
  });

  it("renders the What We Do feature cards and behind-the-scenes lists", () => {
    render(<AboutUsPage />);
    expect(screen.getByRole("heading", { name: "Built for POD" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Made for Custom Stores" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What customers can do" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What merchants get behind the scenes" })).toBeInTheDocument();
    expect(screen.getByText("Customize products in real time")).toBeInTheDocument();
  });

  it("renders the Why Custy card grid with decorative icon glyphs", () => {
    render(<AboutUsPage />);
    expect(screen.getByRole("heading", { name: "Dynamic Pricing" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Growth-Oriented Design" })).toBeInTheDocument();
    expect(screen.getByText("💰")).toBeInTheDocument();
    expect(screen.getByText("📊")).toBeInTheDocument();
  });

  it("renders the Our Commitment lists", () => {
    render(<AboutUsPage />);
    expect(screen.getByRole("heading", { name: "What we stand for" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What merchants can expect" })).toBeInTheDocument();
  });

  it("links the CTAs to the correct destinations, including the Shopify app listing", () => {
    render(<AboutUsPage />);

    const featuresLink = screen.getByRole("link", { name: "View Features" });
    expect(featuresLink).toHaveAttribute("href", "/features");

    const trialLinks = screen.getAllByRole("link", { name: /free trial/i });
    expect(trialLinks.length).toBeGreaterThan(0);
    for (const link of trialLinks) {
      expect(link).toHaveAttribute("href", "/pricing");
    }

    const installLink = screen.getByRole("link", { name: "Install on Shopify" });
    expect(installLink).toHaveAttribute("href", APP_URL);
    expect(installLink).toHaveAttribute("target", "_blank");
    expect(installLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has About Us metadata", () => {
    expect(metadata.title).toBe("About Us");
    expect(metadata.description).toMatch(/empower shopify merchants/i);
  });
});
