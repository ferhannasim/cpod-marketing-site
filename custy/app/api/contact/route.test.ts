import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { CONTACT_FORM_METRIC } from "@/lib/klaviyo";

function request(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "Sam",
  email: "sam@store.com",
  subject: "Hi",
  message: "I want to start a brand.",
};

describe("POST /api/contact", () => {
  const originalKey = process.env.KLAVIYO_PRIVATE_API_KEY;

  beforeEach(() => {
    process.env.KLAVIYO_PRIVATE_API_KEY = "pk_test_key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 202 })),
    );
  });

  afterEach(() => {
    if (originalKey === undefined) {
      delete process.env.KLAVIYO_PRIVATE_API_KEY;
    } else {
      process.env.KLAVIYO_PRIVATE_API_KEY = originalKey;
    }
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns 200 ok and posts Contact Form Submitted to Klaviyo", async () => {
    const res = await POST(request(validBody));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    expect(fetch).toHaveBeenCalledTimes(1);
    const [url, init] = vi.mocked(fetch).mock.calls[0]!;
    expect(url).toBe("https://a.klaviyo.com/api/events/");
    expect(init?.method).toBe("POST");
    expect(init?.headers).toMatchObject({
      Authorization: "Klaviyo-API-Key pk_test_key",
      revision: "2025-10-15",
    });

    const payload = JSON.parse(String(init?.body));
    expect(payload.data.attributes.metric.data.attributes.name).toBe(CONTACT_FORM_METRIC);
    expect(payload.data.attributes.profile.data.attributes.email).toBe(validBody.email);
    expect(payload.data.attributes.properties).toEqual({
      Name: validBody.name,
      Email: validBody.email,
      Subject: validBody.subject,
      Message: validBody.message,
    });
    expect(payload.data.attributes.unique_id).toEqual(expect.any(String));
  });

  it("returns 500 when KLAVIYO_PRIVATE_API_KEY is missing", async () => {
    delete process.env.KLAVIYO_PRIVATE_API_KEY;
    const res = await POST(request(validBody));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns 500 when Klaviyo rejects the event", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ errors: [{ detail: "forbidden" }] }), { status: 403 }),
    );
    const res = await POST(request(validBody));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false });
  });

  it("returns 400 with field errors for an invalid submission", async () => {
    const res = await POST(request({ name: "", email: "bad", subject: "", message: "x" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors).toHaveProperty("email");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns 400 for a non-JSON body", async () => {
    const res = await POST(new Request("http://localhost/api/contact", { method: "POST", body: "not json" }));
    expect(res.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });
});
