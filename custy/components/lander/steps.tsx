import { cn } from "@/lib/utils";

export type StepItem = {
  number: number;
  title: string;
  /** One or more body paragraphs. */
  text: string | string[];
  /** Optional illustration (unused by the four source pages; forward-compat). */
  image?: string;
};

const gridColumnClasses: Record<number, string> = {
  1: "",
  2: "min-[1200px]:grid-cols-2",
  3: "md:grid-cols-2 min-[1200px]:grid-cols-3",
  4: "md:grid-cols-2 min-[1200px]:grid-cols-4",
  5: "md:grid-cols-2 min-[1200px]:grid-cols-5",
};

export type StepsProps = {
  items: StepItem[];
  /**
   * `grid` — the features page look: numbered-circle cards laid out in columns.
   * `rows` — the how-it-works look: full-width rows with a rounded-square badge.
   */
  layout?: "grid" | "rows";
  /** Columns above 1200px for the grid layout (default 4). */
  columns?: number;
  className?: string;
};

function bodyParagraphs(text: StepItem["text"]): string[] {
  return Array.isArray(text) ? text : [text];
}

/**
 * The step sequence used on the features (`.custy-steps` grid) and how-it-works
 * (`.custy-steps` rows) pages. Defaults to the features `grid` variant per the
 * brief; pass `layout="rows"` for the stacked how-it-works treatment.
 */
export function Steps({ items, layout = "grid", columns = 4, className }: StepsProps) {
  if (layout === "rows") {
    return (
      <div className={cn("grid gap-[22px]", className)}>
        {items.map((step) => (
          <div
            key={step.number}
            className="grid grid-cols-[90px_1fr] items-start gap-6 rounded-lander border border-lander-border bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-7 shadow-[0_10px_24px_rgba(0,0,0,0.03)] max-md:grid-cols-1 max-md:gap-[18px] max-md:p-[22px]"
          >
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,rgba(24,183,245,0.12),rgba(236,0,140,0.12))] text-[28px] font-extrabold text-lander-dark">
              {step.number}
            </div>
            <div>
              {step.image ? (
                <img src={step.image} alt="" className="mb-3.5 max-w-full rounded-[18px]" />
              ) : null}
              <h3 className="mb-2.5 text-[26px] leading-[1.3] text-lander-dark">{step.title}</h3>
              {bodyParagraphs(step.text).map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-3.5 text-base leading-[1.8] text-lander-text last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("mt-3 grid gap-5", gridColumnClasses[columns] ?? gridColumnClasses[4], className)}>
      {items.map((step) => (
        <div
          key={step.number}
          className="relative rounded-[22px] border border-lander-border bg-[linear-gradient(180deg,#ffffff_0%,#fbfcff_100%)] p-[28px_22px] shadow-[0_10px_24px_rgba(0,0,0,0.03)]"
        >
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(90deg,#17b6f4,#ec008c)] text-base font-extrabold text-white">
            {step.number}
          </div>
          {step.image ? (
            <img src={step.image} alt="" className="mb-3.5 max-w-full rounded-[18px]" />
          ) : null}
          <h3 className="mb-2.5 text-xl leading-[1.3] text-lander-dark">{step.title}</h3>
          {bodyParagraphs(step.text).map((paragraph, index) => (
            <p key={index} className="mb-2.5 text-[15px] leading-[1.75] text-lander-text last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
