export interface MtdRow {
  item: string;
  Actual: number | string | null;
  Budget?: number | string | null;
  "Var $"?: number | string | null;
  "Var %"?: number | string | null;
  Prior?: number | string | null;
}

export interface RollingRow {
  item: string;
  [month: string]: number | string | null;
}

export interface Report {
  reportingMonth: string | null;
  sourceFile: string;
  generatedAt: string;
  mtd: MtdRow[];
  rollingActual: RollingRow[];
  rollingBudget: RollingRow[];
}
