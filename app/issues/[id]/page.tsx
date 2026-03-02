import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkline } from '@/components/Sparkline';
import { getIssueById } from '@/lib/store';

const severityText = {
  high: '高优先级',
  medium: '中优先级',
  low: '低优先级'
} as const;

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const issue = getIssueById(params.id);
  if (!issue) return notFound();

  return (
    <main className="page-wrap">
      <section className="panel p-6">
        <p className="section-kicker">经营问题报告</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{issue.title}</h2>
        <p className="mt-3 text-sm text-slate-600">严重程度：{severityText[issue.severity]} · 影响范围：{issue.impactLabel}</p>
        <p className="mt-3 text-base leading-8 text-slate-700">{issue.description}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="panel p-5">
          <h3 className="text-lg font-semibold text-slate-900">主要原因</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {issue.rootCauses.map((cause) => <li key={cause}>{cause}</li>)}
          </ul>
          <h3 className="mt-5 text-lg font-semibold text-slate-900">若不处理的后果</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">{issue.consequence}</p>
        </div>

        <div className="panel p-5">
          <h3 className="text-lg font-semibold text-slate-900">建议今天优先推进的动作</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {issue.recommendations.map((rec) => <li key={rec}>{rec}</li>)}
          </ul>
          <Link href="/actions" className="mt-4 inline-block rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-800">创建 / 查看动作</Link>
        </div>
      </section>

      <section className="panel p-5">
        <h3 className="text-lg font-semibold text-slate-900">相关趋势</h3>
        <p className="mt-1 text-sm text-slate-500">用于辅助判断该问题是否仍在扩大，以及当前干预是否有效。</p>
        <Sparkline data={issue.trendData} />
      </section>
    </main>
  );
}
