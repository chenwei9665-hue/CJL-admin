import { FAQItem } from "@/components/ui/FAQItem";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqItems } from "@/data/site-data";

export function FAQSection() {
  return (
    <section id="faq" className="section-shell py-24">
      <SectionHeader title="常见问题" />
      <div className="mt-8 space-y-4">
        {faqItems.map((item, idx) => <FAQItem key={item.q} question={item.q} answer={item.a} defaultOpen={idx === 0} />)}
      </div>
    </section>
  );
}
