import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContactForm } from "./contact-form";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function fill() {
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Sam" } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "sam@example.com" } });
  fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Hi" } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "I want to start a brand." } });
}

describe("ContactForm", () => {
  it("renders the four labeled fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("shows validation errors and does not call fetch on empty submit", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findAllByRole("alert")).not.toHaveLength(0);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("associates the name field's error with its input via aria-describedby", async () => {
    vi.stubGlobal("fetch", vi.fn());
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    const nameInput = await screen.findByLabelText(/name/i);
    await waitFor(() => expect(nameInput).toHaveAttribute("aria-describedby", "name-error"));
    const describedById = nameInput.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    const errorEl = document.getElementById(describedById as string);
    expect(errorEl).toHaveTextContent(/please enter your name/i);
  });

  it("shows the success message after a successful submit", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() =>
      expect(screen.getByText(/thanks, we'll get back to you soon\./i)).toBeInTheDocument(),
    );
  });

  it("shows a failure state when the server responds 400", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: false, errors: { email: ["Please enter a valid email address."] } }), {
          status: 400,
        }),
      ),
    );
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });

  it("disables the submit button while submitting", async () => {
    let resolveFetch: (value: Response) => void = () => {};
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        }),
      ),
    );
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => expect(screen.getByRole("button", { name: /send/i })).toBeDisabled());
    resolveFetch(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    await waitFor(() => expect(screen.getByText(/thanks/i)).toBeInTheDocument());
  });
});
