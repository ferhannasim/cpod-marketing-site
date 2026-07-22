import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { APP_URL } from "@/lib/site";
import { home } from "@/content/home";
import { features } from "@/content/features";
import { howItWorks } from "@/content/how-it-works";
import { pricing } from "@/content/pricing";

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

    expect(home.closing.title).toBe("Start with Custy");
    expect(screen.getByRole("heading", { name: home.closing.title })).toBeInTheDocument();

    expect(home.intro.ctas[0]?.label).toBe("Start Your 21-Day Free Trial of Custy");
    const trialCtas = screen.getAllByRole("link", { name: "Start Your 21-Day Free Trial of Custy" });
    expect(trialCtas.length).toBeGreaterThan(0);
    for (const link of trialCtas) {
      expect(link).toHaveAttribute("href", APP_URL);
    }
  });
  it("drops the demo product grid", () => {
    render(<HomePage />);
    expect(screen.queryByText(/test our app on demo product/i)).not.toBeInTheDocument();
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
  it("has no commerce links", () => {
    render(<HomePage />);
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).not.toMatch(/\/(products|collections|cart|search)\b/);
    }
  });
});
