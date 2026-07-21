import Link from "next/link";
import { Container } from "./container";
import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";
import { footerColumns, socialLinks } from "@/lib/nav";
import { SITE_NAME } from "@/lib/site";

// Brand glyphs for a faithful port of the live footer's social row.
const socialIcons: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  TikTok: TiktokIcon,
  Twitter: XIcon,
};

export function Footer() {
  return (
    <footer className="bg-scheme2-bg">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
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
              const Icon = socialIcons[social.label] ?? XIcon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-body hover:text-ink"
                >
                  <Icon className="h-5 w-5" />
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
