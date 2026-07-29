import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the rebuilt band sequence", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Your brand. Your platform. Our printers." }),
    ).toBeInTheDocument();
    for (const heading of [
      "How it works",
      "Sell without stock",
      "Simple economics, no subscription",
      "Four ways to print",
      "100+ blanks ready for your designs",
      "Fulfillment, your way",
      "What sellers say",
      "Launch your print-on-demand brand today",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: "Install the Shopify app" }).length).toBeGreaterThan(0);
  });
});
