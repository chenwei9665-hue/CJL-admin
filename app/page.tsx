import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { Navbar } from "@/components/sections/Navbar";
import { PricingSection } from "@/components/sections/PricingSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { ValueSection } from "@/components/sections/ValueSection";
import { WhatIsSection } from "@/components/sections/WhatIsSection";
import { WorkerGridSection } from "@/components/sections/WorkerGridSection";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Reveal><WhatIsSection /></Reveal>
      <div className="bg-white"><Reveal><WorkerGridSection /></Reveal></div>
      <div className="bg-slate-50"><Reveal><HowItWorksSection /></Reveal></div>
      <Reveal><UseCasesSection /></Reveal>
      <div className="bg-white"><Reveal><ValueSection /></Reveal></div>
      <Reveal><PricingSection /></Reveal>
      <div className="bg-white"><Reveal><TrustSection /></Reveal></div>
      <Reveal><FAQSection /></Reveal>
      <Reveal><CTASection /></Reveal>
      <Footer />
    </main>
  );
}
