import { getSummary } from '@/lib/store';
import { formatCurrency } from '@/lib/format';

const panelCls = 'panel p-5';

export default function InsightsPage() {
  const s = getSummary();
  return (
    <main className="page-wrap">
      <section className="panel p-6">
        <p className="section-kicker">经营透视（补充说明）</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">首页结论之外，你可能还想了解这些结构性变化。</h2>
        <p className="muted mt-2">本页用于补充解释核心判断，不提供复杂 BI 配置，确保阅读路径简洁、决策重点清晰。</p>
      </section>

      <section className="panel flex flex-wrap gap-3 p-4 text-sm">
        <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5"><option>全部渠道</option><option>天猫旗舰店</option><option>抖音店铺</option></select>
        <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5"><option>全部店铺</option><option>主店</option><option>分店</option></select>
        <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5"><option>昨日</option><option>本月累计</option><option>近 7 天</option></select>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className={panelCls}>
          <h3 className="text-lg font-semibold text-slate-900">赚钱能力</h3>
          <p className="mt-3 text-sm text-slate-700">渠道收入：{formatCurrency(s.yesterdayGmv)}</p>
          <p className="text-sm text-slate-700">毛利贡献：{formatCurrency(s.yesterdayGrossProfit)}</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">销售仍有增长，但利润改善慢于投放扩量，建议回到“增长质量优先”的执行策略。</p>
        </article>

        <article className={panelCls}>
          <h3 className="text-lg font-semibold text-slate-900">现金安全</h3>
          <p className="mt-3 text-sm text-slate-700">可用现金：¥318,000</p>
          <p className="text-sm text-slate-700">平台待结算：¥218,000</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">未来 7 天现金压力约 ¥156,000，建议短期控制非关键支出并加快回款节奏。</p>
        </article>

        <article className={panelCls}>
          <h3 className="text-lg font-semibold text-slate-900">库存效率</h3>
          <p className="mt-3 text-sm text-slate-700">库存金额：{formatCurrency(s.inventoryValue)}</p>
          <p className="text-sm text-slate-700">缺货风险：轻羽保温杯仅剩约 5 天安全库存</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">热销品库存偏紧，若补货延迟会影响未来几日销售承接与流量稳定性。</p>
        </article>

        <article className={panelCls}>
          <h3 className="text-lg font-semibold text-slate-900">增长质量</h3>
          <p className="mt-3 text-sm text-slate-700">广告花费：¥52,000（+14%）</p>
          <p className="text-sm text-slate-700">ROAS / 投产：2.4（需改善）</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">投放支出继续上升，但利润改善尚未同步，建议优先保留高转化计划并收紧低 ROI 组。</p>
        </article>
      </section>
    </main>
  );
}
