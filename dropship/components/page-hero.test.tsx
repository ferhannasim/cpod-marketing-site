import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHero } from "./page-hero";

describe("PageHero", () => {
  it("renders eyebrow, title, and lede", () => {
    render(<PageHero eyebrow="FAQs" title="DTF FAQ" lede="Answers about transfers." />);
    expect(screen.getByText("FAQs")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "DTF FAQ" })).toBeInTheDocument();
    expect(screen.getByText("Answers about transfers.")).toBeInTheDocument();
  });
  it("quiet variant uses the smaller title scale", () => {
    render(<PageHero title="Privacy Policy" variant="quiet" />);
    expect(screen.getByRole("heading", { level: 1 }).className).toContain("text-3xl");
  });
});
