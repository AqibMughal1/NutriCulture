import { currentSession } from "@/lib/api/user";
import { NewProjectForm } from "@/app/(root)/(routes)/new-project/_components/NewProjectForm";
import { redirect } from "next/navigation";

export default async function NewProjectView() {
  const { user } = await currentSession();

  if (!user) {
    redirect("/login");
  }

  return <NewProjectForm />;
} 