import { currentSession } from "@/lib/api/user";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import DeploymentRequirementsForm from "@/app/(root)/(routes)/projects/[id]/deployment-requirements/_components/DeploymentRequirementsForm";

interface DeploymentFormViewProps {
  projectId: string;
}

export default async function DeploymentFormView({ projectId }: DeploymentFormViewProps) {
  const session = await currentSession();
  if (!session || !session.user) {
    notFound();
  }

  const project = await db.query.projects.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.id, projectId),
        operators.eq(fields.userId, session.user.id)
      );
    },
  });

  if (!project) {
    notFound();
  }

  if (project.type !== "submit-requirements-to-get-deployment-guide") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-6xl mx-auto px-4 py-8 mt-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Deployment Requirements
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your application and we'll generate a customized deployment guide 
            tailored to your specific needs and requirements.
          </p>
        </div>

        {/* Form Section - No wrapper container */}
        <DeploymentRequirementsForm project={project} />
      </div>
    </div>
  );
} 