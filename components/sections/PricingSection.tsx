import { PrimaryButton } from "@/components/ui/Buttons";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PricingSection() {
  const steps = ["提交需求", "建立基础信息", "接入与配置", "测试与确认", "正式上线", "持续服务"];
  return (
    <section id="pricing" className="section-shell py-24">
      <SectionHeader title="收费简单，交付也简单" subtitle="像购买标准版本产品一样开通，不像传统企业软件那样复杂实施" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-card border border-border bg-white p-8 shadow-card">
          <p className="text-sm text-textSecondary">开通配置费</p>
          <p className="mt-1 text-4xl font-bold text-accent">5000 元</p>
          <p className="mt-4 text-sm text-textSecondary">月服务费</p>
          <p className="text-3xl font-bold text-primary">1500 元 / 月</p>
          <ul className="mt-5 space-y-2 text-sm text-textSecondary">
            {["开通数字员工", "完成数据对接", "增加技能", "日常运行保障", "异常排查", "规则优化", "场景迭代", "反馈跟进"].map((x) => <li key={x}>• {x}</li>)}
          </ul>
          <a href="#cta" className="mt-6 inline-block"><PrimaryButton>申请免费试用</PrimaryButton></a>
        </article>
        <article className="rounded-card border border-border bg-white p-8 shadow-card">
          <h3 className="text-2xl font-semibold">交付流程</h3>
          <ol className="mt-4 space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-semibold text-white">{i + 1}</span>
                <span className="text-textSecondary">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-textSecondary">简单需求开箱即用，复杂需求最快 3 个工作日投入使用。</p>
        </article>
      </div>
    </section>
  );
}
