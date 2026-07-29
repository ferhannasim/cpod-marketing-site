import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturesPage from "./page";

describe("FeaturesPage", () => {
  it("renders the feature tour and order flow", () => {
    render(<FeaturesPage />);
    expect(screen.getByRole("heading", { level: 1, name: /everything you need to run/i })).toBeInTheDocument();
    for (const card of [
      "Catalog import & markup", "Bulk publish", "Automatic fulfillment", "Manual review mode",
      "Per-order profit view", "Tracking sync", "Real-time inventory", "Saved-card payments",
    ]) {
      expect(screen.getByRole("heading", { name: card })).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { name: "From sale to doorstep" })).toBeInTheDocument();
  });
});
