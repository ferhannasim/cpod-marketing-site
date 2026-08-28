import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { home } from "@/content/home";

describe("HomePage section bands", () => {
  it("shows each how-it-works beat in full rather than clamping it", () => {
    render(<HomePage />);
    for (const step of home.howItWorks.steps) {
      expect(screen.getByRole("heading", { name: step.title })).toBeInTheDocument();
      expect(screen.getByText(step.text)).toBeInTheDocument();
    }
  });

  it("renders the how-it-works beats as an ordered list with an illustration each", () => {
    const { container } = render(<HomePage />);
    const items = container.querySelectorAll("#how-it-works ol > li");
    expect(items).toHaveLength(home.howItWorks.steps.length);
    for (const item of items) {
      expect(item.querySelector("svg")).not.toBeNull();
    }
  });

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
      // The hero carries the stronger opener wash instead of a scheme class.
      if (section.classList.contains("bg-wash-hero")) return "hero";
      if (section.classList.contains("bg-scheme1-bg")) return "scheme1";
      if (section.classList.contains("bg-wash")) return "scheme2";
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
