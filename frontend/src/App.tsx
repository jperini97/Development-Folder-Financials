import { useMemo, useState } from "react";
import "./App.css";
import MtdTable from "./components/MtdTable";
import TrendChart from "./components/TrendChart";
import { getReport } from "./services/reportService";

export default function App() {
  const report = useMemo(() => getReport(), []);
  const metrics = report.rollingActual.map((r) => r.item);
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);

  return (
    <div className="page">
      <header className="header">
        <div className="header-inner">
          <div>
            <span className="brand">BridgeInvest</span>
            <h1>P&amp;L Reporting Portal</h1>
          </div>
          <div className="header-meta">
            <div>{report.reportingMonth}</div>
            <div className="muted">
              Generated {new Date(report.generatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="card">
          <h2>Month-to-Date vs. Budget</h2>
          <MtdTable rows={report.mtd} />
        </section>

        <section className="card">
          <div className="card-header-row">
            <h2>Rolling 12-Month Trend</h2>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              {metrics.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <TrendChart
            metric={selectedMetric}
            actualRows={report.rollingActual}
            budgetRows={report.rollingBudget}
          />
        </section>
      </main>

      <footer className="footer">
        Source: {report.sourceFile} · Internal use only
      </footer>
    </div>
  );
}
