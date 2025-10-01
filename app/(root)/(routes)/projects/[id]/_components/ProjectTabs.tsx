"use client";

import { deleteProject, renameProject } from "@/actions/project";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectWithMessages } from "@/lib/types";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { ProjectChat } from "./ProjectChat";

interface ProjectTabsProps {
  project: ProjectWithMessages;
}

export function ProjectTabs({ project }: ProjectTabsProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState(project.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New project name:", newProjectName);
    setIsDialogOpen(false);

    await renameProject(project.id, newProjectName);
  };

  const handleDelete = async () => {
    await deleteProject(project.id);
  };

  return (
    <Tabs defaultValue="chat" className="w-full">
      <div className="flex items-center justify-between">
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2 relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
            {isHovering && (
              <button
                onClick={() => setIsDialogOpen(true)}
                className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition"
              >
                <Pencil className="h-4 w-4 text-primary" />
              </button>
            )}
          </div>
          {project.cloudProvider && (
            <p className="text-muted-foreground">
              Cloud Provider: {project.cloudProvider.toUpperCase()}
            </p>
          )}
        </div>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="chat">Project Chat</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project Name</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <Input
                id="name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project and all of its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TabsContent value="chat" className="mt-6">
        <ProjectChat project={project} />
      </TabsContent>
      <TabsContent value="settings" className="mt-6">
        <div className="rounded-md border p-8">
          <h3 className="text-xl font-semibold mb-4">Project Settings</h3>

          <div className="mt-6">
            <h4 className="text-lg font-medium mb-2">Danger Zone</h4>
            <div className="border border-destructive/20 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-destructive">
                    Delete Project
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Once deleted, this project cannot be recovered.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
