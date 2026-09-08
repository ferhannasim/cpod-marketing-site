import Image from "next/image";
import Link from "next/link";
import { APP_URL, SITE_NAME } from "@/lib/site";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link href="/help" className="flex min-w-0 items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt={SITE_NAME}
              width={112}
              height={32}
              className="h-7 w-auto"
              priority
            />
            <span className="hidden h-5 w-px bg-line sm:block" aria-hidden />
            <span className="truncate text-[15px] font-semibold text-ink">Help Centre</span>
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 text-[13px] font-semibold text-body transition-colors hover:bg-lander-light hover:text-ink sm:px-3.5"
          >
            Back to site
          </Link>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1a2436] sm:px-4"
          >
            Install Custy
          </a>
        </div>
      </div>
    </header>
  );
}
