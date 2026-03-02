import Link from 'next/link';
import { MetricCard } from '@/components/MetricCard';
import { StatusBadge } from '@/components/StatusBadge';
import { formatCurrency, formatPct } from '@/lib/format';
import { getActions, getBrief, getIssues, getSummary } from '@/lib/store';

const severityMap = {
  high: '高优先级',
  medium: '中优先级',
  low: '低优先级'
} as const;

const actionPriority = {
  todo: 'P0 · 今日优先',
  in_progress: 'P1 · 正在推进',
  done: '已闭环',
  ignored: '暂缓处理'
} as const;

const actionStatusText = {
  todo: '待处理',
  in_progress: '处理中',
  done: '已完成',
  ignored: '已忽略'
} as const;

export default function DashboardPage() {
  const summary = getSummary();
  const issues = getIssues().slice(0, 3);
  const actions = getActions();
  const brief = getBrief();
  const focusActions = actions.filter((item) => item.status === 'todo' || item.status === 'in_progress').slice(0, 3);

  const metrics = [
    { title: '昨日销售额（GMV）', value: formatCurrency(summary.yesterdayGmv), change: formatPct(summary.yesterdayGmvChangePct), note: '销售仍在增长，订单承接稳定。' },
    { title: '昨日毛利额', value: formatCurrency(summary.yesterdayGrossProfit), change: formatPct(summary.yesterdayGrossProfitChangePct), note: '利润端承压，需同步优化投放与结构。' },
    { title: '昨日毛利率', value: `${summary.grossMarginPct}%`, change: formatPct(summary.grossMarginChangePct), note: '毛利率连续回落，建议优先控费。' },
    { title: '昨日净回款 / 现金流入', value: formatCurrency(summary.cashInflow), change: formatPct(summary.cashInflowChangePct), note: '回款节奏偏慢，现金安全需盯紧。' },
    { title: '库存占用金额', value: formatCurrency(summary.inventoryValue), change: formatPct(summary.inventoryValueChangePct), note: '库存资金占用继续上升。' },
    { title: '本月累计利润达成率', value: `${summary.monthlyProfitTargetProgressPct}%`, change: '+2.0%', note: '与目标相比仍需本周提速。' }
  ];

  return (
    <main className="page-wrap">
      <section className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <article className="panel p-7">
          <p className="section-kicker">今日经营简报 · {brief.date}</p>
          <h2 className="mt-3 text-[32px] font-semibold leading-tight tracking-tight text-slate-900">今天公司的经营情况，我先替你看过了。</h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700">这是一份面向老板的晨间决策摘要：先给结论，再说明问题与动作，帮助你在 30 秒内确定今天最该推进的经营事项。</p>

          <div className="mt-7 space-y-6 border-t border-slate-200/80 pt-6">
            <div>
              <p className="section-kicker">今日经营结论</p>
              <p className="mt-2 text-lg font-medium leading-8 text-slate-800">{brief.conclusion}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="section-kicker">昨天发生了什么</p>
                <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-700">
                  {brief.yesterdayHighlights.map((item) => (
                    <li key={item} className="panel-soft px-3 py-2">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="section-kicker">重点问题</p>
                <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-700">
                  {brief.keyIssues.map((item) => (
                    <li key={item} className="rounded-xl border border-amber-200/70 bg-amber-50/70 px-3 py-2">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="section-kicker">已完成 / 跟进中</p>
              <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-700">
                {brief.completedOrInProgress.map((item) => (
                  <li key={item} className="rounded-xl border border-emerald-200/70 bg-emerald-50/70 px-3 py-2">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button className="btn-secondary">复制晨报</button>
            <button className="btn-secondary">模拟发送到钉钉 / 飞书</button>
          </div>
        </article>

        <aside className="space-y-4">
          <article className="panel p-5">
            <p className="section-kicker">经营状态</p>
            <div className="mt-3 flex items-start justify-between">
              <p className="text-sm text-slate-600">当前整体判断</p>
              <StatusBadge status={summary.healthStatus} showHint />
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700">销售端维持增长，但利润质量与回款效率尚未同步改善，建议今天优先处理投放和补货两条主线。</p>
          </article>

          <article className="panel p-5">
            <p className="section-kicker">今日优先风险</p>
            <div className="mt-3 space-y-3">
              {issues.slice(0, 2).map((issue) => (
                <div key={issue.id} className="interactive-card rounded-xl border border-slate-200 p-3">
                  <p className="text-sm font-medium text-slate-900">{issue.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{issue.impactLabel}</p>
                  <Link href={`/issues/${issue.id}`} className="mt-2 inline-block text-xs font-semibold text-blue-600 hover:text-blue-500">
                    查看问题详情
                  </Link>
                </div>
              ))}
            </div>
          </article>

          <article className="panel p-5">
            <p className="section-kicker">今日决策提醒</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">先收紧低 ROI 投放预算，再锁定热销 SKU 补货时点。这两步最直接影响今天的利润与后续增长承接。</p>
          </article>
        </aside>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h3 className="section-title">建议今天优先推进的动作</h3>
          <Link href="/actions" className="text-sm font-semibold text-blue-600 hover:text-blue-500">进入动作中心</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {focusActions.map((action) => (
            <article key={action.id} className="panel interactive-card p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="status-pill bg-indigo-50 text-indigo-700">{actionPriority[action.status]}</span>
                <span className="text-xs font-medium text-slate-500">{actionStatusText[action.status]}</span>
              </div>
              <h4 className="mt-3 text-base font-semibold leading-6 text-slate-900">{action.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">建议原因：{action.reason}</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">预估影响：{action.estimatedImpact}</p>
              <p className="mt-2 text-xs text-slate-500">负责人：{action.owner} · 截止：{action.dueDate}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="section-title">核心指标（辅助判断）</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => <MetricCard key={metric.title} {...metric} />)}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="panel p-5">
          <h3 className="section-title">关键异常问题</h3>
          <p className="mt-1 text-sm text-slate-500">目前最值得老板关注的 3 个经营问题，按优先级排序。</p>
          <div className="mt-4 space-y-3">
            {issues.map((issue) => (
              <article key={issue.id} className="interactive-card rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{issue.title}</p>
                  <span className="status-pill bg-rose-50 text-rose-700">{severityMap[issue.severity]}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">{issue.description}</p>
                <p className="mt-1 text-sm text-slate-600">影响：{issue.impactLabel}</p>
                <p className="mt-1 text-sm text-slate-600">主要原因：{issue.rootCauses[0]}</p>
                <Link href={`/issues/${issue.id}`} className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:text-blue-500">查看详情</Link>
              </article>
            ))}
          </div>
        </article>

        <article className="panel p-5">
          <h3 className="section-title">最近动作进展</h3>
          <p className="mt-1 text-sm text-slate-500">建议已经进入执行轨道，便于快速确认闭环进度。</p>
          <div className="mt-4 space-y-3">
            {actions.slice(0, 3).map((action) => (
              <div key={action.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{action.title}</p>
                  <span className="text-xs font-medium text-slate-500">{actionStatusText[action.status]}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{action.resultNote || '已进入执行队列，团队将在完成后回填结果。'}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
