import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Reveal } from "./reveal";

describe("Reveal", () => {
  it("renders children immediately visible when IntersectionObserver is unavailable (jsdom)", async () => {
    expect(typeof (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver).toBe(
      "undefined",
    );
    const { getByText, container } = render(
      <Reveal>
        <p>child content</p>
      </Reveal>,
    );
    expect(getByText("child content")).toBeInTheDocument();
    // Effect runs synchronously enough under RTL's act() wrapping for render().
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("opacity-100");
    expect(root.className).toContain("translate-y-0");
  });

  it("forwards a className onto the wrapping element", () => {
    const { container } = render(
      <Reveal className="custom-class">
        <span>x</span>
      </Reveal>,
    );
    expect((container.firstChild as HTMLElement).className).toContain("custom-class");
  });
});
