import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage section bands", () => {
  it("exposes hash targets for every marketing nav item", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector("#how-it-works")).toHaveClass("scroll-mt-20");
    expect(container.querySelector("#features")).toHaveClass("scroll-mt-20");
    expect(container.querySelector("#live-demo")).toHaveClass("scroll-mt-20");
    expect(container.querySelector("#pricing")).toHaveClass("scroll-mt-20");
    expect(container.querySelector("#contact")).toHaveClass("scroll-mt-20");
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

    expect(screen.getByRole("heading", { name: /get in touch/i })).toBeInTheDocument();
    expect(schemes[schemes.length - 1]).toBe("scheme1");
  });
});
