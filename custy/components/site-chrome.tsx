"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

function isHelpDocsPath(pathname: string) {
  return pathname === "/help" || pathname.startsWith("/help/");
}

/**
 * Marketing chrome (Header + Footer) for the main site. Help Centre routes
 * render without it so `/help` feels like a separate docs product.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const docs = isHelpDocsPath(pathname);

  if (docs) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
