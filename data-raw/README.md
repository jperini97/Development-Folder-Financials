# data-raw

Drop your monthly `BridgeInvest_Pnl_Template_*.xlsx` workbook here and commit/push it
(e.g. `BridgeInvest_Pnl_Template_2026-08.xlsx`). On push to `main`, GitHub Actions
picks the most recently named `.xlsx` file in this folder, exports the
"P&L - Monthly Snapshot" tab to `frontend/src/data/report.json`, rebuilds the
portal, and redeploys it to GitHub Pages automatically.

Before committing, make sure the workbook was recalculated in Excel (or via the
xlsx skill's `recalc.py`) so formula cells have cached values — openpyxl (used by
the export script) reads cached values only, it cannot evaluate formulas.
