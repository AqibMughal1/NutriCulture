"use server";

import { redirect } from "next/navigation";
import { currentSession } from "../api/user";
import { db } from "../db";
import { projects } from "../db/schema";

export async function startNewDeploymentGuide() {
  const { user } = await currentSession();
  if (!user) redirect("/login");

  // create new project
  const project = await db
    .insert(projects)
    .values({
      name: "Untitled Project",
      userId: user.id,
      type: "new-deployment-guide",
    })
    .returning();

  if (!project) {
    throw new Error("Failed to create project");
  }

  redirect(`/projects/${project[0].id}`);
}

export async function startExistingDeploymentGuide() {
  const { user } = await currentSession();
  if (!user) redirect("/login");

  // create new project
  const project = await db
    .insert(projects)
    .values({
      name: "Untitled Project",
      userId: user.id,
      type: "existing-deployment-guide",
    })
    .returning();

  if (!project) {
    throw new Error("Failed to create project");
  }

  redirect(`/projects/${project[0].id}`);
}

export async function startUploadConfigToGetRecommendations() {
  const { user } = await currentSession();
  if (!user) redirect("/login");

  // create new project
  const project = await db
    .insert(projects)
    .values({
      name: "Untitled Project",
      userId: user.id,
      type: "upload-config-to-get-recommendations",
    })
    .returning();

  if (!project) {
    throw new Error("Failed to create project");
  }

  redirect(`/projects/${project[0].id}/upload-config`);
}

export async function startSubmitRequirementsToGetDeployment() {
  const { user } = await currentSession();
  if (!user) redirect("/login");

  // create new project
  const project = await db
    .insert(projects)
    .values({
      name: "Untitled Project",
      userId: user.id,
      type: "submit-requirements-to-get-deployment-guide",
    })
    .returning();

  if (!project) {
    throw new Error("Failed to create project");
  }

  redirect(`/projects/${project[0].id}/deployment-requirements`);
}
