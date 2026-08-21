import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SupportPage, { metadata } from "./page";
import { SUPPORT_EMAIL } from "@/lib/site";

describe("Support page", () => {
  it("renders the support page with its h1 and metadata", () => {
    render(<SupportPage />);
    expect(screen.getByRole("heading", { level: 1, name: /support/i })).toBeInTheDocument();
    expect(metadata.title).toBeTruthy();
  });

  it("shows info@CheapestPOD.ca as the support email", () => {
    expect(SUPPORT_EMAIL).toBe("info@CheapestPOD.ca");
    render(<SupportPage />);
    const emailLink = screen.getByRole("link", { name: /info@CheapestPOD\.ca/ });
    expect(emailLink).toHaveAttribute("href", "mailto:info@CheapestPOD.ca");
  });

  it("renders the contact form below the support content", () => {
    render(<SupportPage />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });
});
