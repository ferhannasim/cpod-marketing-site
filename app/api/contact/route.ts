import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  // TODO: wire a real provider here (Resend or Formspree) — this stub only logs.
  console.log("[contact] submission", parsed.data);
  return NextResponse.json({ ok: true });
}
