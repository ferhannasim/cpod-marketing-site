import type { SizeChart } from "@/lib/size-charts";

export function SizeChartTable({ chart }: { chart: SizeChart }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full text-sm">
          <caption className="sr-only">{chart.title}</caption>
          <thead>
            <tr className="bg-surface text-left">
              {chart.columns.map((column, i) => (
                <th key={i} scope="col" className="px-4 py-3 font-semibold text-ink">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {chart.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-surface/60">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 text-zinc-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {chart.notes.map((note, i) => (
        <p key={i} className="mt-3 text-sm text-zinc-500">
          {note}
        </p>
      ))}
    </div>
  );
}
