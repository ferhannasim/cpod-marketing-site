import Link from "next/link";
import { ArrowRight, FileText, List } from "lucide-react";
import type { HelpNavCategory, HelpSubCategory } from "@/content/help";
import { HelpBreadcrumbs } from "./help-breadcrumbs";
import { HelpInline } from "./help-inline";

export function HelpCategoryView({ category }: { category: HelpNavCategory }) {
  return (
    <div>
      <HelpBreadcrumbs items={[{ label: "Help", href: "/help" }, { label: category.title }]} />

      <header className="max-w-[720px]">
        <p className="text-[13px] font-semibold tracking-widest text-muted uppercase">Category</p>
        <h1 className="mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-tight font-extrabold text-ink">
          {category.title}
        </h1>
        <p className="mt-4 text-[16px] leading-[1.65] text-body">
          <HelpInline text={category.description} />
        </p>
      </header>

      <section className="mt-12">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted" aria-hidden />
          <h2 className="text-[15px] font-semibold text-ink">Articles</h2>
        </div>
        <ul className="mt-4 space-y-3">
          {category.overviewArticles.map((article) => (
            <li key={article.slug}>
              <Link
                href={article.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.12)]"
              >
                <span className="text-[16px] font-semibold text-ink">{article.title}</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <div className="flex items-center gap-2">
          <List className="h-4 w-4 text-muted" aria-hidden />
          <h2 className="text-[15px] font-semibold text-ink">Sub-Categories</h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {category.subCategories.map((sub) => (
            <SubCategoryCard key={sub.slug} sub={sub} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SubCategoryCard({ sub }: { sub: HelpSubCategory }) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <Link href={sub.href} className="group flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[17px] font-bold text-ink">{sub.title}</h3>
            <span className="rounded-full bg-lander-light px-2 py-0.5 text-[12px] font-semibold text-muted">
              {sub.articles.length}
            </span>
          </div>
          <p className="mt-1 text-[14px] leading-5 text-body">
            <HelpInline text={sub.description} />
          </p>
        </div>
        <ArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>

      {sub.articles.length > 0 ? (
        <ul className="mt-4 space-y-2 border-t border-line pt-4">
          {sub.articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={article.href}
                className="group flex items-start gap-2 rounded-lg px-1.5 py-1.5 -mx-1.5 text-[14px] leading-5 font-medium text-[#0b7fad] transition-colors hover:bg-[#f3faff] hover:text-ink hover:underline hover:underline-offset-2"
              >
                <FileText
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0b7fad] transition-colors group-hover:text-ink"
                  aria-hidden
                />
                <span>{article.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <Link
        href={sub.href}
        className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-lander-light px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-[#e8f6fc] hover:text-[#0b7fad]"
      >
        {sub.articles.length > 0 ? "See all Articles" : "Open section"}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}

export function HelpSubCategoryView({
  category,
  subCategory,
}: {
  category: HelpNavCategory;
  subCategory: HelpSubCategory;
}) {
  return (
    <div>
      <HelpBreadcrumbs
        items={[
          { label: "Help", href: "/help" },
          { label: category.title, href: category.href },
          { label: subCategory.title },
        ]}
      />

      <header className="max-w-[720px]">
        <p className="text-[13px] font-semibold tracking-widest text-muted uppercase">
          {category.title}
        </p>
        <h1 className="mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-tight font-extrabold text-ink">
          {subCategory.title}
        </h1>
        <p className="mt-4 text-[16px] leading-[1.65] text-body">
          <HelpInline text={subCategory.description} />
        </p>
      </header>

      <ul className="mt-10 space-y-3">
        {subCategory.articles.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-line bg-white px-5 py-8 text-[15px] leading-6 text-body">
            More guides for this section are coming soon.
          </li>
        ) : (
          subCategory.articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={article.href}
                className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.12)]"
              >
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[16px] font-semibold text-ink">{article.title}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                      aria-hidden
                    />
                  </span>
                  {article.summary ? (
                    <span className="mt-1 block text-[14.5px] leading-6 text-body">
                      <HelpInline text={article.summary} />
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
