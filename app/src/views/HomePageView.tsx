
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FeaturesSection } from "@/components/features-section";
import { StatsSection } from "@/components/stats-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { CTASection } from "@/components/cta-section";
import { AnimatedTestimonialsDemo } from "@/components/testimonials2";

export default async function HomePageView() {
  return (
    <div className="">
      <main className="w-full max-w-6xl space-y-40 px-auto">
        <Header />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <AnimatedTestimonialsDemo />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
} 