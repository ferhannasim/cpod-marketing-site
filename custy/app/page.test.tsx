import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

it("renders the homepage heading", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});
