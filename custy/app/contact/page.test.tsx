import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage, { metadata } from "./page";
import { SUPPORT_EMAIL, SUPPORT_PHONE, SUPPORT_PHONE_HREF } from "@/lib/site";

describe("Contact page", () => {
  it("renders the contact page with its h1 and metadata", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1, name: /contact us/i })).toBeInTheDocument();
    expect(metadata.title).toBe("Contact Us");
    expect(metadata.description).toBe("Contact the Custy team about the Shopify product customizer app.");
  });

  it("links the direct contact channels via mailto: and tel: (no form)", () => {
    render(<ContactPage />);
    const emailLink = screen.getByRole("link", { name: new RegExp(SUPPORT_EMAIL) });
    expect(emailLink).toHaveAttribute("href", `mailto:${SUPPORT_EMAIL}`);
    const phoneLink = screen.getByRole("link", { name: new RegExp(SUPPORT_PHONE.replace(/[+]/g, "\\+")) });
    expect(phoneLink).toHaveAttribute("href", SUPPORT_PHONE_HREF);
    // The message form lives on /support only.
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
  });

  it("links each help topic to its documenting page", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: /how it works/i })).toHaveAttribute("href", "/how-it-works");
    expect(screen.getByRole("link", { name: /view features/i })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: /see pricing/i })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: /^support$/i })).toHaveAttribute("href", "/support");
  });
});
