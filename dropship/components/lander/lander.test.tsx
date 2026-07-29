import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanderSection } from "./section";
import { CardGrid } from "./cards";

describe("LanderSection", () => {
  it("renders eyebrow, title and lead over its children", () => {
    render(
      <LanderSection eyebrow="Simple economics" title="You set the markup" lead="No subscription.">
        <p>child</p>
      </LanderSection>,
    );
    expect(screen.getByText("Simple economics")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "You set the markup" })).toBeInTheDocument();
    expect(screen.getByText("child")).toBeInTheDocument();
  });
  it("dark tone flips to the deep-navy band", () => {
    const { container } = render(<LanderSection tone="dark" title="T" />);
    expect((container.firstChild as HTMLElement).className).toContain("bg-ink-deep");
  });
});

describe("CardGrid", () => {
  it("renders icon tiles by semantic name", () => {
    const { container } = render(
      <CardGrid
        items={[
          { icon: "truck", title: "Shipping", text: "Tracked." },
          { icon: "percent", title: "Markup", text: ["You choose.", "Per product."] },
        ]}
      />,
    );
    expect(container.querySelector('[data-icon="truck"]')).not.toBeNull();
    expect(container.querySelector('[data-icon="percent"]')).not.toBeNull();
    expect(screen.getByText("Per product.")).toBeInTheDocument();
  });
});
