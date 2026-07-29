import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DROPSHIP_APP_URL } from "@/lib/site";
import DropshippingPage from "./page";

describe("DropshippingPage", () => {
  it("tells the Custy + DropShipPOD story and links the sibling app", () => {
    render(<DropshippingPage />);
    expect(screen.getByRole("heading", { level: 1, name: /customization meets dropshipping/i })).toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: /get dropshippod/i });
    expect(links[0]).toHaveAttribute("href", DROPSHIP_APP_URL);
  });
});
