import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RollingRow } from "../types";

const MONTHS = [
  "Jan-26", "Feb-26", "Mar-26", "Apr-26", "May-26", "Jun-26",
  "Jul-26", "Aug-26", "Sep-26", "Oct-26", "Nov-26", "Dec-26",
];

export default function TrendChart({
  metric,
  actualRows,
  budgetRows,
}: {
  metric: string;
  actualRows: RollingRow[];
  budgetRows: RollingRow[];
}) {
  const actualRow = actualRows.find((r) => r.item === metric);
  const budgetRow = budgetRows.find((r) => r.item === metric);

  const chartData = MONTHS.map((month) => ({
    month,
    Actual: (actualRow?.[month] as number) ?? null,
    Budget: (budgetRow?.[month] as number) ?? null,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={chartData} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grid)" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(v) => `$${(v / 1000).toLocaleString()}k`}
        />
        <Tooltip
          formatter={(value) =>
            typeof value === "number"
              ? value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
              : value
          }
        />
        <Legend />
        <Line type="monotone" dataKey="Actual" stroke="var(--color-accent)" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="Budget" stroke="var(--color-muted)" strokeWidth={2} strokeDasharray="5 4" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
