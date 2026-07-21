import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage, { metadata } from "./page";

describe("Contact page", () => {
  it("renders the contact page with its h1, metadata, and form", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1, name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(metadata.title).toBe("Contact Us");
    expect(metadata.description).toBe("Contact the Custy team about the Shopify product customizer app.");
  });
});
