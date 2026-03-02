export type HealthStatus = 'healthy' | 'warning' | 'risk';

export interface BusinessSummary {
  date: string;
  healthStatus: HealthStatus;
  headline: string;
  yesterdayGmv: number;
  yesterdayGmvChangePct: number;
  yesterdayGrossProfit: number;
  yesterdayGrossProfitChangePct: number;
  grossMarginPct: number;
  grossMarginChangePct: number;
  cashInflow: number;
  cashInflowChangePct: number;
  inventoryValue: number;
  inventoryValueChangePct: number;
  monthlyProfitTargetProgressPct: number;
  summaryBullets: string[];
}

export type IssueCategory = 'profit' | 'cashflow' | 'inventory' | 'marketing' | 'refund';
export type IssueSeverity = 'low' | 'medium' | 'high';
export type IssueStatus = 'open' | 'monitoring' | 'resolved';

export interface MetricPoint {
  date: string;
  value: number;
}

export interface Issue {
  id: string;
  title: string;
  category: IssueCategory;
  severity: IssueSeverity;
  status: IssueStatus;
  impactValue: number;
  impactLabel: string;
  description: string;
  rootCauses: string[];
  consequence: string;
  recommendations: string[];
  relatedMetrics: string[];
  trendData: MetricPoint[];
  createdAt: string;
}

export type ActionStatus = 'todo' | 'in_progress' | 'done' | 'ignored';

export interface ActionItem {
  id: string;
  title: string;
  issueId: string;
  reason: string;
  estimatedImpact: string;
  owner: string;
  dueDate: string;
  status: ActionStatus;
  resultNote: string;
  createdAt: string;
  updatedAt: string;
}

export interface DailyBrief {
  date: string;
  conclusion: string;
  yesterdayHighlights: string[];
  keyIssues: string[];
  todayPriorities: string[];
  completedOrInProgress: string[];
}

export interface OperatingMetricInput {
  grossMarginTrend: number[];
  channels: Array<{ name: string; revenue: number; cost: number; profit: number }>;
  adSpend: { yesterday: number; previous: number };
  adProfit: { yesterday: number; previous: number };
  pendingSettlement: { current: number; avg14d: number };
  cashPressure7d: number;
  skuStockDays: Array<{ sku: string; days: number }>;
  slowInventoryPct: number;
  refundRate: { yesterday: number; avg7d: number };
}
