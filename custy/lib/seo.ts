import type { Metadata } from "next";

/** Folded marketing pages kept as files but no longer part of the public IA. */
export const noIndexPaths = [
  "/features",
  "/how-it-works",
  "/pricing",
  "/contact",
  "/support",
  "/design-lab",
  "/use-cases",
  "/dropshipping",
] as const;

export const noIndex: Metadata["robots"] = {
  index: false,
  follow: true,
};
