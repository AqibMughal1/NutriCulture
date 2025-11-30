import NutritionChatView from "@/views/NutritionChatView";
import { RouteProtection } from "@/components/auth/route-protection";

export default function NutritionChatPage() {
  return (
    <RouteProtection>
      <NutritionChatView />
    </RouteProtection>
  );
}

