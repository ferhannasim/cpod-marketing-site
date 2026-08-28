import { cn } from "@/lib/utils";

/**
 * Line illustrations for the homepage "How Custy works" band.
 *
 * These are deliberately drawn here rather than pulled from the lucide set in
 * icons.tsx: that vocabulary is single-concept pictograms sized for a 44px
 * tile, and this band needs three larger drawings that each depict a whole
 * scene (a catalog, a shopper designing, a finished print file). Keeping them
 * as inline SVG means they inherit `currentColor`, scale without a raster
 * asset, and cost no extra request.
 *
 * Shared drawing conventions so the three read as one set: a 64x64 viewBox, a
 * 1.75 stroke, round caps and joins, the main subject in `currentColor` (the
 * card's brand tint) and secondary detail at 40% opacity.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Install and add products: a product catalog with a new item being added. */
function CatalogIllustration() {
  return (
    <>
      <rect {...stroke} x="6" y="17" width="27" height="27" rx="4" opacity="0.4" />
      <rect {...stroke} x="17" y="28" width="29" height="28" rx="4" />
      <path {...stroke} d="M24 41h15M24 48h9" />
      <circle {...stroke} cx="50" cy="15" r="9" />
      <path {...stroke} d="M50 11v8M46 15h8" />
    </>
  );
}

/** Customers design and order: a garment with artwork placed on the front. */
function DesignIllustration() {
  return (
    <>
      <path
        {...stroke}
        d="M23 11 12 16 8 25l7 4 3-3v26a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V26l3 3 7-4-4-9-11-5"
      />
      <path {...stroke} d="M23 11a9 6 0 0 0 18 0" opacity="0.4" />
      <rect {...stroke} x="24" y="29" width="16" height="13" rx="2" strokeDasharray="3 3" />
      <path {...stroke} d="M32 32.5 33.6 36l3.4 1.5-3.4 1.5L32 42.5 30.4 39 27 37.5l3.4-1.5z" />
      <path {...stroke} d="m41 44 3 9 2-3.5 3.5-.5z" opacity="0.4" />
    </>
  );
}

/** Get print-ready files: an artwork file cleared for production. */
function PrintFileIllustration() {
  return (
    <>
      <path {...stroke} d="M14 10h22l11 11v27a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3z" />
      <path {...stroke} d="M36 10v11h11" opacity="0.4" />
      <path {...stroke} d="M21 28h18M21 34h18M21 40h11" opacity="0.4" />
      <circle {...stroke} cx="45" cy="45" r="10" />
      <path {...stroke} d="m41 45 3 3 6-6.5" />
    </>
  );
}

const illustrations = {
  catalog: CatalogIllustration,
  design: DesignIllustration,
  print: PrintFileIllustration,
};

export type StepIllustrationName = keyof typeof illustrations;

export function StepIllustration({
  name,
  className,
}: {
  name: StepIllustrationName;
  className?: string;
}) {
  const Drawing = illustrations[name];
  if (!Drawing) return null;
  return (
    <svg
      viewBox="0 0 64 64"
      role="presentation"
      aria-hidden
      className={cn("h-16 w-16", className)}
    >
      <Drawing />
    </svg>
  );
}
