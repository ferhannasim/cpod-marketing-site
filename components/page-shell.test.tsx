import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageShell } from "./page-shell";

describe("PageShell", () => {
  it("renders the h1 title, optional lede, and prose body", () => {
    render(
      <PageShell title="How It Works" lede="From blank to shipped.">
        <p>Body copy</p>
      </PageShell>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "How It Works" })).toBeInTheDocument();
    expect(screen.getByText("From blank to shipped.")).toBeInTheDocument();
    expect(screen.getByText("Body copy")).toBeInTheDocument();
  });

  it("renders an eyebrow and an alert note when provided", () => {
    render(
      <PageShell eyebrow="Please read" title="Printing Notice" alert="Read before ordering.">
        <p>Body</p>
      </PageShell>,
    );
    expect(screen.getByText("Please read")).toBeInTheDocument();
    expect(screen.getByRole("note")).toHaveTextContent("Read before ordering.");
  });
});
