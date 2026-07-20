import Link from "next/link";
import { footerColumns, socialLinks } from "@/lib/nav";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-surface">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((column) => (
            <nav key={column.label} aria-label={column.label}>
              <p className="text-sm font-semibold text-ink">{column.label}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-zinc-600 hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} DropShipPOD. All rights reserved.</p>
          <ul className="flex gap-5">
            {socialLinks.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-zinc-600 hover:text-ink"
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
