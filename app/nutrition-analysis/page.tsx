import NutritionAnalysisView from "@/views/NutritionAnalysisView";
import { RouteProtection } from "@/components/auth/route-protection";

export default function NutritionAnalysisPage() {
  return (
    <RouteProtection>
      <NutritionAnalysisView />
    </RouteProtection>
  );
}

