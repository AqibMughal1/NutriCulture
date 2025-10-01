import DeploymentFormView from "@/views/DeploymentFormView";

export const metadata = {
  title: "Deployment Requirements - OptimalCloud.AI",
  description: "Provide your application details to generate a customized deployment guide",
};

export default async function DeploymentRequirementsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return <DeploymentFormView projectId={id} />;
}
