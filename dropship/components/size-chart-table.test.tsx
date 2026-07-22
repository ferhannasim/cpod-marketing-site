import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SizeChartTable } from "./size-chart-table";

const chart = {
  handle: "gildan-5000",
  brand: "Gildan",
  model: "5000",
  title: "Gildan 5000 Size Chart",
  columns: ["Size", "Chest"],
  rows: [["S", "18"]],
  notes: ["Inches."],
};

describe("SizeChartTable", () => {
  it("renders a semantic table with caption, headers, and notes", () => {
    render(<SizeChartTable chart={chart} />);
    expect(screen.getByRole("table", { name: "Gildan 5000 Size Chart" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Chest" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "18" })).toBeInTheDocument();
    expect(screen.getByText("Inches.")).toBeInTheDocument();
  });
});
