import { headers } from "next/headers";
import { auth } from "../auth";

import { cache } from "react";

export const currentSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { session: null, user: null };
  }

  return session;
});
