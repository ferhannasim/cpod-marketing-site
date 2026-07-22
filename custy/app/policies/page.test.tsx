import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PrivacyPage from "./privacy/page";
import TermsPage from "./terms/page";

describe("Policy pages", () => {
  it("renders privacy policy", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("heading", { level: 1, name: /privacy/i })).toBeInTheDocument();
  });

  it("renders terms of service", () => {
    render(<TermsPage />);
    expect(screen.getByRole("heading", { level: 1, name: /terms/i })).toBeInTheDocument();
  });
});
