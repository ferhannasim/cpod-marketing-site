"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const inputClasses = "w-full rounded-card border border-line px-3 py-2 text-sm focus:border-ink focus:outline-none";
const labelClasses = "mb-1 block text-sm font-medium text-ink";

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

  const fieldError = (id: string, message?: string) =>
    message ? (
      <p id={id} role="alert" className="mt-1 text-sm text-red-600">
        {message}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClasses}
        />
        {fieldError("name-error", errors.name?.message)}
      </div>
      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClasses}
        />
        {fieldError("email-error", errors.email?.message)}
      </div>
      <div>
        <label htmlFor="subject" className={labelClasses}>
          Subject
        </label>
        <input
          id="subject"
          {...register("subject")}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={inputClasses}
        />
        {fieldError("subject-error", errors.subject?.message)}
      </div>
      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClasses}
        />
        {fieldError("message-error", errors.message?.message)}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "rounded-pill bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
      {status === "sent" ? (
        <p role="status" className="text-sm font-medium text-green-700">
          Thanks — we&apos;ll get back to you soon.
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm font-medium text-red-600">
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      ) : null}
    </form>
  );
}
