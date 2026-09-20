import reportData from "../data/report.json";
import type { Report } from "../types";

/**
 * Single point of contact for report data. Today this reads the static JSON
 * baked in at build time by data-pipeline/export_report.py. When a live
 * backend exists, only this function needs to change to an async fetch()
 * against the API — no component changes required.
 */
export function getReport(): Report {
  return reportData as Report;
}
