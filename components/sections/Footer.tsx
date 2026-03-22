import { navItems } from "@/data/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-10">
      <div className="section-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold">财精灵</p>
          <p className="text-sm text-textSecondary">把经营结果，主动送到您眼前</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-textSecondary">
          {navItems.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </div>
        <p className="text-xs text-textSecondary">© {new Date().getFullYear()} 财精灵. All rights reserved.</p>
      </div>
    </footer>
  );
}
