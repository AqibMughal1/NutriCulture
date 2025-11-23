import RecipeCustomizationView from "@/views/RecipeCustomizationView";
import { RouteProtection } from "@/components/auth/route-protection";

export default function RecipeCustomizationPage() {
  return (
    <RouteProtection>
      <RecipeCustomizationView />
    </RouteProtection>
  );
}

