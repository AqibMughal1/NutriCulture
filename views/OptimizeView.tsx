"use client";

import { CloudProviderSelect } from "@/components/CloudProviderSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BarChart2, DollarSign, Send, Zap } from "lucide-react";
import { useState } from "react";

type CloudProvider = "aws" | "gcp" | "azure";

export default function OptimizeView() {
  const [step, setStep] = useState<"upload" | "chat">("upload");
  const [cloudProvider, setCloudProvider] = useState<CloudProvider>("aws");
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = () => {
    console.log(
      file
        ? `Analyzing ${file.name} for ${cloudProvider}`
        : `Starting optimization chat for ${cloudProvider} without log file`
    );
    console.log(`Additional notes: ${notes}`);

    setStep("chat");
    setMessages([
      {
        role: "assistant",
        content: file
          ? `I've analyzed your ${cloudProvider.toUpperCase()} logs from ${file.name}. What would you like to know about optimizing your cloud infrastructure?`
          : `Welcome to the ${cloudProvider.toUpperCase()} optimization assistant. Although you haven't uploaded any logs, I can still provide general advice. What would you like to know about optimizing your cloud infrastructure?`,
      },
    ]);
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Based on ${file ? "your uploaded logs" : "general best practices"} for ${cloudProvider.toUpperCase()}, here's a tip for cloud optimization: Consider using auto-scaling groups to automatically adjust the number of instances based on demand. This can help optimize costs and performance.`,
          },
        ]);
      }, 1000);
      setInput("");
    }
  };

  const quickActions = [
    {
      icon: <BarChart2 className="w-4 h-4" />,
      label: "Performance",
      action: "Analyze performance",
    },
    {
      icon: <DollarSign className="w-4 h-4" />,
      label: "Cost",
      action: "Optimize costs",
    },
    {
      icon: <Zap className="w-4 h-4" />,
      label: "Security",
      action: "Enhance security",
    },
  ];

  if (step === "upload") {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Cloud Optimization Assistant
        </h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Cloud Logs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Cloud Provider
              </label>
              <CloudProviderSelect
                selectedProvider={cloudProvider}
                onSelectProvider={setCloudProvider}
              />
            </div>
            <div>
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium mb-2"
              >
                Upload Log File (Optional)
              </label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                accept=".log,.txt,.csv"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-2">
                Additional Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Any additional information about your cloud setup..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Start Optimization Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className=" shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cloud Optimization Assistant</h1>
          <Badge variant="outline" className="text-sm">
            {cloudProvider.toUpperCase()}
          </Badge>
        </div>
      </div>
      <div className="flex-grow container mx-auto px-4 py-8 flex gap-4">
        <Card className="w-64 h-fit">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setInput(action.action)}
                      >
                        {action.icon}
                        <span className="ml-2">{action.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ask about {action.label.toLowerCase()} optimization</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle>Optimization Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <ScrollArea className="flex-grow pr-4 mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center gap-2 mt-auto">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cloud optimization..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-grow"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 