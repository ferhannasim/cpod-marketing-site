import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import DesignLabPage from "./page";

describe("DesignLabPage", () => {
  it("tours the shopper designer and its safeguards", () => {
    render(<DesignLabPage />);
    expect(screen.getByRole("heading", { level: 1, name: /design lab/i })).toBeInTheDocument();
    for (const card of [
      "Text, exactly as they want it", "A clipart and font library", "Their own artwork",
      "Every printable side", "Low-resolution warnings", "Keep designs inside the lines",
      "Approval before checkout", "Quote requests by email",
    ]) {
      expect(screen.getByRole("heading", { name: card })).toBeInTheDocument();
    }
  });
});
