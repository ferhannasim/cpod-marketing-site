import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CUSTY_APP_URL } from "@/lib/site";
import CustyPage from "./page";

describe("CustyPage", () => {
  it("pitches Custy and links out to its Shopify listing", () => {
    render(<CustyPage />);
    expect(screen.getByRole("heading", { level: 1, name: /let customers design/i })).toBeInTheDocument();
    const install = screen.getAllByRole("link", { name: /install custy free/i });
    expect(install.length).toBeGreaterThan(0);
    expect(install[0]).toHaveAttribute("href", CUSTY_APP_URL);
  });
});
