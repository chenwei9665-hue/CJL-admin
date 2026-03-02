import { ReactNode } from 'react';

export function MetricCard({ title, value, change, note }: { title: string; value: ReactNode; change: string; note: string }) {
  const isUp = change.startsWith('+');
  return (
    <article className="interactive-card rounded-2xl border border-slate-200/80 bg-white/90 p-4">
      <p className="text-xs font-medium tracking-wide text-slate-500">{title}</p>
      <p className="mt-2 text-[28px] font-semibold leading-none text-slate-900">{value}</p>
      <p className={`mt-2 text-xs font-semibold ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>{change}</p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
    </article>
  );
}
