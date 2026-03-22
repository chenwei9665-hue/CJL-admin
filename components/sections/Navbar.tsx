"use client";

import { useEffect, useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import { navItems } from "@/data/site-data";

export function Navbar() {
  const [active, setActive] = useState("#product");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);

    const sections = navItems
      .map((item) => document.querySelector(item.href) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition ${scrolled ? "bg-white/85 shadow-sm backdrop-blur" : "bg-transparent"}`}>
      <div className="section-shell flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-3 font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">财</span>
          财精灵
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm transition ${active === item.href ? "text-primary" : "text-textSecondary hover:text-textPrimary"}`}
            >
              {item.label}
            </a>
          ))}
          <a href="#cta">
            <PrimaryButton>申请试用</PrimaryButton>
          </a>
        </nav>
        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
          ☰
        </button>
      </div>
      {open && (
        <div className="section-shell space-y-3 border-t border-border pb-5 lg:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="block py-1 text-textSecondary" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#cta" onClick={() => setOpen(false)}>
            <PrimaryButton className="w-full">申请试用</PrimaryButton>
          </a>
        </div>
      )}
    </header>
  );
}
