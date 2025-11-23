import AIMealSuggestionsView from "@/views/AIMealSuggestionsView";
import { RouteProtection } from "@/components/auth/route-protection";

export default function AIMealSuggestionsPage() {
  return (
    <RouteProtection>
      <AIMealSuggestionsView />
    </RouteProtection>
  );
}

