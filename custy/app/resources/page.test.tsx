import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { resourceSteps } from "@/content/resources";
import ResourcesPage, { metadata } from "./page";

describe("Resources page", () => {
  it("renders the guide heading and all seven steps in order", () => {
    render(<ResourcesPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "How to Install and Use Custy on Shopify" }),
    ).toBeInTheDocument();

    const stepHeadings = resourceSteps.map((step) =>
      screen.getByRole("heading", { level: 2, name: step.title }),
    );
    const positions = stepHeadings.map((heading) =>
      Array.from(document.querySelectorAll("h2")).indexOf(heading),
    );
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("links every table of contents entry to its guide section", () => {
    render(<ResourcesPage />);

    for (const step of resourceSteps) {
      const links = screen.getAllByRole("link", { name: step.title });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("href", `#${step.id}`);
      }
      expect(document.getElementById(step.id)).toHaveClass("scroll-mt-24");
    }
  });

  it("renders all supplied screenshots with useful alternative text and captions", () => {
    render(<ResourcesPage />);

    for (const step of resourceSteps) {
      const image = screen.getByRole("img", { name: step.screenshot.alt });
      expect(image).toBeInTheDocument();
      expect(screen.getByText(new RegExp(step.screenshot.caption.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))).toBeInTheDocument();
      expect(
        screen.getByRole("link", {
          name: `Open full-size screenshot for step ${step.number}: ${step.title}`,
        }),
      ).toHaveAttribute("href", step.screenshot.src);
    }
  });

  it("uses safe external install links and an internal support link", () => {
    render(<ResourcesPage />);

    const installLinks = screen.getAllByRole("link", { name: "Install Custy on Shopify" });
    expect(installLinks.length).toBeGreaterThan(1);
    for (const link of installLinks) {
      expect(link).toHaveAttribute("href", "https://apps.shopify.com/custy");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(screen.getByRole("link", { name: "Get Support" })).toHaveAttribute(
      "href",
      "/#contact",
    );
  });

  it("has guide-specific metadata", () => {
    expect(metadata.title).toBe("Resources: How to Install and Use Custy");
    expect(metadata.description).toMatch(/configure print areas/i);
  });
});
