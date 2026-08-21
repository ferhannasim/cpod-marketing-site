import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FaqPage, { metadata } from "./page";
import { faq, faqItems } from "@/content/faq";
import { APP_URL, SUPPORT_EMAIL } from "@/lib/site";

describe("FAQ page", () => {
  it("renders the hero h1 and lead", () => {
    render(<FaqPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: faq.hero.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(faq.hero.lead)).toBeInTheDocument();
  });

  it("renders every question group heading in content order", () => {
    render(<FaqPage />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    const indices = faq.groups.map((group) => headings.indexOf(group.title));
    expect(indices.every((index) => index !== -1)).toBe(true);
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
  });

  it("renders all 17 questions as one accordion entry each", () => {
    render(<FaqPage />);
    expect(faqItems).toHaveLength(17);
    const groups = screen.getAllByRole("group"); // <details> = group role
    expect(groups).toHaveLength(faqItems.length);
    for (const item of faqItems) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });

  it("points the answers that reference other pages at those pages", () => {
    render(<FaqPage />);
    expect(screen.getByRole("link", { name: "Compare Custy and DropShipPOD" })).toHaveAttribute(
      "href",
      "/dropshipping",
    );
    expect(screen.getByRole("link", { name: "Compare plans" })).toHaveAttribute(
      "href",
      "/pricing",
    );
    expect(screen.getByRole("link", { name: "Go to support" })).toHaveAttribute(
      "href",
      "/support",
    );
  });

  it("gives the support address as info@CheapestPOD.ca", () => {
    expect(SUPPORT_EMAIL).toBe("info@CheapestPOD.ca");
    render(<FaqPage />);
    expect(screen.getByText(/info@CheapestPOD\.ca/)).toBeInTheDocument();
  });

  it("closes on a CTA band linking out to the Shopify app listing", () => {
    render(<FaqPage />);
    expect(
      screen.getByRole("heading", { name: "Still have a question?" }),
    ).toBeInTheDocument();
    const installLink = screen.getByRole("link", { name: "Install Now on Shopify" });
    expect(installLink).toHaveAttribute("href", APP_URL);
    expect(installLink).toHaveAttribute("target", "_blank");
    expect(installLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("emits FAQPage structured data covering every question", () => {
    const { container } = render(<FaqPage />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const jsonLd = JSON.parse(script!.innerHTML);
    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity.map((entry: { name: string }) => entry.name)).toEqual(
      faqItems.map((item) => item.question),
    );
  });

  it("has no commerce links", () => {
    render(<FaqPage />);
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).not.toMatch(/\/(products|collections|cart|search)\b/);
    }
  });

  it("has FAQ metadata", () => {
    expect(metadata.title).toBe("FAQ");
    expect(metadata.description).toMatch(/questions merchants ask about custy/i);
  });
});
