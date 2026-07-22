import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardGrid, LanderHero, PricingTable } from "./index";

describe("LanderHero", () => {
  it("renders the eyebrow, the h1 title, and a CTA link", () => {
    render(
      <LanderHero
        eyebrow="Custy for Shopify • POD Ready"
        title="Powerful Product Customization for Modern Shopify Stores"
        lead="Custy lets your customers design products directly on your store in real time."
        ctas={[{ label: "Start 21-Day Free Trial", href: "https://apps.shopify.com/custy" }]}
      />,
    );

    expect(screen.getByText(/POD Ready/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /powerful product customization/i }),
    ).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: /start 21-day free trial/i });
    expect(cta).toHaveAttribute("href", "https://apps.shopify.com/custy");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("CardGrid", () => {
  it("renders a heading for each of its three items", () => {
    const items = [
      { icon: "palette", title: "Real-Time Product Customizer", text: "Design products live." },
      { icon: "layers", title: "Multi-Side Customization", text: "Front, back, and sleeves." },
      { icon: "circle-dollar-sign", title: "Dynamic Pricing Engine", text: "Adjust pricing automatically." },
    ];

    render(<CardGrid items={items} columns={3} />);

    for (const item of items) {
      expect(screen.getByRole("heading", { name: item.title })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("heading")).toHaveLength(3);
  });
});

describe("PricingTable", () => {
  it("renders each plan name and its features", () => {
    const plans = [
      {
        name: "Free",
        price: "$0",
        period: "/ month",
        features: ["5 custom products", "Email support"],
        cta: { label: "Get Started Free", href: "https://apps.shopify.com/custy" },
      },
      {
        name: "Growth",
        price: "$39.99",
        period: "/ month",
        features: ["100 custom products", "Priority support"],
        cta: { label: "Start Free Trial", href: "https://apps.shopify.com/custy" },
        featured: true,
      },
    ];

    render(<PricingTable plans={plans} />);

    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Growth")).toBeInTheDocument();
    expect(screen.getByText("5 custom products")).toBeInTheDocument();
    expect(screen.getByText("Email support")).toBeInTheDocument();
    expect(screen.getByText("100 custom products")).toBeInTheDocument();
    expect(screen.getByText("Priority support")).toBeInTheDocument();
  });

  it("exposes plan names as headings and does not make 'Features' a heading", () => {
    const plans = [
      {
        name: "Free",
        price: "$0",
        features: ["5 custom products"],
        cta: { label: "Get Started Free", href: "https://apps.shopify.com/custy" },
      },
      {
        name: "Growth",
        price: "$39.99",
        features: ["100 custom products"],
        cta: { label: "Start Free Trial", href: "https://apps.shopify.com/custy" },
        featured: true,
      },
    ];

    render(<PricingTable plans={plans} />);

    expect(screen.getByRole("heading", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Growth" })).toBeInTheDocument();
    expect(screen.queryAllByRole("heading", { name: /features/i })).toHaveLength(0);
  });
});
