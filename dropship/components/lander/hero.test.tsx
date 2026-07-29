import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HighlightCard, LanderHero } from "./hero";
import { CtaBand } from "./cta-band";

describe("LanderHero", () => {
  it("renders headline, leads, and CTAs (external opens new tab)", () => {
    render(
      <LanderHero
        title="Launch a POD brand"
        lead={["No inventory.", "No monthly fee."]}
        ctas={[
          { label: "Install the app", href: "https://apps.shopify.com/dropshippod" },
          { label: "See pricing", href: "/pricing" },
        ]}
        highlight={<HighlightCard title="Why switch" items={["Auto fulfillment"]} />}
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Launch a POD brand" })).toBeInTheDocument();
    expect(screen.getByText("No monthly fee.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Install the app" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "See pricing" })).toHaveAttribute("href", "/pricing");
    expect(screen.getByText("Auto fulfillment")).toBeInTheDocument();
  });
});

describe("CtaBand", () => {
  it("renders title, text and both CTAs", () => {
    render(
      <CtaBand
        title="Start selling"
        text="Import products today."
        cta={{ label: "Install", href: "https://apps.shopify.com/dropshippod" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Start selling" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Install" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });
});
