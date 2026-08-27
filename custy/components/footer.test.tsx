import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

it("renders footer columns, socials, and copyright", () => {
  render(<Footer />);
  expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/policies/privacy");
  expect(screen.getByRole("link", { name: "Live Demo" })).toHaveAttribute("href", "/#live-demo");
  expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute("href", "https://www.facebook.com/CustyAPP");
  expect(screen.getByText(/©/)).toBeInTheDocument();
});
