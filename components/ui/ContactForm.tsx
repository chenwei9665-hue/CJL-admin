"use client";

import { FormEvent, useState } from "react";
import { PrimaryButton } from "./Buttons";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-card border border-border bg-white p-6 shadow-card">
      {[
        "企业名称",
        "联系人",
        "手机号 / 微信",
        "当前经营平台"
      ].map((item) => (
        <label className="block" key={item}>
          <span className="mb-1 block text-sm text-textSecondary">{item}</span>
          <input required className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary" />
        </label>
      ))}
      <label className="block">
        <span className="mb-1 block text-sm text-textSecondary">当前最想解决的问题</span>
        <textarea required className="h-28 w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary" />
      </label>
      <PrimaryButton type="submit" disabled={status === "loading"} className="w-full justify-center disabled:opacity-70">
        {status === "loading" ? "提交中..." : "立即申请免费试用"}
      </PrimaryButton>
      {status === "success" && <p className="text-sm text-emerald-600">提交成功，我们会尽快与您联系。</p>}
      {status === "error" && <p className="text-sm text-red-600">提交失败，请稍后重试。</p>}
    </form>
  );
}
