import { SectionHeader } from "@/components/ui/SectionHeader";

const cases = [
  { t: "场景 1：每天早上，自动收到经营晨报", p: ["昨天卖了多少", "比前一天好还是差", "利润/退款/广告/库存/现金流异常", "今天最该盯的 3 件事"] },
  { t: "场景 2：库存或异常问题，第一时间预警", p: ["SKU 可售天数不足", "广告消耗异常", "签收异常增加", "对账差异自动提醒"] },
  { t: "场景 3：老板或同事随时发问", p: ["不需要切换系统", "不需要找人拉表", "一句话发给数字员工", "返回结构化结果 + 分析"] },
  { t: "场景 4：不只是说，还会生成文件和结果反馈", p: ["生成 Excel / PDF / 图片", "写入飞书/企微文档/数据库", "处理完成回传结果和截图", "帮助事情真正往前推进"] }
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="section-shell py-24">
      <SectionHeader title="真实使用场景" subtitle="您每天收到的，不是原始数据，而是已经整理好的重点、要点和行动建议" />
      <div className="mt-10 space-y-6">
        {cases.map((item, index) => (
          <article key={item.t} className="grid gap-6 rounded-card border border-border bg-white p-6 shadow-card lg:grid-cols-2">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <h3 className="text-2xl font-semibold">{item.t}</h3>
              <ul className="mt-4 space-y-2 text-textSecondary">{item.p.map((x) => <li key={x}>• {x}</li>)}</ul>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-sm text-textSecondary">消息型交付预览</p>
                <div className="mt-3 space-y-2">
                  <div className="rounded-lg bg-lightBlue p-2 text-sm">经营要点已整理完毕</div>
                  <div className="rounded-lg bg-lightOrange p-2 text-sm">检测到需优先处理事项 3 条</div>
                  <div className="rounded-lg bg-slate-100 p-2 text-sm">已生成报告文件并发送</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
