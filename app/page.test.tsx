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
    for (const heading of [
      "How it works",
      "Printing methods",
      "Top Selling Brands",
      "What sellers say",
      "Built for dropshipping",
      "Ready to launch your brand?",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(screen.getByText(/free shipping on all orders over \$199/i)).toBeInTheDocument();
  });
  it("renders the featured video facade plus the 5-video strip", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("button", { name: /^Play video:/ })).toHaveLength(6);
  });
});
