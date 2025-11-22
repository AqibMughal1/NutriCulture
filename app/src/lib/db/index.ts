import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

config({ path: ".env.local" }); // or .env.local

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
  casing: "snake_case",
});
