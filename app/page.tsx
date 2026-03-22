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
      <Reveal><WorkerGridSection /></Reveal>
      <Reveal><HowItWorksSection /></Reveal>
      <Reveal><UseCasesSection /></Reveal>
      <Reveal><ValueSection /></Reveal>
      <Reveal><PricingSection /></Reveal>
      <Reveal><TrustSection /></Reveal>
      <Reveal><FAQSection /></Reveal>
      <Reveal><CTASection /></Reveal>
      <Footer />
    </main>
  );
}
