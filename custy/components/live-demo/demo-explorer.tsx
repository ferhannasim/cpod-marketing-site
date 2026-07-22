"use client";

import { useState } from "react";
import Image from "next/image";
import { demoProducts, type DemoProduct } from "@/content/demo-products";
import { cn } from "@/lib/utils";

// Client half of /live-demo: owns the selected product and swaps the editor
// iframe. URL sync uses history.replaceState (the App Router's sanctioned
// shallow update) so switching products never triggers a server round-trip.
export function DemoExplorer({ initialSlug }: { initialSlug: string }) {
  const initial = demoProducts.find((p) => p.slug === initialSlug) ?? demoProducts[0];
  const [selected, setSelected] = useState<DemoProduct>(initial);

  function selectProduct(product: DemoProduct) {
    setSelected(product);
    window.history.replaceState(null, "", `/live-demo?product=${product.slug}`);
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="max-lg:order-2">
        <iframe
          key={selected.slug}
          src={selected.editorUrl}
          title={`${selected.name} — Custy product editor`}
          allow="fullscreen"
          className="h-[70vh] min-h-[520px] w-full rounded-card border border-line bg-white"
        />
        <p className="mt-3 text-sm text-body">
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
      </div>

      <aside className="max-lg:order-1">
        <h2 className="text-xs font-semibold tracking-[0.08em] text-body uppercase">
          Choose a product
        </h2>
        <div className="mt-3 flex gap-3 max-lg:overflow-x-auto max-lg:pb-2 lg:flex-col">
          {demoProducts.map((product) => {
            const active = product.slug === selected.slug;
            return (
              <button
                key={product.slug}
                type="button"
                onClick={() => selectProduct(product)}
                aria-pressed={active}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-card border bg-white p-3 text-left transition-colors max-lg:w-[260px] lg:w-full",
                  active ? "border-ink shadow-sm" : "border-line hover:border-[#98a2b3]",
                )}
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image src={product.image.src} alt="" fill className="object-contain" sizes="56px" />
                </span>
                <span className="text-sm leading-snug font-semibold text-ink">{product.name}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
