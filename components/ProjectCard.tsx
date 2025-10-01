"use client";

import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProject } from "@/actions/project";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, CalendarIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    cloudProvider?: string | null;
    additionalNotes?: string | null;
    updatedAt: Date;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProject(project.id);
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <CardSpotlight className="group relative flex flex-col justify-between w-full h-[280px] p-6 transition-all duration-300 hover:scale-[1.02] border border-foreground/10 hover:border-primary/30 bg-secondary/70 dark:bg-secondary/50 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
      {/* Delete button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-4 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-destructive/20 hover:text-destructive z-20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project "{project.name}" and all of its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Card Content */}
      <Link href={`/projects/${project.id}`} className="flex-1 relative z-0">
        <div className="flex flex-col h-full">
          <div className="mb-4 pr-8">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
              {project.name}
            </h3>
            {project.cloudProvider && (
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium">
                  {project.cloudProvider.toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            {project.additionalNotes && (
              <p className="text-muted-foreground line-clamp-3 text-sm">
                {project.additionalNotes}
              </p>
            )}
          </div>

          <div className="mt-auto pt-4 flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span>
                {formatDistanceToNow(new Date(project.updatedAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </CardSpotlight>
  );
} 