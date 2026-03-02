import { businessSummarySeed, operatingInputSeed } from '@/data/seed';
import { Issue, IssueSeverity, OperatingMetricInput } from '@/types/business';

interface Rule {
  id: string;
  run: (input: OperatingMetricInput) => Issue | null;
}

const severityWeight: Record<IssueSeverity, number> = { high: 3, medium: 2, low: 1 };

const trend = (arr: number[]) => arr[arr.length - 1] - arr[0];

const rules: Rule[] = [
  {
    id: 'rule-margin-down',
    run: (input) =>
      trend(input.grossMarginTrend) <= -3
        ? {
            id: 'rule-margin-down', title: '毛利率连续下降', category: 'profit', severity: 'high', status: 'open',
            impactValue: 23000, impactLabel: '近 5 日毛利额减少约 ¥23,000',
            description: '毛利率连续 5 天下行，利润质量明显变差。',
            rootCauses: ['促销折扣力度加大', '广告流量结构偏低转化人群'],
            consequence: '若持续 7 天，月度利润达成率可能下降 8-10%。',
            recommendations: ['收紧低毛利券活动', '按商品分层优化投放目标 ROAS'],
            relatedMetrics: ['grossMarginPct', 'yesterdayGrossProfit'],
            trendData: input.grossMarginTrend.map((v, i) => ({ date: `D-${4 - i}`, value: v })),
            createdAt: businessSummarySeed.date
          }
        : null
  },
  {
    id: 'rule-channel-loss',
    run: (input) => {
      const loss = input.channels.find((c) => c.profit < 0 || c.profit / c.revenue < 0.03);
      if (!loss) return null;
      return {
        id: 'rule-channel-loss', title: `渠道利润异常偏低（${loss.name}）`, category: 'profit', severity: 'high', status: 'open',
        impactValue: 18000, impactLabel: `${loss.name} 利润率接近盈亏线`,
        description: `${loss.name} 收入与成本几乎持平，边际利润过低。`,
        rootCauses: ['渠道投放 CPC 上升', '高客诉商品集中于该渠道'],
        consequence: '若不优化，渠道将从盈利转为亏损。',
        recommendations: ['下调低 ROI 计划预算', '暂停低毛利 SKU 在该渠道主推'],
        relatedMetrics: ['channelProfit'],
        trendData: [
          { date: 'D-2', value: 5.1 },
          { date: 'D-1', value: 3.8 },
          { date: 'D0', value: 2.1 }
        ],
        createdAt: businessSummarySeed.date
      };
    }
  },
  {
    id: 'rule-ad-spend',
    run: (input) => {
      const spendGrowth = (input.adSpend.yesterday - input.adSpend.previous) / input.adSpend.previous;
      const profitGrowth = (input.adProfit.yesterday - input.adProfit.previous) / input.adProfit.previous;
      if (spendGrowth > 0.1 && profitGrowth < 0.03) {
        return {
          id: 'rule-ad-spend', title: '广告花费增加但利润未增长', category: 'marketing', severity: 'high', status: 'open',
          impactValue: 12000, impactLabel: '无效投放成本约 ¥12,000/日',
          description: '投放预算明显提高，但带来的利润增量不足。',
          rootCauses: ['低 ROI 广告组扩量', '素材疲劳导致转化下降'],
          consequence: '继续放量将进一步挤压净利。',
          recommendations: ['下调低 ROI 广告组预算 20%', '复用高转化素材并做 A/B 测试'],
          relatedMetrics: ['adSpend', 'adProfit'],
          trendData: [
            { date: 'D-2', value: 41 },
            { date: 'D-1', value: 45.6 },
            { date: 'D0', value: 52 }
          ],
          createdAt: businessSummarySeed.date
        };
      }
      return null;
    }
  },
  {
    id: 'rule-pending-settlement',
    run: (input) =>
      input.pendingSettlement.current > input.pendingSettlement.avg14d * 1.25
        ? {
            id: 'rule-pending-settlement', title: '平台待结算金额偏高', category: 'cashflow', severity: 'medium', status: 'monitoring',
            impactValue: 50000, impactLabel: '高于近两周均值约 ¥50,000', description: '回款节奏放缓，现金回笼效率下降。',
            rootCauses: ['大促后平台结算周期拉长'], consequence: '未来 7 天可能出现可用现金不足。',
            recommendations: ['优先催收大额应收款', '调整近期采购支付节奏'], relatedMetrics: ['pendingSettlement'],
            trendData: [{ date: 'avg14d', value: input.pendingSettlement.avg14d }, { date: 'current', value: input.pendingSettlement.current }],
            createdAt: businessSummarySeed.date
          }
        : null
  },
  {
    id: 'rule-cash-pressure',
    run: (input) =>
      input.cashPressure7d > 120000
        ? {
            id: 'rule-cash-pressure', title: '未来 7 天现金压力偏大', category: 'cashflow', severity: 'high', status: 'open',
            impactValue: input.cashPressure7d, impactLabel: `预计缺口 ${input.cashPressure7d.toLocaleString()} 元`, description: '预计支出高于可回款，存在短期资金缺口。',
            rootCauses: ['待结算金额上升', '本周采购与投放支出集中'], consequence: '可能影响补货与营销执行。',
            recommendations: ['延后非关键支出', '优先推进高确定性回款'], relatedMetrics: ['cashPressure7d'],
            trendData: [{ date: 'T+3', value: -58000 }, { date: 'T+7', value: -156000 }], createdAt: businessSummarySeed.date
          }
        : null
  },
  {
    id: 'rule-hot-sku-stockout',
    run: (input) => {
      const riskSku = input.skuStockDays.find((s) => s.days <= 7);
      if (!riskSku) return null;
      return {
        id: 'rule-hot-sku-stockout', title: `热销 SKU 即将断货（${riskSku.sku}）`, category: 'inventory', severity: 'high', status: 'open',
        impactValue: 40000, impactLabel: `${riskSku.sku} 库存仅够 ${riskSku.days} 天`, description: '主力 SKU 安全库存不足。',
        rootCauses: ['销量超预期', '补货计划确认延迟'], consequence: '断货将导致销量与自然流量双降。',
        recommendations: ['今日内确认补货交期', '准备替代 SKU 承接流量'], relatedMetrics: ['skuStockDays'],
        trendData: [{ date: 'D-3', value: 9 }, { date: 'D-2', value: 7 }, { date: 'D0', value: riskSku.days }], createdAt: businessSummarySeed.date
      };
    }
  },
  {
    id: 'rule-slow-inventory',
    run: (input) =>
      input.slowInventoryPct > 20
        ? {
            id: 'rule-slow-inventory', title: '滞销库存占比过高', category: 'inventory', severity: 'medium', status: 'monitoring',
            impactValue: 112000, impactLabel: `滞销库存占比 ${input.slowInventoryPct}%`, description: '库存结构老化，占用现金。',
            rootCauses: ['老品去化慢', '补货策略偏保守'], consequence: '占用现金并拉低库存周转效率。',
            recommendations: ['制定老品清仓活动', '下调慢销 SKU 采购量'], relatedMetrics: ['slowInventoryPct'],
            trendData: [{ date: 'W-2', value: 19 }, { date: 'W-1', value: 22 }, { date: 'W0', value: input.slowInventoryPct }], createdAt: businessSummarySeed.date
          }
        : null
  },
  {
    id: 'rule-refund-spike',
    run: (input) =>
      input.refundRate.yesterday > input.refundRate.avg7d * 1.5
        ? {
            id: 'rule-refund-spike', title: '退款率异常上升', category: 'refund', severity: 'medium', status: 'open',
            impactValue: 9000, impactLabel: `退款率 ${input.refundRate.yesterday}%（7日均值 ${input.refundRate.avg7d}%）`, description: '退款率偏离均值，侵蚀毛利。',
            rootCauses: ['描述不符投诉增加', '部分订单物流超时'], consequence: '若持续，复购率与评分会同步下滑。',
            recommendations: ['复盘高退款订单', '优先修订详情页承诺与物流时效'], relatedMetrics: ['refundRate'],
            trendData: [{ date: 'avg7d', value: input.refundRate.avg7d }, { date: 'yesterday', value: input.refundRate.yesterday }], createdAt: businessSummarySeed.date
          }
        : null
  }
];

export function generateIssues(input: OperatingMetricInput = operatingInputSeed): Issue[] {
  return rules
    .map((rule) => rule.run(input))
    .filter((issue): issue is Issue => Boolean(issue))
    .sort((a, b) => severityWeight[b.severity] - severityWeight[a.severity] || b.impactValue - a.impactValue);
}
