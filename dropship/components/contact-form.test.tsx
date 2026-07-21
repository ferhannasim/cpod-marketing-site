import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContactForm } from "./contact-form";

afterEach(() => vi.restoreAllMocks());

function fill() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Sam" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "sam@example.com" } });
  fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Hi" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "I want to start a brand." } });
}

describe("ContactForm", () => {
  it("shows validation errors and does not submit an empty form", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findAllByRole("alert")).not.toHaveLength(0);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
  it("submits valid data and shows the success state", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(screen.getByText(/thanks/i)).toBeInTheDocument());
  });
  it("shows an error state when the API fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 500 }));
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });
});
