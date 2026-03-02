import { HealthStatus } from '@/types/business';

const map: Record<HealthStatus, { label: string; cls: string; hint: string }> = {
  healthy: { label: '健康', cls: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200', hint: '经营节奏稳定' },
  warning: { label: '关注', cls: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200', hint: '利润与现金需跟进' },
  risk: { label: '风险', cls: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200', hint: '需立即处理关键问题' }
};

export function StatusBadge({ status, showHint = false }: { status: HealthStatus; showHint?: boolean }) {
  return (
    <div className="text-right">
      <span className={`status-pill ${map[status].cls}`}>{map[status].label}</span>
      {showHint ? <p className="mt-1 text-xs text-slate-500">{map[status].hint}</p> : null}
    </div>
  );
}
