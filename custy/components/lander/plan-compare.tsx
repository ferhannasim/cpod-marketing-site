import { cn } from "@/lib/utils";

export type CompareRow = { label: string; values: [string, string, string] };

/** Responsive plan-comparison table: scrolls horizontally inside its own container on small screens. */
export function PlanCompare({
  plans,
  rows,
  className,
}: {
  plans: string[];
  rows: CompareRow[];
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-line bg-white", className)}>
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="px-5 py-4 text-[13px] font-bold tracking-widest text-muted uppercase">
              Plan limits
            </th>
            {plans.map((plan) => (
              <th key={plan} scope="col" className="px-5 py-4 text-[15px] font-bold text-ink">
                {plan}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-[#f0f3f7] last:border-b-0">
              <th scope="row" className="px-5 py-3.5 text-[14px] font-semibold text-ink">
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td key={index} className="px-5 py-3.5 text-[14px] text-body">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
