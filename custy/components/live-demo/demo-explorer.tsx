"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { demoProducts, type DemoProduct } from "@/content/demo-products";
import { cn } from "@/lib/utils";

// Client half of /live-demo: owns the selected product and swaps the editor
// iframe, which spans the full explorer width (the page caps it at 1440px).
// The switcher is a strip above the editor on md+; on mobile it collapses to a
// "Choose a product" trigger that opens a full-screen picker modal (same
// overlay pattern as the header's mobile menu). URL sync uses
// history.replaceState (the App Router's sanctioned shallow update) so
// switching products never triggers a server round-trip.
export function DemoExplorer({ initialSlug }: { initialSlug: string }) {
  const initial = demoProducts.find((p) => p.slug === initialSlug) ?? demoProducts[0];
  const [selected, setSelected] = useState<DemoProduct>(initial);
  const [pickerOpen, setPickerOpen] = useState(false);

  function selectProduct(product: DemoProduct) {
    setSelected(product);
    setPickerOpen(false);
    window.history.replaceState(null, "", `/live-demo?product=${product.slug}`);
  }

  function productButton(product: DemoProduct) {
    const active = product.slug === selected.slug;
    return (
      <button
        key={product.slug}
        type="button"
        onClick={() => selectProduct(product)}
        aria-pressed={active}
        className={cn(
          "flex items-center gap-3 cursor-pointer rounded-card border bg-white p-3 text-left transition-colors",
          active ? "border-ink shadow-sm" : "border-line hover:border-[#98a2b3]",
        )}
      >
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
          <Image src={product.image.src} alt="" fill className="object-contain" sizes="48px" />
        </span>
        {/*<span className="text-sm leading-snug font-semibold text-ink">{product.name}</span>*/}
      </button>
    );
  }

  return (
    <div>
      {/* md+: switcher strip above the editor */}
      <div className="mb-6 hidden flex-wrap justify-center gap-3 md:flex">
        {demoProducts.map(productButton)}
      </div>

      {/* Mobile: selected product + modal trigger */}
      <div className="mb-4 flex items-center justify-between gap-3 md:hidden">
        <p className="min-w-0 truncate text-sm font-semibold text-ink">{selected.name}</p>
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="inline-flex shrink-0 items-center rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-[#98a2b3]"
        >
          Choose a product
        </button>
      </div>

      <iframe
        key={selected.slug}
        src={selected.editorUrl}
        title={`${selected.name} — Custy product editor`}
        allow="fullscreen"
        className="h-[70vh] min-h-[520px] w-full rounded-card border border-line bg-white"
      />
      <p className="mt-3 text-center text-sm text-body">
        Editor not loading?{" "}
        <a
          href={selected.editorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ink underline underline-offset-2"
        >
          Open it in a new tab
        </a>
      </p>

      {pickerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Choose a product"
          className="fixed inset-0 z-50 flex flex-col bg-white md:hidden"
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <p className="text-base font-semibold text-ink">Choose a product</p>
            <button type="button" aria-label="Close" onClick={() => setPickerOpen(false)}>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto px-4 py-6">
            {demoProducts.map(productButton)}
          </div>
        </div>
      )}
    </div>
  );
}
