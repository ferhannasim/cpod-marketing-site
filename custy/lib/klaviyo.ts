import type { ContactInput } from "@/lib/contact-schema";

export const CONTACT_FORM_METRIC = "Contact Form Submitted";

const KLAVIYO_EVENTS_URL = "https://a.klaviyo.com/api/events/";
const KLAVIYO_REVISION = "2025-10-15";

export class KlaviyoError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "KlaviyoError";
  }
}

/**
 * Creates a Klaviyo "Contact Form Submitted" event for the submitter's profile.
 * Flow emails should send to support using event properties Name / Email / Subject / Message.
 */
export async function trackContactFormSubmitted(input: ContactInput): Promise<void> {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!apiKey) {
    throw new KlaviyoError("KLAVIYO_PRIVATE_API_KEY is not configured");
  }

  const res = await fetch(KLAVIYO_EVENTS_URL, {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      revision: KLAVIYO_REVISION,
    },
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties: {
            Name: input.name,
            Email: input.email,
            Subject: input.subject,
            Message: input.message,
          },
          metric: {
            data: {
              type: "metric",
              attributes: { name: CONTACT_FORM_METRIC },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: input.email,
                first_name: input.name,
              },
            },
          },
          unique_id: crypto.randomUUID(),
        },
      },
    }),
  });

  // Create Event returns 202 Accepted when the event was queued.
  if (res.status !== 202) {
    const detail = await res.text().catch(() => "");
    throw new KlaviyoError(
      `Klaviyo Create Event failed (${res.status})${detail ? `: ${detail}` : ""}`,
      res.status,
    );
  }
}
