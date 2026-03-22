import { SectionHeader } from "@/components/ui/SectionHeader";

const values = [
  "从被动看数据，变成主动收到重点",
  "从人工找人协同，变成直接调用数字能力",
  "从知道问题存在，变成问题被自动推进处理",
  "从依赖员工经验，变成形成可复制经营系统",
  "企业得到的不只是效率提升，而是更稳定执行力"
];

export function ValueSection() {
  return (
    <section className="section-shell py-24">
      <SectionHeader center title="数字员工的本质，是一种全新的生产力" subtitle="它带来的，不只是效率提升，而是企业工作方式的改变。" />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {values.map((v) => (
          <div key={v} className="rounded-3xl border border-border bg-white p-5 text-sm leading-relaxed text-textSecondary shadow-card">{v}</div>
        ))}
      </div>
    </section>
  );
}
