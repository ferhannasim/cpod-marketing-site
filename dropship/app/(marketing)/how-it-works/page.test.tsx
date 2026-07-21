import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { SHOPIFY_APP_URL } from "@/lib/site";

describe("How it works page", () => {
  it("renders the five steps as an ordered timeline", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { level: 1, name: "How It Works" })).toBeInTheDocument();
    const steps = screen.getAllByRole("listitem").filter((li) => li.dataset.step);
    expect(steps).toHaveLength(5);
    expect(steps[0]).toHaveTextContent("Pick your products");
    expect(steps[4]).toHaveTextContent("We print, pack & ship");
  });
  it("links to the app and support resources", () => {
    render(<Page />);
    expect(screen.getByRole("link", { name: "Install the Shopify app" })).toHaveAttribute("href", SHOPIFY_APP_URL);
    expect(screen.getByRole("link", { name: "Delivery speed" })).toHaveAttribute("href", "/delivery");
  });
});
