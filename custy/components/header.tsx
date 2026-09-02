"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "./button";
import { Container } from "./container";
import { headerNav, headerCta, resourceMenuLinks } from "@/lib/nav";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

const sectionLinks = headerNav.filter((link) => link.href.startsWith("/#"));

function activeHrefForPath(pathname: string): string | null | undefined {
  if (pathname === "/") return undefined;
  if (pathname === "/live-demo" || pathname.startsWith("/live-demo/")) return "/live-demo";
  if (
    pathname === "/resources" ||
    pathname.startsWith("/resources/") ||
    pathname === "/faq" ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/")
  ) {
    return "/resources";
  }
  return null;
}

function navItemClass(active: boolean, mobile = false) {
  return cn(
    "transition-colors",
    mobile ? "text-lg font-semibold" : "text-[15px] font-semibold",
    active ? "text-ink" : mobile ? "text-body" : "text-body hover:text-ink",
    active && !mobile && "relative after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-accent-blue",
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
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

  useEffect(() => {
    const fromPath = activeHrefForPath(pathname);
    if (fromPath !== undefined) {
      setActiveHref(fromPath);
      return;
    }

    const sections = sectionLinks
      .map((link) => {
        const el = document.getElementById(link.href.slice(2));
        return el ? { href: link.href, el } : null;
      })
      .filter((section): section is { href: string; el: HTMLElement } => section !== null);

    if (sections.length === 0) {
      setActiveHref(null);
      return;
    }

    function updateActive() {
      const marker = 96;
      let current = sections[0].href;
      for (const section of sections) {
        if (section.el.getBoundingClientRect().top <= marker) {
          current = section.href;
        }
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActiveHref(atBottom ? sections[sections.length - 1].href : current);
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [pathname]);

  function closeMobileMenu() {
    setOpen(false);
    setMobileResourcesOpen(false);
  }

  function onHashNav(href: string, event: MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith("/#")) return;
    setActiveHref(href);
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/" && window.location.pathname !== "") return;

    event.preventDefault();
    const id = href.slice(2);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", href);
    closeMobileMenu();
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
                  className={cn(
                    "flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4 focus-visible:outline-none",
                    navItemClass(activeHref === "/resources"),
                  )}
                  aria-current={activeHref === "/resources" ? "page" : undefined}
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
                          <span className="mt-1 block text-[13px] leading-5 text-body">
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
                className={navItemClass(activeHref === link.href)}
                aria-current={activeHref === link.href ? "page" : undefined}
                onClick={(event) => onHashNav(link.href, event)}
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
                    className={cn(
                      "flex w-full items-center justify-between",
                      navItemClass(activeHref === "/resources", true),
                    )}
                    aria-current={activeHref === "/resources" ? "page" : undefined}
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
                  className={navItemClass(activeHref === link.href, true)}
                  aria-current={activeHref === link.href ? "page" : undefined}
                  onClick={(event) => {
                    onHashNav(link.href, event);
                    closeMobileMenu();
                  }}
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
