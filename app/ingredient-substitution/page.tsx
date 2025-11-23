import IngredientSubstitutionView from "@/views/IngredientSubstitutionView";
import { RouteProtection } from "@/components/auth/route-protection";

export default function IngredientSubstitutionPage() {
  return (
    <RouteProtection>
      <IngredientSubstitutionView />
    </RouteProtection>
  );
}

