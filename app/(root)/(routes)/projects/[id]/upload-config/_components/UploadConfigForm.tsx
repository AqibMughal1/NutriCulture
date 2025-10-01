"use client";

import { updateProjectConfig } from "@/actions/project";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type UploadConfigFormProps = {
  projectId: string;
};

type OptimizationType = "cost" | "performance" | "balanced";

export default function UploadConfigForm({ projectId }: UploadConfigFormProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [reading, setReading] = useState(false);
  const [fileRead, setFileRead] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFileRead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setReading(true);

    try {
      const text = await file.text();
      setFileContent(text);
      setFileRead(true);
      toast.success("File read successfully!");
    } catch (error) {
      toast.error("Failed to read file. Please try again.");
    } finally {
      setReading(false);
    }
  };

  const handleOptimizationSelect = async (type: OptimizationType) => {
    setSubmitting(true);

    try {
      const { redirect } = await updateProjectConfig(
        projectId,
        fileContent,
        type
      );
      router.push(redirect);
      toast.success("Configuration saved successfully!");
    } catch (error) {
      toast.error("Failed to save configuration. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {!fileRead ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Configuration File</CardTitle>
            <CardDescription>
              Select your cloud configuration file (JSON, YAML, or TXT format)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFileRead} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="config-file">Configuration File</Label>
                <Input
                  id="config-file"
                  type="file"
                  accept=".json,.yaml,.yml,.txt,.toml,.ini,.conf,.log"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
              <Button type="submit" disabled={!file || reading}>
                {reading ? "Reading..." : "Read File"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Select Optimization Type</CardTitle>
            <CardDescription>
              Choose your preferred optimization approach for your cloud
              configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Configuration Preview:
                </p>
                <pre className="text-xs bg-background p-2 rounded border max-h-32 overflow-auto">
                  {fileContent.substring(0, 200)}
                  {fileContent.length > 200 && "..."}
                </pre>
              </div>

              <div className="grid gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() => handleOptimizationSelect("cost")}
                  disabled={submitting}
                >
                  <div>
                    <div className="font-semibold">Cost Optimization</div>
                    <div className="text-sm text-muted-foreground">
                      Focus on reducing costs while maintaining functionality
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() => handleOptimizationSelect("performance")}
                  disabled={submitting}
                >
                  <div>
                    <div className="font-semibold">
                      Performance Optimization
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Prioritize speed and performance improvements
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() => handleOptimizationSelect("balanced")}
                  disabled={submitting}
                >
                  <div>
                    <div className="font-semibold">Balanced Optimization</div>
                    <div className="text-sm text-muted-foreground">
                      Optimize based on your application usage patterns
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
