"use client";

import { MDRenderer } from "@/components/MDRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectWithMessages } from "@/lib/types";
import { convertToUIMessages, generateUUID } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Bot, Cloud, Paperclip, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProjectChatProps {
  project: ProjectWithMessages;
}

export function ProjectChat({ project }: ProjectChatProps) {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const endMessageRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    status,
    append,
  } = useChat({
    id: project.id,
    initialMessages: convertToUIMessages(project.messages),
    body: {
      id: project.id,
    },
    sendExtraMessageFields: true,
    generateId: generateUUID,
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    endMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;

    // Only use the first file - simplified approach
    setCurrentFile(fileList[0]);
  };

  const removeFile = () => {
    setCurrentFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Custom handleSubmit to load file content first if needed
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // If there's a file, read its content and append to the message
    if (currentFile) {
      try {
        const fileContent = await readFileAsText(currentFile);
        const fileExtension =
          currentFile.name.split(".").pop()?.toLowerCase() || "";
        const formattedContent = `\n\nFile: ${currentFile.name}\n\`\`\`${fileExtension}\n${fileContent}\n\`\`\``;

        // Combine existing input with file content
        const combinedMessage = input + formattedContent;

        // Use the append method directly to add a new message
        // This bypasses the input field entirely
        append({
          role: "user",
          content: combinedMessage,
        });

        // Reset input and file
        setInput("");
        setCurrentFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      } catch (error) {
        console.error("Failed to read file:", error);
      }
    }

    // Otherwise just submit normally
    originalHandleSubmit(e as any);
  };

  // Helper function to read file as text
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          resolve(result);
        } else {
          reject(new Error("Failed to read file as text"));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="mb-6 flex justify-start">
      <div className="flex gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div className="max-w-[80%] p-3 rounded-2xl shadow-lg bg-gradient-to-br from-background via-accent/30 to-primary/5 border border-foreground/10 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            </div>
            <span className="text-sm text-muted-foreground ml-2">AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="flex flex-col h-[calc(100vh-250px)] min-h-[500px] shadow-xl overflow-hidden border border-foreground/10 bg-gradient-to-br from-background via-background/95 to-accent/5 backdrop-blur-lg rounded-2xl">
      <div className="p-4 border-b border-foreground/10 flex items-center justify-between bg-gradient-to-r from-primary/5 via-purple-500/5 to-indigo-500/5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Project Assistant
          </h3>
        </div>
        {project.cloudProvider && (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <Cloud className="h-3.5 w-3.5 mr-1 text-primary" />
            {project.cloudProvider.toUpperCase()}
          </Badge>
        )}
      </div>

      <ScrollArea className="flex-grow p-6 bg-gradient-to-br from-background/50 via-accent/5 to-primary/5">
        {messages.length > 0 ? (
          <>
            {messages.map((message, index) => (
              <div className="grid gap-2" key={index}>
                <div
                  className={`mb-6 flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex gap-3">
                    {message.role === "assistant" && (
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "bg-gradient-to-br from-background via-accent/30 to-primary/5 border border-foreground/10 backdrop-blur-sm"
                      }`}
                    >
                      {message.parts.map((part) => {
                        if (part.type === "text") {
                          return (
                            <MDRenderer key={part.type} content={part.text} />
                          );
                        }
                      })}
                    </div>
                    {message.role === "user" && (
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* Show typing indicator when AI is responding */}
            {status === "streaming" && <TypingIndicator />}
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 shadow-xl">
              <Bot className="h-10 w-10 text-white" />
            </div>

            {project.type === "new-deployment-guide" && (
              <>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to your New Deployment Guide!
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
                  I'm here to help you deploy your application to the cloud from
                  scratch. I'll guide you through each step, from choosing the
                  right cloud provider to setting up your application. Let's get
                  started!
                </p>
                <div className="text-sm text-muted-foreground space-y-3 max-w-md">
                  <p className="font-semibold text-foreground">
                    I'll help you with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-left">
                    <li>Choosing the right cloud provider</li>
                    <li>Setting up your application infrastructure</li>
                    <li>Configuring databases and services</li>
                    <li>Deploying your application</li>
                    <li>Setting up domains and SSL</li>
                  </ul>
                </div>
              </>
            )}

            {project.type === "existing-deployment-guide" && (
              <>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to your Deployment Assistant!
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
                  I'm here to help you optimize, troubleshoot, and improve your
                  existing cloud deployment. Whether you need performance
                  improvements, cost optimization, or help with issues, I've got
                  you covered.
                </p>
                <div className="text-sm text-muted-foreground space-y-3 max-w-md">
                  <p className="font-semibold text-foreground">
                    I can assist with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-left">
                    <li>Cost optimization strategies</li>
                    <li>Performance improvements</li>
                    <li>Troubleshooting deployment issues</li>
                    <li>Scaling and autoscaling setup</li>
                    <li>Security and compliance</li>
                  </ul>
                </div>
              </>
            )}

            {project.type === "upload-config-to-get-recommendations" && (
              <>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to your Configuration Optimizer!
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
                  I'm here to analyze your cloud configuration files and provide
                  optimization recommendations. Upload your config files or
                  share your current setup, and I'll help you optimize for cost,
                  performance, or both.
                </p>
                <div className="text-sm text-muted-foreground space-y-3 max-w-md">
                  <p className="font-semibold text-foreground">
                    I can help optimize:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-left">
                    <li>Resource utilization and costs</li>
                    <li>Performance bottlenecks</li>
                    <li>Security configurations</li>
                    <li>Scaling and auto-scaling</li>
                    <li>Service alternatives and upgrades</li>
                  </ul>
                </div>
              </>
            )}

            <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 rounded-xl max-w-md border border-foreground/10 shadow-lg">
              <p className="text-sm text-muted-foreground">
                💡 <strong className="text-foreground">Tip:</strong> You can
                attach configuration files, logs, or screenshots to get more
                specific help with your setup.
              </p>
            </div>
          </div>
        )}
        <div ref={endMessageRef} />
      </ScrollArea>

      {currentFile && (
        <div className="px-4 py-3 border-t border-foreground/10 flex flex-wrap gap-2 bg-gradient-to-r from-primary/5 to-purple-500/5 backdrop-blur-sm">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-primary/20 shadow-md"
          >
            <Paperclip className="h-3 w-3 mr-1 text-primary" />
            {currentFile.name}
            <button
              onClick={removeFile}
              className="ml-1 hover:bg-accent/50 rounded-full p-0.5 transition-all duration-200 hover:scale-110"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        </div>
      )}

      <form
        className="p-4 border-t border-foreground/10 flex items-center gap-3 bg-gradient-to-r from-primary/5 via-purple-500/5 to-indigo-500/5 backdrop-blur-sm"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".txt,.md,.json,.js,.ts,.jsx,.tsx,.html,.css,.jsonl,.yaml,.yml"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleFileButtonClick}
          disabled={!!currentFile}
          title={currentFile ? "File already selected" : "Attach file"}
          type="button"
          className="h-10 w-10 rounded-xl border-foreground/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about your project..."
          onKeyPress={(e) =>
            e.key === "Enter" && !currentFile && handleSubmit()
          }
          className="flex-grow rounded-xl border-foreground/20 focus:border-primary/40 bg-background/50 backdrop-blur-sm shadow-sm focus:shadow-md transition-all duration-300"
        />
        <Button
          type="submit"
          size="icon"
          disabled={(input === "" && !currentFile) || status === "streaming"}
          className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
