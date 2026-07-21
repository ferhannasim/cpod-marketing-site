import Link from "next/link";
import { AtSign, Camera, Music2, PlayCircle, ThumbsUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "./container";
import { footerColumns, socialLinks } from "@/lib/nav";
import { SITE_NAME } from "@/lib/site";

// lucide-react dropped brand/logo icons; stand-ins picked for closest concept
// per platform (Facebook -> ThumbsUp, Instagram -> Camera, YouTube -> PlayCircle,
// Twitter/X -> AtSign). TikTok -> Music2 as specified in the brief.
const socialIcons: Record<string, LucideIcon> = {
  Facebook: ThumbsUp,
  Instagram: Camera,
  YouTube: PlayCircle,
  TikTok: Music2,
  Twitter: AtSign,
};

export function Footer() {
  return (
    <footer className="bg-scheme2-bg">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-ink">{column.title}</h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-body hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-body hover:text-ink">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label] ?? AtSign;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-body hover:text-ink"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">{social.label}</span>
                </a>
              );
            })}
          </div>

          <p className="text-sm text-body">
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
        </div>
      </Container>
    </footer>
  );
}
