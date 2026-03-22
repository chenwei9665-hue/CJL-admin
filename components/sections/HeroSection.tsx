import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { TagBadge } from "@/components/ui/TagBadge";

export function HeroSection() {
  return (
    <section className="section-shell grid min-h-[88vh] items-center gap-10 py-16 lg:grid-cols-[45%_55%]">
      <div>
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">财精灵电商数字员工</h1>
        <p className="mt-4 text-2xl font-semibold text-primary">把经营结果，主动送到您眼前</p>
        <p className="mt-5 text-textSecondary md:text-lg">
          基于飞书 / 企业微信 / 钉钉 / 邮件的消息型交付方案。无需学习新客户端，持续将经营情况、异常提醒、执行进度送达给您和同事。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#cta"><PrimaryButton>申请 1 个月免费试用</PrimaryButton></a>
          <a href="#cta"><SecondaryButton>预约产品演示</SecondaryButton></a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {["飞书", "企业微信", "钉钉", "邮件"].map((x) => <TagBadge key={x} label={x} />)}
        </div>
      </div>
      <div className="rounded-card border border-border bg-white p-6 shadow-card">
        <div className="rounded-2xl bg-heroDark p-4 text-white">
          <p className="text-sm text-slate-300">店铺经营晨报</p>
          <p className="mt-2 text-3xl font-semibold">昨日 GMV：28.6 万</p>
          <p className="mt-1 text-sm text-emerald-300">较前日 +12%</p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-lightOrange p-4">
            <p className="text-sm font-semibold text-accent">库存预警：A123</p>
            <p className="mt-2 text-sm text-textSecondary">可售仅剩 2.6 天，已通知采购并附上近 14 天销量趋势。</p>
          </div>
          <div className="rounded-2xl bg-lightBlue p-4">
            <p className="text-sm text-textSecondary">近 14 天趋势</p>
            <div className="mt-3 flex h-16 items-end gap-1">
              {[20, 28, 18, 40, 32, 46, 52, 44, 50].map((h, i) => (
                <span key={i} className="w-2 rounded bg-primary/80" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
