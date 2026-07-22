"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";

const inputClasses =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-ink focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldError = (message?: string) =>
    message ? (
      <p role="alert" className="mt-1 text-sm text-brand">
        {message}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-800">
          Name
        </label>
        <input id="name" {...register("name")} aria-invalid={!!errors.name} className={inputClasses} />
        {fieldError(errors.name?.message)}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-800">
          Email
        </label>
        <input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} className={inputClasses} />
        {fieldError(errors.email?.message)}
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-zinc-800">
          Subject
        </label>
        <input id="subject" {...register("subject")} aria-invalid={!!errors.subject} className={inputClasses} />
        {fieldError(errors.subject?.message)}
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-zinc-800">
          Message
        </label>
        <textarea id="message" rows={6} {...register("message")} aria-invalid={!!errors.message} className={inputClasses} />
        {fieldError(errors.message?.message)}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
      {status === "sent" ? (
        <p role="status" className="text-sm font-medium text-green-700">
          Thanks — your message has been sent. We&apos;ll get back to you shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm font-medium text-brand">
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      ) : null}
    </form>
  );
}
