import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";
import { AppCta } from "./app-cta";
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
});

describe("AppCta", () => {
  it("renders the app install button and a contact link", () => {
    render(<AppCta />);
    expectAppLink(screen.getByRole("link", { name: "Install the Shopify app" }));
    expect(screen.getByRole("link", { name: "Contact us instead →" })).toHaveAttribute("href", "/contact");
  });
});
