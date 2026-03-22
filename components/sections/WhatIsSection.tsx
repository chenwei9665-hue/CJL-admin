import { SectionHeader } from "@/components/ui/SectionHeader";

const left = ["能做很多原本需要全职员工完成的工作", "能持续盯数据、盯流程、盯异常", "能 7×24 小时工作", "能同时处理很多任务", "能持续提醒、持续跟进、持续执行", "很多事情不是等人有空再做，而是系统持续在做"];
const right = ["不需要复杂实施", "不需要团队重新学习一套新系统", "可直接通过飞书、企业微信、钉钉、邮件使用", "标准化场景开通即用", "数据接入和规则配置通常 2—3 天上线", "可先从一个场景开始再逐步扩展"];

export function WhatIsSection() {
  return (
    <section id="product" className="section-shell py-24">
      <SectionHeader title="什么是电商数字员工？" subtitle="听话懂事，能说会写，不请假、不摸鱼的智能体" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {[{ t: "数字员工的特点", list: left }, { t: "与传统软件的区别", list: right }].map((card) => (
          <article key={card.t} className="rounded-card border border-border bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-cardHover">
            <h3 className="text-2xl font-semibold">{card.t}</h3>
            <ul className="mt-4 space-y-3 text-textSecondary">
              {card.list.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
