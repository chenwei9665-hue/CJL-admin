import { SectionHeader } from "@/components/ui/SectionHeader";
import { TagBadge } from "@/components/ui/TagBadge";
import { workerCards } from "@/data/site-data";

export function WorkerGridSection() {
  return (
    <section className="section-shell py-24">
      <SectionHeader title="数字员工能为您做什么？" subtitle="不是一个功能，而是一组能持续交付结果的数字岗位" />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {workerCards.map((card, idx) => (
          <article key={card.title} className="flex h-full flex-col rounded-card border border-border bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-cardHover">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-lightBlue text-primary">{idx + 1}</div>
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <ul className="mt-3 flex-1 space-y-2 text-sm text-textSecondary">
              {card.points.map((p) => <li key={p}>• {p}</li>)}
            </ul>
            <div className="mt-5"><TagBadge label={card.tag} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}
