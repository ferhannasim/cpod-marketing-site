import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { niches } from "@/content/catalog";
import CatalogPage from "./page";

describe("CatalogPage", () => {
  it("renders categories and the eight-niche grid from the app taxonomy", () => {
    render(<CatalogPage />);
    expect(screen.getByRole("heading", { level: 1, name: /100\+ blanks/i })).toBeInTheDocument();
    expect(niches).toHaveLength(8);
    for (const niche of [
      "Athletic, College & Greek", "Weddings & Events", "Military", "Sports & Teams",
      "Religious", "Fundraising & Charity", "First Responders", "Holidays",
    ]) {
      expect(screen.getByRole("heading", { name: niche })).toBeInTheDocument();
    }
  });
});
