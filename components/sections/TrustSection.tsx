import { SectionHeader } from "@/components/ui/SectionHeader";

export function TrustSection() {
  const cards = [
    ["懂行业", ["长期服务电商企业", "知道老板真正关心什么", "了解财务、运营、客服、分析真实场景"]],
    ["懂交付", ["不是做空壳 AI", "把常见场景和规则预先沉淀", "上手更快，更接近开箱即用"]],
    ["懂技术", ["创始团队精于人工智能", "把业务经验做成可运行系统", "不是概念展示，而是长期可用产品"]]
  ] as const;

  return (
    <section id="trust" className="section-shell py-24">
      <SectionHeader title="为什么选择财精灵？" subtitle="懂行业，懂交付，也懂技术" />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {cards.map(([title, points]) => (
          <article key={title} className="surface-card p-6">
            <h3 className="text-xl font-semibold">{title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-textSecondary">{points.map((x) => <li key={x}>• {x}</li>)}</ul>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center text-textSecondary">您尝试的，不是一个概念，而是一套既懂电商、又懂 AI、还能真正交付出来的数字员工方案。</p>
    </section>
  );
}
