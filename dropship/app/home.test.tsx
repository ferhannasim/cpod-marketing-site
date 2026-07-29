import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { SHOPIFY_APP_URL } from "@/lib/site";

describe("HomePage", () => {
  it("renders the rebuilt band sequence", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Your brand. Your platform. Our printers." }),
    ).toBeInTheDocument();
    for (const heading of [
      "How it works",
      "Sell without stock",
      "Simple economics, no subscription",
      "Four ways to print",
      "100+ blanks ready for your designs",
      "Fulfillment, your way",
      "What sellers say",
      "Launch your print-on-demand brand today",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: "Install the Shopify app" }).length).toBeGreaterThan(0);
  });

  it("renders the hero headline as the only h1", () => {
    render(<HomePage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Your brand. Your platform. Our printers.");
  });

  it("wires the app-install and how-it-works CTAs to their real targets", () => {
    render(<HomePage />);
    const appLinks = screen.getAllByRole("link", { name: "Install the Shopify app" });
    expect(appLinks.length).toBeGreaterThanOrEqual(2); // hero CTA + final CtaBand
    for (const link of appLinks) {
      expect(link).toHaveAttribute("href", SHOPIFY_APP_URL);
      expect(link).toHaveAttribute("target", "_blank");
    }
    expect(screen.getByRole("link", { name: "See how it works" })).toHaveAttribute("href", "/how-it-works");
  });

  it("renders the main band headings in document order", () => {
    render(<HomePage />);
    const expectedOrder = [
      "How it works",
      "Sell without stock",
      "Simple economics, no subscription",
      "Four ways to print",
      "100+ blanks ready for your designs",
      "Fulfillment, your way",
      "What sellers say",
      "Custy for your storefront",
      "See the platform in action",
      "Answers before you ask",
      "Launch your print-on-demand brand today",
    ];
    const allH2Texts = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    const actualOrder = allH2Texts.filter((text) => expectedOrder.includes(text ?? ""));
    expect(actualOrder).toEqual(expectedOrder);
  });

  it("locks band-tone alternation: no two adjacent top-level sections share a background family", () => {
    const { container } = render(<HomePage />);
    // Only direct children of the render root are "top-level" bands — this excludes
    // nested sections like the CtaBand, which lives inside a LanderSection wrapper
    // and doesn't count as its own band for alternation purposes.
    const sections = Array.from(container.querySelectorAll<HTMLElement>(":scope > section"));
    expect(sections.length).toBeGreaterThan(10);

    function family(section: HTMLElement): "white" | "light" | "dark" {
      const className = section.className;
      if (className.includes("bg-ink-deep")) return "dark";
      if (className.includes("bg-surface")) return "light";
      const style = section.getAttribute("style") ?? "";
      if (/#0e1638|#141f56|#1a2450/.test(style)) return "dark"; // CtaBand's navy gradient, if ever top-level
      return "white"; // bg-white or no explicit bg class
    }

    const families = sections.map(family);
    for (let i = 1; i < families.length; i++) {
      expect(
        families[i],
        `section ${i} (id="${sections[i].id}") repeats the "${families[i]}" background family of the section before it`,
      ).not.toBe(families[i - 1]);
    }
  });
});
