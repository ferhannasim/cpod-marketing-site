import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CONTACT_FORM_METRIC,
  KlaviyoError,
  trackContactFormSubmitted,
} from "./klaviyo";

describe("trackContactFormSubmitted", () => {
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

  it("posts the Contact Form Submitted metric", async () => {
    await trackContactFormSubmitted({
      name: "Sam",
      email: "sam@store.com",
      subject: "Help",
      message: "Need onboarding help please.",
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    const [, init] = vi.mocked(fetch).mock.calls[0]!;
    const payload = JSON.parse(String(init?.body));
    expect(payload.data.attributes.metric.data.attributes.name).toBe(CONTACT_FORM_METRIC);
    expect(payload.data.attributes.profile.data.attributes.first_name).toBe("Sam");
  });

  it("throws when the API key is missing", async () => {
    delete process.env.KLAVIYO_PRIVATE_API_KEY;
    await expect(
      trackContactFormSubmitted({
        name: "Sam",
        email: "sam@store.com",
        subject: "Help",
        message: "Need onboarding help please.",
      }),
    ).rejects.toBeInstanceOf(KlaviyoError);
  });

  it("throws when Klaviyo returns a non-202 status", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response("nope", { status: 500 }));
    await expect(
      trackContactFormSubmitted({
        name: "Sam",
        email: "sam@store.com",
        subject: "Help",
        message: "Need onboarding help please.",
      }),
    ).rejects.toMatchObject({ name: "KlaviyoError", status: 500 });
  });
});
