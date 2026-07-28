import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the hero headline as the only h1", () => {
    render(<HomePage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/print-on-demand brand/i);
  });
  it("renders every homepage section in spec order", () => {
    render(<HomePage />);
    const allH2s = screen.getAllByRole("heading", { level: 2 });
    const h2Texts = allH2s.map((h) => h.textContent);
    const expectedSections = [
      "How it works",
      "Printing methods",
      "Top Selling Brands",
      "What sellers say",
      "Built for dropshipping",
      "Custy for your storefront",
      "Ready to launch your brand?",
    ];
    const actualSections = h2Texts.filter((text) =>
      expectedSections.includes(text)
    );
    expect(actualSections).toEqual(expectedSections);
    expect(screen.getByText(/free shipping on all orders over \$199 CAD/i)).toBeInTheDocument();
  });
  it("renders the featured video facade plus the 5-video strip", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("button", { name: /^Play video:/ })).toHaveLength(6);
  });
  it("shows the trust markers in the hero", () => {
    render(<HomePage />);
    for (const marker of ["Printed in Canada", "No minimums", "Ground shipping in 1–5 days"]) {
      expect(screen.getByText(marker)).toBeInTheDocument();
    }
  });
});
