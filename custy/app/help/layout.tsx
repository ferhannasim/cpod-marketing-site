import { DocsHeader } from "@/components/help/docs-header";
import { HelpSidebar } from "@/components/help";

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="help-docs flex min-h-screen flex-col bg-white font-sans">
      <DocsHeader />
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <HelpSidebar />
        <main className="min-w-0 flex-1 bg-white">
          <div className="w-full px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
