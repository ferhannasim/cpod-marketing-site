import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { APP_URL } from "@/lib/site";
import { home } from "@/content/home";
import { pricing } from "@/content/pricing";
import { demoProducts } from "@/content/demo-products";

describe("homepage", () => {
  it("renders the five marketing sections with scroll targets", () => {
    const { container } = render(<HomePage />);

    expect(screen.getByRole("heading", { level: 1, name: home.intro.heading })).toBeInTheDocument();
    expect(container.querySelector("#how-it-works")).not.toBeNull();
    expect(container.querySelector("#features")).not.toBeNull();
    expect(container.querySelector("#live-demo")).not.toBeNull();
    expect(container.querySelector("#pricing")).not.toBeNull();
    expect(container.querySelector("#contact")).not.toBeNull();

    expect(screen.getByRole("heading", { name: home.howItWorks.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: pricing.header.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: home.contact.title })).toBeInTheDocument();
  });

  it("pins real content from each section", () => {
    render(<HomePage />);

    for (const row of home.features.rows) {
      expect(screen.getByRole("heading", { name: row.title })).toBeInTheDocument();
      expect(screen.getByText(row.points[0])).toBeInTheDocument();
    }
    for (const card of home.features.supporting) {
      expect(screen.getByRole("heading", { name: card.title })).toBeInTheDocument();
    }

    const firstStep = home.howItWorks.steps[0];
    expect(screen.getByText(firstStep.title)).toBeInTheDocument();

    const firstPlan = pricing.plans[0];
    expect(screen.getByText(firstPlan.name)).toBeInTheDocument();
    expect(screen.getByText(firstPlan.price)).toBeInTheDocument();
    expect(screen.getByText(firstPlan.features[2])).toBeInTheDocument();
    expect(screen.getByText(pricing.bottomNote)).toBeInTheDocument();
  });

  it("shows product cards that open the live demo", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /try custy on real products/i })).toBeInTheDocument();
    const cards = screen.getAllByTestId("demo-product-card");
    expect(cards).toHaveLength(demoProducts.length);
    for (const [i, product] of demoProducts.entries()) {
      expect(cards[i]).toHaveAttribute("href", `/live-demo?product=${product.slug}`);
    }
  });

  it("renders the hero punchline without disturbing the h1 name", () => {
    render(<HomePage />);
    expect(screen.getByText(home.intro.tagline!)).toBeInTheDocument();
    // The gradient highlight is an inline span, so the h1 still reads whole.
    expect(screen.getByRole("heading", { level: 1, name: home.intro.heading })).toBeInTheDocument();
  });

  it("shows the trial and live-demo CTAs in the hero", () => {
    render(<HomePage />);
    const trial = screen.getAllByRole("link", { name: "Start Free Trial" })[0];
    expect(trial).toHaveAttribute("href", APP_URL);
    expect(trial).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Live Demo" })).toHaveAttribute("href", "/live-demo");
  });

  it("includes the contact form and plan guarantees", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /plan guarantees/i })).toBeInTheDocument();
    expect(screen.getByText("30-day free trial on paid plans")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("does not tease a separate FAQ, blog, or extra marketing lander", () => {
    render(<HomePage />);
    expect(screen.queryByText(/custy blog/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /all features/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /see how it works/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /compare plans/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /print methods that match your products/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /step inside the design lab/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /pair it with dropshippod/i })).not.toBeInTheDocument();
  });

  it("has no commerce links", () => {
    render(<HomePage />);
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).not.toMatch(/\/(products|collections|cart|search)\b/);
    }
  });
});
