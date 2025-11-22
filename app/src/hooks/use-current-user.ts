// Hook to get user data in a more convenient way

import { authClient } from "@/lib/auth-client";

export const useCurrentUser = () => {
  const session = authClient.useSession();
  return session.data?.user;
};
