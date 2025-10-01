
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { Language } from "@/components/languages";
import { Testimonials } from "@/components/testimonials";
import { AnimatedTestimonialsDemo } from "@/components/testimonials2";
import { FeaturesSection } from "@/components/features-section";
import { StatsSection } from "@/components/stats-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { CTASection } from "@/components/cta-section";

export default async function HomeView() {
  return (
    <div className="">
      <main className="w-full max-w-6xl space-y-40 px-auto">
        <Header />
        <Language />
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        {/* <Testimonials /> */}
        <AnimatedTestimonialsDemo />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
} 