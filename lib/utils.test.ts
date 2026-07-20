import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins truthy class names with spaces", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("drops falsy values", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });
  it("later conflicting utilities win", () => {
    expect(cn("px-6 py-3", "px-4 py-2")).toBe("px-4 py-2");
  });
  it("non-conflicting classes are preserved in order", () => {
    expect(cn("bg-brand text-white", "hover:bg-brand-dark")).toBe("bg-brand text-white hover:bg-brand-dark");
  });
});
