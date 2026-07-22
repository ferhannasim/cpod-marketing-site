import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
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

  it("opens a product picker modal from the mobile trigger and selects from it", async () => {
    render(await LiveDemoPage({ searchParams: Promise.resolve({}) }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /choose a product/i }));
    const dialog = screen.getByRole("dialog", { name: /choose a product/i });
    for (const product of demoProducts) {
      expect(within(dialog).getByRole("button", { name: product.name })).toBeInTheDocument();
    }

    fireEvent.click(within(dialog).getByRole("button", { name: hoodie.name }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(editorFrame().src).toBe(hoodie.editorUrl);
    expect(window.location.search).toBe(`?product=${hoodie.slug}`);
  });

  it("closes the product picker modal without changing the product", async () => {
    render(await LiveDemoPage({ searchParams: Promise.resolve({}) }));
    fireEvent.click(screen.getByRole("button", { name: /choose a product/i }));
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(editorFrame().src).toBe(apron.editorUrl);
  });

  it("offers an open-in-new-tab escape hatch for the selected product", async () => {
    render(await LiveDemoPage({ searchParams: Promise.resolve({ product: hoodie.slug }) }));
    const link = screen.getByRole("link", { name: /open it in a new tab/i });
    expect(link).toHaveAttribute("href", hoodie.editorUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
