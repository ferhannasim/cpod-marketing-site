import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
  it("renders the wordmark linking home", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /dropshippod/i })).toHaveAttribute("href", "/");
  });
  it("opens a dropdown group on click", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Resources" }));
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
  });
  it("mobile menu toggle exposes all top-level entries", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getAllByRole("link", { name: "How it works" }).length).toBeGreaterThan(0);
  });

  it("closes the dropdown on Escape and refocuses the trigger", () => {
    render(<Header />);
    const trigger = screen.getByRole("button", { name: "Resources" });
    fireEvent.click(trigger);
    expect(screen.getByRole("link", { name: "FAQ" })).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: "Escape" });

    expect(screen.queryByRole("link", { name: "FAQ" })).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("closes the dropdown on outside pointerdown", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Resources" }));
    expect(screen.getByRole("link", { name: "FAQ" })).toBeInTheDocument();

    fireEvent.pointerDown(document.body);

    expect(screen.queryByRole("link", { name: "FAQ" })).not.toBeInTheDocument();
  });

  it("trigger exposes aria-controls matching the panel id", () => {
    render(<Header />);
    const trigger = screen.getByRole("button", { name: "Resources" });
    fireEvent.click(trigger);

    const panelId = trigger.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();

    const panel = document.getElementById(panelId as string);
    expect(panel).not.toBeNull();
    expect(within(panel as HTMLElement).getByRole("link", { name: "FAQ" })).toHaveAttribute(
      "href",
      "/faq",
    );
  });

  it("renders the brand logo image as the home link", () => {
    render(<Header />);
    const home = screen.getByRole("link", { name: "DropShipPOD" });
    expect(home).toHaveAttribute("href", "/");
    expect(home.querySelector("img")).not.toBeNull();
  });
});
