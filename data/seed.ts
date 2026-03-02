import { ActionItem, BusinessSummary, DailyBrief, OperatingMetricInput } from '@/types/business';

export const businessSummarySeed: BusinessSummary = {
  date: '2026-03-01',
  healthStatus: 'warning',
  headline: '整体经营正常，但利润承压，今天应优先处理广告效率和补货风险。',
  yesterdayGmv: 286000,
  yesterdayGmvChangePct: 6.4,
  yesterdayGrossProfit: 80366,
  yesterdayGrossProfitChangePct: -2.8,
  grossMarginPct: 28.1,
  grossMarginChangePct: -2.3,
  cashInflow: 192000,
  cashInflowChangePct: -4.7,
  inventoryValue: 468000,
  inventoryValueChangePct: 3.9,
  monthlyProfitTargetProgressPct: 61,
  summaryBullets: [
    '销售增长 6.4%，但毛利率下降 2.3 个点。',
    '广告支出增加 14%，利润未同步增长。',
    '轻羽保温杯库存仅够销售 5 天。'
  ]
};

export const operatingInputSeed: OperatingMetricInput = {
  grossMarginTrend: [32.2, 31.3, 30.5, 29.7, 28.1],
  channels: [
    { name: '天猫旗舰店', revenue: 132000, cost: 98000, profit: 34000 },
    { name: '抖音店铺', revenue: 96000, cost: 94000, profit: 2000 },
    { name: '私域小程序', revenue: 58000, cost: 36000, profit: 22000 }
  ],
  adSpend: { yesterday: 52000, previous: 45600 },
  adProfit: { yesterday: 23800, previous: 23600 },
  pendingSettlement: { current: 218000, avg14d: 168000 },
  cashPressure7d: 156000,
  skuStockDays: [
    { sku: '轻羽保温杯', days: 5 },
    { sku: '极简咖啡壶', days: 14 },
    { sku: '日常马克杯', days: 28 }
  ],
  slowInventoryPct: 24,
  refundRate: { yesterday: 5.8, avg7d: 3.1 }
};

export const actionSeed: ActionItem[] = [
  {
    id: 'act-1',
    title: '下调抖音低 ROI 广告组预算 20%',
    issueId: 'rule-ad-spend',
    reason: '广告花费增加但利润未增长',
    estimatedImpact: '预计提升日利润 ¥8,000 - ¥12,000',
    owner: '李运营',
    dueDate: '2026-03-02 18:00',
    status: 'todo',
    resultNote: '',
    createdAt: '2026-03-01 08:00',
    updatedAt: '2026-03-01 08:00'
  },
  {
    id: 'act-2',
    title: '确认轻羽保温杯补货时间并评估替代 SKU',
    issueId: 'rule-hot-sku-stockout',
    reason: '热销 SKU 即将断货',
    estimatedImpact: '避免潜在 GMV 损失约 ¥40,000',
    owner: '王采购',
    dueDate: '2026-03-02 12:00',
    status: 'in_progress',
    resultNote: '已联系 2 家供应商确认最快交期。',
    createdAt: '2026-03-01 08:10',
    updatedAt: '2026-03-01 09:30'
  },
  {
    id: 'act-3',
    title: '复盘近 7 天高退款订单并制定整改话术',
    issueId: 'rule-refund-spike',
    reason: '退款率异常上升',
    estimatedImpact: '预计将退款率下降 1.5-2.0 个点',
    owner: '陈客服',
    dueDate: '2026-03-03 16:00',
    status: 'done',
    resultNote: '已定位描述不符高发词，详情页文案已修改。',
    createdAt: '2026-02-28 10:00',
    updatedAt: '2026-03-01 07:30'
  }
];

export const dailyBriefSeed: DailyBrief = {
  date: '2026-03-01',
  conclusion: '整体经营正常，但利润承压，今天应优先处理广告效率和补货风险。',
  yesterdayHighlights: [
    '昨日 GMV 为 ¥286,000，较前一日增长 6.4%',
    '毛利率为 28.1%，较前一日下降 2.3 个点',
    '广告支出增长 14%，但广告带来的净利润未同步提升'
  ],
  keyIssues: [
    '抖音店铺近 3 天利润持续走低，主要受投放成本上升影响',
    'SKU「轻羽保温杯」库存仅够销售 5 天，存在断货风险',
    '平台待结算金额高于近两周平均水平，现金回笼速度偏慢'
  ],
  todayPriorities: [
    '下调抖音低 ROI 广告组预算 20%，优先保留高转化计划',
    '今日内确认「轻羽保温杯」补货时间，并同步评估替代 SKU',
    '让运营复盘近 7 天高退款订单，重点排查描述不符与物流问题'
  ],
  completedOrInProgress: [
    '昨日已完成一笔大额应收催收，预计 2 天内到账',
    '补货提醒已推送给采购负责人，待确认供应商交期'
  ]
};
