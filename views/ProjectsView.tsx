import { Button } from "@/components/ui/button";
import { currentSession } from "@/lib/api/user";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";

export default async function ProjectsView() {
  const { user } = await currentSession();
  if (!user) redirect("/login");

  const projects = await db.query.projects.findMany({
    where: (projects, { eq }) => eq(projects.userId, user.id),
    orderBy: (projects, { desc }) => [desc(projects.updatedAt)],
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Projects</h1>
        <Link href="/new-project">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No projects found</h2>
          <p className="text-muted-foreground mb-6">
            Create your first project to get started
          </p>
          <Link href="/new-project">
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              <Plus className="h-4 w-4" />
              Create Project
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
