import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { audiences, niches } from "@/content/use-cases";
import UseCasesPage from "./page";

describe("UseCasesPage", () => {
  it("renders four audiences and the eight-niche grid", () => {
    render(<UseCasesPage />);
    expect(screen.getByRole("heading", { level: 1, name: /who sells with custy/i })).toBeInTheDocument();
    expect(audiences).toHaveLength(4);
    expect(niches).toHaveLength(8);
    for (const audience of [
      "Print-on-demand stores",
      "Apparel & merch brands",
      "Print shops",
      "Promotional & corporate merch",
    ]) {
      expect(screen.getByRole("heading", { name: audience })).toBeInTheDocument();
    }
  });
});
