import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { APP_URL } from "@/lib/site";
import { home } from "@/content/home";
import { features } from "@/content/features";
import { howItWorks } from "@/content/how-it-works";
import { pricing } from "@/content/pricing";
import { demoProducts } from "@/content/demo-products";

describe("homepage", () => {
  it("renders the recomposed sections in order", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /all features/i })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: /see how it works/i })).toHaveAttribute("href", "/how-it-works");
    expect(screen.getByRole("link", { name: /compare plans/i })).toHaveAttribute("href", "/pricing");
    expect(screen.getByText(/custy blog/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /how custy works/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /simple, transparent pricing/i })).toBeInTheDocument();

    // Real content, not just structure: pin one field from each section's content module.
    const firstCard = features.sections[0].cards?.[0];
    expect(firstCard).toBeDefined();
    expect(screen.getByText(firstCard!.title)).toBeInTheDocument();

    const firstStep = howItWorks.stepsSection.steps[0];
    expect(screen.getByText(firstStep.title)).toBeInTheDocument();

    const firstPlan = pricing.plans[0];
    expect(screen.getByText(firstPlan.name)).toBeInTheDocument();
    expect(screen.getByText(firstPlan.price)).toBeInTheDocument();

    const firstFaq = pricing.faq.items[0];
    expect(screen.getByText(firstFaq.question)).toBeInTheDocument();

    // R2: why-cards section heading reuses the exact "Why merchants choose Custy"
    // phrase already published as content/features.ts's hero highlight title
    // (self-updating, not a fresh duplicate string).
    expect(screen.getByRole("heading", { name: features.hero.highlight.title })).toBeInTheDocument();

    // R2: a why-card title is pulled straight from its source key-feature card
    // (content/features.ts sections[0].cards[6]), so this stays in sync and
    // fails if the card is ever swapped for one that duplicates FeatureHighlights.
    const whyCard = features.sections[0].cards?.[6];
    expect(whyCard).toBeDefined();
    expect(screen.getByRole("heading", { name: whyCard!.title })).toBeInTheDocument();

    // R2: trust band shows one of its three plan-guarantee items — its title is
    // the verbatim tail clause of pricing.header.note, so this stays in sync.
    const noteParts = pricing.header.note.split(" • ");
    const trialTitle = noteParts[noteParts.length - 1];
    expect(trialTitle).toBe("30-day free trial on paid plans");
    expect(screen.getByText(trialTitle)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /plan guarantees/i })).toBeInTheDocument();

    // R2: pricing teaser now renders each plan's first 3 features (not just the
    // first) — pin the 3rd feature so a regression to "first 1" fails this.
    const firstPlanThirdFeature = pricing.plans[0].features[2];
    expect(firstPlanThirdFeature).toBeDefined();
    expect(screen.getByText(firstPlanThirdFeature)).toBeInTheDocument();

    // R2: pricing teaser microcopy under the grid.
    expect(
      screen.getByText("All prices billed in USD · 30-day free trial on paid plans"),
    ).toBeInTheDocument();

    expect(home.closing.title).toBe("Start with Custy");
    expect(screen.getByRole("heading", { name: home.closing.title })).toBeInTheDocument();

    expect(home.intro.ctas[0]?.label).toBe("Start Your 30-Day Free Trial of Custy");
    const trialCtas = screen.getAllByRole("link", { name: "Start Your 30-Day Free Trial of Custy" });
    expect(trialCtas.length).toBeGreaterThan(0);
    for (const link of trialCtas) {
      expect(link).toHaveAttribute("href", APP_URL);
    }
  });
  it("renders the live demo products section with a card per product", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /try custy on real products/i })).toBeInTheDocument();
    const cards = screen.getAllByTestId("demo-product-card");
    expect(cards).toHaveLength(demoProducts.length);
    for (const [i, product] of demoProducts.entries()) {
      expect(cards[i]).toHaveAttribute("href", `/live-demo?product=${product.slug}`);
      expect(screen.getByText(product.name)).toBeInTheDocument();
    }
  });
  it("drops the media/image section", () => {
    render(<HomePage />);
    expect(screen.queryByText(/the custy app/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /the custy app/i })).not.toBeInTheDocument();
  });
  it("shows an FAQ accordion with real questions", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("group").length).toBeGreaterThanOrEqual(4); // <details> = group role
  });
  it("teases only the first 4 FAQ entries, not the pricing page's full 7", () => {
    expect(pricing.faq.items.length).toBe(7);
    render(<HomePage />);
    const groups = screen.getAllByRole("group"); // <details> = group role
    expect(groups).toHaveLength(4);
    for (const item of pricing.faq.items.slice(0, 4)) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
    for (const item of pricing.faq.items.slice(4)) {
      expect(screen.queryByText(item.question)).not.toBeInTheDocument();
    }
  });
  it("has no commerce links", () => {
    render(<HomePage />);
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).not.toMatch(/\/(products|collections|cart|search)\b/);
    }
  });
});
