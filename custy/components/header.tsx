"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "./button";
import { Container } from "./container";
import { headerNav, headerCta, resourceMenuLinks } from "@/lib/nav";
import { SITE_NAME } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const resourcesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!resourcesOpen) return;

    function closeOnOutsidePress(event: PointerEvent) {
      if (!resourcesMenuRef.current?.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setResourcesOpen(false);
        resourcesMenuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [resourcesOpen]);

  function closeMobileMenu() {
    setOpen(false);
    setMobileResourcesOpen(false);
  }

  // backdrop-filter creates a containing block for fixed descendants, which would
  // clamp the open mobile menu overlay to the header strip — so drop it while open.
  return (
    <header
      className={`sticky top-0 z-50 border-b border-line ${
        open ? "bg-white" : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.png" alt={SITE_NAME} width={139} height={40} priority />
        </Link>

        <nav className="hidden items-center gap-5 min-[1120px]:flex xl:gap-7">
          {headerNav.map((link) =>
            link.href === "/resources" ? (
              <div
                key={link.href}
                ref={resourcesMenuRef}
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setResourcesOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={resourcesOpen}
                  aria-controls="desktop-resources-menu"
                  className="flex items-center gap-1.5 text-sm font-medium text-body hover:text-ink focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4 focus-visible:outline-none"
                  onClick={() => setResourcesOpen((current) => !current)}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {resourcesOpen ? (
                  <div
                    id="desktop-resources-menu"
                    className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3"
                  >
                    <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_20px_45px_-18px_rgba(16,24,40,0.24)]">
                      {resourceMenuLinks.map((resource) => (
                        <Link
                          key={resource.href}
                          href={resource.href}
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-lander-light focus-visible:bg-lander-light focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
                          onClick={() => setResourcesOpen(false)}
                        >
                          <span className="block text-sm font-semibold text-ink">
                            {resource.label}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-body">
                            {resource.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-body hover:text-ink"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden min-[1120px]:block">
          <Button href={headerCta.href} external={headerCta.external}>
            {headerCta.label}
          </Button>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="min-[1120px]:hidden"
          onClick={() => {
            setResourcesOpen(false);
            setOpen(true);
          }}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </Container>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-scheme1-bg min-[1120px]:hidden">
          <Container className="flex h-16 items-center justify-between border-b border-line">
            <Link href="/" className="shrink-0" onClick={closeMobileMenu}>
              <Image src="/images/logo.png" alt={SITE_NAME} width={139} height={40} />
            </Link>
            <button type="button" aria-label="Close menu" onClick={closeMobileMenu}>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </Container>

          <nav className="flex flex-col gap-6 px-4 py-8">
            {headerNav.map((link) =>
              link.href === "/resources" ? (
                <div key={link.href}>
                  <button
                    type="button"
                    aria-expanded={mobileResourcesOpen}
                    aria-controls="mobile-resources-menu"
                    className="flex w-full items-center justify-between text-lg font-medium text-ink"
                    onClick={() => setMobileResourcesOpen((current) => !current)}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {mobileResourcesOpen ? (
                    <div
                      id="mobile-resources-menu"
                      className="mt-4 space-y-2 border-l-2 border-line pl-4"
                    >
                      {resourceMenuLinks.map((resource) => (
                        <Link
                          key={resource.href}
                          href={resource.href}
                          className="block rounded-xl px-3 py-2.5 hover:bg-lander-light"
                          onClick={closeMobileMenu}
                        >
                          <span className="block text-base font-semibold text-ink">
                            {resource.label}
                          </span>
                          <span className="mt-0.5 block text-sm leading-5 text-body">
                            {resource.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-ink"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ),
            )}
            <Button href={headerCta.href} external={headerCta.external} className="w-full">
              {headerCta.label}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
