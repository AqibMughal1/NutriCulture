"use client";

import { createProject } from "@/actions/project";
import { CloudProviderSelect } from "@/components/CloudProviderSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Rocket, Settings, Code2, FileText, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  cloudProvider: z.enum(["aws", "gcp", "azure"] as const),
  projectName: z.string().min(1, "Project name is required"),
  notes: z.string().optional(),
  projectType: z.enum([
    "new-deployment-guide",
    "existing-deployment-guide", 
    "submit-requirements-to-get-deployment-guide",
    "upload-config-to-get-recommendations"
  ] as const),
  configurationType: z.enum(["automated", "stepbystep"] as const).optional(),
}).refine((data) => {
  // Only require configurationType for new-deployment-guide
  if (data.projectType === "new-deployment-guide") {
    return data.configurationType !== undefined;
  }
  return true;
}, {
  message: "Please select a configuration type",
  path: ["configurationType"],
});

type FormValues = z.infer<typeof formSchema>;

export function NewProjectForm() {
  const searchParams = useSearchParams();
  const projectType = searchParams.get("type") as FormValues["projectType"] || "new-deployment-guide";
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cloudProvider: "aws",
      projectName: "",
      notes: "",
      projectType,
      configurationType: "automated",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Form submitted with values:", values);
    console.log("Configuration type selected:", values.configurationType);
    await createProject(values);
  };

  // Only show configuration type for new deployment guide
  const showConfigurationType = projectType === "new-deployment-guide";

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8 mt-20">
      {/* Header Section */}
      <div className="text-center flex flex-col gap-6 mb-16">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent tracking-tight">
            Create New Project
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Set up your cloud deployment project with our intelligent configuration assistant
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-full"></div>
        </div>
      </div>

      {/* Main Form Card */}
      <Card className="max-w-3xl mx-auto shadow-2xl border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg">
        <CardHeader className="pb-8">
                      <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
              Project Configuration
            </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cloudProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cloud Provider</FormLabel>
                    <FormControl>
                      <CloudProviderSelect
                        selectedProvider={field.value}
                        onSelectProvider={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information about your project..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Hidden field for project type */}
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <input type="hidden" {...field} />
                )}
              />

              {showConfigurationType && (
                <FormField
                  control={form.control}
                  name="configurationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Configuration Preference *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                        >
                          <div className="relative">
                            <RadioGroupItem value="automated" id="automated" className="peer sr-only" />
                            <Label
                              htmlFor="automated"
                              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-950/30 peer-data-[state=checked]:shadow-lg cursor-pointer transition-all duration-300 group relative"
                            >
                              {field.value === "automated" && (
                                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                              )}
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <Code2 className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg font-semibold">Automated Script</span>
                              </div>
                              <p className="text-sm text-muted-foreground text-center">
                                Get a ready-to-run automated script for cloud console deployment
                              </p>
                            </Label>
                          </div>
                          
                          <div className="relative">
                            <RadioGroupItem value="stepbystep" id="stepbystep" className="peer sr-only" />
                            <Label
                              htmlFor="stepbystep"
                              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-50 dark:peer-data-[state=checked]:bg-purple-950/30 peer-data-[state=checked]:shadow-lg cursor-pointer transition-all duration-300 group relative"
                            >
                              {field.value === "stepbystep" && (
                                <div className="absolute top-2 right-2 w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
                              )}
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                                  <FileText className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg font-semibold">Step-by-Step Guide</span>
                              </div>
                              <p className="text-sm text-muted-foreground text-center">
                                Receive detailed step-by-step configuration instructions
                              </p>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                      <div className="mt-2 text-sm text-muted-foreground">
                        Selected: <span className="font-semibold text-foreground">
                          {field.value === "automated" ? "Automated Script" : "Step-by-Step Guide"}
                        </span>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] group"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <>
                    <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    Create Project
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
