import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FaqPage } from "./faq-page";

const items = [
  { question: "What is DTF?", answer: <p>Direct to film.</p> },
  { question: "Does it last?", answer: <p>Yes.</p> },
];

describe("FaqPage", () => {
  it("renders the title and every question, with answers collapsed", () => {
    render(<FaqPage title="DTF FAQ" items={items} related={[]} />);
    expect(screen.getByRole("heading", { level: 1, name: "DTF FAQ" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "What is DTF?" })).toBeInTheDocument();
    expect(screen.queryByText("Direct to film.")).not.toBeInTheDocument();
  });
  it("expands an answer on click", () => {
    render(<FaqPage title="DTF FAQ" items={items} related={[]} />);
    fireEvent.click(screen.getByRole("button", { name: "What is DTF?" }));
    expect(screen.getByText("Direct to film.")).toBeVisible();
  });
  it("lists related FAQ links", () => {
    render(<FaqPage title="DTF FAQ" items={items} related={[{ label: "General FAQ", href: "/faq" }]} />);
    expect(screen.getByRole("link", { name: "General FAQ" })).toHaveAttribute("href", "/faq");
  });
});
