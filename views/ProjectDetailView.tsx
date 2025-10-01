import { currentSession } from "@/lib/api/user";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { ProjectTabs } from "@/app/(root)/(routes)/projects/[id]/_components/ProjectTabs";

interface ProjectDetailViewProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailView({ params }: ProjectDetailViewProps) {
  const { user } = await currentSession();
  if (!user) redirect("/login");

  const { id } = await params;

  const project = await db.query.projects.findFirst({
    where: (projects, { eq, and }) =>
      and(eq(projects.id, id), eq(projects.userId, user.id)),
    with: {
      messages: true,
    },
  });
  if (!project) notFound();

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <ProjectTabs project={project} />
    </div>
  );
} 