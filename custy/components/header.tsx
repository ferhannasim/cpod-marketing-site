"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./button";
import { Container } from "./container";
import { headerNav, headerCta } from "@/lib/nav";
import { SITE_NAME } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

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
              className="text-sm font-medium text-body hover:text-ink"
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
            <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
              <Image src="/images/logo.png" alt={SITE_NAME} width={139} height={40} />
            </Link>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </Container>

          <nav className="flex flex-col gap-6 px-4 py-8">
            {headerNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-ink"
                onClick={() => setOpen(false)}
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
