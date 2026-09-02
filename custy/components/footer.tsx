"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { Container } from "./container";
import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";
import { handleHomeHashNav } from "@/lib/hash-nav";
import { footerColumns, socialLinks } from "@/lib/nav";
import { SITE_NAME, SUPPORT_EMAIL, SUPPORT_PHONE, SUPPORT_PHONE_HREF } from "@/lib/site";

const socialIcons: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  TikTok: TiktokIcon,
  Twitter: XIcon,
};

export function Footer() {
  const about = footerColumns.find((column) => column.blurb);
  const learnMore = footerColumns.find((column) => column.links.length > 0);

  function onHashLink(href: string, event: MouseEvent<HTMLAnchorElement>) {
    handleHomeHashNav(href, event);
  }

  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <h3 className="text-base font-bold text-ink">{about?.title ?? `About ${SITE_NAME}`}</h3>
            {about?.blurb ? (
              <p className="mt-3 max-w-md text-[15px] leading-[1.5] text-body">{about.blurb}</p>
            ) : null}
          </div>

          <div>
            <h3 className="text-base font-bold text-ink">{learnMore?.title ?? "Learn more"}</h3>
            {learnMore ? (
              <ul className="mt-3 m-0 flex list-none flex-col gap-1.5 p-0">
                {learnMore.links.map((link) => {
                  const className =
                    "flex items-center gap-2 text-[15px] leading-6 text-body transition-colors hover:text-ink";
                  const marker = (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue"
                      aria-hidden="true"
                    />
                  );
                  return (
                    <li key={link.href} className="m-0">
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                          {marker}
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className={className}
                          onClick={(event) => onHashLink(link.href, event)}
                        >
                          {marker}
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <div>
            <h3 className="text-base font-bold text-ink">Connect with us</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label] ?? XIcon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue text-white transition-colors hover:bg-ink"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })}
            </div>
            <div className="mt-3 space-y-1 text-[15px] leading-6 text-body">
              <p>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-ink">
                  {SUPPORT_EMAIL}
                </a>
              </p>
              <p>
                <a href={SUPPORT_PHONE_HREF} className="hover:text-ink">
                  {SUPPORT_PHONE}
                </a>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </Container>
    </footer>
  );
}
