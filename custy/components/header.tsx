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

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-scheme1-bg">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.png" alt={SITE_NAME} width={209} height={60} priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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

        <div className="hidden md:block">
          <Button href={headerCta.href} external={headerCta.external}>
            {headerCta.label}
          </Button>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </Container>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-scheme1-bg md:hidden">
          <Container className="flex h-16 items-center justify-between border-b border-line">
            <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
              <Image src="/images/logo.png" alt={SITE_NAME} width={209} height={60} />
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
