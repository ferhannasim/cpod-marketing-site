import { describe, expect, it } from "vitest";
import { POST } from "./route";

function request(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("returns 200 ok for a valid submission", async () => {
    const res = await POST(
      request({ name: "Sam", email: "sam@example.com", subject: "Hi", message: "I want to start a brand." }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
  it("returns 400 with field errors for an invalid submission", async () => {
    const res = await POST(request({ name: "", email: "bad", subject: "", message: "x" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors).toHaveProperty("email");
  });
  it("returns 400 for a non-JSON body", async () => {
    const res = await POST(new Request("http://localhost/api/contact", { method: "POST", body: "not json" }));
    expect(res.status).toBe(400);
  });
});
