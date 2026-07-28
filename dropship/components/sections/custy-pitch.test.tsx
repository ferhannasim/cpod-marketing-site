import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustyPitch } from "./custy-pitch";

describe("CustyPitch", () => {
  it("primary CTA points at the Shopify app listing", () => {
    render(<CustyPitch />);
    expect(screen.getByRole("link", { name: "Get Custy on Shopify" })).toHaveAttribute(
      "href",
      "https://apps.shopify.com/custy",
    );
  });

  it("secondary link points at the Custy marketing site", () => {
    render(<CustyPitch />);
    expect(screen.getByRole("link", { name: "Visit custyapp.com" })).toHaveAttribute(
      "href",
      "https://custyapp.com",
    );
  });
});
