import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlanCompare } from "./plan-compare";

describe("PlanCompare", () => {
  it("renders one column per plan and one row per limit", () => {
    render(
      <PlanCompare
        plans={["Free", "Starter", "Growth", "Pro"]}
        rows={[
          { label: "Custom products", values: ["5", "10", "100", "Unlimited"] },
          { label: "Orders per month", values: ["20", "50", "300", "Unlimited"] },
        ]}
      />,
    );
    expect(screen.getByRole("columnheader", { name: "Growth" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Custom products" })).toBeInTheDocument();
    expect(screen.getAllByRole("cell", { name: "Unlimited" })).toHaveLength(2);
  });
});
