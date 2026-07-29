import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage new bands", () => {
  it("renders print methods, Design Lab teaser, and DropShipPOD tie-in", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "Print methods that match your products" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Step inside the Design Lab" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pair it with DropShipPOD" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore the Design Lab" })).toHaveAttribute("href", "/design-lab");
    expect(screen.getByRole("link", { name: "How the pairing works" })).toHaveAttribute("href", "/dropshipping");
  });

  it("alternates section background scheme with no two adjacent sections matching", () => {
    const { container } = render(<HomePage />);
    const main = container.querySelector("main");
    expect(main).not.toBeNull();

    const sections = Array.from(main!.querySelectorAll(":scope > section"));
    expect(sections.length).toBeGreaterThan(0);

    const schemes = sections.map((section) => {
      if (section.classList.contains("bg-scheme1-bg")) return "scheme1";
      if (section.classList.contains("bg-scheme2-bg")) return "scheme2";
      return "unknown";
    });
    expect(schemes).not.toContain("unknown");
    for (let i = 1; i < schemes.length; i++) {
      expect(schemes[i]).not.toBe(schemes[i - 1]);
    }

    // The page-ending CtaBand sits in a plain (unschemed) Container, which
    // inherits the body's scheme1 (white) background — the last real section
    // must differ from that implicit white backdrop, i.e. be scheme2.
    expect(schemes[schemes.length - 1]).toBe("scheme2");
  });
});
