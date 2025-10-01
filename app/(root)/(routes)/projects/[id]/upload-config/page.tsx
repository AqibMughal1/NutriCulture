import { currentSession } from "@/lib/api/user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import UploadConfigForm from "./_components/UploadConfigForm";

type UploadConfigPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UploadConfigPage({
  params,
}: UploadConfigPageProps) {
  const { id } = await params;
  const session = await currentSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const project = await db.query.projects.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.id, id),
        operators.eq(fields.userId, session.user.id)
      );
    },
  });

  if (!project) {
    redirect("/projects");
  }

  if (project.type !== "upload-config-to-get-recommendations") {
    redirect(`/projects/${id}`);
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Configuration</h1>
          <p className="text-muted-foreground">
            Upload your cloud configuration file to get personalized
            optimization recommendations
          </p>
        </div>

        <UploadConfigForm projectId={id} />
      </div>
    </div>
  );
}
