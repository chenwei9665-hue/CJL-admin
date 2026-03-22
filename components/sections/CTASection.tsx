import { ContactForm } from "@/components/ui/ContactForm";

export function CTASection() {
  return (
    <section id="cta" className="section-shell py-24">
      <div className="grid gap-6 rounded-card bg-heroDark p-6 text-white md:p-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">申请 1 个月免费试用，让数字员工先进入您的一个真实场景</h2>
          <p className="mt-4 text-slate-200">先从经营晨报、库存预警、自动对账、售后协同或老板助理开始。先跑起来，再逐步扩展。</p>
          <p className="mt-4 text-slate-300">您不需要先做复杂系统建设，也不需要一次想清楚所有需求，我们会协助选择最有价值的首个场景。</p>
          <div className="mt-8 space-y-2 text-sm text-slate-300">
            <p>微信咨询：二维码占位</p>
            <p>联系电话：400-000-0000</p>
            <p>联系邮箱：hello@caijingling.ai</p>
            <p>服务时间：工作日 9:00 - 18:00</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
