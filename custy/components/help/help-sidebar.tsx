"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, FileText, Package, Rocket } from "lucide-react";
import { helpCategories, helpSidebarLinks } from "@/content/help";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, typeof Rocket> = {
  "getting-started": Rocket,
  products: Package,
};

function NavTree({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const next: Record<string, boolean> = {};
    for (const category of helpCategories) {
      next[category.slug] =
        pathname === category.href || pathname.startsWith(`${category.href}/`);
    }
    setOpenCategories((prev) => ({ ...prev, ...next }));
  }, [pathname]);

  return (
    <div className="space-y-2">
      {helpCategories.map((category) => {
        const Icon = categoryIcons[category.slug] ?? FileText;
        const expanded = openCategories[category.slug] ?? false;
        const categoryActive =
          pathname === category.href || pathname.startsWith(`${category.href}/`);

        return (
          <div key={category.slug}>
            <div
              className={cn(
                "flex items-center gap-1 rounded-xl transition-colors",
                categoryActive ? "bg-white shadow-sm ring-1 ring-line" : "hover:bg-white/70",
              )}
            >
              <Link
                href={category.href}
                onClick={onNavigate}
                className="flex min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2.5 text-[14px] font-semibold text-ink"
              >
                <Icon className="h-4 w-4 shrink-0 text-body" aria-hidden />
                <span className="truncate">{category.title}</span>
              </Link>
              <button
                type="button"
                aria-label={expanded ? `Collapse ${category.title}` : `Expand ${category.title}`}
                aria-expanded={expanded}
                onClick={() =>
                  setOpenCategories((prev) => ({
                    ...prev,
                    [category.slug]: !prev[category.slug],
                  }))
                }
                className="mr-1 rounded-lg p-2 text-muted transition-colors hover:bg-lander-light hover:text-ink"
              >
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
                  aria-hidden
                />
              </button>
            </div>

            {expanded ? (
              <ul className="mt-1 space-y-0.5 border-l border-line ml-4 pl-3">
                {category.subCategories.map((sub) => {
                  const active =
                    pathname === sub.href || pathname.startsWith(`${sub.href}/`);
                  return (
                    <li key={sub.slug}>
                      <Link
                        href={sub.href}
                        onClick={onNavigate}
                        className={cn(
                          "block rounded-lg px-2.5 py-2 text-[14px] leading-5 transition-colors",
                          active
                            ? "bg-white font-semibold text-ink shadow-sm ring-1 ring-line"
                            : "text-body hover:bg-white/80 hover:text-ink",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {sub.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        );
      })}

      <div className="mt-6 border-t border-line pt-5">
        <p className="px-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">
          More
        </p>
        <ul className="mt-2 space-y-0.5">
          {helpSidebarLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className="block rounded-lg px-2.5 py-2 text-[14px] text-body transition-colors hover:bg-white/80 hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function HelpSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="border-b border-line bg-[#f4f7fb] px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-left text-sm font-semibold text-ink"
          aria-expanded={open}
        >
          Browse guides
          <ChevronDown
            className={cn("h-4 w-4 text-muted transition-transform", open && "rotate-180")}
            aria-hidden
          />
        </button>
        {open ? (
          <nav aria-label="Help Centre" className="mt-3 rounded-xl border border-line bg-[#f4f7fb] p-3">
            <NavTree onNavigate={() => setOpen(false)} />
          </nav>
        ) : null}
      </div>

      <aside className="hidden w-[280px] shrink-0 border-r border-line bg-[#f4f7fb] lg:block xl:w-[300px]">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto px-3 py-6">
          <nav aria-label="Help Centre">
            <NavTree />
          </nav>
        </div>
      </aside>
    </>
  );
}
