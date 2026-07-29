import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingPage from "./page";

describe("PricingPage", () => {
  it("explains the no-subscription model with a worked example", () => {
    render(<PricingPage />);
    expect(screen.getByRole("heading", { level: 1, name: /no subscription/i })).toBeInTheDocument();
    for (const card of ["Base cost", "Your markup", "Your profit", "One saved card"]) {
      expect(screen.getByRole("heading", { name: card })).toBeInTheDocument();
    }
    expect(screen.getByText(/illustrative example/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pricing questions" })).toBeInTheDocument();
  });
});
