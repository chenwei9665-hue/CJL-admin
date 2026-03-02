'use client';

import { useRouter } from 'next/navigation';

export function ActionStatusButtons({ id }: { id: string }) {
  const router = useRouter();

  const update = async (status: 'in_progress' | 'done' | 'ignored') => {
    await fetch(`/api/actions/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    router.refresh();
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2 text-sm">
      <button className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-blue-700 transition hover:bg-blue-100" onClick={() => update('in_progress')}>开始处理</button>
      <button className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700 transition hover:bg-emerald-100" onClick={() => update('done')}>标记完成</button>
      <button className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-slate-700 transition hover:bg-slate-200" onClick={() => update('ignored')}>标记暂缓</button>
    </div>
  );
}
