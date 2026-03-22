"use client";

import { useState } from "react";

export function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="surface-card p-5">
      <button className="flex w-full items-center justify-between text-left" onClick={() => setOpen((v) => !v)}>
        <span className="text-lg font-semibold">{question}</span>
        <span className="text-primary">{open ? "−" : "+"}</span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <p className="overflow-hidden text-textSecondary">{answer}</p>
      </div>
    </div>
  );
}
