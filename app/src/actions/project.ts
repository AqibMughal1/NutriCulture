"use server";

import { chatModel } from "@/lib/ai/model";
import { 
  DEPLOYMENT_GUIDE_GENERATION_PROMPT,
  NEW_DEPLOYMENT_GUIDE_SYSTEM_PROMPT,
  EXISTING_DEPLOYMENT_GUIDE_PROMPT,
  UPLOAD_CONFIG_OPTIMIZATION_PROMPT,
  CHAT_SYSTEM_PROMPT
} from "@/lib/ai/prompt";
import { currentSession } from "@/lib/api/user";
import { db } from "@/lib/db";
import { projects, messages } from "@/lib/db/schema";
import { generateText } from "ai";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect, unauthorized } from "next/navigation";
import { generateUUID } from "@/lib/utils";

export async function createProject(values: {
  cloudProvider: "aws" | "gcp" | "azure";
  projectName: string;
  notes?: string;
  projectType: "new-deployment-guide" | "existing-deployment-guide" | "submit-requirements-to-get-deployment-guide" | "upload-config-to-get-recommendations";
  configurationType?: "automated" | "stepbystep";
}) {
  const session = await currentSession();
  if (!session || !session.user) unauthorized();

  const [project] = await db
    .insert(projects)
    .values({
      cloudProvider: values.cloudProvider,
      name: values.projectName,
      additionalNotes: values.notes ?? null,
      userId: session.user.id,
      type: values.projectType,
    })
    .returning();

  // Create initial message based on project type
  await createInitialMessage(
    project.id, 
    values.projectType, 
    {
      cloudProvider: values.cloudProvider,
      projectName: values.projectName,
      notes: values.notes
    },
    values.configurationType
  );

  // Redirect based on project type
  if (values.projectType === "upload-config-to-get-recommendations") {
    redirect(`/projects/${project.id}/upload-config`);
  } else if (values.projectType === "submit-requirements-to-get-deployment-guide") {
    redirect(`/projects/${project.id}/deployment-requirements`);
  } else {
    redirect(`/projects/${project.id}`);
  }
}

// Helper function to get system prompt based on project type
function getSystemPrompt(projectType: string): string {
  switch (projectType) {
    case "new-deployment-guide":
      return NEW_DEPLOYMENT_GUIDE_SYSTEM_PROMPT;
    case "existing-deployment-guide":
      return EXISTING_DEPLOYMENT_GUIDE_PROMPT;
    case "upload-config-to-get-recommendations":
      return UPLOAD_CONFIG_OPTIMIZATION_PROMPT;
    case "submit-requirements-to-get-deployment-guide":
      return CHAT_SYSTEM_PROMPT;
    default:
      return CHAT_SYSTEM_PROMPT;
  }
}

async function createInitialMessage(
  projectId: string, 
  projectType: string, 
  formValues: {
    cloudProvider: string;
    projectName: string;
    notes?: string;
  },
  configurationType?: string
) {
  let initialMessage = "";

  // Build context from form values
  const cloudProviderName = formValues.cloudProvider.toUpperCase();
  const projectContext = `

**Project Details:**
- Project Name: ${formValues.projectName}
- Cloud Provider: ${cloudProviderName}${formValues.notes ? `\n- Additional Notes: ${formValues.notes}` : ''}
`;

  switch (projectType) {
    case "new-deployment-guide":
      if (configurationType === "automated") {
        initialMessage = `I'd like to get an automated deployment script for my new project. Can you help me set up my ${cloudProviderName} deployment with ready-to-run scripts?${projectContext}

Please provide me with an automated deployment script that I can run directly in the ${cloudProviderName} console or CLI.`;
      } else if (configurationType === "stepbystep") {
        initialMessage = `I'd like to get step-by-step instructions for deploying my new project to ${cloudProviderName}. Can you guide me through the manual configuration process?${projectContext}

Please provide detailed step-by-step instructions for setting up my deployment manually.`;
      } else {
        initialMessage = `I need help with deploying my new project to ${cloudProviderName}. Can you guide me through the process?${projectContext}`;
      }
      break;
    
    case "existing-deployment-guide":
      initialMessage = `I have an existing cloud deployment on ${cloudProviderName} that I'd like to optimize and improve. Can you help me analyze my current setup and provide recommendations?${projectContext}

Please help me optimize my existing ${cloudProviderName} deployment for better performance, cost efficiency, and best practices.`;
      break;
    
    case "submit-requirements-to-get-deployment-guide":
      initialMessage = `I'd like to submit my deployment requirements to get a custom deployment guide for ${cloudProviderName}. Can you help me with this process?${projectContext}

I'll be providing detailed requirements through a form, and I need a comprehensive deployment guide tailored to my specific needs.`;
      break;
    
    case "upload-config-to-get-recommendations":
      initialMessage = `I want to upload my ${cloudProviderName} configuration files to get optimization recommendations. Can you help me analyze my setup for cost and performance improvements?${projectContext}

I'll be uploading my cloud configuration files for analysis and optimization recommendations.`;
      break;
    
    default:
      initialMessage = `Hello! I'm ready to help you with your ${cloudProviderName} deployment project. What would you like to work on today?${projectContext}`;
  }

  // Generate unique IDs for the messages
  const userMessageId = generateUUID();
  const assistantMessageId = generateUUID();

  // Create the initial user message
  await db.insert(messages).values({
    id: userMessageId,
    projectId,
    role: "user",
    parts: [{ type: "text", text: initialMessage }],
    attachments: [],
    createdAt: new Date(),
  });

  // Generate AI response to the initial message
  try {
    const { text: aiResponse } = await generateText({
      model: chatModel,
      system: getSystemPrompt(projectType),
      messages: [
        {
          role: "user",
          content: initialMessage,
        },
      ],
      maxTokens: 4000,
    });

    // Create the AI response message
    await db.insert(messages).values({
      id: assistantMessageId,
      projectId,
      role: "assistant",
      parts: [{ type: "text", text: aiResponse }],
      attachments: [],
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error generating AI response:", error);
    // If AI generation fails, create a fallback response
    await db.insert(messages).values({
      id: assistantMessageId,
      projectId,
      role: "assistant",
      parts: [{ type: "text", text: "Hello! I'm ready to help you with your cloud deployment project. Let me know what specific assistance you need, and I'll guide you through the process step by step." }],
      attachments: [],
      createdAt: new Date(),
    });
  }
}

export async function renameProject(id: string, name: string) {
  const session = await currentSession();
  if (!session || !session.user) unauthorized();

  await db
    .update(projects)
    .set({ name })
    .where(and(eq(projects.id, id), eq(projects.userId, session.user.id)));

  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
}

export async function deleteProject(id: string) {
  const session = await currentSession();
  if (!session || !session.user) unauthorized();

  await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, session.user.id)));

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProjectConfig(
  id: string,
  configFileContent: string,
  optimizationType: "cost" | "performance" | "balanced"
) {
  const session = await currentSession();
  if (!session || !session.user) unauthorized();

  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, id), eq(projects.userId, session.user.id)),
  });

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.type !== "upload-config-to-get-recommendations") {
    throw new Error("Invalid project type");
  }

  await db
    .update(projects)
    .set({
      configFileContent,
      optimizationType,
      updatedAt: new Date(),
    })
    .where(and(eq(projects.id, id), eq(projects.userId, session.user.id)));

  revalidatePath(`/projects/${id}`);

  return {
    redirect: `/projects/${id}`,
  };
}

type DeploymentRequirementsData = {
  cloudProvider?: string;
  applicationType: string;
  language: string;
  framework: string;
  frontendTech?: string;
  sourceRepository: string;
  buildInstructions: string;
  environmentVariables?: string;
  portsToExpose: string;
  osRequirements: string;
  requiresDatabase: boolean;
  databaseType?: string;
  databaseSchema?: string;
  hasCustomDomain: boolean;
  domainName?: string;
};

export async function submitDeploymentRequirements(
  projectId: string,
  data: DeploymentRequirementsData
) {
  const session = await currentSession();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // Verify project ownership
  const project = await db.query.projects.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.id, projectId),
        operators.eq(fields.userId, session.user.id)
      );
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  // Prepare the context for AI generation
  const requirementsContext = `
**APPLICATION DETAILS:**
- Application Type: ${data.applicationType}
- Language: ${data.language}
- Framework: ${data.framework}
${data.frontendTech ? `- Frontend Technology: ${data.frontendTech}` : ""}

**DEPLOYMENT ENVIRONMENT:**
- Cloud Provider: ${data.cloudProvider || project.cloudProvider || "Not specified"}
- OS Requirements: ${data.osRequirements}
- Ports to Expose: ${data.portsToExpose}

**SOURCE CODE:**
- Repository: ${data.sourceRepository}
- Build Instructions: ${data.buildInstructions}

**RUNTIME CONFIGURATION:**
${data.environmentVariables ? `- Environment Variables: ${data.environmentVariables}` : "- No environment variables specified"}

**DATABASE:**
- Requires Database: ${data.requiresDatabase ? "Yes" : "No"}
${data.requiresDatabase && data.databaseType ? `- Database Type: ${data.databaseType}` : ""}
${data.requiresDatabase && data.databaseSchema ? `- Database Schema/Setup: ${data.databaseSchema}` : ""}

**DOMAIN:**
- Custom Domain: ${data.hasCustomDomain ? "Yes" : "No"}
${data.hasCustomDomain && data.domainName ? `- Domain Name: ${data.domainName}` : ""}

**ADDITIONAL NOTES:**
${project.additionalNotes || "No additional notes provided"}
`;

  try {
    // Generate deployment guide using AI
    const { text: generatedGuide } = await generateText({
      model: chatModel,
      prompt: DEPLOYMENT_GUIDE_GENERATION_PROMPT + "\n\n" + requirementsContext,
      maxTokens: 4000,
    });

    // Update project with form data and generated guide
    await db
      .update(projects)
      .set({
        cloudProvider: data.cloudProvider || project.cloudProvider,
        applicationType: data.applicationType,
        language: data.language,
        framework: data.framework,
        frontendTech: data.frontendTech,
        sourceRepository: data.sourceRepository,
        buildInstructions: data.buildInstructions,
        environmentVariables: data.environmentVariables,
        portsToExpose: data.portsToExpose,
        osRequirements: data.osRequirements,
        requiresDatabase: data.requiresDatabase,
        databaseType: data.databaseType,
        databaseSchema: data.databaseSchema,
        hasCustomDomain: data.hasCustomDomain,
        domainName: data.domainName,
        generatedDeploymentGuide: generatedGuide,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId));

    // Redirect to the AI guide page
  } catch (error) {
    console.error("Error generating deployment guide:", error);
    throw new Error("Failed to generate deployment guide");
  }

  return {
    redirect: `/projects/${projectId}/ai-guide`,
  };
}
