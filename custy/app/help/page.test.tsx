import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { helpHub, helpCategories } from "@/content/help";
import HelpHubPage, { metadata } from "./page";

describe("Help hub page", () => {
  it("renders the Help Centre heading and recommended path", () => {
    render(<HelpHubPage />);

    expect(screen.getByRole("heading", { level: 1, name: helpHub.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: helpHub.pathTitle })).toBeInTheDocument();

    for (const step of helpHub.pathSteps) {
      expect(screen.getByRole("link", { name: new RegExp(step.title) })).toHaveAttribute(
        "href",
        step.href,
      );
    }
  });

  it("lists Getting Started and links FAQ and Contact", () => {
    render(<HelpHubPage />);

    const category = helpCategories[0];
    expect(screen.getByRole("link", { name: new RegExp(category.title) })).toHaveAttribute(
      "href",
      category.href,
    );
    expect(screen.getByRole("link", { name: /FAQ/i })).toHaveAttribute("href", "/faq");
    expect(screen.getByRole("link", { name: /Contact/i })).toHaveAttribute(
      "href",
      "/about#contact",
    );
  });

  it("has Help Centre metadata", () => {
    expect(metadata.title).toBe("Help Centre");
    expect(metadata.description).toMatch(/print shop|Custy|theme|plan/i);
  });
});
