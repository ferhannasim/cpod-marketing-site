import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
  it("renders the wordmark linking home", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /dropshippod/i })).toHaveAttribute("href", "/");
  });
  it("opens a dropdown group on click", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Help & FAQs" }));
    expect(screen.getByRole("link", { name: "DTF FAQ" })).toHaveAttribute("href", "/faq/dtf");
  });
  it("mobile menu toggle exposes all top-level entries", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getAllByRole("link", { name: "How it works" }).length).toBeGreaterThan(0);
  });
});
