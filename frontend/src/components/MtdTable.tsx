import type { MtdRow } from "../types";

function formatCurrency(v: number | string | null | undefined): string {
  if (v === null || v === undefined || v === "") return "–";
  const n = typeof v === "string" ? parseFloat(v) : v;
  if (Number.isNaN(n)) return String(v);
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return n < 0 ? `(${formatted})` : formatted;
}

function formatPercent(v: number | string | null | undefined): string {
  if (v === null || v === undefined || v === "" || v === "-") return "–";
  const n = typeof v === "string" ? parseFloat(v) : v;
  if (Number.isNaN(n)) return String(v);
  return `${(n * 100).toFixed(1)}%`;
}

export default function MtdTable({ rows }: { rows: MtdRow[] }) {
  return (
    <table className="mtd-table">
      <thead>
        <tr>
          <th className="col-item">Line Item</th>
          <th>Actual</th>
          <th>Budget</th>
          <th>Var $</th>
          <th>Var %</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const varDollar = row["Var $"];
          const isUnfavorable = typeof varDollar === "number" && varDollar < 0;
          return (
            <tr key={row.item}>
              <td className="col-item">{row.item}</td>
              <td>{formatCurrency(row.Actual)}</td>
              <td>{formatCurrency(row.Budget)}</td>
              <td className={isUnfavorable ? "unfavorable" : "favorable"}>
                {formatCurrency(varDollar)}
              </td>
              <td className={isUnfavorable ? "unfavorable" : "favorable"}>
                {formatPercent(row["Var %"])}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
