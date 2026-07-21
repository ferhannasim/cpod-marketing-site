import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("joins truthy classes and merges tailwind conflicts", () => {
    expect(cn("p-2", false, "text-sm", "p-4")).toBe("text-sm p-4");
  });
});
