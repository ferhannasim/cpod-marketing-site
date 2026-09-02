import type { MouseEvent } from "react";

/**
 * Smooth-scroll to a homepage section when already on `/`.
 * Returns true when the click was handled in-place.
 */
export function handleHomeHashNav(
  href: string,
  event?: MouseEvent<HTMLAnchorElement>,
): boolean {
  if (!href.startsWith("/#")) return false;
  if (typeof window === "undefined") return false;
  if (window.location.pathname !== "/" && window.location.pathname !== "") return false;

  event?.preventDefault();
  const id = href.slice(2);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  window.history.replaceState(null, "", href);
  return true;
}
