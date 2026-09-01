import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { trackContactFormSubmitted } from "@/lib/klaviyo";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    await trackContactFormSubmitted(parsed.data);
  } catch (err) {
    console.error("[contact] Klaviyo error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
