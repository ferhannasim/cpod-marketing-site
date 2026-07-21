import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SupportPage, { metadata } from "./page";

describe("Support page", () => {
  it("renders the support page with its h1 and metadata", () => {
    render(<SupportPage />);
    expect(screen.getByRole("heading", { level: 1, name: /support/i })).toBeInTheDocument();
    expect(metadata.title).toBeTruthy();
  });

  it("renders the contact form below the support content", () => {
    render(<SupportPage />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });
});
