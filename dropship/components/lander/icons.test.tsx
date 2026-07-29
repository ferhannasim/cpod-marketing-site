import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { DuoBar, Eyebrow, IconTile, iconNames } from "./icons";

const REQUIRED = [
  "store", "shirt", "coffee", "package", "truck", "printer", "layers", "palette",
  "percent", "circle-dollar-sign", "trending-up", "chart-column", "refresh", "zap",
  "credit-card", "file-check", "download", "shield-check", "clock", "users",
  "sparkles", "badge-percent", "upload", "mail", "eye", "heart", "medal", "trophy",
  "graduation-cap", "church", "hand-heart", "siren", "calendar", "map-pin", "gift",
];

describe("icon registry", () => {
  it("registers every semantic name the content files use", () => {
    for (const name of REQUIRED) expect(iconNames, name).toContain(name);
  });
  it("renders a tile with data-icon and hides unknown names", () => {
    const { container } = render(<IconTile name="truck" />);
    expect(container.querySelector('[data-icon="truck"]')).not.toBeNull();
    const unknown = render(<IconTile name="nope" />);
    expect(unknown.container.firstChild).toBeNull();
  });
  it("renders every tile with the same unified tint, regardless of the tint prop", () => {
    for (const tint of [0, 1, 2, 3, 5]) {
      const { container } = render(<IconTile name="truck" tint={tint} />);
      const tile = container.querySelector('[data-icon="truck"]');
      expect(tile?.className).toContain("bg-ink-tint");
      expect(tile?.className).toContain("text-ink-soft");
      expect(tile?.className).not.toContain("bg-brand-tint");
    }
  });
});

describe("marks", () => {
  it("Eyebrow renders its label and two brand dots", () => {
    const { container, getByText } = render(<Eyebrow>Why sellers switch</Eyebrow>);
    expect(getByText("Why sellers switch")).toBeInTheDocument();
    expect(container.querySelectorAll("span.rounded-full")).toHaveLength(2);
  });
  it("DuoBar is a decorative hairline", () => {
    const { container } = render(<DuoBar />);
    expect((container.firstChild as HTMLElement).getAttribute("aria-hidden")).toBe("true");
  });
});
