import ProjectDetailView from "@/views/ProjectDetailView";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  return <ProjectDetailView params={params} />;
}
