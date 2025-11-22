"use server";

import { currentSession } from "@/lib/api/user";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateName(name: string) {
  const { user } = await currentSession();
  if (!user) {
    throw new Error("User not found");
  }

  await db.update(users).set({ name }).where(eq(users.id, user.id));

  revalidatePath("/");
  revalidatePath("/settings");
}

export async function updateImage(image: string) {
  const { user } = await currentSession();
  if (!user) {
    throw new Error("User not found");
  }

  await db.update(users).set({ image }).where(eq(users.id, user.id));

  revalidatePath("/");
  revalidatePath("/settings");
}
