import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import LiveDemoPage from "./page";
import { demoProducts } from "@/content/demo-products";

const [apron, hoodie] = demoProducts;

function editorFrame(): HTMLIFrameElement {
  const frame = screen.getByTitle(/custy product editor/i);
  expect(frame.tagName).toBe("IFRAME");
  return frame as HTMLIFrameElement;
}

describe("live demo page", () => {
  it("defaults to the first product when there is no query", async () => {
    render(await LiveDemoPage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByRole("heading", { level: 1, name: /live demo/i })).toBeInTheDocument();
    expect(editorFrame().src).toBe(apron.editorUrl);
  });

  it("falls back to the first product on an unknown slug", async () => {
    render(await LiveDemoPage({ searchParams: Promise.resolve({ product: "no-such-product" }) }));
    expect(editorFrame().src).toBe(apron.editorUrl);
  });

  it("opens the product named by ?product=", async () => {
    render(await LiveDemoPage({ searchParams: Promise.resolve({ product: hoodie.slug }) }));
    expect(editorFrame().src).toBe(hoodie.editorUrl);
  });

  it("renders a switcher button per product and swaps the iframe on click", async () => {
    render(await LiveDemoPage({ searchParams: Promise.resolve({}) }));
    const buttons = demoProducts.map((p) => screen.getByRole("button", { name: p.name }));
    expect(buttons).toHaveLength(demoProducts.length);
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(buttons[1]);
    expect(editorFrame().src).toBe(hoodie.editorUrl);
    expect(screen.getByRole("button", { name: hoodie.name })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: apron.name })).toHaveAttribute("aria-pressed", "false");
    expect(window.location.search).toBe(`?product=${hoodie.slug}`);
  });

  it("offers an open-in-new-tab escape hatch for the selected product", async () => {
    render(await LiveDemoPage({ searchParams: Promise.resolve({ product: hoodie.slug }) }));
    const link = screen.getByRole("link", { name: /open it in a new tab/i });
    expect(link).toHaveAttribute("href", hoodie.editorUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
