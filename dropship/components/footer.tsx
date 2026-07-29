import Image from "next/image";
import Link from "next/link";
import { footerColumns, socialLinks } from "@/lib/nav";
import { Container } from "@/components/ui/container";
import { NavItemLink } from "@/components/nav-item-link";
import { DuoBar } from "@/components/lander/icons";
import { TAGLINE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink-deep text-white">
      <Container className="py-12">
        <DuoBar className="mb-6" />
        <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
          <Link href="/" className="flex items-center rounded-xl bg-white px-3 py-2">
            <Image src="/images/logo.png" alt="DropShipPOD" width={165} height={50} className="h-9 w-auto" />
          </Link>
          <p className="font-display text-sm font-semibold text-white">{TAGLINE}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((column) => (
            <nav key={column.label} aria-label={column.label}>
              <p className="text-sm font-semibold text-white">{column.label}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <NavItemLink link={link} className="text-sm text-white/70 hover:text-white" />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/60">© {new Date().getFullYear()} DropShipPOD. All rights reserved.</p>
          <ul className="flex gap-5">
            {socialLinks.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white/70 hover:text-brand"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
