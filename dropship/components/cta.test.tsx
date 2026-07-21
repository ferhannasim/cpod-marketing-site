import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";
import { AppCta } from "./app-cta";
import HomePage from "@/app/page";
import { SHOPIFY_APP_URL } from "@/lib/site";

function expectAppLink(link: HTMLElement) {
  expect(link).toHaveAttribute("href", SHOPIFY_APP_URL);
  expect(link).toHaveAttribute("target", "_blank");
}

describe("CTA rewiring", () => {
  it("header Get started points at the Shopify app listing", () => {
    render(<Header />);
    expectAppLink(screen.getByRole("link", { name: "Get started" }));
  });
  it("hero Get started and final CTA point at the app listing", () => {
    render(<HomePage />);
    expectAppLink(screen.getByRole("link", { name: "Get started" }));
    expectAppLink(screen.getByRole("link", { name: "Install the Shopify app" }));
    expect(screen.getByRole("link", { name: "See how it works" })).toHaveAttribute("href", "/how-it-works");
  });
  it("both pitch cards offer the app plus a lander link", () => {
    render(<HomePage />);
    const appButtons = screen.getAllByRole("link", { name: "Get the app" });
    expect(appButtons).toHaveLength(2);
    appButtons.forEach(expectAppLink);
    expect(screen.getByRole("link", { name: "Learn more about Start Your Ecommerce Brand Without Tech or High Costs" })).toHaveAttribute("href", "/start-your-ecommerce-brand");
  });
  it("final CTA keeps a contact escape hatch", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: "Contact us →" })).toHaveAttribute("href", "/contact");
  });
});

describe("AppCta", () => {
  it("renders the app install button and a contact link", () => {
    render(<AppCta />);
    expectAppLink(screen.getByRole("link", { name: "Install the Shopify app" }));
    expect(screen.getByRole("link", { name: "Contact us instead →" })).toHaveAttribute("href", "/contact");
  });
});
