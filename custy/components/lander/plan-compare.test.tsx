import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlanCompare } from "./plan-compare";

describe("PlanCompare", () => {
  it("renders one column per plan and one row per limit", () => {
    render(
      <PlanCompare
        plans={["Free", "Starter", "Pro"]}
        rows={[
          { label: "Custom products", values: ["5", "100", "Unlimited"] },
          { label: "Orders per month", values: ["20", "300", "Unlimited"] },
        ]}
      />,
    );
    expect(screen.getByRole("columnheader", { name: "Starter" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Custom products" })).toBeInTheDocument();
    expect(screen.getAllByRole("cell", { name: "Unlimited" })).toHaveLength(2);
  });
});
