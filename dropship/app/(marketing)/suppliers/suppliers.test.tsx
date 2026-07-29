import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SuppliersPage from "./page";

describe("SuppliersPage", () => {
  it("renders the supplier pitch and print-file export details", () => {
    render(<SuppliersPage />);
    expect(screen.getByRole("heading", { level: 1, name: /print shop/i })).toBeInTheDocument();
    for (const card of ["Vector & raster files", "Your choice of DPI", "Everything in one ZIP", "Status workflow"]) {
      expect(screen.getByRole("heading", { name: card })).toBeInTheDocument();
    }
  });
});
