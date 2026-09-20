# Development Folder Financials

Private repo for BridgeInvest's monthly P&L reporting portal.

## How it works

1. **You** do your calculations in Excel, as always.
2. Commit the finished monthly workbook into [`data-raw/`](data-raw/) and `git push`.
3. GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) automatically:
   - runs [`data-pipeline/export_report.py`](data-pipeline/export_report.py), which reads the
     "P&L - Monthly Snapshot" tab of your latest workbook in `data-raw/` and exports it to
     `frontend/src/data/report.json`
   - builds the React app in [`frontend/`](frontend/)
   - deploys it to GitHub Pages

No manual "upload" step — pushing the Excel file *is* the publish step.

## Stack

- **Frontend:** React 19 + Vite + TypeScript, charts via Recharts, deployed as a static
  site on GitHub Pages.
- **Data pipeline:** Python (openpyxl) — a build-time export step, not a live server.
- **Future:** data access is isolated behind `frontend/src/services/reportService.ts` so
  swapping the static JSON for a real backend API later only touches that one file.

## Local development

```bash
cd frontend
npm install
npm run dev
```

## One-time GitHub Pages setup

In the repo's Settings → Pages, set **Source** to "GitHub Actions" (only needs to be done once).
