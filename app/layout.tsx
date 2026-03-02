import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: '电商老板 AI CFO',
  description: '每天主动汇报经营情况、发现问题、推动动作闭环'
};

const navItems = [
  { href: '/dashboard', label: '今日简报' },
  { href: '/insights', label: '经营透视' },
  { href: '/actions', label: '动作中心' }
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="mx-auto min-h-screen max-w-6xl px-6 py-8">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-4 shadow-[0_6px_24px_rgba(15,23,42,0.05)] backdrop-blur-sm">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">面向老板的经营晨读</p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">电商老板 AI CFO</h1>
            </div>
            <nav className="flex gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
