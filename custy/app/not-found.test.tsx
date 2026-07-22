import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("renders the 404 heading and a link back home", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1, name: /page not found/i })).toBeInTheDocument();
    const homeLink = screen.getByRole("link", { name: /back to home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
