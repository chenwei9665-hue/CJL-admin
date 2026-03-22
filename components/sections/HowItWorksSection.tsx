import { SectionHeader } from "@/components/ui/SectionHeader";

const cards = [
  { title: "A. 主动推送", desc: "会主动把重要信息发给老板或同事", points: ["每日晨报", "每周/月经营摘要", "库存/广告/对账异常提醒"] },
  { title: "B. 接受指令", desc: "可直接发消息让它去查、去算、去分析", points: ["查 SKU 销售额、利润、库存", "分析毛利下降原因", "生成新品定价模型"] },
  { title: "C. 联动执行", desc: "不只告诉答案，还能真的推进事情", points: ["自动创建退款/补发/售后单", "自动同步 ERP、财务、客服系统", "自动生成任务并分发跟进"] }
];

export function HowItWorksSection() {
  return (
    <section id="workflow" className="section-shell py-24">
      <SectionHeader title="数字员工如何为您工作？" subtitle="像真人一样与您互动，也像系统一样稳定执行" />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {cards.map((card, i) => (
          <article key={card.title} className="surface-card p-6">
            <div className="mb-4 h-1.5 w-16 rounded-full bg-primary" style={{ opacity: 0.4 + i * 0.2 }} />
            <h3 className="text-2xl font-semibold">{card.title}</h3>
            <p className="mt-3 text-textSecondary">{card.desc}</p>
            <ul className="mt-4 space-y-2 text-sm text-textSecondary">{card.points.map((p) => <li key={p}>• {p}</li>)}</ul>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center text-lg font-medium text-textSecondary">既会“告诉您”，也会“帮您查”，还会“替您做”。</p>
    </section>
  );
}
