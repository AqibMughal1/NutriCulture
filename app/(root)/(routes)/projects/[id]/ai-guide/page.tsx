import { MDRenderer } from "@/components/MDRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentSession } from "@/lib/api/user";
import { db } from "@/lib/db";
import { ArrowLeft, Bot, Download, Share } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AIGuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await currentSession();
  if (!session || !session.user) {
    notFound();
  }

  const { id } = await params;

  const project = await db.query.projects.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.id, id),
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

  if (!project.generatedDeploymentGuide) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href={`/projects/${project.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Project
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-bold">
                AI-Generated Deployment Guide
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {project.cloudProvider && (
              <Badge variant="outline">
                {project.cloudProvider.toUpperCase()}
              </Badge>
            )}
            <Badge variant="secondary">
              {project.applicationType?.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Project Details Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Project Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Language</p>
              <p className="font-medium">{project.language}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Framework</p>
              <p className="font-medium">{project.framework}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Database</p>
              <p className="font-medium">
                {project.requiresDatabase ? project.databaseType : "None"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Domain</p>
              <p className="font-medium">
                {project.hasCustomDomain ? project.domainName : "Default"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Generated Guide */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Generated Deployment Guide
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <MDRenderer content={project.generatedDeploymentGuide} />
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  AI-Generated Content
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  This deployment guide was generated based on your project
                  requirements. Please review and test all configurations before
                  deploying to production. For additional support, you can start
                  a new chat session.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
