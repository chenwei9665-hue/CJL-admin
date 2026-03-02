import { ActionStatusButtons } from '@/components/ActionStatusButtons';
import { getActions, getIssueById } from '@/lib/store';

const statusText = {
  todo: '待处理',
  in_progress: '处理中',
  done: '已完成',
  ignored: '已忽略'
};

const statusStyle = {
  todo: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  in_progress: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  done: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  ignored: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
};

export default function ActionsPage({ searchParams }: { searchParams: { status?: string } }) {
  const status = searchParams.status;
  const actions = getActions().filter((item) => !status || item.status === status);

  return (
    <main className="page-wrap">
      <section className="panel p-6">
        <p className="section-kicker">经营动作推进台</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">建议不止停留在报告里，每个问题都在被推进。</h2>
        <p className="muted mt-2">这里仅保留老板最关心的执行信息：来源问题、预估影响、负责人、节点状态与闭环结果。</p>
      </section>

      <section className="flex flex-wrap gap-2 text-sm">
        {['todo', 'in_progress', 'done', 'ignored'].map((s) => (
          <a key={s} href={`/actions?status=${s}`} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
            {statusText[s as keyof typeof statusText]}
          </a>
        ))}
      </section>

      <section className="space-y-4">
        {actions.map((action) => {
          const issue = getIssueById(action.issueId);
          return (
            <article key={action.id} className="panel interactive-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="max-w-3xl">
                  <h3 className="text-lg font-semibold text-slate-900">{action.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">来源异常：{issue?.title ?? action.issueId}</p>
                </div>
                <span className={`status-pill ${statusStyle[action.status]}`}>{statusText[action.status]}</span>
              </div>

              <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                <p className="panel-soft p-3 text-slate-700">建议原因：{action.reason}</p>
                <p className="rounded-xl border border-indigo-200/70 bg-indigo-50/70 p-3 font-semibold text-indigo-800">预估影响：{action.estimatedImpact}</p>
                <p className="panel-soft p-3 text-slate-700">负责人：{action.owner}</p>
                <p className="panel-soft p-3 text-slate-700">截止时间：{action.dueDate}</p>
              </div>

              <p className="mt-3 text-sm leading-7 text-slate-600">结果备注：{action.resultNote || '动作已完成分派，团队将持续回传阶段性结果。'}</p>
              <ActionStatusButtons id={action.id} />
            </article>
          );
        })}
      </section>
    </main>
  );
}
