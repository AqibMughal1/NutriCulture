import { PricingCard } from "@/components/pricing-card";
import { Footer } from "@/components/footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full pt-20 md:pt-24 pb-8 md:pb-12 mt-14 md:mt-20">
      <PricingCard />
      <Footer />
    </div>
  );
} 