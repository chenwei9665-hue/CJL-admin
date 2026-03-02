import Link from 'next/link';
import { formatCurrency } from '@/lib/format';
import { getActions, getIssues, getSummary } from '@/lib/store';

export default function DashboardPage() {
  const summary = getSummary();
  const topIssue = getIssues()[0];
  const topAction = getActions().find((item) => item.status === 'todo' || item.status === 'in_progress') ?? getActions()[0];

  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-8">
      <section className="pt-2">
        <p className="text-sm font-medium text-slate-500">今日经营简报</p>
        <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-900">
          {summary.headline}
        </h2>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-white/90 p-5 shadow-sm">
          <p className="text-xs tracking-wide text-slate-500">昨日销售额</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{formatCurrency(summary.yesterdayGmv)}</p>
        </article>
        <article className="rounded-2xl bg-white/90 p-5 shadow-sm">
          <p className="text-xs tracking-wide text-slate-500">昨日毛利率</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{summary.grossMarginPct}%</p>
        </article>
        <article className="rounded-2xl bg-white/90 p-5 shadow-sm">
          <p className="text-xs tracking-wide text-slate-500">昨日净回款</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{formatCurrency(summary.cashInflow)}</p>
        </article>
      </section>

      {topIssue ? (
        <section className="rounded-2xl bg-white/95 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">今日重点问题</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{topIssue.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">{topIssue.rootCauses[0]}。</p>
          <p className="text-sm leading-7 text-slate-700">{topIssue.impactLabel}。</p>
          <Link href={`/issues/${topIssue.id}`} className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-500">
            查看详情
          </Link>
        </section>
      ) : null}

      {topAction ? (
        <section className="rounded-2xl bg-white/95 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">今日优先动作</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{topAction.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">{topAction.reason}。</p>
          <p className="mt-2 text-sm text-slate-600">负责人：{topAction.owner} · 截止时间：{topAction.dueDate}</p>
          <Link
            href="/actions"
            className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            查看动作
          </Link>
        </section>
      ) : null}
    </main>
  );
}
