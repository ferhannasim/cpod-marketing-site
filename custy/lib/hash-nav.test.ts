import { describe, expect, it, vi } from "vitest";
import type { MouseEvent } from "react";
import { handleHomeHashNav } from "./hash-nav";

describe("handleHomeHashNav", () => {
  it("smooth-scrolls to the section when already on the homepage", () => {
    const el = document.createElement("section");
    el.id = "live-demo";
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);

    const preventDefault = vi.fn();
    const result = handleHomeHashNav("/#live-demo", {
      preventDefault,
    } as unknown as MouseEvent<HTMLAnchorElement>);

    expect(result).toBe(true);
    expect(preventDefault).toHaveBeenCalled();
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

    el.remove();
  });

  it("leaves non-hash links alone", () => {
    expect(handleHomeHashNav("/help-centre")).toBe(false);
  });
});
