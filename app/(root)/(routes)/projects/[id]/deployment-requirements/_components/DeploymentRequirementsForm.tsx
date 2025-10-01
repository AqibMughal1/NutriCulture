"use client";

import { submitDeploymentRequirements } from "@/actions/project";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type DeploymentRequirementsFormData = {
  cloudProvider?: string;
  applicationType: string;
  language: string;
  framework: string;
  frontendTech?: string;
  sourceRepository: string;
  buildInstructions: string;
  environmentVariables?: string;
  portsToExpose: string;
  osRequirements: string;
  requiresDatabase: boolean;
  databaseType?: string;
  databaseSchema?: string;
  hasCustomDomain: boolean;
  domainName?: string;
};

type Project = {
  id: string;
  cloudProvider?: string | null;
  type: string;
};

type DeploymentRequirementsFormProps = {
  project: Project;
};

export default function DeploymentRequirementsForm({
  project,
}: DeploymentRequirementsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requiresDatabase, setRequiresDatabase] = useState(false);
  const [hasCustomDomain, setHasCustomDomain] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DeploymentRequirementsFormData>({
    defaultValues: {
      cloudProvider: project.cloudProvider || undefined,
      requiresDatabase: false,
      hasCustomDomain: false,
    },
  });

  const onSubmit = async (data: DeploymentRequirementsFormData) => {
    setIsSubmitting(true);
    try {
      const { redirect } = await submitDeploymentRequirements(project.id, data);
      router.push(redirect);
      toast.success("Requirements submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit requirements. Please try again.");
      console.error("Error submitting requirements:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-20">
      {/* Cloud Provider */}
      {!project.cloudProvider && (
        <Card>
          <CardHeader>
            <CardTitle>Cloud Platform</CardTitle>
            <CardDescription>
              Select your preferred cloud provider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={(value) => setValue("cloudProvider", value)}
              className="grid grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aws" id="aws" />
                <Label htmlFor="aws">AWS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="azure" id="azure" />
                <Label htmlFor="azure">Azure</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gcp" id="gcp" />
                <Label htmlFor="gcp">Google Cloud</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Application Type */}
      <Card>
        <CardHeader>
          <CardTitle>Application Type</CardTitle>
          <CardDescription>
            What type of application are you deploying?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => setValue("applicationType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select application type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-app">Web Application</SelectItem>
              <SelectItem value="api-backend">API Backend</SelectItem>
              <SelectItem value="mobile-backend">Mobile Backend</SelectItem>
              <SelectItem value="microservice">Microservice</SelectItem>
              <SelectItem value="static-site">Static Site</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Tech Stack</CardTitle>
          <CardDescription>Specify your technology stack</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                placeholder="e.g., Node.js, Python, Java"
                {...register("language", { required: "Language is required" })}
              />
              {errors.language && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.language.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="framework">Framework</Label>
              <Input
                id="framework"
                placeholder="e.g., React, Django, Spring Boot"
                {...register("framework", {
                  required: "Framework is required",
                })}
              />
              {errors.framework && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.framework.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="frontendTech">
              Frontend Technology (if applicable)
            </Label>
            <Input
              id="frontendTech"
              placeholder="e.g., React, Angular, Vue.js"
              {...register("frontendTech")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Code Source */}
      <Card>
        <CardHeader>
          <CardTitle>Code Source</CardTitle>
          <CardDescription>Information about your source code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="sourceRepository">Source Code Repository</Label>
            <Input
              id="sourceRepository"
              placeholder="GitHub/GitLab URL or describe your code source"
              {...register("sourceRepository", {
                required: "Source repository is required",
              })}
            />
            {errors.sourceRepository && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sourceRepository.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="buildInstructions">Build Instructions</Label>
            <Textarea
              id="buildInstructions"
              placeholder="e.g., npm install && npm run build"
              {...register("buildInstructions", {
                required: "Build instructions are required",
              })}
            />
            {errors.buildInstructions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.buildInstructions.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Runtime Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Runtime Requirements</CardTitle>
          <CardDescription>Specify runtime configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="environmentVariables">Environment Variables</Label>
            <Textarea
              id="environmentVariables"
              placeholder="e.g., DATABASE_URL, API_KEY, PORT"
              {...register("environmentVariables")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="portsToExpose">Ports to Expose</Label>
              <Input
                id="portsToExpose"
                placeholder="e.g., 3000, 8080"
                {...register("portsToExpose", {
                  required: "Ports to expose are required",
                })}
              />
              {errors.portsToExpose && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.portsToExpose.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="osRequirements">OS Requirements</Label>
              <Input
                id="osRequirements"
                placeholder="e.g., Ubuntu 20.04, Alpine Linux"
                {...register("osRequirements", {
                  required: "OS requirements are required",
                })}
              />
              {errors.osRequirements && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.osRequirements.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database */}
      <Card>
        <CardHeader>
          <CardTitle>Database</CardTitle>
          <CardDescription>
            Database requirements for your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="requiresDatabase"
              checked={requiresDatabase}
              onCheckedChange={(checked) => {
                setRequiresDatabase(checked);
                setValue("requiresDatabase", checked);
              }}
            />
            <Label htmlFor="requiresDatabase">
              Does your application require a database?
            </Label>
          </div>

          {requiresDatabase && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="databaseType">Database Type</Label>
                <Select
                  onValueChange={(value) => setValue("databaseType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select database type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="redis">Redis</SelectItem>
                    <SelectItem value="sqlite">SQLite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="databaseSchema">
                  Database Schema/Setup Instructions
                </Label>
                <Textarea
                  id="databaseSchema"
                  placeholder="Describe your database schema or provide setup instructions"
                  {...register("databaseSchema")}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Domain */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
          <CardDescription>
            Domain configuration for your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="hasCustomDomain"
              checked={hasCustomDomain}
              onCheckedChange={(checked) => {
                setHasCustomDomain(checked);
                setValue("hasCustomDomain", checked);
              }}
            />
            <Label htmlFor="hasCustomDomain">
              Will you provide a custom domain?
            </Label>
          </div>

          {hasCustomDomain && (
            <div>
              <Label htmlFor="domainName">Domain Name</Label>
              <Input
                id="domainName"
                placeholder="e.g., app.example.com"
                {...register("domainName")}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="min-w-[200px] bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Guide...
            </>
          ) : (
            "Generate Deployment Guide"
          )}
        </Button>
      </div>
    </form>
  );
}
