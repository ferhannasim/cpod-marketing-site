"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { isGroup, primaryNav } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/button";
import { SHOPIFY_APP_URL } from "@/lib/site";

function Wordmark() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.png"
        alt="DropShipPOD"
        width={198}
        height={60}
        priority
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!openGroup) return;

    function handlePointerDown(event: PointerEvent) {
      if (navRef.current && event.target instanceof Node && !navRef.current.contains(event.target)) {
        setOpenGroup(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [openGroup]);

  function closeGroupAndRefocus(label: string) {
    setOpenGroup(null);
    triggerRefs.current[label]?.focus();
  }

  function handleNavKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && openGroup) {
      closeGroupAndRefocus(openGroup);
    }
  }

  function handleMobileKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setMobileOpen(false);
      mobileToggleRef.current?.focus();
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Wordmark />

        <nav
          ref={navRef}
          aria-label="Main"
          className="hidden items-center gap-1 lg:flex"
          onKeyDown={handleNavKeyDown}
        >
          {primaryNav.map((entry) =>
            isGroup(entry) ? (
              <div
                key={entry.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(entry.label)}
                onMouseLeave={() => setOpenGroup((g) => (g === entry.label ? null : g))}
              >
                <button
                  type="button"
                  ref={(el) => {
                    triggerRefs.current[entry.label] = el;
                  }}
                  aria-expanded={openGroup === entry.label}
                  aria-controls={`nav-group-${slugify(entry.label)}`}
                  onClick={() => setOpenGroup((g) => (g === entry.label ? null : entry.label))}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:text-ink"
                >
                  {entry.label}
                  <ChevronDown aria-hidden className="h-4 w-4" />
                </button>
                {openGroup === entry.label ? (
                  <div
                    id={`nav-group-${slugify(entry.label)}`}
                    className="absolute left-0 top-full w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg"
                  >
                    {entry.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpenGroup(null)}
                        className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-surface hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:text-ink"
              >
                {entry.label}
              </Link>
            ),
          )}
          <ButtonLink href={SHOPIFY_APP_URL} className="ml-3 px-4 py-2">
            Get started
          </ButtonLink>
        </nav>

        <button
          type="button"
          ref={mobileToggleRef}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-lg p-2 text-zinc-700 lg:hidden"
        >
          {mobileOpen ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-nav" className="border-t border-zinc-200 bg-white lg:hidden" onKeyDown={handleMobileKeyDown}>
          <nav aria-label="Mobile" className="space-y-1 px-4 py-4">
            {primaryNav.map((entry) =>
              isGroup(entry) ? (
                <div key={entry.label} className="py-1">
                  <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {entry.label}
                  </p>
                  {entry.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-surface"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={entry.href}
                  href={entry.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-surface"
                >
                  {entry.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
