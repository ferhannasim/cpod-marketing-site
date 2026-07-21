import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const valid = { name: "Sam", email: "sam@example.com", subject: "Hi", message: "I want to start a brand." };

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it.each([
    ["name", ""],
    ["email", "not-an-email"],
    ["subject", ""],
    ["message", "short"],
  ])("rejects invalid %s", (field, value) => {
    expect(contactSchema.safeParse({ ...valid, [field]: value }).success).toBe(false);
  });
});
