import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";
import { TAGLINE } from "@/lib/site";

describe("Footer", () => {
  it("shows the logo and tagline", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "DropShipPOD" })).toHaveAttribute("href", "/");
    expect(screen.getByText(TAGLINE)).toBeInTheDocument();
  });
});
