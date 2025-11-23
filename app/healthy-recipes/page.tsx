import HealthyRecipesView from "@/views/HealthyRecipesView";
import { RouteProtection } from "@/components/auth/route-protection";

export default function HealthyRecipesPage() {
  return (
    <RouteProtection>
      <HealthyRecipesView />
    </RouteProtection>
  );
}

