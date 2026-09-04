"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "./button";
import { Container } from "./container";
import { headerNav, headerCta } from "@/lib/nav";
import { handleHomeHashNav } from "@/lib/hash-nav";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

const sectionLinks = headerNav.filter((link) => link.href.startsWith("/#"));

function activeHrefForPath(pathname: string): string | null | undefined {
  if (pathname === "/") return undefined;
  if (pathname === "/live-demo" || pathname.startsWith("/live-demo/")) return "/#live-demo";
  if (pathname === "/help" || pathname.startsWith("/help/")) return "/help";
  if (pathname === "/about" || pathname.startsWith("/about/")) return "/about";
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
  const [activeHref, setActiveHref] = useState<string | null>(null);
  // Keep the underline on the clicked item while smooth-scroll is in flight,
  // otherwise the scroll spy snaps it back through intermediate sections.
  const spyLockedUntil = useRef(0);

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
      if (Date.now() < spyLockedUntil.current) return;

      const marker = 96;
      // Default to Home until a marketing section actually crosses the header.
      let current = "/";
      for (const section of sections) {
        if (section.el.getBoundingClientRect().top <= marker) {
          current = section.href;
        }
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      // Only pin the last nav section at the document bottom when that section
      // is actually the last content band (avoids Pricing staying active under
      // trailing non-nav content).
      const last = sections[sections.length - 1];
      const lastStillInView = last.el.getBoundingClientRect().bottom > marker;
      setActiveHref(atBottom && lastStillInView ? last.href : current);
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
  }

  function onNavClick(href: string, event: MouseEvent<HTMLAnchorElement>) {
    if (href === "/") {
      setActiveHref("/");
      if (pathname === "/" || pathname === "") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
        spyLockedUntil.current = Date.now() + 1200;
      }
      closeMobileMenu();
      return;
    }
    if (!href.startsWith("/#")) return;
    setActiveHref(href);
    const handled = handleHomeHashNav(href, event);
    if (handled) {
      spyLockedUntil.current = Date.now() + 1200;
      closeMobileMenu();
    }
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
          {headerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navItemClass(activeHref === link.href)}
              aria-current={activeHref === link.href ? "page" : undefined}
              onClick={(event) => onNavClick(link.href, event)}
            >
              {link.label}
            </Link>
          ))}
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
          onClick={() => setOpen(true)}
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
            {headerNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navItemClass(activeHref === link.href, true)}
                aria-current={activeHref === link.href ? "page" : undefined}
                onClick={(event) => {
                  onNavClick(link.href, event);
                  closeMobileMenu();
                }}
              >
                {link.label}
              </Link>
            ))}
            <Button href={headerCta.href} external={headerCta.external} className="w-full">
              {headerCta.label}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
